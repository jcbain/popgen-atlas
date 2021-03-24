import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import useData from '../../../hooks/useData';
import useTheme from '../../../hooks/useTheme';
import useFonts from '../../../hooks/useFonts'
import Histogram from './Histogram'
// import Line from './Line';

const Wrapper = styled.div`
    width: 100%;

`;


const HistogramChart = ({ variable, pop, mutation, migration, sigsqr }) => {

    const { data, loaded } = useData('effect_size_freq_diff');
    const [ generation, setGeneration ] = useState(1000)

    useFonts()

    const filtered = data.filter(d => d.pop === pop && d.m === migration && d.mu === mutation && d.sigsqr === sigsqr && d.output_gen === generation)
    
    

    return (
        <Wrapper>
            <Histogram data={filtered} variable={variable}/>

        </Wrapper>
    )
}

export default HistogramChart;