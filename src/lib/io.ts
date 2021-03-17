import {
    Action,
    Effect,
    EffectRunner,
    SubscriptionController,
    Subscription,
} from "hyperapp"

type FocuserOptions = { selector: string }

const _focuser: EffectRunner<FocuserOptions> = (_, options) => {
    requestAnimationFrame(() => {
        let elem = document.querySelector(options.selector)
        if (elem === null || !("focus" in elem)) return
        ;(elem as HTMLElement).focus()
    })
}
export const focuser = (selector: string): Effect<FocuserOptions> => [
    _focuser,
    { selector },
]

type DispatcherOpts = {
    action: Action<any, any> | readonly [Action<any, any>, any]
    payload?: any
}

const _dispatcher: EffectRunner<DispatcherOpts> = (dispatch, opts) =>
    dispatch(opts.action, opts.payload)

export const dispatcher = (
    action: DispatcherOpts["action"],
    payload?: DispatcherOpts["payload"]
): Effect<DispatcherOpts> => [
    _dispatcher,
    {
        action,
        payload,
    },
]

type OnHashChangeOptions<S = any> = { action: Action<S, string> }

const _onhashchange: SubscriptionController<OnHashChangeOptions> = (
    dispatch,
    options
) => {
    const handler = () => dispatch(options.action, window.location.hash)
    requestAnimationFrame(handler)
    addEventListener("hashchange", handler)
    return () => removeEventListener("hashchange", handler)
}

export const onhashchange = <S>(
    action: Action<S, string>
): Subscription<OnHashChangeOptions<S>> => [_onhashchange, { action }]
