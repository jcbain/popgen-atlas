import React from 'react';
import { line, curveMonotoneX }  from 'd3-shape';
import { min, max } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { select, selectAll, event, mouse } from 'd3-selection';
import styled from 'styled-components';
import {ThemeProvider} from 'styled-components';

import { FocusedStop, OutsideStop } from './LineChartStyles';
import XAxis from '../Axes/XAxis';
import { closestFromArray } from '../../../helpers/Helpers';
import { NativeSelect } from '@material-ui/core';

const themePop0 = {
    popColorFocus: '#eb348f',
    popColorOutside: '#d6d6d6'
}

const themePop1 = {
    popColorFocus: '#36b7f7',
    popColorOutside: '#d6d6d6'
}

const themes = {
    0: themePop0,
    1: themePop1,
}

const LineChart = (props) => {
    const { className, data, xDomain, 
            nestedVar, xVar, yVar, popStrokeWidth,
            displayDims, chartPadding } = props;
    const width = displayDims.width * 5,
          height = displayDims.height * 5;
    const minY = min(data.map(d => min(d[nestedVar], v => v[yVar]))),
          maxY = max(data.map(d => max(d[nestedVar], v => v[yVar])));
    const xScale = scaleLinear().domain(xDomain).range([chartPadding.left, width - chartPadding.right]),
          yScale = scaleLinear().domain([maxY, minY]).range([chartPadding.top, height - chartPadding.bottom]);
    const drawLine = line().x(d => xScale(d[xVar])).y(d => yScale(d[yVar])).curve(curveMonotoneX);
    
    const gradients = data.map((d, i) => (
        <linearGradient key={i}
            id={`tmp-lineargradient-${d.key}`}
            x1={chartPadding.left} x2={width - chartPadding.right}
            y1={0} y2={0}
            gradientUnits={'userSpaceOnUse'}
        >
            <ThemeProvider theme={themes[d.key]}>
                <OutsideStop offset={`20%`}></OutsideStop>
                <FocusedStop offset={`20%`}></FocusedStop>
                <FocusedStop offset={`80%`}></FocusedStop>
                <OutsideStop offset={`80%`}></OutsideStop>
            </ThemeProvider>

        </linearGradient>

    ))

    const lines = data.map(( d, i, ) => (
        <path key={i}
            fill='none'
            strokeWidth={popStrokeWidth} 
            stroke={`url(#tmp-lineargradient-${d.key})`}
            d={drawLine(d[nestedVar])}/>

    ))
    
    return (
        <svg className={className}
            viewBox={[0, 0, width, height]}
            width={`${displayDims.width}vw`}
            height={`${displayDims.height}vh`}>
            {gradients}
            {lines}
            <XAxis scale={xScale} 
                height={height - chartPadding.bottom}
                includeAxisLine={false}/>
        </svg>
    )

}

LineChart.defaultProps = {
    className: 'linechart',
    displayDims: {width: 100, height: 20},
    chartPadding: {left: 20, right: 5, top: 10, bottom: 40},
    popStrokeWidth: 3,
}

export default LineChart;