import React, { useState } from 'react';
import styled from 'styled-components';

const StyledLine = styled.line`
    stroke: #000;
    stroke-width: 2;
`

const ReferenceLine = (props) => {
    const {xScale, yScale, xPos} = props;

    return (
        <g>
            <StyledLine x1={xPos} x2={xPos} y1={10} y2={161} />
        </g>
    )
}

export default ReferenceLine;