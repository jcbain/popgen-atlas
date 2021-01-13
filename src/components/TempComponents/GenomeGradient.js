import React from 'react';
import styled from 'styled-components';

const LocusStop = styled.stop`
    stop-color: ${({ col }) => col || 'yellow'};
`


const dummyData = [
    {position: 2, val: 0.3},
    {position: 10, val: -0.1}
]
const GenomeGradient = (props) => {
    const { rest } = props;

    const loci = [];
    for(let i = 0; i < 20; i++){
        const posData = dummyData.find( d => d.position === i);
        const col = posData && 'purple';
        const perc = (i+1)/20 * 100;
        loci.push((
            <LocusStop offset={`${perc}%`} col={col}/>
        ))
    }

    return (
        <linearGradient    
            gradientUnits='objectBoundingBox' 
            x1={0}
            x2={0}
            y1={'0%'}
            y2={'100%'}
            {...rest}
        >
            {loci}
        </linearGradient>
    )
}

export default GenomeGradient;