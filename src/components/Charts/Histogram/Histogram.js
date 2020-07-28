import React from 'react';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { min, max, histogram, sum, mean, variance } from 'd3-array';
import XAxis from '../Axes/XAxis';
import YAxis from '../Axes/YAxis';

const Histogram = (props) => {
    const { data, xVar, nestedVar, className, displayDims,
            chartPadding, } = props;
    const width = displayDims.width * 8,
          height = displayDims.height * 5.5;
    const minX = min(data.map(d => min(d[nestedVar], v => v[xVar]))),
          maxX = max(data.map(d => max(d[nestedVar], v => v[xVar])));
    const histScale = scaleLinear().domain([minX, maxX]).range([chartPadding.left, width - chartPadding.right]);
    const hist = histogram().value(function(d) {return d[xVar]}).domain(histScale.domain()).thresholds(histScale.ticks(40));
    const histogramGroups = data.map(d => {
        let row = hist(d[nestedVar]);
        row['key'] = d.key
        return row
    })

    const maxBinCount = max(histogramGroups.flatMap(d => d.map(v => v.length)))
    const upperXBound = maxX + max(histogramGroups.flatMap(d => d.map(v => v.x1 - v.x0)))
    const yScale = scaleLinear().domain([maxBinCount, 0]).range([chartPadding.top, height - chartPadding.bottom]),
          xScale = scaleLinear().domain([minX, upperXBound]).range(histScale.range())
    const binStroke = 3,
          binWidth = (width - chartPadding.left - chartPadding.right )/(max(histogramGroups.flatMap(d => d.length))) - binStroke;
    const histograms = histogramGroups.map((d, i) => {
        return d.map( (g, j) => {
            return (
                <rect key={`${i}-${j}`}
                    x={0}
                    transform={`translate(${xScale(g.x0)}, ${yScale(g.length)})`}
                    width={binWidth}
                    height={yScale(0) - yScale(g.length)}
                    fill={d.key == 0 ? 'blue' : 'red'}
                    stroke={d.key == 0 ? 'blue' : 'red'}
                    strokeWidth={binStroke}
                    fillOpacity={0.2}
                    strokeOpacity={.5}></rect>
            )
        })
    })



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
            {histograms}
            <XAxis scale={histScale} 
                height={height - chartPadding.bottom}
                includeAxisLine={false}/>

        </svg>

    )

}

Histogram.defaultProps = {
    className: 'histogram',
    displayDims: {width: 100, height: 60},
    chartPadding: {left: 20, right: 5, top: 10, bottom: 40}
}


export default Histogram;