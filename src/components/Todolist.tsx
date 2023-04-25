import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TodolistType} from "../types/types";
import AddItemFrom from "./AddItemFrom";
import {EditableTitle} from "./EditableTitle";

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
            <div className={'titleBtn'}>
                <EditableTitle title={title} onChange={changeTodolistTitleCallback}/>
                <button onClick={removeTodo}>x</button>
            </div>
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
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={onChangeBox}
                                />
                                <EditableTitle title={task.title} onChange={onChangeTitleCallback}/>
                                <button onClick={removeTaskHandler}>x</button>
                            </li>
                        )
                    })
                    : <div>Add your task</div>
                }
            </ul>
            <div className={'buttonContainer'}>
                <button onClick={callbackFilter('all')}
                        className={filter === 'all' ? 'active-filter' : ''}
                >All
                </button>
                <button onClick={callbackFilter('active')}
                        className={filter === 'active' ? 'active-filter' : ''}
                >Active
                </button>
                <button onClick={callbackFilter('completed')}
                        className={filter === 'completed' ? 'active-filter' : ''}
                >Completed
                </button>
            </div>
        </div>
    );
};

