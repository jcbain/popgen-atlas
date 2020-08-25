import React, { useRef, createRef, useEffect, useState, forwardRef } from 'react';
import { line, curveMonotoneX }  from 'd3-shape';
import { min, max } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { flatten, uniq, toString } from 'lodash'
import {ThemeProvider} from 'styled-components';

import { FocusedStop, OutsideStop } from './LineChartStyles';
import BrushHorizontal from './BrushHorizontal';
import XAxis from '../Axes/XAxis';
import YAxis from '../Axes/YAxis';
import ReferenceLine from './ReferenceLine';
import { closestFromArray } from '../../../helpers/Helpers';
import { ChartSVG } from '../ChartStyles'


const LineChart = (props) => {
    const { className, data, xDomain, contextDomain, gridarea,
            nestedVar, xVar, yVar, uniqId, includeXAxisLabel, includeYAxisLabel,
            popStrokeWidth, isContext, xAxisLabel, yAxisLabel, chartname,
            visibleOpacity, addBrush, getDomain, addReferenceLine, themes } = props;
    const lineChartRef = useRef(null);
    const [xPos, setXPos] = useState(undefined);
    const [yTextPos, setYTextPos] = useState([...Array(data.length)].map(() => Object()))
    const [showStroke, setShowStroke] = useState(false)
    


    
    const width = isContext ? 1000 : 500,
          height = isContext ? 100 : 250;

    const chartPaddingPerc  = {top: 5, bottom: 15, left: 10, right: 5}
    const chartPadding = {
        top: height * (chartPaddingPerc.top/100),
        bottom:  height * (chartPaddingPerc.bottom/100),
        left: width * (chartPaddingPerc.left/100),
        right: width * (chartPaddingPerc.right/100),
    };
    const minY = min(data.map(d => min(d[nestedVar], v => v[yVar]))),
          maxY = max(data.map(d => max(d[nestedVar], v => v[yVar])));
    const minX = min(data.map(d => min(d[nestedVar], v => v[xVar]))),
          maxX = max(data.map(d => max(d[nestedVar], v => v[xVar])));
    const xScale = scaleLinear().domain(xDomain).range([chartPadding.left, width - chartPadding.right]), 
          yScale = scaleLinear().domain([maxY, minY]).range([chartPadding.top, height - chartPadding.bottom]),
          brushScale = scaleLinear().domain([minX, maxX]).range([0, 100])
    const drawLine = line().x(d => xScale(d[xVar])).y(d => yScale(d[yVar])).curve(curveMonotoneX);
    const uniqXVals = uniq(flatten(data.map( d => d[nestedVar].map(v => v[xVar] ))), true)
    const interval = closestFromArray(uniqXVals);

    const gradients = data.map((d, i) => {
        return ( <linearGradient key={i}
            id={`tmp-lineargradient-${d.key}-${uniqId}`}
            x1={chartPadding.left} x2={width - chartPadding.right}
            y1={0} y2={0}
            gradientUnits={'userSpaceOnUse'}
        >
            <ThemeProvider theme={themes[d.key]}>
                <OutsideStop className={`left-${uniqId}`} offset={`${brushScale(contextDomain[0])}%`} stopopacity={visibleOpacity ? 1 : 0}></OutsideStop>
                <FocusedStop className={`left-${uniqId}`} offset={`${brushScale(contextDomain[0])}%`}></FocusedStop>
                <FocusedStop className={`right-${uniqId}`} offset={`${brushScale(contextDomain[1])}%`}></FocusedStop>
                <OutsideStop className={`right-${uniqId}`}offset={`${brushScale(contextDomain[1])}%`} stopopacity={visibleOpacity ? 1 : 0}></OutsideStop>
            </ThemeProvider>
        </linearGradient>
    )})

    const lines = data.map(( d, i ) => (
        <path
            key={i}
            className='someclass'
            fill='none'
            strokeWidth={popStrokeWidth} 
            stroke={`url(#tmp-lineargradient-${d.key}-${uniqId})`}
            d={drawLine(d[nestedVar])}/>
    ))

    let brush;
    if ( addBrush ) {
        brush = <BrushHorizontal x1={chartPadding.left}
            x2={width - chartPadding.right}
            y1={chartPadding.top}
            y2={height - chartPadding.bottom}
            interval={interval} 
            xScale={xScale}
            contextDomain={contextDomain}
            getDomain={getDomain} />
    }

    let referenceLine;
    if ( addReferenceLine ) {
        referenceLine = <ReferenceLine showContent={showStroke}
            xPos={xPos}
            yScale={yScale} 
            yTextPos={yTextPos}
            y1={chartPadding.top} 
            y2={height - chartPadding.bottom}
            x1={chartPadding.left}
            x2={width - chartPadding.right}
            yVar={yVar}
            themes={themes}/>
    }


    const filterByIntervalPlace = (dat, x) => {
        let newObj = {}
        const filtered = dat[nestedVar].filter(d => d[xVar] === x)
        newObj['key'] = dat.key;
        newObj[yVar] = filtered.map(v => v[yVar]).pop()
        return newObj  
        
    }

    const movement = (e) => {
        let point = lineChartRef.current.createSVGPoint()
        point.x = e.clientX
        point.y = e.clientY
        
        let position = point.matrixTransform(lineChartRef.current.getScreenCTM().inverse())
        if(position.x >= xScale(xDomain[0]) && position.x <= xScale(xDomain[1])){
            setXPos(position.x)
            setYTextPos(data.map(d => filterByIntervalPlace(d, interval(xScale.invert(position.x)))))
        }
    }

    return (
        <ChartSVG className={className}
            chartname={chartname}
            gridarea={gridarea}
            ref={lineChartRef}
            onMouseEnter={() => addReferenceLine && setShowStroke(true)}
            onMouseLeave={() => addReferenceLine && setShowStroke(false)}
            onMouseMove={addReferenceLine ? movement : undefined}
            viewBox={[0, 0, width, height]}
            width={'100%'}
            >
            <YAxis scale={yScale}
                x0={chartPadding.left}
                width={width - chartPadding.right}
                fontSize={isContext ? 15 : 10}
                pixelsPerTick={height/5}
                includeAxisLine={false}
                paddingLeft={chartPadding.left}
                includeAxisLabel={includeYAxisLabel}
                labelText={yAxisLabel}/>
            {gradients}
            {lines}
            {brush}
            {referenceLine}
            <XAxis scale={xScale} 
                height={height - chartPadding.bottom}
                fontSize={isContext ? 15 : 10}
                includeAxisLine={false}
                includeAxisLabel={includeXAxisLabel} 
                labelText={xAxisLabel}/>
        </ChartSVG>
    )

}

LineChart.defaultProps = {
    className: 'linechart',
    popStrokeWidth: 3,
    visibleOpacity: true,
    addBrush: false,
    addReferenceLine: false,
}

export default LineChart;