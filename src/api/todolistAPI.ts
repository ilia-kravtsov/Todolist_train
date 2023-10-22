import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': '3f2a2590-abfa-42fb-bdbe-272bf5fe85c8'
    }
})

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    getTodolist() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: Task }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: Task }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

export type UpdateTaskModelType = {
    title: string
    deadline: string
    startDate: string
    priority: number
    description: string
    status: TaskStatuses
}

type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<T = {}> = {
    resultCode: number
    fieldsErrors: string[]
    messages: string[]
    data: T
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export type Task = {
    addedDate: string
    deadline: string
    description: string
    id: string
    order: number
    priority: number
    startDate: string
    status: TaskStatuses
    title: string
    todoListId: string
}

export type GetTasksType = {
    error: null
    items: Task[]
    totalCount: number
}

// type CreateTasksType = {
//     fieldsErrors: string[]
//     messages: string[]
//     resultCode: number
//     data: { item: Task }
// }
//
// type DeleteTaskType = {
//     data: {}
//     fieldsErrors: string[]
//     messages: string[]
//     resultCode: number
// }
//
// type UpdateTaskType = {
//     data: { item: Task }
//     fieldsErrors: string[]
//     messages: string[]
//     resultCode: number
// }