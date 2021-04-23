import { EditableProps, editable } from "./lib/view"
import { EventActions, ValidateCustomPayloads } from "hyperapp"
import { input, span, button, text } from "./lib/html"
import { withFocuser } from "./lib/decorators"

export type TodoItemProps<S> = {
    checked: boolean
    text: string
    ontoggle: Required<EventActions<S>>['oninput'],
    onedit: Required<EventActions<S>>['onclick'],
    ondelete: Required<EventActions<S>>['onclick'],    
} & Omit<EditableProps<S>, 'value'>

export const todoItem = <S, P>(props: ValidateCustomPayloads<S,P> & TodoItemProps<S>) => editable<S>(
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
        }, text(props.text)),
        button({ onclick: props.ondelete }, text("X")),
    ]
)
