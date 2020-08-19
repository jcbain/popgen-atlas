import React from 'react';
import { scaleLinear } from 'd3-scale';
import { min, max } from 'd3-array';
import { uniq } from 'lodash';
import styled from 'styled-components';
import { interpolateHcl } from 'd3';


const ScaledStopColor = styled.stop`
    stop-color: ${props => props.val !== 0 ? props.colorscale.range([props.greaterthanzero ? props.theme.highcolordown : props.theme.lowcolorup, props.greaterthanzero ? props.theme.highcolorup : props.theme.lowcolordown])(props.val) : props.theme.colormid};
`

ScaledStopColor.defaultProps = {
    colorScale : scaleLinear().domain([0, 10]).interpolate(interpolateHcl),
    val: 5,
    theme: {
        highcolorup: '#eb4034',
        highcolordown: '#ffd000',
        colormid: '#fff',
        lowcolorup: '#0082e6',
        lowcolordown: '#5d0096', 
    },
    greaterthanzero: true,
}

const ScaledStopGray = styled.stop`
    stop-color: ${props => props.colorscale.range([props.theme.lowcolorgray, props.theme.highcolorgray])(props.val)}
`

ScaledStopGray.defaultProps = {
    colorScale : scaleLinear().domain([0, 10]).interpolate(interpolateHcl),
    val: 5,
    theme: {
        lowcolorgray: '#000',
        highcolorgray: '#fff',
    },
}

const ScaledStop = (props) => {
    const { useGrayScale } = props;
    const stop = useGrayScale ? <ScaledStopGray {...props} /> : <ScaledStopColor {...props} />

    return stop;
}

const GenomeGradients = (props) => {
    const { data, xVar, yVar, colorVar, genKey,
            chartPadding, heightScaler, displayDims, useGrayScale, colorMin, colorMax } = props;
    const xVals = uniq(data.map(d => d[xVar]))
    const yMin = min(data, d => d[yVar]),
          yMax = max(data, d => d[yVar]);
        //   colorMin = min(data, d => d[colorVar]),
        //   colorMax = max(data, d => d[colorVar]);
    const yScale = scaleLinear().domain([yMin, yMax]).range([0, 100]),
          colorScaleHigh = scaleLinear().domain([.00001, colorMax]).interpolate(interpolateHcl),
          colorScaleLow = scaleLinear().domain([-.00001, colorMin]).interpolate(interpolateHcl),
          grayScale = scaleLinear().domain([colorMin, colorMax]).interpolate(interpolateHcl);
    const colorIdentifier = useGrayScale ? 'gray' : 'color';

    const gradients = xVals.map((x, i) => {
        return (
            <linearGradient key={i}
                gradientUnits='userSpaceOnUse'
                id={`gradient-${colorIdentifier}-${x}-${genKey}`}
                x1={0}
                x2={0}
                y1={chartPadding.top}
                y2={(displayDims.height * heightScaler) - chartPadding.bottom}
            >
                {
                    data.filter(d => d[xVar] === x).map((v, j) => {
                        const val = v[colorVar];
                        const greaterthanzero = val > 0;
                        const colorScale = useGrayScale ? grayScale : (greaterthanzero ? colorScaleHigh : colorScaleLow);

                        return (
                            <ScaledStop key={`${i}-${j}`}
                                useGrayScale={useGrayScale}
                                offset={`${yScale(v[yVar])}%`}
                                greaterthanzero={greaterthanzero}
                                colorscale={colorScale}
                                val={val} />
                        )  
                    })
                }

            </linearGradient>
        )
    })

    return (
        <>
            {gradients}
        </>
    )
}

GenomeGradients.defaultProps = {
    useGrayScale: false,
}

export default GenomeGradients;