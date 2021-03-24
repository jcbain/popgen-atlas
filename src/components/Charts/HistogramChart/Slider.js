import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { scaleBand } from 'd3';
import { min } from 'lodash';

import useFonts from '../../../hooks/useFonts'

const SliderDiv = styled.div`
    position: relative;
    border-radius: 3px;
    height: 8px;
    background: #dddddd;
`

const Thumb = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    position: relative;
    top: -8px;
    left: ${({leftposition}) => leftposition}px;

    background: purple;
    cursor: pointer;
`

const Inner = styled.p`
    background: #fffff7;
    width: 21px;
    height: 21px;
    border-radius: 50%;
    position: relative;
    top: 2px;
    left: 2px;
    text-align: center;
    line-height: 21px;
    font-family: 'Roboto';
`

const Slider = ({data}) => {
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
    console.log(Math.round(0.05))
    const handleMouseMove = e => {
        const thumbWidth = thumbRef.current.clientWidth
        const nextPosition = e.clientX - thumbWidth
        const sliderWidth = sliderRef.current.clientWidth

        if(e.clientX > thumbWidth && e.clientX < sliderWidth) {
            const invert = xScale.invert(nextPosition )
            setCurrentVal(invert)
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
            <Thumb ref={thumbRef} onMouseDown={handleMouseDown} leftposition={leftPosition}><Inner>{currentVal}</Inner></Thumb>
        </SliderDiv>
    )
}

export default Slider;