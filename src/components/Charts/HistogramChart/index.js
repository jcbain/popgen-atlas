import React, { useState } from 'react';
import styled from 'styled-components';
import { uniq } from 'lodash';

import useFonts from '../../../hooks/useFonts'
import HistogramGroup from './HistogramGroup'
import useFriendlyLabels from '../../../hooks/useFriendlyLabels';

const Wrapper = styled.div`
    width: 100%;

`;


const HistogramChart = ({ data, variable, groupVar, theme, ...rest }) => {

    const [ group, setGroup ] = useState(1000)
    const { friendlyLabels } = useFriendlyLabels();


    useFonts()

    const filtered = data.filter(d => d[groupVar] === group)
    const uniqVals = uniq(data.map(d => d[groupVar]))
    

    return (
        <Wrapper {...rest}>
            <HistogramGroup data={filtered} variable={variable} theme={theme} uniqVals={uniqVals} setGroup={setGroup} sliderLabel={friendlyLabels[groupVar]}/>

        </Wrapper>
    )
}

export default HistogramChart;