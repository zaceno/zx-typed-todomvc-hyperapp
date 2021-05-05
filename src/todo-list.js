import { input, p, button, text } from "./lib/html.js"
import { list } from "./lib/view.js"
import { todoItem } from "./todo-item.js"
import * as todos from "./todo-logic.js"
/** @template S,X @typedef {import('hyperapp').Action<S,X>} Action */
/** @template S @typedef {import('hyperapp').ElementVNode<S>} ElementVNode */
/** @typedef {import('./todo-logic.js').TodoListState} TodoListState */
/** @typedef {import('./filters.js').FilterState} FilterState */
/** @template X @typedef {import('./todo-logic.js').TodoListTransform<X>} TodoListTransform */

/**
 * @template State
 * @typedef TodoListModelActions
 * @property {Action<State, number>}  Toggle
 * @property {Action<State, number>}  Delete
 * @property {Action<State, number>}  EditStart
 * @property {Action<State, any>}     EditStop
 * @property {Action<State, string>}  EditInput
 * @property {Action<State, boolean>} SetAllDone
 * @property {Action<State, any>}     ClearComplete
 */

/**
 * @template State
 * @typedef {TodoListState & TodoListModelActions<State>} TodoListModel
 */

/**
 * @template State
 * @typedef TodoListWireProps
 * @property {(state:State) => TodoListState} get
 * @property {(state:State, x:TodoListState) => State} set
 */

/**
 * @template State
 * @typedef TodoListWiredInstance
 * @property {(state:State) => TodoListModel<State>} model
 * @property {(state:State, itemText:string) => State} addItem
 */

export const init = todos.init

/** @type {<S>(props:TodoListWireProps<S>) => TodoListWiredInstance<S>} */
export const wire = ({ get, set }) => {
  /** @type {<X>(f:TodoListTransform<X>) => <S>(s:S, x:X) => S} */
  const map = f => (state, x) => set(state, f(get(state), x))
  return {
    model: state => ({
      ...get(state),
      Toggle: map(todos.toggle),
      Delete: map(todos.dlete),
      EditStart: map(todos.editStart),
      EditStop: map(todos.editStop),
      EditInput: map(todos.editInput),
      SetAllDone: map(todos.setAllDone),
      ClearComplete: map(todos.clearComplete),
    }),
    addItem: map(todos.addItem),
  }
}

/** @type {<S>(model:TodoListModel<S>, filter:FilterState) => ElementVNode<S>} */
export const view = (model, filter) =>
  list({
    items: model.items,
    props: (_, index) => ({
      hidden:
        (filter === "completed" && !model.done[index]) ||
        (filter === "active" && model.done[index]),
    }),
    render: (itemText, index) =>
      todoItem({
        text: itemText,
        done: model.done[index],
        editing: model.editing === index,
        ontoggle: [model.Toggle, index],
        ondelete: [model.Delete, index],
        oneditstart: [model.EditStart, index],
        oneditdone: model.EditStop,
        oneditinput: model.EditInput,
      }),
  })

/** @type {<S>(model:TodoListModel<S>) => ElementVNode<S>} */
export const checkAll = model => {
  let allDone = todos.areAllDone(model)
  return input({
    type: "checkbox",
    style: { visibility: todos.isEmpty(model) ? "hidden" : "visible" },
    checked: allDone,
    oninput: [model.SetAllDone, !allDone],
  })
}

/** @type {<S>(model:TodoListModel<S>) => ElementVNode<S>} */
export const remainingCounter = model =>
  p(text(todos.countActive(model) + " items left"))

/** @type {<S>(model:TodoListModel<S>) => ElementVNode<S>} */
export const clearComplete = model =>
  button(
    {
      style: { visibility: todos.countDone(model) ? "visible" : "hidden" },
      onclick: model.ClearComplete,
    },
    text("Clear Completed")
  )

/** @type {<S>(model:TodoListModel<S>) => boolean} */
export const isEmpty = model => todos.isEmpty(model)
