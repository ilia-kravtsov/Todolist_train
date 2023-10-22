import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableTitle} from "./EditableTitle";
import {Delete} from "@mui/icons-material";
import {changeTaskStatusTC, changeTaskTitleAC, deleteTasksTC} from "../state/tasks-reducer";
import {TaskComponentType} from "../types/types";
import {useAppDispatch} from "../state/store";
import {TaskStatuses} from "../api/todolistAPI";

export const Task: FC<TaskComponentType> = memo(({task, todolistId}) => {

    const dispatch = useAppDispatch()
    const onChangeBox = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked

        dispatch(changeTaskStatusTC(todolistId, task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New))
    }, [task.id,todolistId])
    const removeTaskHandler = useCallback(() =>
        dispatch(deleteTasksTC(todolistId, task.id)), [task.id, todolistId])

    const onChangeTitleCallback = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(task.id, newTitle, todolistId))
    }, [task.id, todolistId])

    console.log(task.status, TaskStatuses.Completed)
    return (
        <div className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                onChange={onChangeBox}
            />
            <EditableTitle title={task.title} onChange={onChangeTitleCallback}/>
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
})

