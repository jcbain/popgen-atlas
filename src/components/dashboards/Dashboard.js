import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Grid from '@material-ui/core/Grid';

import useData from '../../hooks/useData';
import useFilteredData from '../../hooks/useFilteredData';
import useParams from '../../hooks/useParams';
import useStatic from '../../hooks/useStatic';
import HistogramChart from '../charts/HistogramChart';
import GenomeChart from '../charts/GenomeChart';
import LineChart from '../charts/LineChart';
import VariableParamBar from './VariableParamBar';
import ConstParamBar from './ConstParamBar';
import useTabs from '../../hooks/useTabs';
import TabState from '../tabs/TabState';


const Wrapper = styled.div`
    min-width: 1200px;
    max-width: 100vw;
    padding: 0.5em 0.15em;
    margin: auto;
    background-color: ${({ theme }) => theme.dashboardBackground};
`

const ChartHolder = styled.div`
    padding: 50px 40px;
    border-radius: 5px;
    border: 1px solid #efefef;
    background-color: ${({ theme }) => theme.chartCardBackground};
`

const Dashboard = ({theme}) => {
    const { data, loaded } = useData()
    const { isStatic, setStatic } = useStatic()
    const { paramOptions, chosenSet, changeParam } = useParams(data, isStatic)
    const { genes, phens, histo, geneLoaded, phenLoaded, histoLoaded } = useFilteredData(data, loaded, 'effect_size_freq_diff', chosenSet)
    const { handleChangeTab, handleAddTab, handleDeleteTab, value, tabData, tabList } = useTabs(genes, phens, histo, paramOptions)

    return (
        <Wrapper>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <ConstParamBar paramOptions={tabData[value].parameter}/>
                    <Grid container spacing={2}>
                        <Grid item xs={1}>
                            <TabState 
                                handleChangeTab={handleChangeTab}
                                handleAddTab={handleAddTab}
                                handleDeleteTab={handleDeleteTab}
                                value={value}
                                tabList={tabList}
                            />
                        </Grid>
                        <Grid item xs={11}>
                            <ChartHolder style={{ marginBottom: 15}}>
                                {geneLoaded &&
                                    <GenomeChart
                                        data={tabData[value].geneData}
                                        xVar={'output_gen'}
                                        yVar={'position'}
                                        colorVar={'effect_size_freq_diff'}
                                        isStatic={isStatic}
                                        theme={theme}
                                        paramOptions={tabData[value].parameter}
                                        setStatic={setStatic}
                                        changeParam={changeParam}
                                    />
                                }
                            </ChartHolder>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <ChartHolder>
                                        {phenLoaded && 
                                            <LineChart 
                                                data={tabData[value].phenData}
                                                xVar={'output_gen'}
                                                yVar={'phen_diff'}
                                                theme={theme}
                                                isStatic={isStatic}
                                                paramOptions={tabData[value].parameter}
                                                setStatic={setStatic}
                                                changeParam={changeParam}
                                            />
                                        }
                                    </ChartHolder>
                                </Grid>
                                <Grid item xs={6}>
                                    <ChartHolder>
                                        {histoLoaded && 
                                            <HistogramChart
                                                data={tabData[value].histoData}
                                                variable={'effect_size_freq_diff'}
                                                groupVar={'output_gen'}
                                                theme={theme}
                                                isStatic={isStatic}
                                                paramOptions={tabData[value].parameter}
                                                setStatic={setStatic}
                                                changeParam={changeParam}
                                            />
                                        }
                                    </ChartHolder>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid item xs={3}>
                    <VariableParamBar
                        theme={theme}
                        paramOptions={tabData[value].parameter}
                        changeParam={changeParam}
                        isStatic={isStatic}
                        setStatic={setStatic}
                        isGlobal={true}
                        isInline={false}
                    />
                </Grid>
            </Grid>

        </Wrapper>
    )
}
export default Dashboard;