import React, { useState } from 'react';
import styled from 'styled-components';
import { uniq, min } from 'lodash';

import HistogramGroup from './HistogramGroup'
import useFriendlyLabels from '../../../hooks/useFriendlyLabels';

const Wrapper = styled.div`
    width: 100%;

`;


const HistogramChart = ({ data, variable, groupVar, theme, ...rest }) => {
    
    const uniqVals = uniq(data.map(d => d[groupVar]))
    const [ group, setGroup ] = useState(min(uniqVals))
    const { friendlyLabels } = useFriendlyLabels();



    const filtered = data.filter(d => d[groupVar] === group)
    
    

    return (
        <Wrapper {...rest}>
            <HistogramGroup data={filtered} variable={variable} theme={theme} uniqVals={uniqVals} setGroup={setGroup} sliderLabel={friendlyLabels[groupVar]}/>

        </Wrapper>
    )
}

export default HistogramChart;