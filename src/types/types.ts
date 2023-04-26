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