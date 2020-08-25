import React from 'react';
import { scaleLinear } from 'd3-scale';
import { uniq, min, max } from 'lodash';

import XAxis from '../Axes/XAxis';
import YAxis from '../Axes/YAxis';
import BrushHorizontal from './BrushHorizontal';
import { closestFromArray } from '../../../helpers/Helpers';


const GenomeArchitecture = (props) => {
    const { className, paramPermutationData,
            data, xVar, yVar, gradients, includeXAxisLabel, xAxisLabel,
            yAxisLabel, addBrush, contextDomain, xDomain, getDomain, includeYAxisLabel, isContext } = props;

    const width = isContext ? 1000 : 500,
          height = isContext ? 100 : 250;
    const chartPaddingPerc  = {top: 5, bottom: 15, left: 10, right: 5}
    const chartPadding = {
        top: height * (chartPaddingPerc.top/100),
        bottom:  height * (chartPaddingPerc.bottom/100),
        left: width * (chartPaddingPerc.left/100),
        right: width * (chartPaddingPerc.right/100),
    };

    const minY = min(data.map(d => d[yVar])),
          maxY = max(data.map(d => d[yVar]));
    const uniqXVals = uniq(data.map(d => d[xVar]));
    const xVals = uniq(data.map(d => d[xVar])).filter(d => d >= xDomain[0] && d < xDomain[1]);
    const interval = closestFromArray(uniqXVals);
    const barheight = height - chartPadding.top - chartPadding.bottom;
    const barwidth = (width - chartPadding.left - chartPadding.right) / (xVals.length);
    const xScale = scaleLinear().domain(xDomain).range([chartPadding.left, width - chartPadding.right]),
          yScale = scaleLinear().domain([maxY, minY]).range([chartPadding.top, height - chartPadding.bottom]);
    const colorLabel = isContext ? 'color-context' : 'color';
    const bars = xVals.map((x, i) => {
        const isFocus = (x >= contextDomain[0] && x < contextDomain[1]);
        const colorIdentifier = isFocus ? colorLabel : 'gray';
        return (
            <rect key={i}
                x={xScale(x)}
                y={chartPadding.top}
                width={barwidth}
                height={barheight}
                fill={`url(#gradient-${colorIdentifier}-${x}-${paramPermutationData[0].paramSetKey})`}
                // fill={`url(#gradient-${colorIdentifier}-${x}-${genKey})`} 
                />
        )
    })

    let brush;
    if ( addBrush ) {
        brush = <BrushHorizontal x1={chartPadding.left}
            x2={width - chartPadding.right}
            y1={chartPadding.top}
            y2={height - chartPadding.bottom}
            interval={interval} 
            xScale={xScale}
            contextDomain={contextDomain}
            getDomain={getDomain}
             />
    }

    return (
        <svg className={className}
        
            viewBox={[0, 0, width, height]}
            width="100%"
            // width={`${displayDims.width}vw`}
            // height={`${displayDims.height}vh`}
            >
                <YAxis scale={yScale}
                    x0={chartPadding.left}
                    width={width - chartPadding.right}
                    pixelsPerTick={height/5}
                    includeAxisLine={false}
                    paddingLeft={chartPadding.left}
                    includeAxisLabel={includeYAxisLabel}
                    labelText={yAxisLabel}/>
                {gradients}
                
                {bars}
                {brush}
                <XAxis scale={xScale} 
                    height={height - chartPadding.bottom}
                    includeAxisLine={false}
                    includeAxisLabel={includeXAxisLabel} 
                    labelText={xAxisLabel} />


        </svg>


    )
}

GenomeArchitecture.defaultProps = {
    className: 'genome-architecture',
    displayDims: {width: 100, height: 70},
    chartPadding: {left: 20, right: 5, top: 10, bottom: 40},
    heightScaler: 5.5,
}

export default GenomeArchitecture;