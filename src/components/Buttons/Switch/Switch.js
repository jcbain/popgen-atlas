import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    height: 0;
    width: 0;
    margin: unset;
    visibility: hidden;
    &:checked + .switch-label .switch-button {
        left: calc(100% - 2px);
        transform: translateX(-100%);
    }
`;

const StyledLabel = styled.label`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    width: 50px;
    height: 25px;
    background: ${props => props.ison ? props => props.theme.buttoncolor : props.theme.buttoncoloralpha};
    border-radius: 100px;
    position: relative;
    display: inline-block;
    margin: auto;
    transition: background-color .2s;
    &:hover .switch-button {
        width: 25px;
    }
`

const StyledSpan = styled.span`
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 45px;
    transition: 0.2s;
    background: #fff;
    box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
`;


const Switch = (props) => {
    const { identifier, isOn, handleToggle } = props;

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <StyledInput checked={isOn}
                onChange={handleToggle}
                type="checkbox" id={identifier}/>
            <StyledLabel ison={isOn} className={'switch-label'} htmlFor={identifier}>
                <StyledSpan className={'switch-button'}/>
            </StyledLabel>

        </div>
    )
}

Switch.defaultProps = {
    identifier: 'switch',
    isOn: true,
    handleToggle: () => console.log('I do nothing yet')
}

export default Switch;