import React from 'react';
import { line, curveMonotoneX }  from 'd3-shape';
import { min, max } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { select, selectAll, event, mouse } from 'd3-selection';
import styled from 'styled-components';

import { closestFromArray } from '../../helpers/Helpers';
import { NativeSelect } from '@material-ui/core';

const FocusedStop = styled.stop`
    stop-color: #000;
`

const OutsideStop = styled.stop`
    stop-color: gray;
`





const LineChart = (props) => {
    const { className, data, xDomain, 
            nestedVar, xVar, yVar, popStrokeWidth,
            width, height, displayDims } = props;
    const minY = min(data.map(d => min(d[nestedVar], v => v[yVar]))),
          maxY = max(data.map(d => max(d[nestedVar], v => v[yVar])));
    const xScale = scaleLinear().domain(xDomain).range([0, width]),
          yScale = scaleLinear().domain([maxY, minY]).range([0, height]);
    const drawLine = line().x(d => xScale(d[xVar])).y(d => yScale(d[yVar])).curve(curveMonotoneX);
    
    const gradient = (
        <linearGradient id="tmp-lineargradient"
            x1={0} x2={width}
            y1={0} y2={0}
            gradientUnits={'userSpaceOnUse'}
        >
            <OutsideStop offset={'20%'}></OutsideStop>
            <FocusedStop offset={'20%'}></FocusedStop>
            <FocusedStop offset={'80%'}></FocusedStop>
            <OutsideStop offset={'80%'}></OutsideStop>
            
        </linearGradient>
    )

    const lines = data.map(( d, i, ) => (
        <path key={i}
            fill='none'
            strokeWidth={popStrokeWidth} 
            stroke={`url(#tmp-lineargradient)`}
            d={drawLine(d[nestedVar])}/>
    ))


    
    return (
        <svg className={className}
            viewBox={[0, 0, width, height]}
            width={`${displayDims.width}vw`}
            height={`${displayDims.height}vh`}>
            {gradient}
            {lines}

        </svg>
    )

}

LineChart.defaultProps = {
    className: 'linechart',
    width: 500,
    height: 250,
    displayDims: {width: 100, height: 50},
    popStrokeWidth: 5,
}

export default LineChart;