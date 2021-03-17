import {
    Action,
    Dispatch,
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

type LSPersisterOptions = {
    key: string
    watch: any
}
const _lspersister: SubscriptionController<LSPersisterOptions> = (
    _,
    options
) => {
    requestAnimationFrame(() =>
        localStorage.setItem(options.key, JSON.stringify(options.watch))
    )
    return () => {}
}

export const lspersister = (
    key: string,
    watch: any
): Subscription<LSPersisterOptions> => [_lspersister, { key, watch }]

type LSLoaderOptions<S = any, X = any> = {
    key: string
    action: Action<S, X>
}

const _lsloader: EffectRunner<LSLoaderOptions> = <S, X>(
    dispatch: Dispatch,
    options: LSLoaderOptions<S, X>
) => {
    let data = localStorage.getItem(options.key)
    if (!data) return
    let parsed = JSON.parse(data) as X
    dispatch(options.action, parsed)
}

export const lsloader = <S, X>(
    key: string,
    action: Action<S, X>
): Effect<LSLoaderOptions<S, X>> => [_lsloader, { key, action }]
