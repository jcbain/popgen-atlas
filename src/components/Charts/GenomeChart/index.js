import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { max, min } from 'lodash'

import GroupedGenomes from './GroupedGenomes'
import Legend from './Legend'
import useFriendlyLabels from '../../../hooks/useFriendlyLabels'

const Wrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: .2fr 1fr;
`;

const LegendWrapper = styled.div`
    width: 300px;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
`


const GenomeChart = ({ data, xVar, yVar, colorVar, cutoff, theme, ...rest}) => {

    const [ upper, setUpper ] = useState(250000)
    const [ lower, setLower ] = useState(1000)
    const [ minVal, setMinVal ] = useState()
    const [ maxVal, setMaxVal ] = useState()

    const { friendlyLabels } = useFriendlyLabels()
    const tmpFiltered = data.filter(d => d[colorVar] > cutoff || d[colorVar] < -cutoff)

    useEffect(() => {
        setMinVal(min(tmpFiltered.map(d => d[colorVar])))
        setMaxVal(max(tmpFiltered.map(d => d[colorVar])))
    }, [tmpFiltered, colorVar])

    return (
        <Wrapper {...rest}>
            <LegendWrapper>
                <Legend minVal={minVal} maxVal={maxVal} title={friendlyLabels[colorVar]}/>
            </LegendWrapper>
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


