var SSR_NODE = 1;
var TEXT_NODE = 3;
var EMPTY_OBJ = {};
var EMPTY_ARR = [];
var SVG_NS = "http://www.w3.org/2000/svg";

var id = (a) => a;
var map = EMPTY_ARR.map;
var isArray = Array.isArray;
var enqueue =
  typeof requestAnimationFrame !== "undefined"
    ? requestAnimationFrame
    : setTimeout;

var createClass = (obj) => {
  var out = "";

  if (typeof obj === "string") return obj

  if (isArray(obj)) {
    for (var k = 0, tmp; k < obj.length; k++) {
      if ((tmp = createClass(obj[k]))) {
        out += (out && " ") + tmp;
      }
    }
  } else {
    for (var k in obj) {
      if (obj[k]) out += (out && " ") + k;
    }
  }

  return out
};

var shouldRestart = (a, b) => {
  for (var k in { ...a, ...b }) {
    if (typeof (isArray(a[k]) ? a[k][0] : a[k]) === "function") {
      b[k] = a[k];
    } else if (a[k] !== b[k]) return true
  }
};

var patchSubs = (oldSubs, newSubs, dispatch) => {
  for (
    var subs = [], i = 0, oldSub, newSub;
    i < oldSubs.length || i < newSubs.length;
    i++
  ) {
    oldSub = oldSubs[i];
    newSub = newSubs[i];

    subs.push(
      newSub && newSub !== true
        ? !oldSub ||
          newSub[0] !== oldSub[0] ||
          shouldRestart(newSub[1], oldSub[1])
          ? [
              newSub[0],
              newSub[1],
              (oldSub && oldSub[2](), newSub[0](dispatch, newSub[1])),
            ]
          : oldSub
        : oldSub && oldSub[2]()
    );
  }
  return subs
};

var getKey = (vdom) => (vdom == null ? vdom : vdom.key);

var patchProperty = (node, key, oldValue, newValue, listener, isSvg) => {
  if (key === "key") ; else if (key === "style") {
    for (var k in { ...oldValue, ...newValue }) {
      oldValue = newValue == null || newValue[k] == null ? "" : newValue[k];
      if (k[0] === "-") {
        node[key].setProperty(k, oldValue);
      } else {
        node[key][k] = oldValue;
      }
    }
  } else if (key[0] === "o" && key[1] === "n") {
    if (
      !((node.events || (node.events = {}))[(key = key.slice(2))] = newValue)
    ) {
      node.removeEventListener(key, listener);
    } else if (!oldValue) {
      node.addEventListener(key, listener);
    }
  } else if (!isSvg && key !== "list" && key !== "form" && key in node) {
    node[key] = newValue == null ? "" : newValue;
  } else if (
    newValue == null ||
    newValue === false ||
    (key === "class" && !(newValue = createClass(newValue)))
  ) {
    node.removeAttribute(key);
  } else {
    node.setAttribute(key, newValue);
  }
};

var createNode = (vdom, listener, isSvg) => {
  var props = vdom.props;
  var node =
    vdom.type === TEXT_NODE
      ? document.createTextNode(vdom.tag)
      : (isSvg = isSvg || vdom.tag === "svg")
      ? document.createElementNS(SVG_NS, vdom.tag, { is: props.is })
      : document.createElement(vdom.tag, { is: props.is });

  for (var k in props) {
    patchProperty(node, k, null, props[k], listener, isSvg);
  }

  for (var i = 0; i < vdom.children.length; i++) {
    node.appendChild(
      createNode(
        (vdom.children[i] = maybeVNode(vdom.children[i])),
        listener,
        isSvg
      )
    );
  }

  return (vdom.node = node)
};

