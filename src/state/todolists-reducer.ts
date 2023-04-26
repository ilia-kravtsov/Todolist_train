import {FilterValuesType, TodolistsType} from "../types/types";
import {v1} from "uuid";

const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'

export type RemoveTodolist = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolist = {
    type: 'ADD-TODOLIST'
    title: string
    newTodoId: string
}
export type ChangeTodolistTitle = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilter = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

type ActionTypes = RemoveTodolist | AddTodolist | ChangeTodolistTitle | ChangeTodolistFilter

export const todolistsReducer = (state: Array<TodolistsType>, action: ActionTypes): Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todolist => todolist.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: action.newTodoId, title: action.title, filter: 'all'}]
        case CHANGE_TODOLIST_TITLE:
            return state.map(todolist => todolist.id === action.id
                ? {...todolist, title: action.title}
                : todolist)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(todolist => todolist.id === action.id
                ? {...todolist, filter: action.filter}
                : todolist)
        default:
            return state
    }
}

export const changeTodolistTitleAC = (id: string, title: string) => ({type: CHANGE_TODOLIST_TITLE, id, title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilter => ({type: 'CHANGE-TODOLIST-FILTER', id, filter})
export const AddTodolistAC = (title: string): AddTodolist => ({type: 'ADD-TODOLIST', title, newTodoId: v1()})
export const RemoveTodolistAC = (id: string): RemoveTodolist => ({type: 'REMOVE-TODOLIST', id})