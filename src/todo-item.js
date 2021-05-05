import { text, span, button, input } from "./lib/html.js"
import { editable } from "./lib/view.js"
import {withFocus} from './lib/decorators.js'

/** @template S   @typedef {import('./lib/view.js').Content<S>}     Content */
/** @template S   @typedef {import('./lib/view.js').Handler<S>}     Handler */
/** @template S,X @typedef {import('hyperapp').CustomPayloads<S,X>} CustomPayloads */

/** 
--- TodoItemProps definition ---
@template S
@typedef {{
  text: string,
  done: boolean,
  ontoggle:    Handler<S>,
  ondelete:    Handler<S>,
  oneditstart: Handler<S>,
  editing:     import('./lib/view.js').EditableProps<S>['editing'],
  oneditdone:  import('./lib/view.js').EditableProps<S>['ondone'],
  oneditinput: import('./lib/view.js').EditableProps<S>['oninput'],
}} TodoItemProps
*/

/** @type {<S,X>(props: TodoItemProps<S> & CustomPayloads<S,X>) => Content<S>} */
export const todoItem = props =>
  editable(
    {
      editing: props.editing,
      value: props.text,
      oninput: props.oneditinput,
      ondone: props.oneditdone,
      id: 'item-editor'
    },
    [
      input({
        type: "checkbox",
        checked: props.done,
        oninput: props.ontoggle,
      }),
      span(
        {
          class: { done: props.done },
          onclick: withFocus(props.oneditstart, '#item-editor')
        },
        text(props.text)
      ),
      button({ onclick: props.ondelete }, text("X")),
    ]
  )
