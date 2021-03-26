import React from 'react';
import styled from 'styled-components';

import useData from '../../hooks/useData'
import useFilteredData from '../../hooks/useFilteredData'
import useParams from '../../hooks/useParams'
import HistogramChart from '../charts/HistogramChart';
import GenomeChart from '../charts/GenomeChart';
import LineChart from '../charts/LineChart';
import DropDown from '../inputs/DropDown'



const Wrapper = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: 1300px 200px;
    column-gap: 40px;
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 550px 550px;
    grid-template-rows: 400px 400px;
    row-gap: 40px;
    column-gap: 40px;
`

const ParamsDiv = styled.div`
    width: 100%;
    padding: 20px;

`

const Dashboard = ({theme}) => {

    const { data, loaded } = useData()
    const { paramOptions, chosenSet, changeParam } = useParams(data)
    const {genes, phens, geneLoaded, phenLoaded } = useFilteredData(data, loaded, 'effect_size_freq_diff', chosenSet)

    const paramSelectors = Object.keys(paramOptions).map((p, i) => {
        const { paramName, values, selectedValue } = paramOptions[p];

        return <DropDown key={i} param={paramName} options={values} selection={selectedValue} makeSelection={(v) => changeParam(paramName, v)} />

    })

    return (
        <Wrapper>
            {/* <button onClick={() => changeParam("mu", 0.000001)}>Change</button>
            <button onClick={() => changeParam("m", 0.005)}>Change2</button> */}
           
            <Grid>

                {phenLoaded && <LineChart data={phens} xVar={'output_gen'} yVar={'phen_diff'} theme={theme}/>}
                {geneLoaded && <GenomeChart data={genes} xVar={'output_gen'} yVar={'position'} colorVar={'effect_size_freq_diff'} theme={theme}  />}
                {geneLoaded && <HistogramChart data={genes} variable={'effect_size_freq_diff'} theme={theme}/>}
                {geneLoaded && <HistogramChart data={genes} variable={'effect_size_freq_diff'} theme={theme}/>}
            </Grid>
            <ParamsDiv>
                {paramSelectors}
            </ParamsDiv>
        </Wrapper>
    )
}

export default Dashboard;