import React, { useState } from 'react';
import styled from 'styled-components';
import { uniq } from 'lodash';

import useFonts from '../../../hooks/useFonts';
import HistogramGroup from './HistogramGroup';
import useFriendlyLabels from '../../../hooks/useFriendlyLabels';
import VariableParamBar from '../../dashboards/VariableParamBar';

const Wrapper = styled.div`
    width: 100%;
`;

const HistogramChart = ({ data, variable, groupVar, theme, isStatic, paramOptions, setStatic, changeParam, ...rest }) => {
    const [ group, setGroup ] = useState(1000)
    const { friendlyLabels } = useFriendlyLabels();

    const filtered = data.filter(d => d[groupVar] === group)
    const uniqVals = uniq(data.map(d => d[groupVar]))
    
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
                    focus={'histoSet'}
                />
            }
            <HistogramGroup
                data={filtered}
                variable={variable}
                theme={theme}
                uniqVals={uniqVals}
                setGroup={setGroup}
                sliderLabel={friendlyLabels[groupVar]}
            />
        </Wrapper>
    )
}

export default HistogramChart;