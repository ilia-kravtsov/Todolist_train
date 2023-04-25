import React, {FC} from 'react';
import {FilterValuesType, TodolistsType} from "../types/types";

export const Todolist: FC<TodolistsType> = ({
                                                title,
                                                tasks,
                                                removeTask,
                                                changeFilter
}) => {

    const removeTaskHandler = (id: string) => removeTask(id)

    const callbackFilter = (filterValue: FilterValuesType) => () => changeFilter(filterValue)

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
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

