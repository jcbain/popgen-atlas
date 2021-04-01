import React from 'react';
import styled from 'styled-components';

import useData from '../../hooks/useData'
import useFilteredData from '../../hooks/useFilteredData'
import useParams from '../../hooks/useParams'
import HistogramChart from '../charts/HistogramChart';
import GenomeChart from '../charts/GenomeChart';
import LineChart from '../charts/LineChart';
import VariableParamBar from './VariableParamBar'
import ConstParamBar from './ConstParamBar';
import useTabs from '../../hooks/useTabs'

import TabState from '../tabs/TabState'

const Wrapper = styled.div`
    width: 1200px;
    /* padding: 20px; */
    display: grid;
    grid-template-columns: 1fr .25fr;
    grid-template-rows: 70px 1fr;
    grid-template-areas: 
        "constbar varbar"
        "plots varbar";
    column-gap: 20px;
    background-color: ${({ theme }) => theme.dashboardBackground};
`

const Grid = styled.div`
    display: grid;
    padding: 20px;
    grid-template-columns: 0.3fr 1fr 1fr;
    grid-template-rows: 600px 600px 500px;
    grid-template-areas:
        'tab genome genome'
        'tab line hist';
    row-gap: 40px;
    column-gap: 40px;
`

const ChartHolder = styled.div`
    padding: 50px 40px;
    border-radius: 5px;
    border: 1px solid #efefef;
    background-color: ${({ theme }) => theme.chartCardBackground};
`
const Dashboard = ({theme}) => {

    const { data, loaded } = useData()
    const { paramOptions, chosenSet, changeParam } = useParams(data)
    const { genes, phens, geneLoaded, phenLoaded } = useFilteredData(data, loaded, 'effect_size_freq_diff', chosenSet)
    const {handleChangeTab,handleAddTab,handleDeleteTab,value,tabData,tabList} = useTabs(genes,phens,paramOptions)

    return (
        <Wrapper>
            <ConstParamBar style={{gridArea: 'constbar', paddingLeft: '20px', paddingTop: '10px', paddingRight: '20px'} } paramOptions={tabData[value].parameter}/>
            <Grid style={{gridArea: 'plots'} }>

                <TabState 
                    handleChangeTab={handleChangeTab}
                    handleAddTab={handleAddTab}
                    handleDeleteTab={handleDeleteTab}
                    value={value}
                    tabList={tabList}
                />

                <ChartHolder style={{gridArea:'genome'}}>
                    {geneLoaded && <GenomeChart  data={tabData[value].geneData} xVar={'output_gen'} yVar={'position'} colorVar={'effect_size_freq_diff'} theme={theme}  />}
                </ChartHolder>

                <ChartHolder style={{gridArea:'line'}}>
                    {phenLoaded && <LineChart  data={tabData[value].phenData} xVar={'output_gen'} yVar={'phen_diff'} theme={theme}/>}
                </ChartHolder>

                <ChartHolder style={{gridArea:'hist'}}>
                    {geneLoaded && <HistogramChart  data={tabData[value].geneData} variable={'effect_size_freq_diff'} groupVar={'output_gen'} theme={theme}/>}
                </ChartHolder>

            </Grid>

            <VariableParamBar style={{gridArea: 'varbar'} } paramOptions={tabData[value].parameter} changeParam={changeParam}/>

        </Wrapper>
    )
}

export default Dashboard;