import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import useData from '../../../hooks/useData';
import useTheme from '../../../hooks/useTheme';
import useFonts from '../../../hooks/useFonts'
import GroupedLines from './GroupedLines';
// import Line from './Line';

const Wrapper = styled.div`
    width: 100%;
    /* height: 100px; */
    /* background: blue; */
`;


const LineChart = ({ xVar, yVar, pop, mutation, migration, sigsqr }) => {

    const { phen, phenLoaded } = useData('effect_size_freq_diff');
    const [ upper, setUpper ] = useState(250000)
    const [ lower, setLower ] = useState(1000)

    useFonts()


    const filtered = phen.filter(d => d.pop === pop && d.m === migration && d.mu === mutation && d.sigsqr === sigsqr)
    

    return (
        <Wrapper>
            <GroupedLines data={filtered} xVar={xVar} yVar={yVar} upperLimit={upper} lowerLimit={lower} setUpperLimit={setUpper} setLowerLimit={setLower}/>

        </Wrapper>
    )
}

export default LineChart;