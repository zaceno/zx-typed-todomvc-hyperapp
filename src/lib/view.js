import { withTargetValue, withEnterKey } from "./decorators.js"
import { input, ul, li } from "./html.js"
/**
 * @template S
 * @typedef {import('hyperapp').ElementVNode<S>} ElementVNode
 */
/**
 * @template S
 * @typedef {import('hyperapp').Props<S>} Props
 */
/**
 * @template S,X
 * @typedef {import('hyperapp').Action<S,X>} Action
 */
/**
 * @template S
 * @typedef {Action<S, any> | [Action<S, any>, any]} Handler
 */
/**
 * @template S,X
 * @typedef {import('hyperapp').CustomPayloads<S,X>} CustomPayloads
 */
/**
 * @template S
 * @typedef {Omit<Props<S>, 'oninput' | 'value' | 'type' | 'onkeypress'> & {
 *    value: string,
 *    oninput: Action<S,string>,
 *    ondone: Handler<S>
 * }} TextInputProps
 */

/** @type {<S>(props:TextInputProps<S>) => ElementVNode<S>} */
export const textInput = ({ value, oninput, ondone, ...rest }) =>
  input({
    type: "text",
    value: value,
    oninput: withTargetValue(oninput),
    onkeypress: withEnterKey(ondone),
    ...rest,
  })

/**
 * @template S
 * @typedef {import('./html.js').Content<S>} Content
 */
/**
 * @template T,S
 * @typedef {(item: T, index: number) => Content<S>} RenderFunc */
/**
 * @template T,S
 * @typedef {(item: T, index: number) => import('hyperapp').Props<S>} PropFunc */
/** @type {<S, T>(props: {items: T[], render: RenderFunc<T,S>, props?: PropFunc<T,S>}) => ElementVNode<S>} */
export const list = ({ items, render, props = () => ({}) }) =>
  ul(
    {},
    items.map((item, index) => li(props(item, index), render(item, index)))
  )

/**
 * @template S
 * @typedef _EditableProps
 * @property {string} value,
 * @property {boolean} editing,
 * @property {Handler<S>} ondone,
 * @property {Action<S,string>} oninput,
 */

/**
 * @template S
 * @typedef {Omit<Props<S>, 'ondone' | 'oninput' | 'value' | 'editing'> & _EditableProps<S>} EditableProps
 */
/** @type {<S,X>(props: EditableProps<S> & CustomPayloads<S,X>, content:Content<S>) => Content<S>} */
export const editable = (
  { editing, value, ondone, oninput, ...rest },
  content
) =>
  editing
    ? textInput({ value, ondone, oninput, onblur: ondone, ...rest })
    : content
