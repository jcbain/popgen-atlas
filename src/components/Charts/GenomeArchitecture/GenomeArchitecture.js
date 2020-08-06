import React, {useState} from 'react';
import { scaleLinear } from 'd3-scale';
import { min, max } from 'd3-array';
import { uniq } from 'lodash';
import styled from 'styled-components';
import { interpolateHcl } from 'd3';


const ScaledStop = styled.stop`
    stop-color: ${props => props.val !== 0 ? props.colorscale.range([props.greaterthanzero ? props.theme.highcolordown : props.theme.lowcolorup, props.greaterthanzero ? props.theme.highcolorup : props.theme.lowcolordown])(props.val) : props.theme.colormid};
`

ScaledStop.defaultProps = {
    colorScale : scaleLinear().domain([0, 10]).interpolate(interpolateHcl),
    val: 5,
    highcolorup: '#eb4034',
    highcolordown: '#ffd000',
    colormid: '#fff',
    lowcolorup: '#0082e6',
    lowcolordown: '#5d0096',
    greaterthanzero: true,
}

const GenomeArchitecutre = (props) => {
    const { className, displayDims, chartPadding, 
            data, xVar, yVar, colorVar, gradients } = props;
    const [lgen, setLgen] = useState(1000);
    const [ugen, setUgen] = useState(50000);
    const width = displayDims.width * 12,
          height = displayDims.height * 5.5;
    const xVals = uniq(data.map(d => d[xVar]).filter(d => d >= lgen && d <= ugen)),
          xMin = min(xVals),
          xMax = max(xVals),
          yMin = min(data, d => d[yVar]),
          yMax = max(data, d => d[yVar]),
          colorMin = min(data, d => d[colorVar]),
          colorMax = max(data, d => d[colorVar]);
    const barheight = height - chartPadding.top - chartPadding.bottom;
    const barwidth = (width - chartPadding.left - chartPadding.right) / xVals.length;
    const colorScaleHigh = scaleLinear().domain([0, colorMax]).interpolate(interpolateHcl),
          colorScaleLow = scaleLinear().domain([0, colorMin]).interpolate(interpolateHcl),
          yScale = scaleLinear().domain([yMin, yMax]).range([0, 100]),
          xScale = scaleLinear().domain([xMin, xMax]).range([chartPadding.left, width - chartPadding.right - barwidth]);
    
   

    // const gradients = xVals.map((x, i) => {
    //     return (
    //         <linearGradient key={i}
    //             gradientUnits='userSpaceOnUse'
    //             id={`gradient-${x}`}
    //             x1={0}
    //             x2={0}
    //             y1={chartPadding.top}
    //             y2={barheight} 
    //         >
    //             {
    //                 data.filter(d => d[xVar] === x).map((v, j) => {
    //                     const val = v[colorVar];
    //                     const greaterthanzero = val > 0;
    //                     const colorScale = greaterthanzero ? colorScaleHigh : colorScaleLow;

    //                     return (
    //                         <ScaledStop key={`${i}-${j}`}
    //                             offset={`${yScale(v[yVar])}%`}
    //                             greaterthanzero={greaterthanzero}
    //                             colorscale={colorScale}
    //                             val={val}
    //                         ></ScaledStop>
    //                     )                
    //                 })
    //             }
    //         </linearGradient>
    //     )
    // })

    const bars = xVals.map((x, i) => {
        return (
            <rect key={i}
                x={xScale(x)}
                y={chartPadding.top}
                width={barwidth}
                height={barheight}
                fill={`url(#gradient-${x})`} />
        )
    })


    return (
        <div>                         
        <button onClick={() => setLgen(lgen + 1000)}>lower bound increase</button>
        <button onClick={() => setLgen(lgen - 1000)}>lower bound decrease</button>
        <p>lower bound is {lgen}</p>
        <button onClick={() => setUgen(ugen - 1000)}>upper bound decrease</button>
        <button onClick={() => setUgen(ugen + 1000)}>upper bound increase</button>
        <p>upper bound is {ugen}</p>
        <svg className={className}
        
            viewBox={[0, 0, width, height]}
            width={`${displayDims.width}vw`}
            height={`${displayDims.height}vh`}>
 
                {gradients}
                {bars}
               {/* {gradient}
               <rect x={chartPadding.left} 
                y={chartPadding.top}
                width={barwidth}
                height={barheight}
                fill={'url(#gradient)'}
               ></rect> */}

        </svg>
        </div>

    )
}

GenomeArchitecutre.defaultProps = {
    className: 'genome-architecture',
    displayDims: {width: 100, height: 70},
    chartPadding: {left: 20, right: 5, top: 10, bottom: 40}
}

export default GenomeArchitecutre;