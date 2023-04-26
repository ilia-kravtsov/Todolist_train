import React, {ChangeEvent, FC} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableTitle} from "./EditableTitle";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {TaskComponentType} from "../types/types";

export const Task: FC<TaskComponentType> = ({task, todolistId}) => {

    const dispatch = useDispatch()
    const onChangeBox = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, todolistId))
    }
    const removeTaskHandler = () => dispatch(removeTaskAC(task.id, todolistId))

    const onChangeTitleCallback = (newTitle: string) => {
        dispatch(changeTaskTitleAC(task.id, newTitle, todolistId))
    }

    return (
        <div  className={task.isDone ? 'is-done' : ''}>
            <Checkbox
                checked={task.isDone}
                onChange={onChangeBox}
            />
            <EditableTitle title={task.title} onChange={onChangeTitleCallback}/>
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
};

