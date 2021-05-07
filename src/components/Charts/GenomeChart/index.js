import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { max, min } from 'lodash'
import Grid from '@material-ui/core/Grid';

import GroupedGenomes from './GroupedGenomes'
import Legend from './Legend'
import useFriendlyLabels from '../../../hooks/useFriendlyLabels'
import VariableParamBar from '../../dashboards/VariableParamBar'

const Wrapper = styled.div`
    width: 100%;
`;

const LegendWrapper = styled.div`
    width: 300px;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
`


const GenomeChart = ({ data, xVar, yVar, colorVar, isStatic, theme, changeParam, setStatic, paramOptions, ...rest}) => {
    const [ upper, setUpper ] = useState(250000)
    const [ lower, setLower ] = useState(1000)
    const [ minVal, setMinVal ] = useState()
    const [ maxVal, setMaxVal ] = useState()

    const { friendlyLabels } = useFriendlyLabels()
    
    const tmpFiltered = data.filter(d => d[colorVar] !== 0)

    useEffect(() => {
        setMinVal(min(tmpFiltered.map(d => d[colorVar])))
        setMaxVal(max(tmpFiltered.map(d => d[colorVar])))
    }, [tmpFiltered, colorVar])

    return (
        <Wrapper {...rest}>
            <Grid container spacing={8}>  
                { isStatic &&
                    <Grid item xs={3}>
                        <VariableParamBar
                            style={{background: theme.dashboardBackground}}
                            theme={theme}
                            paramOptions={paramOptions}
                            isStatic={isStatic}
                            setStatic={setStatic}
                            changeParam={changeParam}
                            isGlobal={false}
                            isInline={false}
                            focus={'genomeSet'}
                        />
                    </Grid>
                }

                <Grid item xs={isStatic ? 9 : 12}>
                    <LegendWrapper>
                        <Legend minVal={minVal} maxVal={maxVal} title={friendlyLabels[colorVar]}/>
                    </LegendWrapper>

                    <GroupedGenomes
                        data={tmpFiltered} 
                        xVar={xVar} 
                        yVar={yVar} 
                        colorVar={colorVar}
                        theme={theme}
                        upperLimit={upper} 
                        lowerLimit={lower} 
                        setUpperLimit={setUpper} 
                        setLowerLimit={setLower} 
                        minVal={minVal} 
                        maxVal={maxVal}
                        isStatic={isStatic}
                    />
                </Grid>
            </Grid>
        </Wrapper>
    )
}

export default GenomeChart;


