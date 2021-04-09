import React, { useState } from 'react';
import styled from 'styled-components';
import { min, max } from 'lodash';

import GroupedLines from './GroupedLines';

const Wrapper = styled.div`
    width: 100%;
`;


const LineChart = ({ data, xVar, yVar, theme, ...rest }) => {

    const xVals = data.map(d => d[xVar])

    const [ upper, setUpper ] = useState(max(xVals))
    const [ lower, setLower ] = useState(min(xVals))

    return (
        <Wrapper {...rest}>
            <GroupedLines data={data} xVar={xVar} yVar={yVar} theme={theme} upperLimit={upper} lowerLimit={lower} setUpperLimit={setUpper} setLowerLimit={setLower}/>

        </Wrapper>
    )
}

export default LineChart;