import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { max, min } from 'lodash'

import GroupedGenomes from './GroupedGenomes'

const Wrapper = styled.div`
    width: 100%;
`;


const GenomeChart = ({ data, xVar, yVar, colorVar }) => {

    const [ upper, setUpper ] = useState(250000)
    const [ lower, setLower ] = useState(1000)
    const [ minVal, setMinVal ] = useState()
    const [ maxVal, setMaxVal ] = useState()
    
    useEffect(() => {
        setMinVal(min(data.map(d => d[colorVar])))
        setMaxVal(max(data.map(d => d[colorVar])))
    }, [data, colorVar])

    return (
        <Wrapper>
            <GroupedGenomes data={data} 
                xVar={xVar} 
                yVar={yVar} 
                colorVar={colorVar}
                upperLimit={upper} 
                lowerLimit={lower} 
                setUpperLimit={setUpper} 
                setLowerLimit={setLower} 
                minVal={minVal} 
                maxVal={maxVal}/>
        </Wrapper>
    )
}

export default GenomeChart;


