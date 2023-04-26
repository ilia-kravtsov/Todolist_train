export type TodolistType = {
    todolistId: string
    title: string
    tasks: TasksType
    filter: FilterValuesType
    removeTask: (id: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, newIsDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
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

export type TasksType = {
    [key: string]: Array<TaskType>
}

export type EditableTitleType = {
    title: string
    onChange: (newTitle: string) => void
}

//export type TasksType = Array<TaskType>

export type TaskComponentType = {
    task: TaskType
    todolistId: string
}

export type FilterValuesType = 'all' | 'active' | 'completed'