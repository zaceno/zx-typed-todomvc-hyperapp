import { Action } from "hyperapp"
import { textInput, TextInputProps } from "./lib/view"
import { button, text } from "@hyperapp/html"

export type State = string

export const init = (): State => ""

type WireProps<S> = {
    get: (s: S) => State
    set: (s: S, x: State) => S
    onadd: (s: S, x: string) => S
}

type Model<S> = {
    value: State
    InputNewItem: Action<S, string>
    AddItem: Action<S, any>
}

export const wire = <S>(params: WireProps<S>) => {
    let { get, set, onadd } = params

    const AddItem: Action<S> = state => {
        let value = get(state)
        if (!value) return state
        state = set(state, "")
        state = onadd(state, value)
        return state
    }
    const InputNewItem: Action<S, string> = (state, value) => set(state, value)

    return {
        model: (state: S): Model<S> => ({
            value: get(state),
            AddItem,
            InputNewItem,
        }),
    }
}

export const view = <S>(model: Model<S>) => [
    textInput({
        value: model.value,
        oninput: model.InputNewItem,
        ondone: model.AddItem,
        placeholder: "What do you need to do?",
    }),
    button({ onclick: model.AddItem }, text("+")),
]
