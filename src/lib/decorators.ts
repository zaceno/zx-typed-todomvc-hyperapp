import { Action } from "hyperapp"
import { focuser, dispatcher, ActionWithPayload} from "./io"

//Utility type for defining action decorators
type ActionDecorator<P, Q = P> = <S>(action: Action<S, P>) => Action<S, Q>

export const withTargetValue: ActionDecorator<string, Event> = action => (
    state,
    event
) => {
    if (!event.target) return state
    let value = (event.target as HTMLInputElement).value
    if (!value) return state
    return [action, value]
}

export const withEnterKey: ActionDecorator<KeyboardEvent> = action => (
    state,
    event
) => (event.key === "Enter" ? [action, event] : state)

export const withFocuser = <S>(
    action: Action<S, any> | ActionWithPayload<S , any>,
    selector: string
): Action<S> => (state, payload) => [
    state,
    dispatcher(action, payload),
    focuser(selector),
]
