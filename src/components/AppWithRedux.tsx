import React, {useCallback, useEffect} from 'react';
import {TodolistsType} from "../types/types";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Todolist} from "./Todolist";
import {Menu} from "@mui/icons-material";
import AddItemFrom from "./AddItemFrom";
import {AddTodolistAC, getTodosTC} from "../state/todolists-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../state/store";

export const AppWithRedux = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)

   // const dispatch = useDispatch()
    const dispatch = useAppDispatch()

    const addTodolist = useCallback((title: string) => {
        dispatch(AddTodolistAC(title))
    }, [])

    useEffect(() => {
            dispatch(getTodosTC()) // thunk вызывает middleware из стора здесь просто передаем
    },[])

    const todolistComponents = todolists.length
        ? todolists.map(todolist => {

            return <Grid item key={todolist.id}>
                <Paper style={{padding: '10px'}}>
                    <Todolist title={todolist.title}
                              filter={todolist.filter}
                              todolistId={todolist.id}
                    />
                </Paper>
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
