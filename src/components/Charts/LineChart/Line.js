import React, { useEffect, useRef, useState } from 'react';
import { scaleLinear, scaleBand } from 'd3';

import Brush from './Brush'
import XAxis from '../axes/XAxis'
import YAxis from '../axes/YAxis'
import useResizeObserver from '../../../hooks/useResizeObserver';
import useDataSummaries from '../../../hooks/useDataSummaries';
import useFriendlyLabels from '../../../hooks/useFriendlyLabels';
import chartSize from '../styles/chartStyles';


const Line = ({data, xVar, yVar, theme, addBrush, upperLimit, lowerLimit, setUpperLimit, setLowerLimit, secondaryLL, secondaryUL}) => {
    const ref = useRef();
    const { friendlyLabels } = useFriendlyLabels()
    const [ svgRef, observedEntry ] = useResizeObserver();
    const [ width, setWidth ] = useState()
    const [ height, setHeight ] = useState()
    const [ leftPadding, setLeftPadding ] = useState()
    const leftPaddingModifier = 0.1
    const heightModifier = addBrush ? .6 : .75;
    const heightPerc = heightModifier * 100;

    const newData = data.filter( d => d[xVar] <= upperLimit && d[xVar] >= lowerLimit)
    const newFiltered = newData.filter(v => v[xVar] >= secondaryLL && v[xVar] <= secondaryUL)
    const { minX, maxX, uniqX } = useDataSummaries(newData, xVar, yVar)
    const { minY, maxY } = useDataSummaries(data, xVar, yVar)

    var [ StyledCanvas, StyledForeign ] = chartSize()
    
    useEffect(() => {
        const canvas = ref.current;
        const context = canvas.getContext('2d');
        canvas.width = 1000;
        context.clearRect(0, 0, canvas.width, canvas.height)

        const xScale = scaleLinear().domain([minX, maxX]).range([(canvas.width * leftPaddingModifier), canvas.width])
        const yScale = scaleLinear().domain([maxY, minY]).range([0, canvas.height])
        const lineColor = secondaryUL ? theme.nonFocusColor : theme.lineColor

        drawGraphLine(context, 4, lineColor, newData, xScale, yScale, xVar, yVar)
        drawGraphLine(context, 2, theme.lineColor, newFiltered, xScale, yScale, xVar, yVar)

    }, [newData, width, height])

    useEffect(() => {
        handleResize()
        window.addEventListener('resize',  handleResize)

        function handleResize() {
            [StyledCanvas, StyledForeign] = chartSize();

            if(observedEntry.target) {
                const { target } = observedEntry;
                const newWidth = target.clientWidth
                setWidth(newWidth)
                setLeftPadding(newWidth * leftPaddingModifier)       
                setHeight(target.clientHeight * heightModifier)
            }
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
            <YAxis width={width} scale={yScale} x0={width * leftPaddingModifier} includeAxisLine={false} includeAxisLabel={!addBrush} includeTicks={true} paddingLeft={width * leftPaddingModifier} pixelsPerTick={height/5} labelText={friendlyLabels[yVar]}/>
            <XAxis width={width} height={height} scale={xScale} includeAxisLine={false} includeAxisLabel={addBrush ? true : false} labelText={friendlyLabels[xVar]}/>

            <StyledForeign>
                <StyledCanvas ref={ref} heightperc={heightPerc}/>
            </StyledForeign>
            
            {addBrush && <Brush width={width} height={height} xScale={xScale} setUpperLimit={setUpperLimit} setLowerLimit={setLowerLimit}/>}
        </svg>
    )
}

function drawGraphLine(context, lineWidth, lineColor, newData, xScale, yScale, xVar, yVar) {
    context.beginPath();
    context.lineWidth = lineWidth;
    context.strokeStyle = lineColor;
    context.globalAlpha = 1;
    context.lineJoin = "round";
    newData.forEach(d => {
        context.lineTo(xScale(d[xVar]), yScale(d[yVar]));
    });
    context.stroke();
    context.closePath();
}

export default Line;