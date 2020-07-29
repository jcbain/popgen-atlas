import React, {useRef} from 'react';
import styled from 'styled-components';
import { closestFromArray } from '../../helpers/Helpers';


const SliderRangeBar = styled.div`
    position: relative;
    border-radius: 4px;
    background: #5a02d6;
    height: ${props => props.sliderheight}vh;
`

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
    font-size: ${props => props.thumbheight/2.2}vh;
    line-height: ${props => props.thumbheight}vh;  
    border: ${props => props.thumbheight/4}vh solid #5a02d6;
`
const getPercentage = (current, max) => (100 * current) / max;
 
const getLeft = (percentage, thumbWidth) => `${percentage}%`;

export const ParamSlider = (props) => {
    const {initial, max} = props;
    const initialPercentage = getPercentage(initial, max);
    const sliderRef = useRef()
    const thumbRef = useRef()
    const diffRef = useRef()

    const sliderheight = 2,
          thumbheight = 3;

    const handleMouseMove = e => {
        let newX = e.clientX - diffRef.current - sliderRef.current.getBoundingClientRect().left;
        const thumbWidth = thumbRef.current.offsetWidth;
        const end = sliderRef.current.offsetWidth - thumbRef.current.offsetWidth;
        const start = 0
        const individualInterval = (end - start - thumbWidth)/11;
        const cumInterval = [...Array(12)].map((d, i) => i * individualInterval)
        const interval = closestFromArray(cumInterval)
        console.log(cumInterval)

        newX = interval(newX)
     
        // if (newX < start) {
        //   newX = 0;
        // }
     
        // if (newX > end -thumbWidth) {
        //   newX = end -thumbWidth;
        // }
        const newPercentage = getPercentage(newX, end);
 
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
        <SliderRangeBar ref={sliderRef} sliderheight={sliderheight}>
            <SliderThumb ref={thumbRef} sliderheight={sliderheight} 
                thumbheight={thumbheight}
                onMouseDown={handleMouseDown}
                leftperc={getLeft(initialPercentage)}
            >
                10K
            </SliderThumb>
        </SliderRangeBar>
    )
}