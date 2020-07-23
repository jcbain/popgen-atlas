import React, { Children } from 'react';
import { line, curveMonotoneX }  from 'd3-shape';
import { min, max } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { select, selectAll, event, mouse } from 'd3-selection';
import styled from 'styled-components';
import { flatten, uniq } from 'lodash'
import {ThemeProvider} from 'styled-components';

import { FocusedStop, OutsideStop } from './LineChartStyles';
import BrushHorizontal from './BrushHorizontal';
import XAxis from '../Axes/XAxis';
import YAxis from '../Axes/YAxis';
import { closestFromArray } from '../../../helpers/Helpers';
import { NativeSelect } from '@material-ui/core';
import { filter } from 'lodash';

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

const LineChart = (props) => {
    const { className, data, xDomain, 
            xScale, nestedVar, xVar, yVar, uniqId,
            popStrokeWidth, displayDims, chartPadding,
            visibleOpacity, addBrush } = props;
    const width = displayDims.width * 5,
          height = displayDims.height * 5;
    const minY = min(data.map(d => min(d[nestedVar], v => v[yVar]))),
          maxY = max(data.map(d => max(d[nestedVar], v => v[yVar])));
    xScale.domain(xDomain).range([chartPadding.left, width - chartPadding.right]);
    const yScale = scaleLinear().domain([maxY, minY]).range([chartPadding.top, height - chartPadding.bottom]);
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
                <OutsideStop offset={`20%`} stopopacity={visibleOpacity ? 1 : 0}></OutsideStop>
                <FocusedStop offset={`20%`}></FocusedStop>
                <FocusedStop offset={`80%`}></FocusedStop>
                <OutsideStop offset={`80%`} stopopacity={visibleOpacity ? 1 : 0}></OutsideStop>
            </ThemeProvider>

        </linearGradient>

    ))

    const lines = data.map(( d, i ) => (
        <path key={i}
            fill='none'
            strokeWidth={popStrokeWidth} 
            stroke={`url(#tmp-lineargradient-${d.key}-${uniqId})`}
            d={drawLine(d[nestedVar])}/>

    ))

    let brush;
    if ( addBrush ) {
        const interval = closestFromArray(uniqXVals)


        brush = <BrushHorizontal x1={chartPadding.left}
            x2={width - chartPadding.right}
            y1={chartPadding.top}
            y2={height - chartPadding.bottom}
            interval={interval} 
            xScale={xScale} />

    }

 
    return (
        <svg className={className}
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
    addBrush: false
}

export default LineChart;