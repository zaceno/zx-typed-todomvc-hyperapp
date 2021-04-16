import {
    Action,
    PropList,
    MaybeVDOM,
    ValidateCustomPayloads,
} from "hyperapp"
import { withTargetValue, withEnterKey } from "./decorators"
import { input, ul, li } from "./html"



export type TextInputProps<S> = {
    value: string
    oninput: Action<S, string>
    ondone?: Action<S, any>
} & {[_:string]: any}

export const textInput = <S>(
    props: TextInputProps<S>
) =>
    input({
        ...props,
        type: "text",
        value: props.value,
        oninput: withTargetValue(props.oninput),
        onkeypress: props.ondone && withEnterKey(props.ondone),
    })

type ListProps<S, T> = {
    items: T[]
    propfn: (x: T, i: number) => PropList<S>,
    render: (x: T, i: number) => MaybeVDOM<S> | MaybeVDOM<S>[]
}
export const list = <S, T>(props: ListProps<S, T>) =>
    ul(props.items.map((x, i) => li(props.propfn(x, i), props.render(x, i))))

export type EditableProps<S> = TextInputProps<S> & { editing: boolean }

export const editable = <S, X>(
    {
        editing,
        value,
        oninput,
        ondone,
        ...rest
    }: EditableProps<S> & ValidateCustomPayloads<S, X>,
    content: MaybeVDOM<S> | MaybeVDOM<S>[]
) =>
    editing
        ? textInput({ ...rest, value, oninput, onblur: ondone })
        : content
