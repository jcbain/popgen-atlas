import React from 'react';
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
    lowcolordown: '#5d0096'
}

const GenomeArchitecutre = (props) => {
    const { className, displayDims, chartPadding, data, xVar, yVar } = props;
    const width = displayDims.width * 12,
          height = displayDims.height * 5.5;
    const xVals = uniq(data.map(d => d[xVar]));
    const colorScale = scaleLinear().domain([0,10]).interpolate(interpolateHcl)
    console.log(xVals)
    const barheight = height - chartPadding.top - chartPadding.bottom;

    return (
        <svg className={className}
            viewBox={[0, 0, width, height]}
            width={`${displayDims.width}vw`}
            height={`${displayDims.height}vh`}>
                <linearGradient>
                <ScaledStop greaterthanzero={true} offset={"10%"} colorscale={colorScale} val={0}></ScaledStop>
                </linearGradient>

        </svg>

    )
}

GenomeArchitecutre.defaultProps = {
    className: 'genome-architecture',
    displayDims: {width: 100, height: 40},
    chartPadding: {left: 20, right: 5, top: 10, bottom: 40}
}

export default GenomeArchitecutre;