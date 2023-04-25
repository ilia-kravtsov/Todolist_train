import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {AddItemFromType} from "../types/types";

const AddItemFrom: FC<AddItemFromType> = ({addItem}) => {

    let [value, setValue] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
    const onInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') addTaskCallback()
    }
    const addTaskCallback = () => {
        if (value.trim()) {
            addItem(value.trim())
            setValue('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div className={'titleBtn'}>
            <input value={value}
                   onChange={onInputChange}
                   onKeyDown={onInputKeyPress}
                   className={error ? 'error' : ''}
            />
            <button onClick={addTaskCallback}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};

export default AddItemFrom;