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

function App() {
    // Блок Локальный состояний
    let [state, setState] = useState<DataType>([
        {id: v1(), liText: 'HTML', done: true},
        {id: v1(), liText: 'CSS', done: true},
        {id: v1(), liText: 'JS', done: false},
        {id: v1(), liText: 'React', done: false},
    ])
    let [filter, setFilter] = useState<FilterType>('all')
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
    const filteredData = getFilterData(state, filter)
    // Функциональный блок изменяющий данные
    const removeItemData = (ItemID: string) => setState(state.filter(item => item.id !== ItemID));
    const changeFilter = (value: FilterType) => setFilter(value);
    const addListItem = (newLiText: string) => {
        let item = {id: v1(), liText: newLiText, done: false}
        setState([item, ...state])
    }
    const changeItemStatus = (id: string, newDone: boolean) =>{
        let item = state.find(item => item.id === id)
        if (item) {
            item.done = newDone
            setState([...state])
        }
    }

    return (
        <div className='App'>
            <Todolist title='What to learn'
                      data={filteredData}
                      removeItemData={removeItemData}
                      changeFilter={changeFilter}
                      addListItem={addListItem}
                      changeItemStatus={changeItemStatus}
                      filter={filter}
            />
        </div>
    )
}

export default App;

