import React from 'react';
import styled from 'styled-components';

import Switch from './Switch'
import { rest } from 'lodash';

const SwitchWrapper = styled.div`
    width: ${({ width }) => width};
    height: 50px;
    background: ${({ theme }) => theme.buttoncoloralpha2};
    border-radius: 5px;
    display: grid;
    padding-left: 4px;
    padding-right: 4px;
    grid-template-columns: 0.5fr 1.0fr;
    border: 3px solid ${({ theme }) => theme.buttoncolor};
    color: ${({ theme }) => theme.buttoncolor};
`

const Label = styled.p`
    text-align: center;
    font-family: 'Baloo Tamma 2', cursive;
    font-weight: 600;

`


const SwitchContainer = (props) => {
    const { label, width, ...rest} = props;

    return (
        <SwitchWrapper width={width}>
            <Switch {...rest} />
            <Label>{ label }</Label>
        </SwitchWrapper>
    )
}

SwitchContainer.defaultProps = {
    width: '15%'
}

export default SwitchContainer;