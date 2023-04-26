import React, {useCallback} from 'react';
import {FilterValuesType, TasksType, TodolistsType} from "../types/types";
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
    console.log('App')
    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const dispatch = useDispatch()

    const changeTodolistFilter = useCallback((filterValue: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, filterValue))
    }, [])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(RemoveTodolistAC(todolistId))
    }, [])
    const addTodolist = useCallback((title: string) => {
        dispatch(AddTodolistAC(title))
    }, [])
    const changeTodolistTitle = useCallback((newTitle: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    }, [])

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    }, [])
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [])
    const changeTaskStatus = useCallback((id: string, newIsDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(id, newIsDone, todolistId))
    }, [])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    }, [])


    const todolistComponents = todolists.length
        ? todolists.map(todolist => {
            return <Grid item key={todolist.id}>
                <Paper style={{padding: '10px'}}><Todolist title={todolist.title}
                                                           tasks={tasks}
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
