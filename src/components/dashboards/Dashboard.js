import React from 'react';
import styled from 'styled-components';
import { uniq } from 'lodash'

import useData from '../../hooks/useData'
import useFilteredData from '../../hooks/useFilteredData'
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

    // const { phen, phenLoaded, gene, geneLoaded, changeParams } = useData('effect_size_freq_diff');
    const { data, loaded } = useData()
    // console.log(data)
    const {genes, phens, geneLoaded, phenLoaded } = useFilteredData(data, loaded, 'effect_size_freq_diff')
    console.log(genes)
    // const uniqX = uniq(data.filter(d => d['output_gen']))

    

    return (
        <Wrapper>
            {/* <button onClick={changeParams}>Change</button> */}
            <Grid>

                {phenLoaded && <LineChart data={phens} xVar={'output_gen'} yVar={'phen_diff'} pop={pop} mutation={mutation} migration={migration} sigsqr={sigsqr}/>}
                {geneLoaded && <GenomeChart data={genes} xVar={'output_gen'} yVar={'position'} pop={pop} mutation={mutation} migration={migration} sigsqr={sigsqr}/>}
                {geneLoaded && <HistogramChart data={genes} variable={'effect_size_freq_diff'} pop={pop} mutation={mutation} migration={migration} sigsqr={sigsqr}/>}
                {geneLoaded && <HistogramChart data={genes} variable={'effect_size_freq_diff'} pop={pop} mutation={mutation} migration={migration} sigsqr={sigsqr}/>}
            </Grid>
        </Wrapper>
    )
}

export default Dashboard;