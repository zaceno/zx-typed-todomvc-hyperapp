import {
    Action,
    Effect,
    Dispatch,
    Subscription,
    Unsubscribe,
} from "hyperapp"

export type ActionWithPayload<S, X=any> = readonly [Action<S, X>, X]

const _focuser = (_: any, selector: string) => {
    requestAnimationFrame(() => {
        let elem = document.querySelector(selector)
        if (elem === null || !("focus" in elem)) return
        ;(elem as HTMLElement).focus()
    })
}

export const focuser = (selector: string):Effect<any, string> => [
    _focuser,
    selector,
]


type DispatcherOpts<S> = {
    action: ActionWithPayload<S> | Action<S>
    payload?: any
}

const _dispatcher = <S>(dispatch:Dispatch<S>, opts: DispatcherOpts<S>) =>
    dispatch(opts.action, opts.payload)

export type ValidReaction<S,A, X> = A extends ActionWithPayload<S, infer Y> ? ActionWithPayload<S,Y> : Action<S,X>

export const dispatcher = <S, A, X>(
    action: A & ValidReaction<S, A, X> ,
    payload?: X
): Effect<S, DispatcherOpts<S>> => [
    _dispatcher,
    {
        action,
        payload,
    },
]

type OnHashChangeOptions<S> = { action: Action<S, string> }

const _onhashchange = <S>(dispatch:Dispatch<S>, options:OnHashChangeOptions<S>):Unsubscribe => {
    const handler = () => dispatch(options.action, window.location.hash)
    requestAnimationFrame(handler)
    addEventListener("hashchange", handler)
    return () => removeEventListener("hashchange", handler)
}

export const onhashchange = <S>(
    action: Action<S, string>
): Subscription<S, OnHashChangeOptions<S>> => [_onhashchange, { action }]

type LSPersisterOptions = {
    key: string
    watch: any
}
const _lspersister = (
    _:any,
    options: LSPersisterOptions
):Unsubscribe => {
    requestAnimationFrame(() =>
        localStorage.setItem(options.key, JSON.stringify(options.watch))
    )
    return () => {}
}

export const lspersister = <S>(
    key: string,
    watch: any
): Subscription<S, LSPersisterOptions> => [_lspersister, { key, watch }]

type LSLoaderOptions<S = any, X = any> = {
    key: string
    action: Action<S, X>
}

const _lsloader = <S, X>(
    dispatch: Dispatch<S>,
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
): Effect<S, LSLoaderOptions<S, X>> => [_lsloader, { key, action }]


