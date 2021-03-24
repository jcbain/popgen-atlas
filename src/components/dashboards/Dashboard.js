import React from 'react';
import styled from 'styled-components';
import { uniq } from 'lodash'

import useData from '../../hooks/useData'
import HistogramChart from '../charts/HistogramChart';
import GenomeChart from '../charts/GenomeChart';
import LineChart from '../charts/LineChart'



const Wrapper = styled.div`
    padding: 20px;

`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 550px 550px;
    grid-template-rows: 400px 400px;
    row-gap: 10px;
    column-gap: 10px;
`

const Dashboard = ({pop, mutation, migration, sigsqr}) => {

    const { phen, phenLoaded, gene, geneLoaded, changeParams } = useData('effect_size_freq_diff');
    // const uniqX = uniq(data.filter(d => d['output_gen']))

    

    return (
        <Wrapper>
            <button onClick={changeParams}>Change</button>
            <Grid>

                {phenLoaded && <LineChart data={phen} xVar={'output_gen'} yVar={'phen_diff'} pop={pop} mutation={mutation} migration={migration} sigsqr={sigsqr}/>}
                {geneLoaded && <GenomeChart data={gene} xVar={'output_gen'} yVar={'position'} pop={pop} mutation={mutation} migration={migration} sigsqr={sigsqr}/>}
                {geneLoaded && <HistogramChart data={gene} variable={'effect_size_freq_diff'} pop={pop} mutation={mutation} migration={migration} sigsqr={sigsqr}/>}
                {geneLoaded && <HistogramChart data={gene} variable={'effect_size_freq_diff'} pop={pop} mutation={mutation} migration={migration} sigsqr={sigsqr}/>}
            </Grid>
        </Wrapper>
    )
}

export default Dashboard;