var patch = (parent, node, oldVNode, newVNode, listener, isSvg) => {
  if (oldVNode === newVNode) ; else if (
    oldVNode != null &&
    oldVNode.type === TEXT_NODE &&
    newVNode.type === TEXT_NODE
  ) {
    if (oldVNode.tag !== newVNode.tag) node.nodeValue = newVNode.tag;
  } else if (oldVNode == null || oldVNode.tag !== newVNode.tag) {
    node = parent.insertBefore(
      createNode((newVNode = maybeVNode(newVNode)), listener, isSvg),
      node
    );
    if (oldVNode != null) {
      parent.removeChild(oldVNode.node);
    }
  } else {
    var tmpVKid;
    var oldVKid;

    var oldKey;
    var newKey;

    var oldProps = oldVNode.props;
    var newProps = newVNode.props;

    var oldVKids = oldVNode.children;
    var newVKids = newVNode.children;

    var oldHead = 0;
    var newHead = 0;
    var oldTail = oldVKids.length - 1;
    var newTail = newVKids.length - 1;

    isSvg = isSvg || newVNode.tag === "svg";

    for (var i in { ...oldProps, ...newProps }) {
      if (
        (i === "value" || i === "selected" || i === "checked"
          ? node[i]
          : oldProps[i]) !== newProps[i]
      ) {
        patchProperty(node, i, oldProps[i], newProps[i], listener, isSvg);
      }
    }

    while (newHead <= newTail && oldHead <= oldTail) {
      if (
        (oldKey = getKey(oldVKids[oldHead])) == null ||
        oldKey !== getKey(newVKids[newHead])
      ) {
        break
      }

      patch(
        node,
        oldVKids[oldHead].node,
        oldVKids[oldHead],
        (newVKids[newHead] = maybeVNode(
          newVKids[newHead++],
          oldVKids[oldHead++]
        )),
        listener,
        isSvg
      );
    }

    while (newHead <= newTail && oldHead <= oldTail) {
      if (
        (oldKey = getKey(oldVKids[oldTail])) == null ||
        oldKey !== getKey(newVKids[newTail])
      ) {
        break
      }

      patch(
        node,
        oldVKids[oldTail].node,
        oldVKids[oldTail],
        (newVKids[newTail] = maybeVNode(
          newVKids[newTail--],
          oldVKids[oldTail--]
        )),
        listener,
        isSvg
      );
    }

    if (oldHead > oldTail) {
      while (newHead <= newTail) {
        node.insertBefore(
          createNode(
            (newVKids[newHead] = maybeVNode(newVKids[newHead++])),
            listener,
            isSvg
          ),
          (oldVKid = oldVKids[oldHead]) && oldVKid.node
        );
      }
    } else if (newHead > newTail) {
      while (oldHead <= oldTail) {
        node.removeChild(oldVKids[oldHead++].node);
      }
    } else {
      for (var keyed = {}, newKeyed = {}, i = oldHead; i <= oldTail; i++) {
        if ((oldKey = oldVKids[i].key) != null) {
          keyed[oldKey] = oldVKids[i];
        }
      }

      while (newHead <= newTail) {
        oldKey = getKey((oldVKid = oldVKids[oldHead]));
        newKey = getKey(
          (newVKids[newHead] = maybeVNode(newVKids[newHead], oldVKid))
        );

        if (
          newKeyed[oldKey] ||
          (newKey != null && newKey === getKey(oldVKids[oldHead + 1]))
        ) {
          if (oldKey == null) {
            node.removeChild(oldVKid.node);
          }
          oldHead++;
          continue
        }

        if (newKey == null || oldVNode.type === SSR_NODE) {
          if (oldKey == null) {
            patch(
              node,
              oldVKid && oldVKid.node,
              oldVKid,
              newVKids[newHead],
              listener,
              isSvg
            );
            newHead++;
          }
          oldHead++;
        } else {
          if (oldKey === newKey) {
            patch(
              node,
              oldVKid.node,
              oldVKid,
              newVKids[newHead],
              listener,
              isSvg
            );
            newKeyed[newKey] = true;
            oldHead++;
          } else {
            if ((tmpVKid = keyed[newKey]) != null) {
              patch(
                node,
                node.insertBefore(tmpVKid.node, oldVKid && oldVKid.node),
                tmpVKid,
                newVKids[newHead],
                listener,
                isSvg
              );
              newKeyed[newKey] = true;
            } else {
              patch(
                node,
                oldVKid && oldVKid.node,
                null,
                newVKids[newHead],
                listener,
                isSvg
              );
            }
          }
          newHead++;
        }
      }

      while (oldHead <= oldTail) {
        if (getKey((oldVKid = oldVKids[oldHead++])) == null) {
          node.removeChild(oldVKid.node);
        }
      }

      for (var i in keyed) {
        if (newKeyed[i] == null) {
          node.removeChild(keyed[i].node);
        }
      }
    }
  }

  return (newVNode.node = node)
};

