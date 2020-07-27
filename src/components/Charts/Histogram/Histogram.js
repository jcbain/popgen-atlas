import React from 'react';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { min, max, histogram } from 'd3-array';

const Histogram = (props) => {
    const { data, xVar, nestedVar, className, displayDims,
            chartPadding, } = props;
    const width = displayDims.width * 8,
          height = displayDims.height * 5.5;
    const minX = min(data.map(d => min(d[nestedVar], v => v[xVar]))),
          maxX = max(data.map(d => max(d[nestedVar], v => v[xVar])));
    const xScale = scaleLinear().domain([minX, maxX]).range([chartPadding.left, width - chartPadding.right]);
    // const hist = histogram().value(d => d)




    return (
        <svg className={className}
            viewBox={[0, 0, width, height]}
            width={`${displayDims.width}vw`}
            height={`${displayDims.height}vh`}>

        </svg>

    )

}

Histogram.defaultProps = {
    className: 'histogram',
    displayDims: {width: 100, height: 60},
    chartPadding: {left: 20, right: 5, top: 10, bottom: 40}
}


export default Histogram;