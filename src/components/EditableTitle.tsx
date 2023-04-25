import React, {FC, useState} from 'react';
import {EditableTitleType} from "../types/types";

export const EditableTitle: FC<EditableTitleType> = ({title, onChange}) => {
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

    return editMode
        ? <input value={newTitle}
                 onBlur={FixMode}
                 autoFocus
                 onChange={(e) => setNewTitle(e.currentTarget.value)}
        />
        : <span onDoubleClick={ChangeMode}>{title}</span>
};

