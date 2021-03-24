import React from 'react';
import styled from 'styled-components';
import Architecture from './Architecture';


const Charts = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: 300px 75px;
    row-gap: 10px;
`

const GroupedGenomes = ({ xVar, yVar, outputGen, pop, data, upperLimit, lowerLimit, setUpperLimit, setLowerLimit, minVal, maxVal }) => {

    return (
        <Charts>
            <Architecture xVar={xVar} yVar={yVar} outputGen={outputGen} pop={pop} data={data} upperLimit={upperLimit} lowerLimit={lowerLimit} minVal={minVal} maxVal={maxVal}/>
            <Architecture xVar={xVar} yVar={yVar} outputGen={outputGen} pop={pop} data={data} upperLimit={250000} lowerLimit={1000} addBrush={true} setLowerLimit={setLowerLimit} setUpperLimit={setUpperLimit} secondaryLL={lowerLimit} secondaryUL={upperLimit} minVal={minVal} maxVal={maxVal}/>
        </Charts>
    )
}

export default GroupedGenomes;