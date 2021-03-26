import React, { useState } from 'react';
import styled from 'styled-components';

import useFonts from '../../../hooks/useFonts'
import GroupedLines from './GroupedLines';
// import Line from './Line';

const Wrapper = styled.div`
    width: 100%;
`;


const LineChart = ({ data, xVar, yVar, theme }) => {

    const [ upper, setUpper ] = useState(250000)
    const [ lower, setLower ] = useState(1000)

    useFonts()

    return (
        <Wrapper>
            <GroupedLines data={data} xVar={xVar} yVar={yVar} theme={theme} upperLimit={upper} lowerLimit={lower} setUpperLimit={setUpper} setLowerLimit={setLower}/>

        </Wrapper>
    )
}

export default LineChart;