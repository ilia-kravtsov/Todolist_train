import {TasksType} from "../types/types";
import {AddTodolist, RemoveTodolist, SetTotolistsType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {Task, TaskStatuses, todolistAPI, UpdateTaskModelType} from "../api/todolistAPI";
import {AppRootStateType} from "./store";

type RemoveTask = ReturnType<typeof removeTaskAC>
type AddTask = ReturnType<typeof addTaskAC>
type ChangeTaskStatus = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitle = ReturnType<typeof changeTaskTitleAC>
type SetTasksACType = ReturnType<typeof setTasksAC>


export type ActionTaskTypes = RemoveTask
    | AddTask
    | ChangeTaskStatus
    | ChangeTaskTitle
    | AddTodolist
    | RemoveTodolist
    | SetTotolistsType
    | SetTasksACType

/*
tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    }
 */

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: ActionTaskTypes): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        case 'ADD-TASK':
            // let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            // {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
            return {...state, [action.todolistId]: [{...action.task, isDone: action.task.status === 2}, ...state[action.todolistId]]}
        case 'CHANGE-TASK-STATUS':
            // const changedTasks = state[action.todolistId].map(task => task.id === action.taskId ? {...task, status: action.status} : task)
            // return {...state, [action.todolistId]: changedTasks}
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;

            return {...state};
        case 'CHANGE-TASK-TITLE':
            const newTasks = state[action.todolistId].map(task => task.id === action.taskId ? {...task, title: action.title} : task)
            return {...state, [action.todolistId]: newTasks}
        case 'ADD-TODOLIST':
            return {...state, [action.newTodoId]: []}
        case 'REMOVE-TODOLIST':
            delete state[action.id]
            return {...state}
        case "SET-TODOS":
            const copyState = {...state}
            action.todolists.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks.map(el => ({...el, isDone: el.status === 2}))}
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = ( todolistId: string, task: Task) => ({type: 'ADD-TASK', todolistId, task} as const)
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => ({
    type: 'CHANGE-TASK-STATUS',
    taskId,
    status,
    todolistId
} as const)
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({
    type: 'CHANGE-TASK-TITLE',
    taskId,
    title,
    todolistId
} as const)

export const setTasksAC = (tasks: Task[], todolistId: string) => ({
    type: 'SET-TASKS',
    tasks,
    todolistId
} as const)
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}
export const deleteTasksTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}
export const addTasksTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(todolistId, res.data.data.item))
        })
}
export const changeTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find(task => task.id === taskId)

    if (task) {
        const model: UpdateTaskModelType = {
            title: task.title,
            deadline: task.deadline,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            status
        }
        todolistAPI.updateTask(todolistId, taskId, model)
            .then(res => {
                console.log(res)
                dispatch(changeTaskStatusAC(taskId,status, todolistId))
            })
    }
}