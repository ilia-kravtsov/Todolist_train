import React, {useState} from 'react';
import '../App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {FilterValuesType, TasksType} from "../types/types";

function App() {

    let [tasks, setTasks] = useState<TasksType>([
        {id: v1(), title: 'Pushkin', isDone: false},
        {id: v1(), title: 'Lermontov', isDone: true},
        {id: v1(), title: 'Bulgakov', isDone: false},
    ])
    let [filter, setFilter] = useState<FilterValuesType>('all')


    const removeTask = (taskId: string) => {
        const newTasks = tasks.filter(task => task.id !== taskId)
        setTasks(newTasks)
    }
    const changeTasksFilter = (filterValue: FilterValuesType) => setFilter(filterValue)
    const addTask = (title: string) => {
        let newTask = {id: v1(), title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const getFilteredTasks = (tasks: TasksType) => {
        switch(filter) {
            case 'active':
            return tasks.filter(task => !task.isDone)
            case "completed":
                return tasks.filter(task => task.isDone)
            default:
                return tasks
        }
    }

    return (
        <div className="App">
            <Todolist title={'What to read'}
                      tasks={getFilteredTasks(tasks)}
                      removeTask={removeTask}
                      changeFilter={changeTasksFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
