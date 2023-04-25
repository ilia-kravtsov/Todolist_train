import React, {useState} from 'react';
import '../App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {FilterValuesType, TasksType, TaskType, TodolistsType} from "../types/types";

function App() {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    let [todolists,setTodolists] = useState<Array<TodolistsType>>(
        [
            {id: todolistId_1, title: 'What to read', filter: 'all'},
            {id: todolistId_2, title: 'What to learn', filter: 'active'},
        ]
    )

    let [tasks, setTasks] = useState<TasksType>({
        [todolistId_1] : [
            {id: v1(), title: 'Pushkin', isDone: false},
            {id: v1(), title: 'Lermontov', isDone: true},
            {id: v1(), title: 'Bulgakov', isDone: false},
        ],
        [todolistId_2] : [
            {id: v1(), title: 'Pushkin', isDone: false},
            {id: v1(), title: 'Lermontov', isDone: true},
            {id: v1(), title: 'Bulgakov', isDone: false},
        ],
    })

    const changeTodolistFilter = (filterValue: FilterValuesType, todolistId: string) => {
        let newTodoArray = todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter: filterValue } : todolist)
        setTodolists(newTodoArray)
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
    }

    const removeTask = (taskId: string, todolistId: string) => {
        const newTasks = tasks[todolistId].filter(task => task.id !== taskId)
        setTasks({...tasks, [todolistId]: newTasks})
        // const newTasks = tasks.filter(task => task.id !== taskId)
        // setTasks(newTasks)
    }
    const addTask = (title: string, todolistId: string) => {
        let newTask: TaskType = {id: v1(), title, isDone: false}
        const newTasks = [newTask, ...tasks[todolistId]]
        setTasks({...tasks, [todolistId]: newTasks})
        // let newTask = {id: v1(), title, isDone: false}
        // setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (id: string, newIsDone: boolean, todolistId: string) => {
        const newTasks = tasks[todolistId].map(task => task.id === id ? {...task, isDone: newIsDone} : task)
        debugger
        setTasks({...tasks, [todolistId]: newTasks})
        // const newTasks = tasks.map(task => task.id === id ? {...task, isDone: newIsDone} : task)
        // setTasks(newTasks)
    }

    const getFilteredTasks = (newTasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {

        switch(filter) {
            case 'active':
                return newTasks.filter(task => !task.isDone)
            case 'completed':
                return newTasks.filter(task => task.isDone)
            default:
                return newTasks
        }
    }

    const todolistComponents = todolists.length
        ?  todolists.map(todolist => {

            return <Todolist title={todolist.title}
                             tasks={getFilteredTasks(tasks[todolist.id], todolist.filter)}
                             removeTask={removeTask}
                             changeFilter={changeTodolistFilter}
                             addTask={addTask}
                             filter={todolist.filter}
                             changeTaskStatus={changeTaskStatus}
                             removeTodolist={removeTodolist}
                             key={todolist.id}
                             todolistId={todolist.id}
            />
        })
        : <span>Create your first Todolist</span>

    return (
        <div className="App">
            {todolistComponents}
        </div>
    );
}

export default App;

// let [tasks, setTasks] = useState<TasksType>([
//     {id: v1(), title: 'Pushkin', isDone: false},
//     {id: v1(), title: 'Lermontov', isDone: true},
//     {id: v1(), title: 'Bulgakov', isDone: false},
// ])