var propsChanged = (a, b) => {
  for (var k in a) if (a[k] !== b[k]) return true
  for (var k in b) if (a[k] !== b[k]) return true
};

var maybeVNode = (newVNode, oldVNode) =>
  newVNode !== true && newVNode !== false && newVNode
    ? typeof newVNode.tag === "function"
      ? ((!oldVNode ||
          oldVNode.memo == null ||
          propsChanged(oldVNode.memo, newVNode.memo)) &&
          ((oldVNode = newVNode.tag(newVNode.memo)).memo = newVNode.memo),
        oldVNode)
      : newVNode
    : text("");

var recycleNode = (node) =>
  node.nodeType === TEXT_NODE
    ? text(node.nodeValue, node)
    : createVNode(
        node.nodeName.toLowerCase(),
        EMPTY_OBJ,
        map.call(node.childNodes, recycleNode),
        SSR_NODE,
        node
      );

var createVNode = (tag, props, children, type, node) => ({
  tag,
  props,
  key: props.key,
  children,
  type,
  node,
});

var text = (value, node) =>
  createVNode(value, EMPTY_OBJ, EMPTY_ARR, TEXT_NODE, node);

var h = (tag, props, children = EMPTY_ARR) =>
  createVNode(tag, props, isArray(children) ? children : [children]);

var app = ({
  init = EMPTY_OBJ,
  view,
  subscriptions,
  dispatch = id,
  node,
}) => {
  var vdom = node && recycleNode(node);
  var subs = [];
  var state;
  var busy;

  var setState = (newState) => {
    if (state !== newState) {
      state = newState;
      if (subscriptions) {
        subs = patchSubs(subs, subscriptions(state), dispatch);
      }
      if (view && !busy) enqueue(render, (busy = true));
    }
  };

  var render = () =>
    (node = patch(
      node.parentNode,
      node,
      vdom,
      (vdom = view(state)),
      listener,
      (busy = false)
    ));

  var listener = function (event) {
    dispatch(this.events[event.type], event);
  };

  return (
    (dispatch = dispatch((action, props) =>
      typeof action === "function"
        ? dispatch(action(state, props))
        : isArray(action)
        ? typeof action[0] === "function"
          ? dispatch(action[0], action[1])
          : action
              .slice(1)
              .map(
                (fx) => fx && fx !== true && fx[0](dispatch, fx[1]),
                setState(action[0])
              )
        : action == null
        ? patchSubs(subs, EMPTY_ARR, (dispatch = id))
        : setState(action)
    ))(init),
    dispatch
  )
};

const EMPTY_ARR$1 = [];
const EMPTY_OBJ$1 = {};

const tag = (tag) => (
  props = EMPTY_OBJ$1,
  children = props.tag != null || Array.isArray(props) ? props : EMPTY_ARR$1
) => h(tag, props === children ? EMPTY_OBJ$1 : props, children);

const a = tag("a");
const h1 = tag("h1");
const li = tag("li");
const ul = tag("ul");
const main = tag("main");
const span = tag("span");
const input = tag("input");
const button = tag("button");
const footer = tag("footer");
const header = tag("header");
const section = tag("section");

