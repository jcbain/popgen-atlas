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



const LineChart = (props) => {
    const { className, data, xDomain, contextDomain,
            nestedVar, xVar, yVar, uniqId, includeXAxisLabel, includeYAxisLabel,
            popStrokeWidth, displayDims, chartPadding, xAxisLabel,
            visibleOpacity, addBrush, getDomain, addReferenceLine, themes } = props;
    const lineChartRef = useRef(null);
    const [xPos, setXPos] = useState(undefined);
    const [yTextPos, setYTextPos] = useState([...Array(data.length)].map(() => Object()))
    const [showStroke, setShowStroke] = useState(false)


    const width = displayDims.width * 12,
          height = displayDims.height * 5.5;
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
        <svg className={className}
            ref={lineChartRef}
            onMouseEnter={() => addReferenceLine && setShowStroke(true)}
            onMouseLeave={() => addReferenceLine && setShowStroke(false)}
            onMouseMove={addReferenceLine ? movement : undefined}
            viewBox={[0, 0, width, height]}
            width={`${displayDims.width}vw`}
            height={`${displayDims.height}vh`}>
            <YAxis scale={yScale}
                x0={chartPadding.left}
                width={width - chartPadding.right}
                pixelsPerTick={height/5}
                includeAxisLine={false}
                paddingLeft={chartPadding.left}
                includeAxisLabel={includeYAxisLabel}/>
            {gradients}
            {lines}
            {brush}
            {referenceLine}
            <XAxis scale={xScale} 
                height={height - chartPadding.bottom}
                includeAxisLine={false}
                includeAxisLabel={includeXAxisLabel} 
                labelText={xAxisLabel}/>
        </svg>
    )

}

LineChart.defaultProps = {
    className: 'linechart',
    displayDims: {width: 100, height: 40},
    chartPadding: {left: 20, right: 5, top: 10, bottom: 40},
    popStrokeWidth: 3,
    visibleOpacity: true,
    addBrush: false,
    addReferenceLine: false,
}

export default LineChart;