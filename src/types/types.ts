export type TodolistsType = {
    title: string
    tasks: TasksType
    filter: FilterValuesType
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, newIsDone: boolean) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = Array<TaskType>

export type FilterValuesType = 'all' | 'active' | 'completed'