import React from 'react';
import {FilterValuesType, TasksType, TaskType, TodolistsType} from "../types/types";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Todolist} from "./Todolist";
import {Menu} from "@mui/icons-material";
import AddItemFrom from "./AddItemFrom";
import {
    AddTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    RemoveTodolistAC,
} from "../state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from "../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";

export const AppWithRedux = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const dispatch = useDispatch()

    const changeTodolistFilter = (filterValue: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, filterValue))
    }
    const removeTodolist = (todolistId: string) => {
        dispatch(RemoveTodolistAC(todolistId))
    }
    const addTodolist = (title: string) => {
        dispatch(AddTodolistAC(title))
    }
    const changeTodolistTitle = (newTitle: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    }


    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    }
    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }
    const changeTaskStatus = (id: string, newIsDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(id, newIsDone, todolistId))
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    }

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

    const todolistComponents = todolists.length
        ? todolists.map(todolist => {

            return <Grid item key={todolist.id}>
                <Paper style={{padding: '10px'}}><Todolist title={todolist.title}
                                                           tasks={getFilteredTasks(tasks[todolist.id], todolist.filter)}
                                                           removeTask={removeTask}
                                                           changeFilter={changeTodolistFilter}
                                                           addTask={addTask}
                                                           filter={todolist.filter}
                                                           changeTaskStatus={changeTaskStatus}
                                                           removeTodolist={removeTodolist}
                                                           todolistId={todolist.id}
                                                           changeTaskTitle={changeTaskTitle}
                                                           changeTodolistTitle={changeTodolistTitle}
                /></Paper>
            </Grid>
        })
        : <span>Create your first Todolist</span>

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        Todolist
                    </Typography>
                    <Button>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container>
                    <AddItemFrom addItem={addTodolist}/>
                </Grid>
                <Grid container>
                    {todolistComponents}
                </Grid>
            </Container>
        </div>
    );
}
