import { EditableProps, editable } from "./lib/view"
import { EventActions, ValidateCustomPayloads } from "hyperapp"
import { input, span, button, text } from "./lib/html"
import { withFocuser } from "./lib/decorators"

export type TodoItemProps<S> = {
    checked: boolean
    text: string
    ontoggle: Exclude<EventActions<S>['oninput'], undefined>,
    onedit: Exclude<EventActions<S>['onclick'], undefined>,
    ondelete: Exclude<EventActions<S>['onclick'], undefined>,    
} & Omit<EditableProps<S>, 'value'>

export const todoItem = <S, P>(props: ValidateCustomPayloads<S,P> & TodoItemProps<S>) => editable(
    {
        id: "todo-item-input",
        editing: props.editing,
        value: props.text,
        oninput: props.oninput,
        ondone: props.ondone,
    },
    [
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
        }, text<S>(props.text)),
        button({ onclick: props.ondelete }, text("X")),
    ]
)
