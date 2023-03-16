import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {DataType, FilterType} from "./App";
import s from './Todolist.module.css'

export type TodolistType = {
    id: string
    title: string
    data: DataType
    filter: FilterType
    removeItemData: (ItemID: string, todoId: string) => void
    addListItem: (newLiText: string, todoId: string) => void
    changeFilter: (value: FilterType, todoId: string) => void
    removeTodolist: (id: string) => void
    changeItemStatus: (id: string, newDone: boolean, todoId: string) => void
}

export const Todolist: React.FC<TodolistType> = ({title, data, ...props}) => {

    let [newLiText, setNewLiText] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const onFilterBtnClick = (filter: FilterType) => () => props.changeFilter(filter, props.id)
    const onChangeInpForUser = (e: ChangeEvent<HTMLInputElement>) => setNewLiText(e.currentTarget.value)
    const onAddLiBtnClick = () => {
        if (newLiText.trim()) {
            props.addListItem(newLiText.trim(), props.id);
            setNewLiText('')
        } else {
            setError('Write some')
        }
    }
    const onKeyPush = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            onAddLiBtnClick()
        }
    }
    const removeTodo = () => {
        props.removeTodolist(props.id)
    }

    return (
        <div>
                <h3>{title}<button onClick={removeTodo}>x</button></h3>
            <div>
                <input value={newLiText}
                       onChange={onChangeInpForUser}
                       onKeyUp={onKeyPush}
                       className={error ? s.error : ''}
                />
                <button onClick={onAddLiBtnClick}>+</button>
                {error && <div className={s.errorMessage}>{error}</div>}
            </div>
            <ul>
                {data.map(item => {

                    const onClickLiItem = () => {
                        props.removeItemData(item.id, props.id)
                    }
                    const onCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeItemStatus(item.id, e.currentTarget.checked, props.id)
                    }

                    return (
                        <li key={item.id} className={item.done ? s.done : ''}>
                            <input type="checkbox" checked={item.done} onChange={onCheckBoxChange}/>
                            <span>{item.liText}</span>
                            <button onClick={onClickLiItem}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onFilterBtnClick('all')}
                        className={props.filter === 'all' ? s.activeFilterBtn : ''}
                >All</button>
                <button onClick={onFilterBtnClick('active')}
                        className={props.filter === 'active' ? s.activeFilterBtn : ''}
                >Active</button>
                <button onClick={onFilterBtnClick('completed')}
                        className={props.filter === 'completed' ? s.activeFilterBtn : ''}
                >Completed</button>
            </div>
        </div>
    );
};

