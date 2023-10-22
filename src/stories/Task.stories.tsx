import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "../components/Task";
import React from "react";
import {ReduxStoreProviderDecorator} from "../components/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TaskType} from "../types/types";

const meta: Meta<typeof Task> = {
    title: 'Todolist/Task',
    component: Task,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],
    args: {
        todolistId: 'todolistId1',
        // @ts-ignore
        task: {id: 'sdfgsadfasdf23', title: 'JS', isDone: true},
    },
}

export default meta;

type Story = StoryObj<typeof Task>;

const TaskCopy = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    // @ts-ignore
    return <Task task={task} todolistId={'todolistId1'}/>
}

export const TaskWithRedux: Story = {
    render: () => <TaskCopy/>
}
