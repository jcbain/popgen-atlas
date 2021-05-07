import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { scaleLinear, scaleBand, interpolateHcl } from 'd3'
import { range } from 'lodash';

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
             context.fillStyle = d === 0 ? '#fffff7' : d >= 0.5 ? 'red' : 'blue';
            context.fillRect(0, yBand(i) , canvas.width, yBand.bandwidth())
        })
    }, [ref, data])

    return <StyledCanvas ref={ref} {...rest}/>


}

export default Genome;