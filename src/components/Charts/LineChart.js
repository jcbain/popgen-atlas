import React from 'react';
import { line, curveMonotoneX }  from 'd3-shape';
import { nest } from 'd3-collection';
import { min, max } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { select, selectAll, event, mouse } from 'd3-selection';
import styled from 'styled-components';

import { closestFromArray } from '../../helpers/Helpers';

const LineChart = (props) => {
    const { className, data, xDomain, 
            xVar, yVar, popStrokeWidth,
            width, height, displayDims } = props;
    const minY = min(data, d => d[yVar]),
          maxY = max(data, d => d[yVar]);
    const xScale = scaleLinear().domain(xDomain).range([0, width]),
          yScale = scaleLinear().domain([maxY, minY]).range([0, height]);
    const drawLine = line().x(d => xScale(d[xVar])).y(d => yScale(d[yVar])).curve(curveMonotoneX);
    
    const tmpData = nest()
    // const lines = data.map(( d, i, ) => (
    //     <path key={i}
    //         fill='none'
    //         strokeWidth={popStrokeWidth} 
    //         stroke={'#000'}
    //         d={drawLine(d.values)}/>
    // ))


    
    return (
        <svg className={className}
            viewBox={[0, 0, width, height]}
            width={`${displayDims.width}vw`}
            height={`${displayDims.height}vh`}>
            {/* {lines} */}

        </svg>
    )

}

LineChart.defaultProps = {
    className: 'linechart',
    width: 500,
    height: 250,
    displayDims: {width: 100, height: 50},
    popStrokeWidth: 2,
}

export default LineChart;