const _focuser = (_, options) => {
    requestAnimationFrame(() => {
        let elem = document.querySelector(options.selector);
        if (elem === null || !("focus" in elem))
            return;
        elem.focus();
    });
};
const focuser = (selector) => [
    _focuser,
    { selector },
];
const _dispatcher = (dispatch, opts) => dispatch(opts.action, opts.payload);
const dispatcher = (action, payload) => [
    _dispatcher,
    {
        action,
        payload,
    },
];
const _onhashchange = (dispatch, options) => {
    const handler = () => dispatch(options.action, window.location.hash);
    requestAnimationFrame(handler);
    addEventListener("hashchange", handler);
    return () => removeEventListener("hashchange", handler);
};
const onhashchange = (action) => [_onhashchange, { action }];
const _lspersister = (_, options) => {
    requestAnimationFrame(() => localStorage.setItem(options.key, JSON.stringify(options.watch)));
    return () => { };
};
const lspersister = (key, watch) => [_lspersister, { key, watch }];
const _lsloader = (dispatch, options) => {
    let data = localStorage.getItem(options.key);
    if (!data)
        return;
    let parsed = JSON.parse(data);
    dispatch(options.action, parsed);
};
const lsloader = (key, action) => [_lsloader, { key, action }];

const withTargetValue = action => (state, event) => {
    if (!event.target)
        return state;
    let value = event.target.value;
    if (!value)
        return state;
    return [action, value];
};
const withEnterKey = action => (state, event) => (event.key === "Enter" ? [action, event] : state);
const withFocuser = (action, selector) => (state, payload) => [
    state,
    dispatcher(action, payload),
    focuser(selector),
];

const textInput = (props) => input({
    ...props,
    type: "text",
    value: props.value,
    oninput: withTargetValue(props.oninput),
    onkeypress: props.ondone && withEnterKey(props.ondone),
});
const list = (props) => ul(props.items.map((x, i) => li(props.propfn(x, i), props.render(x, i))));
const editable = ({ editing, ...rest }, content) => (editing ? textInput({ ...rest, onblur: rest.ondone }) : content);

const init = () => "";
const wire = (params) => {
    let { get, set, onadd } = params;
    const AddItem = state => {
        let value = get(state);
        if (!value)
            return state;
        state = set(state, "");
        state = onadd(state, value);
        return state;
    };
    const InputNewItem = (state, value) => set(state, value);
    return {
        model: (state) => ({
            value: get(state),
            AddItem,
            InputNewItem,
        }),
    };
};
const view = (model) => [
    textInput({
        value: model.value,
        oninput: model.InputNewItem,
        ondone: model.AddItem,
        placeholder: "What do you need to do?",
    }),
    button({ onclick: model.AddItem }, text("+")),
];

const todoItem = (props) => editable({
    id: "todo-item-input",
    editing: props.editing,
    value: props.text,
    oninput: props.oninput,
    ondone: props.ondone,
}, [
    input({
        type: "checkbox",
        checked: props.checked,
        oninput: props.ontoggle,
    }),
    span({
        onclick: withFocuser(props.onedit, "#todo-item-input"),
        class: {
            done: props.checked,
        },
    }, text(props.text)),
    button({ onclick: props.ondelete }, text("X")),
]);

const init$1 = () => ({
    items: [],
    done: [],
    editing: null,
});
const toggle = (state, index) => {
    let done = [...state.done];
    done[index] = !done[index];
    return { ...state, done };
};
const dlete = (state, index) => {
    let items = [...state.items];
    let done = [...state.done];
    items.splice(index, 1);
    done.splice(index, 1);
    return { ...state, items, done };
};
const startEditing = (state, index) => ({
    ...state,
    editing: index,
});
const stopEditing = state => ({
    ...state,
    editing: null,
});
const inputEditing = (state, input) => {
    if (state.editing === null)
        return state;
    let items = [...state.items];
    items[state.editing] = input;
    return { ...state, items };
};
const addItem = (state, itemText) => ({
    ...state,
    items: [itemText, ...state.items],
    done: [false, ...state.done],
});
const hasItems = state => !!state.items.length;
const areAllDone = state => state.done.reduce((all, me) => all && me, true);
const setAllDone = (state, value) => ({
    ...state,
    done: state.done.map(() => value),
});

