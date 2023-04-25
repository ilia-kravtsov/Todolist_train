export type TodolistType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (id: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, newIsDone: boolean, todolistId: string) => void
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

export type TasksType = {
    [key: string]: Array<TaskType>
}

//export type TasksType = Array<TaskType>

export type FilterValuesType = 'all' | 'active' | 'completed'