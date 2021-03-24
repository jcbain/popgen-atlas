import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { bin, scaleLinear } from 'd3'

import useResizeObserver from '../../../hooks/useResizeObserver';
import useDataSummaries from '../../../hooks/useDataSummaries'
import XAxis from '../axes/XAxisContinuous';
import YAxis from '../axes/YAxis'


const StyledCanvas = styled.canvas`
    position: absolute;
    width: 100%;
    height: 75%;
`

const StyledForeign = styled.foreignObject`
    width: 100%;
    height: 100%;
`

const Histogram = ({data, variable}) => {
    const ref = useRef();
    const [ svgRef, observedEntry ] = useResizeObserver();
    const [ width, setWidth ] = useState()
    const [ height, setHeight ] = useState()
    const [ leftPadding, setLeftPadding ] = useState()
    const leftPaddingModifier = 0.1
    const nBins = 10;

    const binner = bin().thresholds(nBins)

    const newData = binner(data.map(d => d[variable]))

    const { minX, maxY } = useDataSummaries(newData, 'x0', 'length')
    const { maxX } = useDataSummaries(newData, 'x1', 'length')

    console.log(maxX)


    useEffect(() => {
        const canvas = ref.current;
        const context = canvas.getContext('2d');
        canvas.width = 1000;
        context.clearRect(0, 0, canvas.width, canvas.height)

        const xScale = scaleLinear().domain([minX, maxX]).range([(canvas.width * leftPaddingModifier), canvas.width])
        const yScale = scaleLinear().domain([maxY, 0]).range([0, canvas.height])
        const width = (canvas.width / newData.length) - 20
        newData.forEach((v, i) => {

            
    
            context.fillStyle = hexToRGB('#682CFE', 0.5)
            context.strokeStyle = '#682CFE'

            context.fillRect(xScale(v.x0) + 10, yScale(v.length), width,  canvas.height - yScale(v.length))
            context.strokeRect(xScale(v.x0) + 10, yScale(v.length), width,  canvas.height - yScale(v.length))

        })

    }, [newData, minX, maxX, maxY]) 



    useEffect(() => {
        if(observedEntry.target){
            const { target } = observedEntry;
            const newWidth = target.clientWidth
            setWidth(newWidth) 
            setLeftPadding(newWidth * leftPaddingModifier)       
            setHeight(target.clientHeight * 0.75)

        }
    }, [observedEntry])


    const xScale = scaleLinear().domain([minX, maxX]).range([leftPadding, width])
    const yScale = scaleLinear().domain([maxY, 0]).range([0, height])

    return (
        <svg ref={svgRef} width="100%" height="100%">
            <XAxis width={width} height={height} scale={xScale} includeAxisLine={false}/>
            <YAxis width={width} scale={yScale} x0={width * leftPaddingModifier} includeAxisLine={false} includeTicks={true} paddingLeft={width * leftPaddingModifier} pixelsPerTick={height/5}/>

            <StyledForeign>
                <StyledCanvas ref={ref}></StyledCanvas>
            </StyledForeign>
        </svg>

    )
}

function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}



export default Histogram;