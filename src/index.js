import './style.css'
import { app } from "hyperapp"
import { focuser, persister, loader } from "./lib/io.js"
import { text, section, main, header, footer, h1 } from "./lib/html.js"
import * as AddItem from "./add-item.js"
import * as TodoList from "./todo-list.js"
import * as Filters from "./filters.js"

/**
 * Define the State type for the entire app:
 *
 * @typedef State
 * @property {import('./add-item.js').AddItemState} newItem
 * @property {import('./todo-list.js').TodoListState} todos
 * @property {import('./filters.js').FilterState} filter
 */

const todos = TodoList.wire({
  /** @type {(state:State) => State['todos']} */
  get: state => state.todos,
  /** @type {(state:State, todos: State['todos']) => State} */
  set: (state, todos) => ({ ...state, todos }),
})

const newItem = AddItem.wire({
  /** @type {(state:State) => State['newItem']} */
  get: state => state.newItem,
  /** @type {(state:State, todos: State['newItem']) => State} */
  set: (state, newItem) => ({ ...state, newItem }),
  onadd: todos.addItem,
})

const filter = Filters.wire({
  /** @type {(state:State) => State['filter']} */
  get: state => state.filter,
  /** @type {(state:State, filter:State['filter']) => State} */
  set: (state, filter) => ({ ...state, filter }),
})

/** @type {(state:State, todos:State['todos']) => State} */
const LoadTodos = (state, todos) => ({ ...state, todos })

app({
  init: [
    {
      newItem: AddItem.init(),
      todos: TodoList.init(),
      filter: Filters.init(),
    },
    focuser(".newitementry input[type=text]"),
    loader("todos", LoadTodos),
  ],
  view: (/** @type {State} */ state) => {
    let todoModel = todos.model(state)
    let filterModel = filter.model(state)
    let newItemModel = newItem.model(state)
    let currentFilter = filter.getFilter(state)
    let isEmpty = TodoList.isEmpty(todoModel)
    return main([
      header(h1(text("Todo App"))),
      main([
        section({ class: "newitementry" }, [
          TodoList.checkAll(todoModel),
          ...AddItem.view(newItemModel),
        ]),
        section({ class: "itemlist" }, TodoList.view(todoModel, currentFilter)),
        footer(
          {
            style: {
              visibility: isEmpty ? "hidden" : "visible",
            },
          },
          [
            TodoList.remainingCounter(todoModel),
            Filters.view(filterModel),
            TodoList.clearComplete(todoModel),
          ]
        ),
      ]),
    ])
  },
  subscriptions: (/** @type {State}*/ state) => [
    ...Filters.subs(filter.model(state)),
    persister(state.todos, "todos"),
  ],
  node: document.getElementById("app"),
})
