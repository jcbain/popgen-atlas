import React, { useState } from 'react';
import styled from 'styled-components';
import {SelectWrapper, ParamTitle, SelectHeaderWrapper, SelectTitle, OptionWrapper, OptionButton} from './ParamSelectorStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';


const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    & > path {
        color: ${props => props.addhover ? 'white' : 'black'};
        
    }
`

StyledFontAwesomeIcon.propTypes = {
    addhover : PropTypes.bool,
}

export const Option = (props) => {
    const {value, label, getValues, viewheight} = props;
    const sendValues = () => getValues(value, label);


    return (
        <OptionButton viewheight={viewheight} 
            onClick={sendValues} 
            value={value}>
            {label}
        </OptionButton>
    )
}

Option.defaultProps = {
    value: 'value here',
    label: 'label here',
    viewheight: 10
}

export const ParamSelector = (props) => {
    const { className, paramName, paramNameReadable ,options, viewwidth, viewheight, handleSwitch, selectedValue, addHover} = props;
    const [open, setOpen] = useState(false);
    const handleMenuOpen = () => setOpen(!open)
    const handleOptionSelect = (value, label) => {
        handleSwitch(paramName, value);
        setOpen(!open);
    }

    

    const opts = options.map((d, i) => {
        return (
            <Option key={i} 
                viewheight={viewheight} 
                getValues={handleOptionSelect} 
                value={d.value} 
                label={d.label}>
            </Option>
        )
    })


    return (
        <SelectWrapper className={className} 
            viewwidth={viewwidth}>
            <SelectHeaderWrapper addhover={addHover}
                onClick={handleMenuOpen} viewheight={viewheight}>
                <ParamTitle viewwidth={viewwidth} viewheight={viewheight/2}>{paramNameReadable.toLowerCase()}</ParamTitle>
                <SelectTitle>
                    {selectedValue} 
                    <StyledFontAwesomeIcon addhover={addHover} size="xs" pull="right" icon={open ? faAngleUp : faAngleDown} />
                </SelectTitle>
            </SelectHeaderWrapper>
            <OptionWrapper displayopt={open ? 'flex' : 'none'}
                offsetheight={viewheight}
            >
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
    viewwidth: 15,
    viewheight: 7
}

export default ParamSelector;