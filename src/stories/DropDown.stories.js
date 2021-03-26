import React from 'react';
import styled from 'styled-components';

import DropDown from '../components/inputs/DropDown'

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


  return (
    <WrapperDiv>

      <DropDown {...props} />
    </WrapperDiv>
  )
}