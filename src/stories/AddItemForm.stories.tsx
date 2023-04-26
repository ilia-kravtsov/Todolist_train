import type { Meta, StoryObj } from '@storybook/react';
import AddItemFrom from "../components/AddItemFrom";

const meta: Meta<typeof AddItemFrom> = {
    title: 'Components/AddItemFrom',
    component: AddItemFrom,
    tags: ['autodocs'],
    argTypes: {

    },
};

export default meta;

type Story = StoryObj<typeof AddItemFrom>;

export const AddItemFromExample = () => <AddItemFrom addItem={() => {}}/>