const init$2 = init$1;
const wire$1 = ({ get, set }) => {
    const globalize = (f) => (state, data) => set(state, f(get(state), data));
    return {
        model: (state) => ({
            ...get(state),
            Toggle: globalize(toggle),
            Delete: globalize(dlete),
            StartEditing: globalize(startEditing),
            StopEditing: globalize(stopEditing),
            InputEditing: globalize(inputEditing),
            SetAllDone: globalize(setAllDone),
        }),
        addItem: globalize(addItem),
    };
};
const view$1 = ({ filter, ...model }) => list({
    items: model.items,
    propfn: (_, index) => ({
        hidden: (filter === "complete" && !model.done[index]) ||
            (filter === "active" && model.done[index]),
    }),
    render: (itemText, index) => todoItem({
        text: itemText,
        checked: model.done[index],
        editing: model.editing === index,
        ontoggle: [model.Toggle, index],
        onedit: [model.StartEditing, index],
        oninput: model.InputEditing,
        ondone: model.StopEditing,
        ondelete: [model.Delete, index],
    }),
});
const checkAll = (model) => {
    let allDone = areAllDone(model);
    return input({
        type: "checkbox",
        style: { visibility: hasItems(model) ? "visible" : "hidden" },
        checked: allDone,
        oninput: [model.SetAllDone, !allDone],
    });
};

const init$3 = () => "all";
const wire$2 = ({ get, set }) => {
    const HandleHashChange = (state, hash) => set(state, hash === "#active"
        ? "active"
        : hash === "#complete"
            ? "complete"
            : "all");
    return {
        model: (state) => ({
            filter: get(state),
            HandleHashChange,
        }),
        getFilter: get,
    };
};
const view$2 = (model) => ul({ class: "filters" }, [
    li(a({
        href: "#all",
        class: {
            current: model.filter === "all",
        },
    }, text("All"))),
    li(a({
        href: "#complete",
        class: {
            current: model.filter === "complete",
        },
    }, text("Complete"))),
    li(a({
        href: "#active",
        class: {
            current: model.filter === "active",
        },
    }, text("Active"))),
]);
const subs = (model) => [
    onhashchange(model.HandleHashChange),
];

const todoList = wire$1({
    get: (state) => state.list,
    set: (state, list) => ({ ...state, list }),
});
const addItem$1 = wire({
    get: (state) => state.newItem,
    set: (state, newItem) => ({ ...state, newItem }),
    onadd: todoList.addItem,
});
const filter = wire$2({
    get: (state) => state.filter,
    set: (state, filter) => ({ ...state, filter }),
});
const LoadListItems = (state, list) => ({
    ...state,
    list,
});
let node = document.getElementById("app");
node &&
    app({
        node,
        init: [
            {
                newItem: init(),
                list: init$2(),
                filter: init$3(),
            },
            lsloader("list-items", LoadListItems),
            focuser(".newitementry input[type=text]"),
        ],
        view: state => main([
            header(h1(text("Todo App"))),
            main([
                section({ class: "newitementry" }, [
                    checkAll(todoList.model(state)),
                    ...view(addItem$1.model(state)),
                ]),
                section({ class: "itemlist" }, view$1({
                    ...todoList.model(state),
                    filter: filter.getFilter(state),
                })),
                footer([view$2(filter.model(state))]),
            ]),
        ]),
        subscriptions: state => [
            lspersister("list-items", state.list),
            ...subs(filter.model(state)),
        ],
    });
