import {FilterValuesType, TodolistsType} from "../types/types";
import {v1} from "uuid";
import {todolistAPI} from "../api/todolistAPI";
import {Dispatch} from "redux";

const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'

export type RemoveTodolist = ReturnType<typeof RemoveTodolistAC>
export type AddTodolist = ReturnType<typeof AddTodolistAC>
type ChangeTodolistTitle = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilter = ReturnType<typeof changeTodolistFilterAC>

export type ActionTodoTypes = RemoveTodolist
    | AddTodolist
    | ChangeTodolistTitle
    | ChangeTodolistFilter
    | SetTotolistsType

export type TodolistsTypeDomain = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type TodolistDomainType = TodolistsTypeDomain & {filter: FilterValuesType}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionTodoTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todolist => todolist.id !== action.id)
        case 'ADD-TODOLIST':
            return [{id: action.newTodoId, title: action.title, filter: 'all', order: 1, addedDate: '18.05.2023'}, ...state]
        case CHANGE_TODOLIST_TITLE:
            return state.map(todolist => todolist.id === action.id
                ? {...todolist, title: action.title}
                : todolist)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(todolist => todolist.id === action.id
                ? {...todolist, filter: action.filter}
                : todolist)
        case "SET-TODOS":
            return action.todolists.map(el => ({...el, filter: 'all'}))
        default:
            return state
    }
}

export const changeTodolistTitleAC = (id: string, title: string) => ({type: CHANGE_TODOLIST_TITLE, id, title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
export const AddTodolistAC = (title: string) => ({type: 'ADD-TODOLIST', title, newTodoId: v1()} as const)
export const RemoveTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)

export type SetTotolistsType = ReturnType<typeof setTodolistsAC>

export const setTodolistsAC = (todolists: TodolistsTypeDomain[]) => ({
    type: 'SET-TODOS',
    todolists
} as const )

export const getTodosTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolist()
        .then(res => {
        dispatch(setTodolistsAC(res.data))
    })
    // todolistAPI.deleteTodolist(todolistId)
}
