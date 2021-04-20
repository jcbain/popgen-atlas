import React from 'react';
import { ThemeProvider } from 'styled-components';

import ParamCard from '../components/widgets/ParamCard'
import useTheme from '../hooks/useTheme';
import useFonts from '../hooks/useFonts';


export default {
  title: 'Components/ParamCard',
  component: Wrapper,
};

const Template = (args) => <Wrapper {...args} />;

export const WithData = Template.bind({});
WithData.args = {
    label: 'mutation',
    value: 0.000001

};


function Wrapper(props){
    useFonts();
    const { theme } = useTheme()

    return (
        <ThemeProvider theme={theme}>
            <div style={{width: "100px"}}>

                <ParamCard {...props} />
            </div>
        </ThemeProvider>
    )
}