import React, { useState } from 'react';
import styled from 'styled-components';

import useFonts from '../../../hooks/useFonts';
import GroupedLines from './GroupedLines';
import VariableParamBar from '../../dashboards/VariableParamBar';

const Wrapper = styled.div`
    width: 100%;
`;


const LineChart = ({ data, xVar, yVar, theme, isStatic, paramOptions, setStatic, changeParam, ...rest }) => {

    const [ upper, setUpper ] = useState(250000)
    const [ lower, setLower ] = useState(1000)

    useFonts()

    return (
        <Wrapper {...rest}>
            { isStatic && 
                <VariableParamBar
                    style={{ background: theme.dashboardBackground, margin:'-4%', marginBottom: '4%'}}
                    theme={theme}
                    paramOptions={paramOptions}
                    isStatic={isStatic}
                    setStatic={setStatic}
                    changeParam={changeParam}
                    isGlobal={false}
                    isInline={true}
                    focus={'lineSet'}
                />
            }

            <GroupedLines
                data={data}
                xVar={xVar}
                yVar={yVar}
                theme={theme}
                upperLimit={upper}
                lowerLimit={lower}
                setUpperLimit={setUpper} 
                setLowerLimit={setLower}
            />
        </Wrapper>
    )
}

export default LineChart;