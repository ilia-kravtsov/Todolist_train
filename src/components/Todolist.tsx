import React, {ChangeEvent, FC} from 'react';
import {FilterValuesType, TodolistType} from "../types/types";
import AddItemFrom from "./AddItemFrom";
import {EditableTitle} from "./EditableTitle";
import {Button, ButtonGroup, Checkbox} from "@mui/material";
import { Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export const Todolist: FC<TodolistType> = ({
                                               title,
                                               tasks,
                                               removeTask,
                                               changeFilter,
                                               addTask,
                                               changeTaskStatus,
                                               filter,
                                               todolistId,
                                               removeTodolist,
                                               changeTaskTitle,
                                               changeTodolistTitle
                                           }) => {

    const removeTodo = () => {
        removeTodolist(todolistId)
    }
    const callbackFilter = (filterValue: FilterValuesType) => () => changeFilter(filterValue, todolistId)
    const addTaskCallback = (value: string) => {
        addTask(value, todolistId)
    }
    const changeTodolistTitleCallback = (newTitle: string) => {
        changeTodolistTitle(newTitle, todolistId)
    }


    return (
        <div>
            <h3 className={'titleBtn'}>
                <EditableTitle title={title} onChange={changeTodolistTitleCallback}/>
                <IconButton onClick={removeTodo}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemFrom addItem={addTaskCallback}/>
            <ul>
                {tasks.length
                    ? tasks.map(task => {
                        const onChangeBox = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
                        }
                        const removeTaskHandler = () => removeTask(task.id, todolistId)

                        const onChangeTitleCallback = (newTitle: string) => {
                            changeTaskTitle(task.id, newTitle, todolistId)
                        }
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <Checkbox
                                       checked={task.isDone}
                                       onChange={onChangeBox}
                                />
                                <EditableTitle title={task.title} onChange={onChangeTitleCallback}/>
                                <IconButton onClick={removeTaskHandler}>
                                    <Delete/>
                                </IconButton>
                            </li>
                        )
                    })
                    : <div>Add your task</div>
                }
            </ul>
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
};

