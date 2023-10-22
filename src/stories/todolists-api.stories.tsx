import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolistAPI";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist().then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'What to Learn'
        todolistAPI.createTodolist(title).then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'b053126e-9342-41c0-95e1-5866f94a46dd'
        todolistAPI.deleteTodolist(todolistId).then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'd9a6018d-d6a5-4175-bc38-bcb374b33fcb'
        const title = 'HTML'
        todolistAPI.updateTodolist(todolistId, title).then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '1ea58143-63ec-4ba2-9c66-18164a6928b4'
        todolistAPI.getTasks(todolistId)
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

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '1ea58143-63ec-4ba2-9c66-18164a6928b4'
        const title = 'Bourbone'
        todolistAPI.createTask(todolistId, title)
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
        // @ts-ignore
        todolistAPI.updateTask(todolistId, taskId, title)
            .then(response => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

/*
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        (async () => {
        const result = await todolistAPI.getTodolist()
        setState(result)
    })()
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
 */