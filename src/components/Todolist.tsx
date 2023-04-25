import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TodolistsType} from "../types/types";

export const Todolist: FC<TodolistsType> = ({
                                                title,
                                                tasks,
                                                removeTask,
                                                changeFilter,
                                                addTask
}) => {

    let [value, setValue] = useState<string>('')

    const removeTaskHandler = (id: string) => removeTask(id)
    const callbackFilter = (filterValue: FilterValuesType) => () => changeFilter(filterValue)
    const addTaskCallback = () => {
        if(value.trim()) {
            addTask(value.trim())
            setValue('')
        }
    }
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
    const onInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTaskCallback()
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={value}
                       onChange={onInputChange}
                       onKeyDown={onInputKeyPress}
                />
                <button onClick={addTaskCallback}>+</button>
            </div>
            <ul>
                {tasks.map(task => {
                    return (
                        <li>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={() => removeTaskHandler(task.id)}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={callbackFilter('all')}>All</button>
                <button onClick={callbackFilter('active')}>Active</button>
                <button onClick={callbackFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};

