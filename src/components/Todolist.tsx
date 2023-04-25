import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TodolistsType} from "../types/types";

export const Todolist: FC<TodolistsType> = ({
                                                title,
                                                tasks,
                                                removeTask,
                                                changeFilter,
                                                addTask,
                                                changeTaskStatus,
                                                filter
}) => {

    let [value, setValue] = useState<string>('')
    let [error, setError] = useState<string | null>(null)
    console.log('Todolist')
    const removeTaskHandler = (id: string) => removeTask(id)
    const callbackFilter = (filterValue: FilterValuesType) => () => changeFilter(filterValue)
    const addTaskCallback = () => {
        if(value.trim()) {
            addTask(value.trim())
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


    return (
        <div>
            <h3>{title}</h3>
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
                        changeTaskStatus(task.id, e.currentTarget.checked)
                    }

                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={onChangeBox}
                            />
                            <span>{task.title}</span>
                            <button onClick={() => removeTaskHandler(task.id)}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={callbackFilter('all')}
                        className={filter === 'all' ? 'active-filter' : ''}
                >All</button>
                <button onClick={callbackFilter('active')}
                        className={filter === 'active' ? 'active-filter' : ''}
                >Active</button>
                <button onClick={callbackFilter('completed')}
                        className={filter === 'completed' ? 'active-filter' : ''}
                >Completed</button>
            </div>
        </div>
    );
};

