import React from 'react';
import styled from 'styled-components';
import Line from './Line';


const Charts = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: 300px 75px;
    row-gap: 10px;
`

const GroupedLines = ({ xVar, yVar, data, theme, upperLimit, lowerLimit, setUpperLimit, setLowerLimit }) => {

    return (
        <Charts>
            <Line data={data} xVar={xVar} yVar={yVar} theme={theme} upperLimit={upperLimit} lowerLimit={lowerLimit}/>
            <Line data={data} xVar={xVar} yVar={yVar} theme={theme} addBrush={true} upperLimit={2500000} lowerLimit={1000} setLowerLimit={setLowerLimit} setUpperLimit={setUpperLimit} secondaryLL={lowerLimit} secondaryUL={upperLimit}/>

        </Charts>
    )
}

export default GroupedLines;