import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import { min, max } from 'd3-array';
import { scaleLinear } from 'd3-scale';

import { closestFromArray } from '../../helpers/Helpers';
import { SelectWrapper } from './ParamSelectorStyles'


const SliderRangeBar = styled.div`
    position: relative;
    border-radius: 10px;
    background: ${props => props.theme.slidercolor};
    height: ${props => props.sliderheight}vh;
`

SliderRangeBar.defaultProps = {
    sliderheight : 1,
    theme : {
        slidercolor: '#5a02d6'
    }
}

const SliderThumb = styled.div`
    width: ${props => props.thumbheight}vh;
    height: ${props => props.thumbheight}vh;
    border-radius: 50%;
    position: relative;
    top: -${props => ((props.thumbheight + props.thumbheight/2) - props.sliderheight)/2}vh;
    left: ${props => props.leftperc};
    background: white;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    font-size: ${props => props.thumbheight/2.2}vh;
    line-height: ${props => props.thumbheight}vh;  
    border: ${props => props.thumbheight/4}vh solid ${props => props.theme.thumbcolor};
`


const getPercentage = (current, max) => (100 * current) / max;
 
const getLeft = (percentage, thumbWidth) => `${percentage}%`;
const prettifyText = (val) => {
    const prettifiedVal = val >= 1000 ? `${val/1000}K` : `${val}`;
    return prettifiedVal
}

export const ParamSlider = (props) => {
    const {options, undateValChange, className, viewwidth} = props;
    const optionValues = options.options.map(d => d.value)
    const minVal = min(optionValues)
    const initial = minVal - minVal
    const maxVal = max(optionValues) 
    const terminus = maxVal - minVal
    const [thumbText, setThumbText] = useState(minVal)


    const initialPercentage = getPercentage(initial, terminus);
    const sliderRef = useRef()
    const thumbRef = useRef()
    const diffRef = useRef()


    const sliderheight = 1.5,
          thumbheight = 3;

    const handleMouseMove = e => {
        let newX = e.clientX - diffRef.current - sliderRef.current.getBoundingClientRect().left;
        const thumbWidth = thumbRef.current.offsetWidth;
        const end = sliderRef.current.offsetWidth - thumbRef.current.offsetWidth;
        const start = 0
        const sliderScale = scaleLinear().domain([minVal, maxVal]).range([start, end - thumbWidth])
        const cumInterval = optionValues.map((d, i) => sliderScale(d))
        const interval = closestFromArray(cumInterval);
        const tickInterval = closestFromArray(optionValues)

        newX = interval(newX)
        const currentVal = tickInterval(sliderScale.invert(newX))
        setThumbText(currentVal)
        undateValChange(currentVal)
        const newPercentage = getPercentage(newX, end)
        thumbRef.current.style.left = getLeft(newPercentage, thumbWidth);
    }

    const handleMouseUp = e => {
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove);
    }

    const handleMouseDown = e => {
        diffRef.current = e.clientX - thumbRef.current.getBoundingClientRect().left;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

    }

    return (
        <SelectWrapper className={className}
            viewwidth={viewwidth}>
            <SliderRangeBar ref={sliderRef} sliderheight={sliderheight}>
                <SliderThumb ref={thumbRef} sliderheight={sliderheight} 
                    thumbheight={thumbheight}
                    onMouseDown={handleMouseDown}
                    leftperc={getLeft(initialPercentage)}
                >
                    {prettifyText(thumbText)}
                </SliderThumb>
            </SliderRangeBar>
        </SelectWrapper>
    )
}

ParamSlider.defaultProps = {
    className: 'param-slider',
    viewwidth: 20,
}