import React from 'react';
import { scaleLinear } from 'd3-scale';
import { min, max, histogram } from 'd3-array';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import XAxis from '../Axes/XAxis';
import YAxis from '../Axes/YAxis';

const BinRect = styled.rect`
    fill: ${props => props.theme.popColorAlpha};
    stroke: ${props => props.theme.popColorFocus};
`;

BinRect.defaultProps = {
    theme: {
        popColorAlpha: '#ac9e47',
        popColorFocus: '#ac9e47',
    }
}

const Histogram = (props) => {
    const { data, xVar, nestedVar, className, displayDims,
            chartPadding, themes} = props;
    const width = displayDims.width * 9,
          height = displayDims.height * 4.5;
    const minX = min(data.map(d => min(d[nestedVar], v => v[xVar]))),
          maxX = max(data.map(d => max(d[nestedVar], v => v[xVar])));
    const numBins = 10;
    const histScale = scaleLinear().domain([minX, maxX]).range([chartPadding.left, width - chartPadding.right]).nice(numBins);
    const hist = histogram().value(d => d[xVar]).domain(histScale.domain()).thresholds(histScale.ticks(numBins));
    const histogramGroups = data.map(d => {
        let row = hist(d[nestedVar]);
        row['key'] = d.key
        return row
    })

    const maxBinCount = max(histogramGroups.flatMap(d => d.map(v => v.length)))
    const upperXBound = max(histogramGroups.flatMap(d => d.map(v => v.x1))),
          lowerXBound = min(histogramGroups.flatMap(d => d.map(v => v.x0)))
    const yScale = scaleLinear().domain([maxBinCount, 0]).range([chartPadding.top, height - chartPadding.bottom]),
          xScale = scaleLinear().domain([lowerXBound, upperXBound]).range(histScale.range())
    const binStroke = 2,
          binWidth = (width - chartPadding.left - chartPadding.right )/(max(histogramGroups.flatMap(d => d.length))) - (binStroke/2);
    const histograms = histogramGroups.map((d, i) => {
        return d.map( (g, j) => {
            return (
                <ThemeProvider key={`${i}-${j}`} theme={themes[d.key]}>
                    <BinRect x={0}
                        transform={`translate(${xScale(g.x0)}, ${yScale(g.length)})`}
                        width={binWidth}
                        height={yScale(0) - yScale(g.length)}
                        strokeWidth={binStroke} />
                </ThemeProvider>
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
            <XAxis scale={xScale} 
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