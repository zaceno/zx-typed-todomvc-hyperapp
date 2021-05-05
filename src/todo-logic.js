/**
 * @typedef TodoListState
 * @property {string[]} items,
 * @property {boolean[]} done,
 * @property {number | null} editing,
 */

/** @template X @typedef {(state:TodoListState, x:X) => TodoListState} TodoListTransform */
/** @template R @typedef {(state:TodoListState) => R} TodoListQuery */

/** @type {() => TodoListState } */
export const init = () => ({
  items: [],
  done: [],
  editing: null,
})

/** @type {TodoListTransform<number>} */
export const toggle = (state, index) => {
  let done = [...state.done]
  done[index] = !done[index]
  return { ...state, done }
}

/** @type {TodoListTransform<number>} */
export const dlete = (state, index) => {
  let done = [...state.done]
  let items = [...state.items]
  done.splice(index, 1)
  items.splice(index, 1)
  return { ...state, done, items }
}

/** @type {TodoListTransform<number>} */
export const editStart = (state, index) => ({ ...state, editing: index })

/** @type {TodoListTransform<any>} */
export const editStop = state => ({
  ...state,
  editing: null,
})

/** @type {TodoListTransform<string>} */
export const editInput = (state, value) => {
  let items = [...state.items]
  items[state.editing] = value
  return { ...state, items }
}

/** @type {TodoListTransform<string>} */
export const addItem = (state, newItem) => ({
  ...state,
  items: [newItem, ...state.items],
  done: [false, ...state.done],
})

/** @type {TodoListTransform<boolean>} */
export const setAllDone = (state, done) => ({
  ...state,
  done: state.done.map(() => done),
})
/** @type {TodoListTransform<any>} */
export const clearComplete = state => ({
  ...state,
  items: state.items.filter((_, index) => !state.done[index]),
  done: state.done.filter(value => !value),
})

/** @type {TodoListQuery<boolean>} */
export const areAllDone = state =>
  state.done.reduce((all, me) => all && me, true)

/** @type {TodoListQuery<boolean>} */
export const isEmpty = state => state.items.length === 0

/** @type {TodoListQuery<number>} */
export const countActive = state => state.done.filter(x => !x).length

/** @type {TodoListQuery<number>} */
export const countDone = state => state.done.filter(x => x).length
