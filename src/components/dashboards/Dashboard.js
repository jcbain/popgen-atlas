import React from 'react';
import styled from 'styled-components';

import useData from '../../hooks/useData'
import useFilteredData from '../../hooks/useFilteredData'
import useParams from '../../hooks/useParams'
import useFriendlyLabels from '../../hooks/useFriendlyLabels'
import HistogramChart from '../charts/HistogramChart';
import GenomeChart from '../charts/GenomeChart';
import LineChart from '../charts/LineChart';
import DropDown from '../inputs/DropDown'



const Wrapper = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: 1160px 160px;
    column-gap: 20px;
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 550px 550px;
    grid-template-rows: 500px 400px;
    grid-template-areas:
        'genome genome'
        'line hist';
    row-gap: 40px;
    column-gap: 40px;
`

const ParamsDiv = styled.div`
    width: 100%;

`

const Dashboard = ({theme}) => {

    const { data, loaded } = useData()
    const { paramOptions, chosenSet, changeParam } = useParams(data)
    const {genes, phens, geneLoaded, phenLoaded } = useFilteredData(data, loaded, 'effect_size_freq_diff', chosenSet)
    const { friendlyLabels } = useFriendlyLabels()
    const paramSelectors = Object.keys(paramOptions).map((p, i) => {
        const { paramName, values, selectedValue } = paramOptions[p];

        return <DropDown key={i} param={friendlyLabels[paramName]} options={values} selection={selectedValue} makeSelection={(v) => changeParam(paramName, v)} />

    })

    return (
        <Wrapper>
            <Grid>

                {geneLoaded && <GenomeChart data={genes} xVar={'output_gen'} yVar={'position'} colorVar={'effect_size_freq_diff'} theme={theme}  />}
                {phenLoaded && <LineChart data={phens} xVar={'output_gen'} yVar={'phen_diff'} theme={theme}/>}
                {geneLoaded && <HistogramChart data={genes} variable={'effect_size_freq_diff'} groupVar={'output_gen'} theme={theme}/>}
            </Grid>
            <ParamsDiv>
                {paramSelectors}
            </ParamsDiv>
        </Wrapper>
    )
}

export default Dashboard;