import React, { useState } from 'react';
import styled from 'styled-components';

import useFonts from '../../../hooks/useFonts'
import GroupedLines from './GroupedLines';
// import Line from './Line';

const Wrapper = styled.div`
    width: 100%;
`;


const LineChart = ({ data, xVar, yVar, pop, mutation, migration, sigsqr }) => {

    const [ upper, setUpper ] = useState(250000)
    const [ lower, setLower ] = useState(1000)

    useFonts()

    const filtered = data.filter(d => d.pop === pop && d.m === migration && d.mu === mutation && d.sigsqr === sigsqr)


    return (
        <Wrapper>
            <GroupedLines data={filtered} xVar={xVar} yVar={yVar} upperLimit={upper} lowerLimit={lower} setUpperLimit={setUpper} setLowerLimit={setLower}/>

        </Wrapper>
    )
}

export default LineChart;