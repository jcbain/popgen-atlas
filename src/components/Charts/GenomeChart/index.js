import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { max, min } from 'lodash'

import GroupedGenomes from './GroupedGenomes'

const Wrapper = styled.div`
    width: 100%;
`;


const GenomeChart = ({ data, xVar, yVar, outputGen }) => {

    const [ upper, setUpper ] = useState(250000)
    const [ lower, setLower ] = useState(1000)
    const [ minVal, setMinVal ] = useState()
    const [ maxVal, setMaxVal ] = useState()
    
    useEffect(() => {
 
        setMinVal(min(data.map(d => d['effect_size_freq_diff'])))
        setMaxVal(max(data.map(d => d['effect_size_freq_diff'])))
    }, [data])

    return (
        <Wrapper>
            <GroupedGenomes data={data} xVar={xVar} yVar={yVar} outputGen={outputGen} upperLimit={upper} lowerLimit={lower} setUpperLimit={setUpper} setLowerLimit={setLower} minVal={minVal} maxVal={maxVal}/>
        </Wrapper>
    )
}

export default GenomeChart;


