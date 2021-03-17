export type State = {
    items: string[]
    done: boolean[]
    editing: number | null
}

export const init = (): State => ({
    items: [],
    done: [],
    editing: null,
})

export type Transform<X> = (state: State, x: X) => State

export type Query<R> = (state: State) => R

export const toggle: Transform<number> = (state, index) => {
    let done = [...state.done]
    done[index] = !done[index]
    return { ...state, done }
}

export const dlete: Transform<number> = (state, index) => {
    let items = [...state.items]
    let done = [...state.done]
    items.splice(index, 1)
    done.splice(index, 1)
    return { ...state, items, done }
}

export const startEditing: Transform<number> = (state, index) => ({
    ...state,
    editing: index,
})

export const stopEditing: Transform<any> = state => ({
    ...state,
    editing: null,
})

export const inputEditing: Transform<string> = (state, input) => {
    if (state.editing === null) return state
    let items = [...state.items]
    items[state.editing] = input
    return { ...state, items }
}

export const addItem: Transform<string> = (state, itemText) => ({
    ...state,
    items: [itemText, ...state.items],
    done: [false, ...state.done],
})

export const hasItems: Query<boolean> = state => !!state.items.length

export const areAllDone: Query<boolean> = state =>
    state.done.reduce((all, me) => all && me, true)

export const setAllDone: Transform<boolean> = (state, value) => ({
    ...state,
    done: state.done.map(() => value),
})
