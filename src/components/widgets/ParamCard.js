import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    padding: 10px 10px;
    background-color: ${({ theme }) => theme.paramCardBackground};
    border: 2px solid ${({ theme }) => theme.paramCardOutline};
    border-radius: 5px;
    display: grid;
    grid-template-rows: 15px 25px;

`

const Label = styled.p`
    font-family: ${({ theme }) => theme.funFont};
    color: ${({ theme }) => theme.paramCardOutline};
    margin-block-end: 0;
    margin-block-start: 0;
    font-size: 12px;
`

const Value = styled.p`
    font-family: ${({ theme }) => theme.funFont};
    color: ${({ theme }) => theme.paramCardOutline};
    margin-block-end: 0;
    margin-block-start: 0;
    font-size: 20px;
`

const ParamCard = ({label, value, ...rest}) => {

    return (
        <Wrapper {...rest}>
            <Label>{label}</Label>
            <Value>{value}</Value>
        </Wrapper>
    )
}

export default ParamCard;


