import { TInput, TInputProps } from '@components/ui/Input';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FaCat } from 'react-icons/fa';

export default {
    name: 'Button',
    component: TInput,
    // argTypes: {
    //     color: {
    //         options: variants,
    //         control: {
    //             type: 'select',
    //         },
    //     }
    // }
} as ComponentMeta<typeof TInput>;

const Template: ComponentStory<typeof TInput> = (args) => <TInput {...args} />

const defaultArgs: TInputProps = {
    label: 'Hello world!'
};

export const Primary = Template.bind({});
Primary.args = {
    ...defaultArgs,
}
