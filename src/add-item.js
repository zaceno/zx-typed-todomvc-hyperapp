import { textInput } from "./lib/view.js"
import { button, text } from "./lib/html.js"
/** @template S,X @typedef {import('hyperapp').Action<S,X>} Action */

/**
 * @typedef {string} AddItemState
 */

/**
 * @template State
 * @typedef AddItemModel
 * @property {string} value
 * @property {Action<State, string>} Input
 * @property {Action<State, any>} Add
 */

/**
 * @template State
 * @typedef AddItemWireProps
 * @property {(state:State) => AddItemState} get
 * @property {(state:State, x:AddItemState) => State} set
 * @property {(state:State, x:AddItemState) => State} onadd
 */

/**
 * @template State
 * @typedef AddItemWiredInstance
 * @property {(state:State) => AddItemModel<State>} model
 */

/** @type {() => AddItemState} */
export const init = () => ""

/** @type {<S>(props:AddItemWireProps<S>) => AddItemWiredInstance<S>} */
export const wire = ({ get, set, onadd }) => {
  /** @type {<S>(state:S, value:string) => S}*/
  const Input = (state, value) => set(state, value)

  /** @type {<S>(state:S) => S}*/
  const Add = state => {
    let item = get(state)
    if (!item) return state
    return onadd(set(state, ""), item)
  }

  return { model: state => ({ value: get(state), Input, Add }) }
}
/** @type {<S>(props:AddItemModel<S>) => import('hyperapp').ElementVNode<S>[]} */
export const view = ({ value, Input, Add }) => [
  textInput({
    value,
    oninput: Input,
    ondone: Add,
    placeholder: "What do you need to do?",
  }),
  button({ onclick: Add }, text("+")),
]
