import React, {FC, memo, useCallback, useEffect} from 'react';
import {FilterValuesType, TaskDomainType, TasksType, TaskType, TodolistType} from "../types/types";
import AddItemFrom from "./AddItemFrom";
import {EditableTitle} from "./EditableTitle";
import {Button, ButtonGroup} from "@mui/material";
import {Delete} from '@mui/icons-material'
import {IconButton} from '@mui/material'
import {Task} from "./Task";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../state/store";
import {addTaskAC, addTasksTC, getTasksTC} from "../state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, RemoveTodolistAC} from "../state/todolists-reducer";

export const Todolist: FC<TodolistType> = memo(({
                                                    title,
                                                    filter,
                                                    todolistId,
                                                }) => {

    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTasksTC(todolistId))
    }, [])

    const addTask = useCallback((title: string) => {
        dispatch(addTasksTC(todolistId, title))
    }, [])

    const changeTodolistFilter = useCallback((filterValue: FilterValuesType) => () => {
        dispatch(changeTodolistFilterAC(todolistId, filterValue))
    }, [])
    const changeTodolistTitle = useCallback((newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    }, [])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(RemoveTodolistAC(todolistId))
    }, [])
    const removeTodo = useCallback(() => {
        removeTodolist(todolistId)
    }, [todolistId])


    const getFilteredTasks = (newTasks: Array<TaskDomainType>, filter: FilterValuesType): Array<TaskDomainType> => {
        switch (filter) {
            case 'active':
                return newTasks.filter(task => !task.isDone)
            case 'completed':
                return newTasks.filter(task => task.isDone)
            default:
                return newTasks
        }
    }
    const filteredTasks = getFilteredTasks(tasks[todolistId], filter)

    return (
        <div>
            <h3 className={'titleBtn'}>
                <EditableTitle title={title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodo}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemFrom addItem={addTask}/>
            <div>
                {filteredTasks.length
                    ? filteredTasks.map(task => <Task key={task.id}
                                                      todolistId={todolistId}
                                                      task={task}
                    />)
                    : <div>Add your task</div>
                }
            </div>
            <div className={'buttonContainer'}>
                <ButtonGroup>
                    <Button onClick={changeTodolistFilter('all')}
                            variant={filter === 'all' ? 'outlined' : 'contained'}
                    >All
                    </Button>
                    <Button onClick={changeTodolistFilter('active')}
                            variant={filter === 'active' ? 'outlined' : 'contained'}
                    >Active
                    </Button>
                    <Button onClick={changeTodolistFilter('completed')}
                            variant={filter === 'completed' ? 'outlined' : 'contained'}
                    >Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
})

