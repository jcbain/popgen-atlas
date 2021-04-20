import React from 'react';
import { range } from 'lodash'
import { ThemeProvider } from 'styled-components';

import Slider from '../components/charts/HistogramChart/Slider'
import useTheme from '../hooks/useTheme';
import useFonts from '../hooks/useFonts';

const data = range(0, 100)

export default {
  title: 'Components/Slider',
  component: Wrapper,
};

const Template = (args) => <Wrapper {...args} />;

export const WithData = Template.bind({});
WithData.args = {
    label: 'some data',
    data: data,
    setValue: (i) => console.log(i)

};

export const LongData = Template.bind({});
LongData.args = {
    label: 'long data',
    data: range(1, 1000),
    setValue: (i) => console.log(i)
}

export const BigNumbers = Template.bind({});
BigNumbers.args = {
    label: 'big numbers',
    data: range(10000, 120000, 2000),
    setValue: (i) => console.log(i)
}

function Wrapper(props){
    useFonts();
    const { theme } = useTheme()

    return (
        <ThemeProvider theme={theme}>
            <Slider {...props} />
        </ThemeProvider>
    )
}