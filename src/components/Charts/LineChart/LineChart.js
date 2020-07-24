import React, { useRef, createRef, useEffect, useState, forwardRef } from 'react';
import { line, curveMonotoneX }  from 'd3-shape';
import { min, max } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import styled from 'styled-components';
import { flatten, uniq, toInteger } from 'lodash'
import {ThemeProvider} from 'styled-components';

import { FocusedStop, OutsideStop } from './LineChartStyles';
import BrushHorizontal from './BrushHorizontal';
import XAxis from '../Axes/XAxis';
import YAxis from '../Axes/YAxis';
import ReferenceLine from './ReferenceLine';
import { closestFromArray } from '../../../helpers/Helpers';
import { path } from 'd3';

const themePop0 = {
    popColorFocus: '#ac9e47',
    popColorOutside: '#d6d6d6'
}

const themePop1 = {
    popColorFocus: '#7ca1a1',
    popColorOutside: '#d6d6d6'
}

const themes = {
    0: themePop0,
    1: themePop1,
}

const StatefulPath = forwardRef((props, ref) =>{ 
    return <path {...props} ref={ref}></path>
})

const LineChart = (props) => {
    const { className, data, xDomain, 
            xScale, nestedVar, xVar, yVar, uniqId,
            popStrokeWidth, displayDims, chartPadding,
            visibleOpacity, addBrush, getDomain, addReferenceLine } = props;
    const lineChartRef = useRef(null);
    const tmpRef = useRef(null);
    const tmpRef2 = useRef(null)
    const pathRefs = data.map(() => createRef())
    const newRefs = [tmpRef, tmpRef2]
    const [xPos, setXPos] = useState(undefined);
    const [showStroke, setShowStroke] = useState(false)


    const width = displayDims.width * 5,
          height = displayDims.height * 5;
    const minY = min(data.map(d => min(d[nestedVar], v => v[yVar]))),
          maxY = max(data.map(d => max(d[nestedVar], v => v[yVar])));
    const minX = min(data.map(d => min(d[nestedVar], v => v[xVar]))),
          maxX = max(data.map(d => max(d[nestedVar], v => v[xVar])));
    xScale.domain(xDomain).range([chartPadding.left, width - chartPadding.right]);
    const yScale = scaleLinear().domain([maxY, minY]).range([chartPadding.top, height - chartPadding.bottom]);
    const brushScale = scaleLinear().domain([minX, maxX]).range([0, 100])
    const drawLine = line().x(d => xScale(d[xVar])).y(d => yScale(d[yVar])).curve(curveMonotoneX);
    const uniqXVals = uniq(flatten(data.map( d => d[nestedVar].map(v => v[xVar] ))), true)

    const gradients = data.map((d, i) => (
        <linearGradient key={i}
            id={`tmp-lineargradient-${d.key}-${uniqId}`}
            x1={chartPadding.left} x2={width - chartPadding.right}
            y1={0} y2={0}
            gradientUnits={'userSpaceOnUse'}
        >
            <ThemeProvider theme={themes[d.key]}>
                <OutsideStop className={`left-${uniqId}`} offset={`${brushScale(props.contextDomain[0])}%`} stopopacity={visibleOpacity ? 1 : 0}></OutsideStop>
                <FocusedStop className={`left-${uniqId}`} offset={`${brushScale(props.contextDomain[0])}%`}></FocusedStop>
                <FocusedStop className={`right-${uniqId}`} offset={`${brushScale(props.contextDomain[1])}%`}></FocusedStop>
                <OutsideStop className={`right-${uniqId}`}offset={`${brushScale(props.contextDomain[1])}%`} stopopacity={visibleOpacity ? 1 : 0}></OutsideStop>
            </ThemeProvider>

        </linearGradient>

    ))

    const lines = data.map(( d, i ) => (
        <StatefulPath ref={pathRefs[i]}
            key={i}
            className='someclass'
            fill='none'
            strokeWidth={popStrokeWidth} 
            stroke={`url(#tmp-lineargradient-${d.key}-${uniqId})`}
            d={drawLine(d[nestedVar])}/>
    ))

    
    console.log(data)
    let brush;
    if ( addBrush ) {
        const interval = closestFromArray(uniqXVals);
        brush = <BrushHorizontal x1={chartPadding.left}
            x2={width - chartPadding.right}
            y1={chartPadding.top}
            y2={height - chartPadding.bottom}
            interval={interval} 
            xScale={xScale}
            getDomain={getDomain} />
    }

    let referenceLine;
    if ( addReferenceLine ) {
        referenceLine = <ReferenceLine showStroke={showStroke}
            xPos={xPos} 
            y1={chartPadding.top} 
            y2={height - chartPadding.bottom}/>
    }
    // console.log(tmpRef)
    // console.log(newRefs)
    // console.log(pathRefs)
    // console.log(lineChartRef)
    const something = (ref, x, yScale) => {
        const yPoint = ref.getPointAtLength(x)
        console.log(yScale.invert(yPoint.y))
    }
    useEffect(() => {
        if (addReferenceLine){
            let point, position;
            let aref = pathRefs[0].current
            lineChartRef.current.addEventListener('mousemove', (e) => {
                
                point = lineChartRef.current.createSVGPoint()
                point.x = e.clientX
                point.y = e.clientY
                
                position = point.matrixTransform(lineChartRef.current.getScreenCTM().inverse())
                if(position.x >= xScale.range()[0] && position.x <= xScale.range()[1]){
                    setXPos(position.x)
                    // console.log(position.x)
                    // console.log(xScale.range()[0])
                    // console.log(xScale(1000))
                    // console.log(xScale(10000))
                    // console.log(position.x)
                    something(aref, position.x, yScale)
                }
            })
        }
    }, [])


    return (
        <svg className={className}
            ref={lineChartRef}
            onMouseEnter={() => addReferenceLine && setShowStroke(true)}
            onMouseLeave={() => addReferenceLine && setShowStroke(false)}
            viewBox={[0, 0, width, height]}
            width={`${displayDims.width}vw`}
            height={`${displayDims.height}vh`}>
            <YAxis scale={yScale}
                x0={chartPadding.left}
                width={width - chartPadding.right}
                pixelsPerTick={height/5}
                includeAxisLine={false}/>
            {gradients}
            {lines}
            {brush}
            {referenceLine}
            <XAxis scale={xScale} 
                height={height - chartPadding.bottom}
                includeAxisLine={false}/>
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