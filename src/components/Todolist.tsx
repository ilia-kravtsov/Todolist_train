import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TodolistType} from "../types/types";

export const Todolist: FC<TodolistType> = ({
                                               title,
                                               tasks,
                                               removeTask,
                                               changeFilter,
                                               addTask,
                                               changeTaskStatus,
                                               filter,
                                               todolistId,
                                               removeTodolist
                                           }) => {

    let [value, setValue] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const removeTodo = () => {
        removeTodolist(todolistId)
    }
    const callbackFilter = (filterValue: FilterValuesType) => () => changeFilter(filterValue, todolistId)
    const addTaskCallback = () => {
        if (value.trim()) {
            addTask(value.trim(), todolistId)
            setValue('')
        } else {
            setError('Title is required')
        }
    }
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
    const onInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') addTaskCallback()
    }
    console.log(tasks)
    return (
        <div>
            <h3>{title}</h3>
            <button onClick={removeTodo}>x</button>
            <div>
                <input value={value}
                       onChange={onInputChange}
                       onKeyDown={onInputKeyPress}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTaskCallback}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {tasks.map(task => {
                        const onChangeBox = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
                        }
                        const removeTaskHandler = () => removeTask(task.id, todolistId)
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={onChangeBox}
                                />
                                <span>{task.title}</span>
                                <button onClick={removeTaskHandler}>x</button>
                            </li>
                        )
                    })
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

