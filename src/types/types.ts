export type TodolistsType = {
    title: string
    tasks: TasksType
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = Array<TaskType>

export type FilterValuesType = 'all' | 'active' | 'completed'