import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {SelectWrapper, ParamTitle, SelectHeaderWrapper, SelectTitle, OptionWrapper, OptionButton} from './ParamSelectorStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';


const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    & > path {
        // color: ${props => props.addhover ? 'white' : 'black'};
        
    }
`

StyledFontAwesomeIcon.propTypes = {
    addhover : PropTypes.bool,
}

export const Option = (props) => {
    const {value, label, getValues } = props;
    const sendValues = () => getValues(value, label);


    return (
        <OptionButton onClick={sendValues} 
            value={value}>
            {label}
        </OptionButton>
    )
}

Option.defaultProps = {
    value: 'value here',
    label: 'label here',
}

export const ParamSelector = (props) => {
    const { className, paramName, paramNameReadable ,options, handleSwitch, selectedValue } = props;
    const [open, setOpen] = useState(false);
    const optionsRef = useRef();

    const handleMenuOpen = () => setOpen(!open)
    const handleOptionSelect = (value, label) => {
        handleSwitch(paramName, value);
        setOpen(!open);
    }

    const handleClickOutside = e => {
        e.preventDefault();
        if (optionsRef.current && !optionsRef.current.contains(e.target)){
            setOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
    }, [])

    

    const opts = options.map((d, i) => {
        return (
            <Option key={i} 
                getValues={handleOptionSelect} 
                value={d.value} 
                label={d.label}>
            </Option>
        )
    })


    return (
        <SelectWrapper className={className}>
            <SelectHeaderWrapper onClick={handleMenuOpen}>
                <ParamTitle>{paramNameReadable.toLowerCase()}</ParamTitle>
                <SelectTitle>
                    {selectedValue} 
                    <StyledFontAwesomeIcon size="xs" pull="right" icon={open ? faAngleUp : faAngleDown} />
                </SelectTitle>
            </SelectHeaderWrapper>
            <OptionWrapper ref={optionsRef} displayopt={open ? 'flex' : 'none'}>
                {opts}
            </OptionWrapper>
        </SelectWrapper>

        
    )
}

ParamSelector.propTypes = {
    addhover : PropTypes.bool,
}

ParamSelector.defaultProps = {
    className: 'param-selector',
    paramName: 'Param Name',
    handleSwitch: () => console.log('handle passing up state here'),
}

export default ParamSelector;