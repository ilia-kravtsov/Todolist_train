import React from "react";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {Meta, StoryObj} from "@storybook/react";
import {AppWithRedux} from "./AppWithRedux";

const meta: Meta<typeof AppWithRedux> = {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],
}

export default meta;

type Story = StoryObj<typeof AppWithRedux>;

const AppWithReduxWrapper = () => {
    return <AppWithRedux/>
}

export const AppWithReduxExample: Story = {
    render: () => <AppWithReduxWrapper/>
}
