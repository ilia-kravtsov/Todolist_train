import React from 'react';
import '../App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {TasksType} from "../types/types";

function App() {

    let tasks_1: TasksType = [
        {id: v1(), title: 'Pushkin', isDone: false},
        {id: v1(), title: 'Lermontov', isDone: true},
        {id: v1(), title: 'Bulgakov', isDone: false},
    ]

    let tasks_2: TasksType = [
        {id: v1(), title: 'HTML', isDone: false},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ]

    return (
        <div className="App">
            <Todolist title={'What to read'} tasks={tasks_1}/>
            <Todolist title={'What to learn'} tasks={tasks_2}/>
        </div>
    );
}

export default App;
