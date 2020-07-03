import React, { useState } from 'react';
import {SelectWrapper, ParamTitle, SelectHeaderWrapper, SelectTitle, OptionWrapper, OptionButton} from './ParamSelectorStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'




const Option = (props) => {
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

export const ParamSelector = (props) => {
    const { className, paramName ,options, viewwidth, viewheight} = props;
    const [ selectedVal, handleSelectedVal ] = useState(options[0]);
    const [open, setOpen] = useState(false);
    const handleMenuOpen = () => setOpen(!open)
    const handleOptionSelect = (value, label) => {
        handleSelectedVal({value: value, label: label})
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
            <SelectHeaderWrapper onClick={handleMenuOpen} viewheight={viewheight}>
                <ParamTitle viewheight={viewheight/2}>{paramName.toLowerCase()}</ParamTitle>
                <SelectTitle>
                    {selectedVal.label} 
                    <FontAwesomeIcon size="xs" pull="right" icon={open ? faAngleUp : faAngleDown} />
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