export {}
// import React, {Reducer, useReducer} from 'react';
// import {v1} from "uuid";
// import {FilterValuesType, TasksType, TaskType, TodolistsType} from "../types/types";
// import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
// import {Todolist} from "./Todolist";
// import {Menu} from "@mui/icons-material";
// import AddItemFrom from "./AddItemFrom";
// import {
//     ActionTodoTypes,
//     AddTodolistAC,
//     changeTodolistFilterAC, changeTodolistTitleAC,
//     RemoveTodolistAC,
//     todolistsReducer
// } from "../state/todolists-reducer";
// import {
//     ActionTaskTypes,
//     addTaskAC,
//     changeTaskStatusAC,
//     changeTaskTitleAC,
//     removeTaskAC,
//     tasksReducer
// } from "../state/tasks-reducer";
//
// export const AppWithReducer = () => {
//     const todolistId_1 = v1()
//     const todolistId_2 = v1()
//
//     let [todolists, dispatchTodolists] = useReducer<Reducer<Array<TodolistsType>, ActionTodoTypes>>(todolistsReducer,
//         [
//             {id: todolistId_1, title: 'What to read', filter: 'all'},
//             {id: todolistId_2, title: 'What to learn', filter: 'active'},
//         ]
//     )
//     let [tasks, dispatchTasks] = useReducer<Reducer<TasksType, ActionTaskTypes>>(tasksReducer, {
//         [todolistId_1]: [
//             {id: v1(), title: 'Pushkin', isDone: false},
//             {id: v1(), title: 'Lermontov', isDone: true},
//             {id: v1(), title: 'Bulgakov', isDone: false},
//         ],
//         [todolistId_2]: [
//             {id: v1(), title: 'Pushkin', isDone: false},
//             {id: v1(), title: 'Lermontov', isDone: true},
//             {id: v1(), title: 'Bulgakov', isDone: false},
//         ],
//     })
//
//     const changeTodolistFilter = (filterValue: FilterValuesType, todolistId: string) => {
//         dispatchTodolists(changeTodolistFilterAC(todolistId, filterValue))
//     }
//     const removeTodolist = (todolistId: string) => {
//         dispatchTodolists(RemoveTodolistAC(todolistId))
//         dispatchTasks(RemoveTodolistAC(todolistId))
//     }
//     const addTodolist = (title: string) => {
//         const action = AddTodolistAC(title)
//         dispatchTodolists(action)
//         dispatchTasks(action)
//     }
//     const changeTodolistTitle = (newTitle: string, todolistId: string) => {
//         dispatchTodolists(changeTodolistTitleAC(todolistId, newTitle))
//     }
//
//
//     const removeTask = (taskId: string, todolistId: string) => {
//         dispatchTasks(removeTaskAC(taskId, todolistId))
//     }
//     const addTask = (title: string, todolistId: string) => {
//         dispatchTasks(addTaskAC(title, todolistId))
//     }
//     const changeTaskStatus = (id: string, newIsDone: boolean, todolistId: string) => {
//         dispatchTasks(changeTaskStatusAC(id, newIsDone, todolistId))
//     }
//     const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
//         dispatchTasks(changeTaskTitleAC(taskId, newTitle, todolistId))
//     }
//
//     const getFilteredTasks = (newTasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
//
//         switch (filter) {
//             case 'active':
//                 return newTasks.filter(task => !task.isDone)
//             case 'completed':
//                 return newTasks.filter(task => task.isDone)
//             default:
//                 return newTasks
//         }
//     }
//
//     const todolistComponents = todolists.length
//         ? todolists.map(todolist => {
//
//             return <Grid item key={todolist.id}>
//                 <Paper style={{padding: '10px'}}><Todolist title={todolist.title}
//                                                            tasks={getFilteredTasks(tasks[todolist.id], todolist.filter)}
//                                                            removeTask={removeTask}
//                                                            changeFilter={changeTodolistFilter}
//                                                            addTask={addTask}
//                                                            filter={todolist.filter}
//                                                            changeTaskStatus={changeTaskStatus}
//                                                            removeTodolist={removeTodolist}
//                                                            todolistId={todolist.id}
//                                                            changeTaskTitle={changeTaskTitle}
//                                                            changeTodolistTitle={changeTodolistTitle}
//                 /></Paper>
//             </Grid>
//         })
//         : <span>Create your first Todolist</span>
//
//     return (
//         <div className="App">
//             <AppBar position={'static'}>
//                 <Toolbar>
//                     <IconButton edge={'start'} aria-label={'menu'}>
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant={'h6'}>
//                         Todolist
//                     </Typography>
//                     <Button>Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed>
//                 <Grid container>
//                     <AddItemFrom addItem={addTodolist}/>
//                 </Grid>
//                 <Grid container>
//                     {todolistComponents}
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
