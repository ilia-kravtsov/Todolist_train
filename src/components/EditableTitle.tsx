import React, {FC, memo, useState, KeyboardEvent} from 'react';
import {EditableTitleType} from "../types/types";
import {TextField} from "@mui/material";

export const EditableTitle: FC<EditableTitleType> = memo(({title, onChange}) => {
    console.log('EditableTitle')
    let [editMode, setEditMode] = useState<boolean>(false)
    let [newTitle, setNewTitle] = useState<string>(title)

    const ChangeMode = () => {
        setEditMode(true)
        setNewTitle(title)
    }
    const FixMode = () => {
        setEditMode(false)
        onChange(newTitle)
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setEditMode(false)
            onChange(newTitle)
        }
    }

    return editMode
        ? <TextField value={newTitle}
                 onBlur={FixMode}
                 onKeyDown={onKeyPress}
                 autoFocus
                 onChange={(e) => setNewTitle(e.currentTarget.value)}
                     variant={'filled'}
        />
        : <span onDoubleClick={ChangeMode}>{title}</span>
})

