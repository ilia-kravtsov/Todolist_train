import React, {FC, memo, useCallback} from 'react';
import {FilterValuesType, TaskType, TodolistType} from "../types/types";
import AddItemFrom from "./AddItemFrom";
import {EditableTitle} from "./EditableTitle";
import {Button, ButtonGroup} from "@mui/material";
import { Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import {Task} from "./Task";

export const Todolist: FC<TodolistType> = memo(({
                                               title,
                                               tasks,
                                               changeFilter,
                                               addTask,
                                               filter,
                                               todolistId,
                                               removeTodolist,
                                               changeTodolistTitle
                                           }) => {
    console.log('todo')
    const removeTodo = () => {
        removeTodolist(todolistId)
    }
    const callbackFilter = useCallback((filterValue: FilterValuesType) => () => changeFilter(filterValue, todolistId),[changeFilter, todolistId])
    const addTaskCallback = useCallback((value: string) => {
        addTask(value, todolistId)
    },[addTask, todolistId])
    const changeTodolistTitleCallback = useCallback((newTitle: string) => {
        changeTodolistTitle(newTitle, todolistId)
    },[changeTodolistTitle, todolistId])

    const getFilteredTasks = (newTasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
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
                <EditableTitle title={title} onChange={changeTodolistTitleCallback}/>
                <IconButton onClick={removeTodo}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemFrom addItem={addTaskCallback}/>
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
                    <Button onClick={callbackFilter('all')}
                            variant={filter === 'all' ? 'outlined' : 'contained'}
                    >All
                    </Button>
                    <Button onClick={callbackFilter('active')}
                            variant={filter === 'active' ? 'outlined' : 'contained'}
                    >Active
                    </Button>
                    <Button onClick={callbackFilter('completed')}
                            variant={filter === 'completed' ? 'outlined' : 'contained'}
                    >Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
})

