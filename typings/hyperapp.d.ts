declare module "hyperapp" {
    type Falsy = undefined | null | 0 | "" | false
    type Dispatchable<S> =
        | S
        | [S, ...Effect<any>[]]
        | [Action<S>, any]
        | Action<S>

    type Dispatch = <S>(action: Dispatchable<S>, p?: unknown) => void

    type EffectRunner<O> = (d: Dispatch, options: O) => void | Promise<any>

    type Effect<O> = readonly [EffectRunner<O>, O]

    type Action<S, P = any> = (state: S, payload: P) => Dispatchable<S>

    type ClassProp = string | { [_: string]: boolean } | ClassProp[]

    type StyleProp = {
        [K in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[K]
    } & { [x: number]: never } //prevent arrays

    type EventHandlers = {
        [K in keyof HTMLElementEventMap as `on${K}`]:
            | readonly [Action<any, any>, any]
            | Action<any, HTMLElementEventMap[K]>
    }
    type SpecificVirtualElementProps = {
        class?: ClassProp
        key?: string
        style?: StyleProp
        node?: never
    } & Partial<EventHandlers>

    type VirtualElementProps = SpecificVirtualElementProps & {
        [_: string]: any
    }

    type VirtualElement = {
        type: 1
        tag: string
        props: VirtualElementProps
        children: VirtualContent
        node: undefined | Node
    }

    type VirtualText = {
        type: 3
        tag: string
        props: {}
        children: []
        node: null | Text
        key: undefined
    }

    type VirtualNode = VirtualElement | VirtualText

    type VirtualChild = VirtualNode | Falsy | true

    type VirtualContent = VirtualChild | VirtualChild[]

    function h<S, X>(
        tag: string,
        props: ValidateCustomPayloads<X> & VirtualElementProps,
        children?: VirtualContent
    ): VirtualElement

    function text(t: string): VirtualText

    function app<S>(props: {
        node: Node
        init: Dispatchable<S>
        view: (state: S) => VirtualNode
        subscriptions?: (state: S) => (Subscription<any> | Falsy)[]
    }): Dispatch

    type Subscription<O> = readonly [SubscriptionController<O>, O]

    type SubscriptionController<O> = (
        dispatch: Dispatch,
        options: O
    ) => () => any

    // Utility types:

    //Validates a handler as a custom payload
    type ValidateACustomPayload<X> = X extends readonly [
        Action<infer S, infer P>,
        any
    ]
        ? readonly [Action<S, P>, P]
        : X

    // ensures that any values in a given type object, where the value is [Action, custom payload]
    // that the action can take the type of the custom payload
    type ValidateCustomPayloads<X> = {
        [K in keyof X]: ValidateACustomPayload<X[K]>
    }

    // define a set of properties that could be passed on as virtual element properties
    // except for a specific set of properties that override the default values.
    type ExtendVirtualElementProps<E> = Omit<
        SpecificVirtualElementProps,
        keyof E
    > &
        E & { [_: string]: any }
}
