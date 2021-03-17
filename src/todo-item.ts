import { EditableProps, editable } from "./lib/view"
import { EventHandlers, ValidateCustomPayloads } from "hyperapp"
import { input, span, button, text } from "@hyperapp/html"
import { withFocuser } from "./lib/decorators"

export type TodoItemProps = {
    checked: boolean
    text: string
    editing: EditableProps["editing"]
    oninput: EditableProps["oninput"]
    ondone: EditableProps["ondone"]
    ontoggle: EventHandlers["oninput"]
    onedit: EventHandlers["onclick"]
    ondelete: EventHandlers["onclick"]
}

export const todoItem = <X>(props: ValidateCustomPayloads<X> & TodoItemProps) =>
    editable(
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
            span(
                {
                    onclick: withFocuser(props.onedit, "#todo-item-input"),
                    class: {
                        done: props.checked,
                    },
                },
                text(props.text)
            ),
            button({ onclick: props.ondelete }, text("X")),
        ]
    )
