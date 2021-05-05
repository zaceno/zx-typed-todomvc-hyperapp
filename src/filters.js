import { ul, li, a, text } from "./lib/html.js"
import { onhashchange } from "./lib/io.js"
/** @template S,X @typedef {import('hyperapp').Action<S,X>} Action */

/**
 * @typedef {'all' | 'completed' | 'active' } FilterState
 */

/** @type {() => FilterState} */
export const init = () => "all"

/**
 * @template S
 * @typedef FilterModel
 * @property {FilterState} value
 * @property {Action<S,string>} Handle
 */

/**
 * @template State
 * @typedef FilterWireProps
 * @property {(state:State) => FilterState} get
 * @property {(state:State, x:FilterState) => State} set
 */

/**
 * @template State
 * @typedef FilterWiredInstance
 * @property {(state:State) => FilterModel<State>} model
 * @property {(state:State) => FilterState} getFilter
 */

/** @type {<S>(props:FilterWireProps<S>) => FilterWiredInstance<S>} */
export const wire = ({ get, set }) => {
  /** @type {<S>(state:S, hash:string) => S} */
  const Handle = (state, hash) =>
    set(
      state,
      hash === "#active"
        ? "active"
        : hash === "#completed"
        ? "completed"
        : "all"
    )
  return {
    model: state => ({
      value: get(state),
      Handle,
    }),
    getFilter: get,
  }
}

/** @type {<S>(model:FilterModel<S>) => import('hyperapp').ElementVNode<S>} */
export const view = model =>
  ul({ class: "filters" }, [
    li(
      a(
        { href: "#all", class: { current: model.value === "all" } },
        text("All")
      )
    ),
    li(
      a(
        { href: "#completed", class: { current: model.value === "completed" } },
        text("Completed")
      )
    ),
    li(
      a(
        { href: "#active", class: { current: model.value === "active" } },
        text("Active")
      )
    ),
  ])

/** @type {<S>(model:FilterModel<S>) => import('hyperapp').Subscription<S>[]} */
export const subs = model => [onhashchange(model.Handle)]
