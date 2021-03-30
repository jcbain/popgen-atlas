import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { bin, scaleLinear } from 'd3'

import useResizeObserver from '../../../hooks/useResizeObserver';
import useDataSummaries from '../../../hooks/useDataSummaries'
import XAxis from '../axes/XAxisContinuous';
import YAxis from '../axes/YAxis'
import useFriendlyLabels from '../../../hooks/useFriendlyLabels';


const StyledCanvas = styled.canvas`
    position: absolute;
    width: 100%;
    height: 75%;
`

const StyledForeign = styled.foreignObject`
    width: 100%;
    height: 100%;
`

const Histogram = ({data, variable, theme}) => {
    const ref = useRef();
    const { friendlyLabels } = useFriendlyLabels();
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


    useEffect(() => {
        const canvas = ref.current;
        const context = canvas.getContext('2d');
        canvas.width = 1000;
        context.clearRect(0, 0, canvas.width, canvas.height)

        const xScale = scaleLinear().domain([minX, maxX]).range([(canvas.width * leftPaddingModifier), canvas.width])
        const yScale = scaleLinear().domain([maxY, 0]).range([0, canvas.height])
        const width = (canvas.width / newData.length) - 20
        newData.forEach((v, i) => {

            
    
            context.fillStyle = theme.binColor;
            context.strokeStyle = theme.binOutline;

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
            <XAxis width={width} height={height} scale={xScale} includeAxisLine={false} labelText={friendlyLabels[variable]}/>
            <YAxis width={width} scale={yScale} x0={width * leftPaddingModifier} includeAxisLine={false} includeTicks={true} paddingLeft={width * leftPaddingModifier} pixelsPerTick={height/5} labelText={'count'}/>

            <StyledForeign>
                <StyledCanvas ref={ref}></StyledCanvas>
            </StyledForeign>
        </svg>

    )
}



export default Histogram;