import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'completed'
export type ItemDataType = {
    id: string
    liText: string
    done: boolean
}
export type DataType = ItemDataType[]
export type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}
export type TodolistsStateType = {
    [id: string]: Array<ItemDataType>
}

function App() {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to read', filter: 'all'},
    ])
    // Блок Локальный состояний
    let [state, setState] = useState<TodolistsStateType>({
        [todolistId_1]: [
            {id: v1(), liText: 'HTML', done: true},
            {id: v1(), liText: 'CSS', done: true},
            {id: v1(), liText: 'JS', done: false},
            {id: v1(), liText: 'React', done: false},
        ],
        [todolistId_2]: [
            {id: v1(), liText: 'Bulgakov', done: true},
            {id: v1(), liText: 'Pushkin', done: true},
            {id: v1(), liText: 'Lermontov', done: false},
            {id: v1(), liText: 'Gorkiy', done: false},
        ],
    })

    // Функциональный блок изменяющий данные
    // For_Todos
    const changeTodoFilter = (valueFilter: FilterType, todoId: string) => {
        setTodolists(todolists.map(todolist => todolist.id === todoId ? {...todolist, filter: valueFilter} : todolist))
    }
    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== id))
    }
    // For_Todo
    const removeItemData = (itemId: string, todoId: string) => {
        state[todoId] = state[todoId].filter(item => item.id !== itemId)
        setState({...state})
    }
    const addListItem = (newLiText: string, todoId: string) => {
        let newItem = {id: v1(), liText: newLiText, done: false}
        state[todoId] = [newItem, ...state[todoId]]
        setState({...state})
    }
    const changeItemStatus = (id: string, newDone: boolean, todoId: string) => {
        let item = state[todoId].find(item => item.id === id)
        if (item) {
            item.done = newDone
            setState({...state})
        }
    }

    // Блок фильтрации
    const getFilterData = (state: ItemDataType[], filter: FilterType): ItemDataType[] => {
        switch (filter) {
            case 'active':
                return state.filter(item => !item.done)
            case 'completed':
                return state.filter(item => item.done)
            default:
                return state
        }
    }

    return (
        <div className='App'>
            {todolists.map(todolist => {

                const filteredData: ItemDataType[] = getFilterData(state[todolist.id], todolist.filter)

                return <Todolist key={todolist.id}
                                 id={todolist.id}
                                 title={todolist.title}
                                 data={filteredData}
                                 changeItemStatus={changeItemStatus}
                                 removeItemData={removeItemData}
                                 changeFilter={changeTodoFilter}
                                 removeTodolist={removeTodolist}
                                 addListItem={addListItem}
                                 filter={todolist.filter}
                />
            })}
        </div>
    )
}

export default App;

