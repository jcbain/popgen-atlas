import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import DropDown from '../components/inputs/DropDown'
import useTheme from '../hooks/useTheme'

const WrapperDiv = styled.div`
  width: 120px;
`

const data = [
    'dogs', 
    'cats',
    'chicken'
]

export default {
  title: 'Components/DropDown',
  component: Wrapper,
};

const Template = (args) => <Wrapper {...args} />;

export const WithData = Template.bind({});
WithData.args = {
    options: data,
    selection: 'dog',
    param: 'animal',
    makeSelection: (i) => console.log(i)

};

function Wrapper(props){
  const { theme } = useTheme();


  return (
    <ThemeProvider theme={theme}>
      <WrapperDiv>

        <DropDown {...props} />
      </WrapperDiv>
    </ThemeProvider>
  )
}