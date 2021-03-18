import { Action } from "hyperapp"
import { input, p, text, button } from "@hyperapp/html"
import { list } from "./lib/view"
import { todoItem } from "./todo-item"
import * as todos from "./todo-logic"
import { State as FilterState } from "./filters"

export type State = todos.State

export const init = todos.init

type WireProps<S> = {
    get: (s: S) => State
    set: (s: S, x: State) => S
}

type Model<S> = State & {
    Toggle: Action<S, number>
    Delete: Action<S, number>
    StartEditing: Action<S, number>
    StopEditing: Action<S, any>
    InputEditing: Action<S, string>
    SetAllDone: Action<S, boolean>
    ClearComplete: Action<S, any>
}

type View<E = {}> = <S>(model: Model<S> & E) => any

export const wire = <S>({ get, set }: WireProps<S>) => {
    const globalize = <X>(f: todos.Transform<X>) => (state: S, data: X) =>
        set(state, f(get(state), data))

    return {
        model: (state: S): Model<S> => ({
            ...get(state),
            Toggle: globalize(todos.toggle),
            Delete: globalize(todos.dlete),
            StartEditing: globalize(todos.startEditing),
            StopEditing: globalize(todos.stopEditing),
            InputEditing: globalize(todos.inputEditing),
            SetAllDone: globalize(todos.setAllDone),
            ClearComplete: globalize(todos.clearComplete),
        }),
        addItem: globalize(todos.addItem),
    }
}

export const view: View<{ filter: FilterState }> = ({ filter, ...model }) =>
    list({
        items: model.items,
        propfn: (_, index) => ({
            hidden:
                (filter === "complete" && !model.done[index]) ||
                (filter === "active" && model.done[index]),
        }),
        render: (itemText, index) =>
            todoItem({
                text: itemText,
                checked: model.done[index],
                editing: model.editing === index,
                ontoggle: [model.Toggle, index],
                onedit: [model.StartEditing, index],
                oninput: model.InputEditing,
                ondone: model.StopEditing,
                ondelete: [model.Delete, index],
            }),
    })

export const checkAll: View = model => {
    let allDone = todos.areAllDone(model)
    return input({
        type: "checkbox",
        style: { visibility: todos.hasItems(model) ? "visible" : "hidden" },
        checked: allDone,
        oninput: [model.SetAllDone, !allDone],
    })
}

export const hasItems: View = model => todos.hasItems(model)

export const itemCount: View = model =>
    p(text(todos.countActive(model) + " items left"))

export const clearComplete: View = model => {
    return button(
        {
            style: {
                visibility: todos.countComplete(model) ? "visible" : "hidden",
            },
            onclick: model.ClearComplete,
        },
        text("Clear Complete")
    )
}
