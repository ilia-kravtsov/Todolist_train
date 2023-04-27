import React, {useCallback} from "react";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TaskType} from "../types/types";
import {Meta, StoryObj} from "@storybook/react";
import {EditableTitle} from "./EditableTitle";
import {changeTodolistTitleAC} from "../state/todolists-reducer";


const meta: Meta<typeof EditableTitle> = {
    title: 'Todolist/EditableTitle',
    component: EditableTitle,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],
}

export default meta;

type Story = StoryObj<typeof EditableTitle>;

const EditableTitleWrapper = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    const dispatch = useDispatch()
    const changeTodolistTitle = useCallback((newTitle: string) => {
        dispatch(changeTodolistTitleAC('todolistId1', newTitle))
    }, [])
    return <EditableTitle title={task.title} onChange={changeTodolistTitle}/>
}

export const EditableTitleWithRedux: Story = {
    render: () => <EditableTitleWrapper/>
}
