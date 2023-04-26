import {TasksType, TaskType} from "../types/types";
import {v1} from "uuid";
import {AddTodolist, RemoveTodolist} from "./todolists-reducer";

type RemoveTask = ReturnType<typeof removeTaskAC>
type AddTask = ReturnType<typeof addTaskAC>
type ChangeTaskStatus = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitle = ReturnType<typeof changeTaskTitleAC>

export type ActionTaskTypes = RemoveTask | AddTask | ChangeTaskStatus | ChangeTaskTitle | AddTodolist | RemoveTodolist

const initialState: TasksType= {}

export const tasksReducer = (state: TasksType = initialState, action: ActionTaskTypes): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        case 'ADD-TASK':
            let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        case 'CHANGE-TASK-STATUS':
            const changedTasks = state[action.todolistId].map(task => task.id === action.taskId ? {...task, isDone: action.isDone} : task)
            return {...state, [action.todolistId]: changedTasks}
        case 'CHANGE-TASK-TITLE':
            const newTasks = state[action.todolistId].map(task => task.id === action.taskId ? {...task, title: action.title} : task)
            return {...state, [action.todolistId]: newTasks}
        case 'ADD-TODOLIST':
            return {...state, [action.newTodoId]: []}
        case 'REMOVE-TODOLIST':
            delete state[action.id]
            return {...state}
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (title: string, todolistId: string) => ({type: 'ADD-TASK', title, todolistId} as const)
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => ({
    type: 'CHANGE-TASK-STATUS',
    taskId,
    isDone,
    todolistId
} as const)
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({
    type: 'CHANGE-TASK-TITLE',
    taskId,
    title,
    todolistId
} as const)
