import React, { useState } from 'react';
import styled from 'styled-components';
import { uniq } from 'lodash';

import useFonts from '../../../hooks/useFonts'
import HistogramGroup from './HistogramGroup'

const Wrapper = styled.div`
    width: 100%;

`;


const HistogramChart = ({ data, variable, pop, mutation, migration, sigsqr }) => {

    const [ generation, setGeneration ] = useState(1000)


    useFonts()

    // const filtered = data.filter(d => d.pop === pop && d.m === migration && d.mu === mutation && d.sigsqr === sigsqr && d.output_gen === generation)
    const filtered = data.filter(d => d.output_gen === generation)
    const uniqVals = uniq(data.map(d => d['output_gen']))
    

    return (
        <Wrapper>
            <HistogramGroup data={filtered} variable={variable} uniqVals={uniqVals} setGeneration={setGeneration}/>

        </Wrapper>
    )
}

export default HistogramChart;