import React, { useState } from 'react';
import styled from 'styled-components';

const StyledLine = styled.line`
    stroke: #919191;
    stroke-width: ${props => props.strokewidth};
    stroke-dasharray: 5;
`

const ReferenceLine = (props) => {
    const {xScale, yScale, xPos, yTextPos, showStroke, y1, y2} = props;
    const texts = yTextPos.map(( d, i ) => {
        return (
            <text key={i} 
                x={xPos} 
                y={yScale(yTextPos[i])}
                alignmentBaseline="middle">
                    {Number(Math.round(yTextPos[i]+'e3')+'e-3')}
                </text>
        )
    })
    return (
        <g>
            <StyledLine strokewidth={showStroke ? '2px' : '0px'}
                x1={xPos} x2={xPos} y1={y1} y2={y2} />
            {texts}
            {/* <text x={xPos} y={y1}> Hello </text> */}
        </g>
    )
}

export default ReferenceLine;