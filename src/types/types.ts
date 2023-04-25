export type TodolistsType = {
    title: string
    tasks: TasksType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = Array<TaskType>