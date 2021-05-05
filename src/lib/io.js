/** @template S   @typedef {import('hyperapp').Dispatch<S>}       Dispatch     */
/** @template S,X @typedef {import('hyperapp').Action<S,X>}       Action       */
/** @template S,X @typedef {import('hyperapp').Effect<S,X>}       Effect       */
/** @template S,X @typedef {import('hyperapp').Subscription<S,X>} Subscription */
/** @typedef {import('hyperapp').Unsubscribe}                     Unsubscribe  */

// ------------ FOCUSER EFFECT -------------

/** @type {<S>(d:Dispatch<S>, selector:string) => void} */
const _focuser = (_, selector) => {
  requestAnimationFrame(_ => {
    let el = document.querySelector(selector)
    if (!el) return
    ;/** @type {HTMLInputElement} */ (el).focus()
  })
}
/** @type {(selector:string) => Effect<any, string>} */
export const focuser = selector => [_focuser, selector]

// ---------- DISPATCHER EFFECT ----------

/**
 * @template S,P
 * @typedef DispatcherOptions
 * @property {Action<S,P> | [Action<S, any>, any]} action,
 * @property {P} payload
 */

/** @type {<S,P>(d:Dispatch<S>, options:DispatcherOptions<S,P>) => void} */
const _dispatcher = (dispatch, options) => {
  dispatch(options.action, options.payload)
}
/** @type {<S, A, P>(action: A extends [Action<S, infer X>, any] ? [Action<S,X>,X] : Action<S,P>, payload?: P) => Effect<S,DispatcherOptions<S,P>>} */
export const dispatcher = (action, payload) => [
  _dispatcher,
  {
    action,
    payload,
  },
]

// ------------ ONHASHCHANGE SUBSCRIPTION ----------

/**
 * @template S
 * @typedef OnHashChangeOptions
 * @property {Action<S, string>} action
 */

/** @type {<S>(dispatch:Dispatch<S>, options:OnHashChangeOptions<S>) => Unsubscribe} */
const _onhashchange = (dispatch, options) => {
  const handler = () => dispatch(options.action, location.hash)
  window.addEventListener("hashchange", handler)
  requestAnimationFrame(handler)
  return () => {
    window.removeEventListener("hashchange", handler)
  }
}
/** @type {<S>(action: Action<S, string>) => Subscription<S, OnHashChangeOptions<S>>} */
export const onhashchange = action => [_onhashchange, { action }]

// ------------ PERSISTER SUBSCRIPTION -------------

/**
 * @typedef PersisterOptions
 * @property {string} key
 * @property {any} watch
 */

/** @type {(_:any, options:PersisterOptions) => Unsubscribe} */
const _persister = (_, options) => {
  requestAnimationFrame(_ => {
    localStorage.setItem(options.key, JSON.stringify(options.watch))    
  })
  return () => {}
}
/** @type {(watch:any, key:string) => Subscription<any, PersisterOptions>} */
export const persister = (watch, key) => [_persister, { key, watch }]

// ---------------- LOADER EFFECT ------------------

/**
 * @template S
 * @typedef LoaderOptions
 * @property {Action<S, any>} action
 * @property {string} key
 */

/** @type {<S>(dispatch:Dispatch<S>, options:LoaderOptions<S>) => void} */
const _loader = (dispatch, options) => {
    let item = localStorage.getItem(options.key)
    if (!!item) dispatch(options.action, JSON.parse(item))
}
/** @type {<S>(key:string, action:Action<S,any>) => Effect<S, LoaderOptions<S>>} */
export const loader = (key, action) => [_loader, { key, action }]
