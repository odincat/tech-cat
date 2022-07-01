import { TButton, TButtonColors, TButtonProps } from '@components/ui/Button';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FaCat } from 'react-icons/fa';

const variants: TButtonColors[] = ['primary', 'secondary', 'blue', 'green', 'yellow', 'red'];

export default {
    name: 'Button',
    component: TButton,
    argTypes: {
        color: {
            options: variants,
            control: {
                type: 'select',
            },
        }
    }
} as ComponentMeta<typeof TButton>;

const Template: ComponentStory<typeof TButton> = (args) => <TButton {...args} />

const defaultArgs = {
    children: 'Meow',
    noEffect: false,
    compact: false,
    disabled: false,
    href: 'https://tech-cat.de'
};

export const Primary = Template.bind({});
Primary.args = {
    ...defaultArgs,
    color: 'primary',
}

export const WithIcon = Template.bind({});
WithIcon.args = {
    ...defaultArgs,
    color: 'primary',
    rightIcon: <FaCat className='global-icon' />,
    rightIconColor: 'green',
    leftIcon: <FaCat className='global-icon' />,
    leftIconColor: 'green'
}

export const NoEffect = Template.bind({});
NoEffect.args = {
    ...defaultArgs,
    color: 'blue',
    noEffect: true
}