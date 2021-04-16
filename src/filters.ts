import { Action , VDOM } from "hyperapp"
import { text, ul, li, a } from "./lib/html"
import { onhashchange } from "./lib/io"

export type State = "all" | "complete" | "active"

export const init = () => "all" as const

type WireProps<S> = {
    get: (state: S) => State
    set: (state: S, x: State) => S
}
type Model<S> = {
    filter: State
    HandleHashChange: Action<S, string>
}
export const wire = <S>({ get, set }: WireProps<S>) => {
    const HandleHashChange: Action<S, string> = (state, hash) =>
        set(
            state,
            hash === "#active"
                ? "active"
                : hash === "#complete"
                ? "complete"
                : "all"
        )

    return {
        model: (state: S): Model<S> => ({
            filter: get(state),
            HandleHashChange,
        }),
        getFilter: get,
    }
}

export const view = <S>(model: Model<S>):VDOM<S> =>
    ul({ class: "filters" }, [
        li(
            a(
                {
                    href: "#all",
                    class: {
                        current: model.filter === "all",
                    },
                },
                text("All")
            )
        ),
        li(
            a(
                {
                    href: "#complete",
                    class: {
                        current: model.filter === "complete",
                    },
                },
                text("Complete")
            )
        ),
        li(
            a(
                {
                    href: "#active",
                    class: {
                        current: model.filter === "active",
                    },
                },
                text("Active")
            )
        ),
    ])

export const subs = <S>(model: Model<S>) => [
    onhashchange(model.HandleHashChange),
]
