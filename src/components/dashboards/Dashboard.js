import React from 'react';
import styled from 'styled-components';

import useData from '../../hooks/useData'
import useFilteredData from '../../hooks/useFilteredData'
import useParams from '../../hooks/useParams'
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

const Dashboard = ({}) => {

    const { data, loaded } = useData()
    const { paramOptions, chosenSet } = useParams(data)
    const {genes, phens, geneLoaded, phenLoaded } = useFilteredData(data, loaded, 'effect_size_freq_diff', chosenSet)

    return (
        <Wrapper>
            {/* <button onClick={changeParams}>Change</button> */}
            <Grid>

                {phenLoaded && <LineChart data={phens} xVar={'output_gen'} yVar={'phen_diff'}  />}
                {geneLoaded && <GenomeChart data={genes} xVar={'output_gen'} yVar={'position'} colorVar={'effect_size_freq_diff'}  />}
                {geneLoaded && <HistogramChart data={genes} variable={'effect_size_freq_diff'} />}
                {geneLoaded && <HistogramChart data={genes} variable={'effect_size_freq_diff'} />}
            </Grid>
        </Wrapper>
    )
}

export default Dashboard;