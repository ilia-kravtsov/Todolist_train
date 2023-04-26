import {FilterValuesType, TodolistsType} from "../types/types";
import {v1} from "uuid";

const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'

export type RemoveTodolist = ReturnType<typeof RemoveTodolistAC>
export type AddTodolist = ReturnType<typeof AddTodolistAC>
type ChangeTodolistTitle = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilter = ReturnType<typeof changeTodolistFilterAC>

export type ActionTodoTypes = RemoveTodolist | AddTodolist | ChangeTodolistTitle | ChangeTodolistFilter

const initialState: Array<TodolistsType>= []

export const todolistsReducer = (state: Array<TodolistsType> = initialState, action: ActionTodoTypes): Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todolist => todolist.id !== action.id)
        case 'ADD-TODOLIST':
            return [{id: action.newTodoId, title: action.title, filter: 'all'}, ...state]
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
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
export const AddTodolistAC = (title: string) => ({type: 'ADD-TODOLIST', title, newTodoId: v1()} as const)
export const RemoveTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)