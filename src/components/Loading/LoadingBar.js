import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const Parent = styled.div`
    width: 100%;
`

const CircleBar = styled.circle`
    fill: transparent;
    stroke: #666;
    stroke-width: 0.5em;
    cx: calc(${({ cwidth }) => cwidth}px);
    cy: calc(${({ cwidth }) => cwidth}px);
    r: calc(${({ cwidth }) => cwidth}px - 0.5em);
`

const CircleTracker = styled.circle`
    --radius: calc(${({ cwidth }) => cwidth}px - 0.5em);
    fill: transparent;
    stroke: orange;
    stroke-width: 0.5em;
    cx: calc(${({ cwidth }) => cwidth}px);
    cy: calc(${({ cwidth }) => cwidth}px);
    r: var(--radius);
    stroke-dasharray: calc(var(--radius) * ${Math.PI * 2});
    stroke-dashoffset: calc(var(--radius) * ${({perc}) => Math.PI * 2 * (1- perc)});
`;

const LoadingBar = (props) => {
    const { perc } = props;
    const svgWidth = 100;

    return (
        <Parent>
            <svg viewBox={[0, 0, svgWidth, svgWidth]} width={'25%'}>
                <CircleBar cwidth={svgWidth/2}/>
                <CircleTracker cwidth={svgWidth/2} perc={perc}/>
            </svg>
        </Parent>
    )
}

LoadingBar.defaultProps = {
    perc: 0.8,
}

export default LoadingBar;