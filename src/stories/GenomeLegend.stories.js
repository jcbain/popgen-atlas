import React from 'react';
import { ThemeProvider } from 'styled-components';

import Legend from '../components/charts/GenomeChart/Legend';
import useTheme from '../hooks/useTheme';
import useFonts from '../hooks/useFonts'

export default {
  title: 'Components/GenomeLegend',
  component: Wrapper,
};

const Template = (args) => <Wrapper {...args} />;

export const WithData = Template.bind({});
WithData.args = {
    title: 'simple legend title',
    minVal: -4,
    maxVal: 4
};

function Wrapper(props){
    useFonts();
    const { theme } = useTheme()

    return (
        <ThemeProvider theme={theme}>
            <Legend {...props}/>
        </ThemeProvider>
    )
}