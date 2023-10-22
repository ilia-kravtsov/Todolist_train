import {Task} from "../api/todolistAPI";

export type TodolistType = {
    todolistId: string
    title: string
    filter: FilterValuesType
}

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type AddItemFromType = {
    addItem: (value: string) => void
}

export type TaskDomainType = Task & {isDone: boolean}

export type TasksType = {
    [key: string]: Array<TaskDomainType>
}

export type EditableTitleType = {
    title: string
    onChange: (newTitle: string) => void
}

//export type TasksType = Array<TaskType>

export type TaskComponentType = {
    task: TaskDomainType
    todolistId: string
}

export type FilterValuesType = 'all' | 'active' | 'completed'