import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';
import {AddItemFromType} from "../types/types";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import '../App.css'

const AddItemFrom: FC<AddItemFromType> = memo(({addItem}) => {
    console.log('AddItemFrom')
    let [value, setValue] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
    const onInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
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
                <TextField value={value}
                           variant={'outlined'}
                           onChange={onInputChange}
                           onKeyDown={onInputKeyPress}
                           error={!!error}
                           size={'small'}
                           label={'Enter your title'}
                           helperText={error}
                />
                {error && <div className={'error-message'}></div>}
            <IconButton onClick={addTaskCallback}
            >
                <AddBox/>
            </IconButton>
        </div>
    );
})

export default AddItemFrom;