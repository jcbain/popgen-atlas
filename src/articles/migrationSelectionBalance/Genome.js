import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import {  scaleBand, interpolateHcl } from 'd3'

const StyledCanvas = styled.canvas`
`

const Genome = ({data, ...rest}) => {
    const ref = useRef();

    useEffect(() => {
        const canvas = ref.current;
        const context = canvas.getContext('2d');

        canvas.width = 100;
        canvas.height = 250;
        context.clearRect(0, 0, canvas.width, canvas.height)
    
        const yBand = scaleBand().domain([...data].map((d, i) => i)).range([0, canvas.height])
        console.log(yBand.bandwidth())
        data.forEach((d, i) => {
            if (i === 0 || i === data.length - 1) {
                console.log(yBand(i))
            }
             context.fillStyle = d === 0 ? '#fffff7' : d >= 0.5 ? '#eb4034' : '#0082e6';
            context.fillRect(0, yBand(i) , canvas.width, yBand.bandwidth())
        })
    }, [ref, data])

    return <StyledCanvas ref={ref} {...rest}/>


}

export default Genome;