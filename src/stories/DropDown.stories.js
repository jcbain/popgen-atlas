import React from 'react';

import DropDown from '../components/inputs/DropDown'

const data = [
    { id: 0, option: 'dogs'},
    { id: 1, option: 'cats'},
    { id: 2, option: 'pigs'}
]

export default {
  title: 'Components/DropDown',
  component: DropDown,
};

const Template = (args) => <DropDown {...args} />;

export const WithData = Template.bind({});
WithData.args = {
    options: data,
    selection: 'dog',
    makeSelection: (i) => console.log(i)

};