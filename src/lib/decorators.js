import {dispatcher, focuser} from './io.js'
/** @template S,X @typedef {import('hyperapp').Action<S,X>} Action */

/** @type {<S>(a:Action<S, string>) => Action<S, Event>} */
export const withTargetValue = action => (state, event) => [
  action,
  /** @type {HTMLInputElement} */ (event.target).value,
]

/** @type {<S,X>(action: Action<S, any> | [Action<S,X>,X]) => Action<S, KeyboardEvent> } */
export const withEnterKey = action => (state, event) => {
  if (event.key !== "Enter") return state
  return action
}

/**
@type {<S,P>(action:Action<S,P> | [Action<S,any>, any], selector:string) => Action<S,P>}
*/
export const withFocus = (action, selector) => (state, payload) => [
  state,
  dispatcher(action, payload),
  focuser(selector)
]
