import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { max, min } from 'lodash'

import GroupedGenomes from './GroupedGenomes'

const Wrapper = styled.div`
    width: 100%;
`;


const GenomeChart = ({ data, xVar, yVar, colorVar, theme }) => {

    const [ upper, setUpper ] = useState(250000)
    const [ lower, setLower ] = useState(1000)
    const [ minVal, setMinVal ] = useState()
    const [ maxVal, setMaxVal ] = useState()
    
    const tmpFiltered = data.filter(d => d[colorVar] !== 0)

    useEffect(() => {
        setMinVal(min(tmpFiltered.map(d => d[colorVar])))
        setMaxVal(max(tmpFiltered.map(d => d[colorVar])))
    }, [tmpFiltered, colorVar])

    return (
        <Wrapper>
            <GroupedGenomes data={tmpFiltered} 
                xVar={xVar} 
                yVar={yVar} 
                colorVar={colorVar}
                theme={theme}
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


