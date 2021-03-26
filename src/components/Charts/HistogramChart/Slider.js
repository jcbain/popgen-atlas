import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { scaleBand } from 'd3';
import { min } from 'lodash';

import useFonts from '../../../hooks/useFonts'

const SliderDiv = styled.div`
    position: relative;
    border-radius: 3px;
    height: 8px;
    background: ${({ theme }) => theme.sliderColor};
`

const Thumb = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: ${({leftposition}) => leftposition}px;
    background: ${({ theme }) => theme.thumbSliderOutline};
    cursor: pointer;
`

const Inner = styled.p`
    background: ${({ theme }) => theme.thumbSliderColor};
    width: 21px;
    height: 21px;
    border-radius: 50%;
    position: absolute;
    top: 0.5px;
    transform: translateY(-50%);
    left: 2px;
    text-align: center;
    line-height: 21px;
    font-size: 12px;
    font-family: 'Roboto';
`

const Slider = ({data, setValue}) => {
    const sliderRef = useRef()
    const thumbRef = useRef();
    const [leftPosition, setLeftPosition ] = useState(0)
    const [start, setStart] = useState()
    const [end, setEnd] = useState()
    const [currentVal, setCurrentVal] = useState(min(data.map(d => d)))

    useFonts()

    useEffect(() => {
        if(thumbRef.current && sliderRef.current){
            setStart(0)
            setEnd(sliderRef.current.clientWidth)
        }
    }, [thumbRef, sliderRef])

    const xScale = scaleBand().domain(data).range([start, end])
    xScale.invert = function(i){
        const eachBand = this.step()
        const adjuster = this.range()[0]
        const index = Math.round(( i - adjuster) / eachBand)

        const value = this.domain()[index]
        return value ? value: this.domain()[0]
    }

    const handleMouseMove = e => {
        const thumbWidth = thumbRef.current.clientWidth
        const nextPosition = e.clientX - thumbWidth - sliderRef.current.getBoundingClientRect().left
        const sliderWidth = sliderRef.current.clientWidth

        if((e.clientX - sliderRef.current.getBoundingClientRect().left) > thumbWidth && (e.clientX - sliderRef.current.getBoundingClientRect().left) < sliderWidth) {
            const invert = xScale.invert(nextPosition )
            setCurrentVal(invert)
            setValue(invert)
            setLeftPosition(xScale(invert) )
        }
        
    }

    const handleMouseUp = () => {
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('mousemove', handleMouseMove);
    }

    const handleMouseDown = e => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp)
    }
 

    return (
        <SliderDiv ref={sliderRef}>
            <Thumb ref={thumbRef} onMouseDown={handleMouseDown} leftposition={leftPosition}><Inner>{cleanValue(currentVal)}</Inner></Thumb>
        </SliderDiv>
    )
}

function cleanValue(val) {
    const cleanVal = val >= 1000 ? `${val/1000}k` : `${val}`;
    return cleanVal
}

export default Slider;