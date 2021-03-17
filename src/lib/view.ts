import {
    Action,
    VirtualContent,
    VirtualElementProps,
    ExtendVirtualElementProps,
    ValidateCustomPayloads,
} from "hyperapp"
import { withTargetValue, withEnterKey } from "./decorators"
import { input, ul, li } from "@hyperapp/html"

export type TextInputProps = ExtendVirtualElementProps<{
    value: string
    oninput: Action<any, string>
    ondone?: Action<any, any>
}>

export const textInput = <X>(
    props: ValidateCustomPayloads<X> & TextInputProps
) =>
    input({
        ...props,
        type: "text",
        value: props.value,
        oninput: withTargetValue(props.oninput),
        onkeypress: props.ondone && withEnterKey(props.ondone),
    })

type ListProps<T> = {
    items: T[]
    propfn: (x: T, i: number) => VirtualElementProps
    render: (x: T, i: number) => VirtualContent
}
export const list = <T>(props: ListProps<T>) =>
    ul(props.items.map((x, i) => li(props.propfn(x, i), props.render(x, i))))

export type EditableProps = TextInputProps & { editing: boolean }

export const editable = (
    { editing, ...rest }: EditableProps,
    content: VirtualContent
) => (editing ? textInput({ ...rest, onblur: rest.ondone }) : content)
