import { app, Action } from "hyperapp"
import { text, h1, header, footer, section, main } from "@hyperapp/html"
import { focuser, lsloader, lspersister } from "./lib/io"
import * as AddItem from "./add-item"
import * as TodoList from "./todo-list"
import * as Filters from "./filters"

type State = {
    newItem: AddItem.State
    list: TodoList.State
    filter: Filters.State
}

const todoList = TodoList.wire({
    get: (state: State) => state.list,
    set: (state: State, list) => ({ ...state, list }),
})

const addItem = AddItem.wire({
    get: (state: State) => state.newItem,
    set: (state: State, newItem) => ({ ...state, newItem }),
    onadd: todoList.addItem,
})

const filter = Filters.wire({
    get: (state: State) => state.filter,
    set: (state: State, filter) => ({ ...state, filter }),
})

const LoadListItems: Action<State, TodoList.State> = (state, list) => ({
    ...state,
    list,
})

let node = document.getElementById("app")
node &&
    app({
        node,
        init: [
            {
                newItem: AddItem.init(),
                list: TodoList.init(),
                filter: Filters.init(),
            },
            lsloader("list-items", LoadListItems),
            focuser(".newitementry input[type=text]"),
        ],
        view: state =>
            main([
                header(h1(text("Todo App"))),
                main([
                    section({ class: "newitementry" }, [
                        TodoList.checkAll(todoList.model(state)),
                        ...AddItem.view(addItem.model(state)),
                    ]),
                    section(
                        { class: "itemlist" },
                        TodoList.view({
                            ...todoList.model(state),
                            filter: filter.getFilter(state),
                        })
                    ),
                    footer([Filters.view(filter.model(state))]),
                ]),
            ]),
        subscriptions: state => [
            lspersister("list-items", state.list),
            ...Filters.subs(filter.model(state)),
        ],
    })
