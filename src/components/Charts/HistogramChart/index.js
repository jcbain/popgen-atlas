import React, { useState } from 'react';
import styled from 'styled-components';
import { uniq } from 'lodash';

import useFonts from '../../../hooks/useFonts'
import HistogramGroup from './HistogramGroup'

const Wrapper = styled.div`
    width: 100%;

`;


const HistogramChart = ({ data, variable, groupVar, theme }) => {

    const [ group, setGroup ] = useState(1000)


    useFonts()

    const filtered = data.filter(d => d[groupVar] === group)
    const uniqVals = uniq(data.map(d => d[groupVar]))
    

    return (
        <Wrapper>
            <HistogramGroup data={filtered} variable={variable} theme={theme} uniqVals={uniqVals} setGroup={setGroup}/>

        </Wrapper>
    )
}

export default HistogramChart;