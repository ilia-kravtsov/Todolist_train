import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolistAPI";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then(response => setState(response.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'REDUX'
        todolistAPI.createTodolist(title)
            .then((response) => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '3ac73e4a-36ed-4f16-998c-32ebd9f140a3'
        todolistAPI.deleteTodolist(todolistId)
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'bdb89e59-b8f4-4c35-82a3-69d68a4be792'
        const title = 'Nest_JS'
        todolistAPI.updateTodolist(todolistId, title)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'a805d3ef-4eaf-4a7f-9853-d7d6cbe0988f'
        todolistAPI.getTasks(todolistId)
            .then(response => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'a805d3ef-4eaf-4a7f-9853-d7d6cbe0988f'
        const title = 'WHISKEY'
        todolistAPI.createTask(todolistId, title)
            .then(response => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'a805d3ef-4eaf-4a7f-9853-d7d6cbe0988f'
        const taskId = '399007b8-635d-41d6-aff5-531f0cc39306'
        todolistAPI.deleteTask(todolistId, taskId)
            .then(response => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'a805d3ef-4eaf-4a7f-9853-d7d6cbe0988f'
        const taskId = '08484ffc-d42d-4770-897f-84665e21a7e9'
        const title = 'ICE'
        todolistAPI.updateTask(todolistId, taskId, title)
            .then(response => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}