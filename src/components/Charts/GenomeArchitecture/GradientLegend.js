import React from 'react';
import { scaleLinear } from 'd3-scale';
import styled from 'styled-components';


const MaxStop = styled.stop`
    stop-color: ${({ theme }) => theme.highcolorup};
`

const HighStop = styled.stop`
    stop-color: ${({ theme }) => theme.highcolordown};
`

const MidStop = styled.stop`
    stop-color: ${({ theme }) => theme.colormid};
`

const LowStop = styled.stop`
    stop-color: ${({ theme }) => theme.lowcolorup};
`

const MinStop = styled.stop`
    stop-color: ${({ theme }) => theme.lowcolordown};
`

const TextVal = styled.text`
    transform: translate(0px, 20px);
    text-anchor: ${props => props.textpos};
    font-family: ${({ theme }) => theme.tickfont};
    fill: ${({ theme }) => theme.tickfill};
    font-size: 35px;
`

TextVal.defaultProps = {
    theme: {
        tickfont: 'Roboto Slab',
        tickfill: '#e3e3e3'
    }
}

const GradientLegend = (props) => {
    const { width, height, legendKey,
            viewwidth, viewheight, minVal, maxVal, midVal } = props;

    const gradient = <linearGradient id={`legend-gradient-${legendKey}`}
        gradientUnits='userSpaceOnUse'
        x1={0} 
        x2={width}
        y1={0}
        y2={0}>
            <MinStop offset='0%' />
            <LowStop offset={`49%`} />
            <MidStop offset={`50%`} />
            <HighStop offset={`51%`} />
            <MaxStop offset={`100%`} />

    </linearGradient>


    return (
        <svg width={`${viewwidth}vw`} height={`${viewheight}vh`} viewBox={[0, 0, width, height]}>
            {gradient}
            <rect x={0} 
                y={0} 
                rx={height/4}
                height={height/2} 
                width={width}
                fill={`url(#legend-gradient-${legendKey})`}
                >
            </rect>
            <TextVal textpos={'start'} x={0} y={height/2}>{minVal}</TextVal>
            <TextVal textpos={'middle'} x={width/2} y={height/2}>{midVal}</TextVal>
            <TextVal textpos={'end'} x={width} y={height/2}>{maxVal}</TextVal>
        </svg>
    )
}

GradientLegend.defaultProps = {
    legendKey: 'legend-key',
    width: 600,
    height: 50,
    minVal: -1,
    maxVal: 1,
    midVal: 0
}

export default GradientLegend;