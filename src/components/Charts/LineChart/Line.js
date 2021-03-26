import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { scaleLinear, scaleBand } from 'd3';

import Brush from './Brush'
import XAxis from '../axes/XAxis'
import YAxis from '../axes/YAxis'
import useResizeObserver from '../../../hooks/useResizeObserver';
import useDataSummaries from '../../../hooks/useDataSummaries';

const StyledCanvas = styled.canvas`
    position: absolute;
    width: 100%;
    height: ${({ heightperc }) => heightperc}%;
`

const StyledForeign = styled.foreignObject`
    width: 100%;
    height: 100%;
`

const Line = ({data, xVar, yVar, theme, addBrush, upperLimit, lowerLimit, setUpperLimit, setLowerLimit, secondaryLL, secondaryUL}) => {
    const ref = useRef();
    const [ svgRef, observedEntry ] = useResizeObserver();
    const [ width, setWidth ] = useState()
    const [ height, setHeight ] = useState()
    const [ leftPadding, setLeftPadding ] = useState()
    const leftPaddingModifier = 0.1
    const heightModifier = addBrush ? .6 : .75;
    const heightPerc = heightModifier * 100;

    const newData = data.filter( d => d[xVar] <= upperLimit && d[xVar] >= lowerLimit)
    const { minX, maxX, uniqX } = useDataSummaries(newData, xVar, yVar)
    const { minY, maxY } = useDataSummaries(data, xVar, yVar)
  

    useEffect(() => {
        const canvas = ref.current;
        const context = canvas.getContext('2d');
        canvas.width = 1000;
        context.clearRect(0, 0, canvas.width, canvas.height)

        const xScale = scaleLinear().domain([minX, maxX]).range([(canvas.width * leftPaddingModifier), canvas.width])
        const yScale = scaleLinear().domain([maxY, minY]).range([0, canvas.height])

        context.beginPath();
        context.lineWidth = 4;
        context.strokeStyle = secondaryUL ? theme.nonFocusColor : theme.lineColor;
        context.globalAlpha = 1;
        context.lineJoin = "round";
        newData.forEach(d => {
            context.lineTo(xScale(d[xVar]), yScale(d[yVar]));
        });
        context.stroke();
        context.closePath();

        context.beginPath();
        context.lineWidth = 2;
        context.strokeStyle = theme.lineColor;
        context.globalAlpha = 1;
        context.lineJoin = "round";
        newData.filter(v => v[xVar] >= secondaryLL && v[xVar] <= secondaryUL).forEach(d => {
            context.lineTo(xScale(d[xVar]), yScale(d[yVar]));
        });
        context.stroke();
        context.closePath();


    }, [newData, width, height])

    useEffect(() => {
        if(observedEntry.target){
            const { target } = observedEntry;
            const newWidth = target.clientWidth
            setWidth(newWidth) 
            setLeftPadding(newWidth * leftPaddingModifier)       
            setHeight(target.clientHeight * heightModifier)

        }
    }, [observedEntry])

    const xScale = scaleBand().domain(uniqX).range([leftPadding, width])

    xScale.invert = function(i){
        const eachBand = this.step()
        const adjuster = this.range()[0]
        const index = Math.round(( i -adjuster) / eachBand)

        const value = this.domain()[index]
        return value ? value: this.domain()[this.domain().length - 1]
    }
    const yScale = scaleLinear().domain([maxY, minY]).range([0, height])


    return (
        <svg ref={svgRef} width="100%" height="100%">

            <YAxis width={width} scale={yScale} x0={width * leftPaddingModifier} includeAxisLine={false} includeTicks={true} paddingLeft={width * leftPaddingModifier} pixelsPerTick={height/5}/>
            <XAxis width={width} height={height} scale={xScale} includeAxisLine={false}/>
            <StyledForeign>
                <StyledCanvas ref={ref} heightperc={heightPerc} />
            </StyledForeign>
            {addBrush && <Brush width={width} height={height} xScale={xScale} setUpperLimit={setUpperLimit} setLowerLimit={setLowerLimit}/>}
        </svg>
    )
}

export default Line;