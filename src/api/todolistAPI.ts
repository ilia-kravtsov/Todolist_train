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
        return instance.post<ResponseTaskType<{ item: Task }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseTaskType<{ item: Task }>>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    }
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

type Task = {
    addedDate: string
    deadline: null
    description: null
    id: string
    order: number
    priority: number
    startDate: null
    status: number
    title: string
    todoListId: string
}

type GetTasksType = {
    error: null
    items: Task[]
    totalCount: number
}

type ResponseTaskType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
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