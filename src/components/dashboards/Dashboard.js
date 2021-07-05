import {useEffect} from 'react';
import styled from 'styled-components';

import useData from '../../hooks/useData'
import useFilteredData from '../../hooks/useFilteredData'
import useParams from '../../hooks/useParams'
import HistogramChart from '../charts/HistogramChart';
import GenomeChart from '../charts/GenomeChart';
import LineChart from '../charts/LineChart';
import VariableParamBar from './VariableParamBar'
import ConstParamBar from './ConstParamBar';

const Wrapper = styled.div`
    width: 1200px;
    display: grid;
    /* padding-top: 200px; */
    grid-template-columns: 1fr .25fr;
    grid-template-rows: 70px 1fr;
    grid-template-areas: 
        "constbar varbar"
        "plots varbar";
    column-gap: ${({ theme }) => theme.smallPaddingH};
    background-color: ${({ theme }) => theme.dashboardBackground};
    &.hidden {
        display: none;
    }
`

const Grid = styled.div`
    display: grid;
    padding: ${({ theme }) => theme.smallPaddingH};
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 600px 500px;
    grid-template-areas:
        'genome genome'
        'line hist';
    row-gap: 40px;
    column-gap: 40px;
`

const ChartHolder = styled.div`
    padding: 50px 40px;
    border-radius: 5px;
    border: 1px solid #efefef;
    background-color: ${({ theme }) => theme.chartCardBackground};
`

const Dashboard = ({theme, data, loaded, defaultSet = "", setDefaultSet = () => {},...rest}) => {
    
    // const { data, loaded } = useData()
    const { paramOptions, chosenSet, changeParam, cutoff } = useParams(data, defaultSet)
    const { genes, phens, geneLoaded, phenLoaded } = useFilteredData(data, loaded, 'effect_size_freq_diff', chosenSet)

    useEffect(() => {
        setDefaultSet(chosenSet)
    }, [chosenSet])
    
    return (
        <Wrapper {...rest}>
            <ConstParamBar style={{gridArea: 'constbar', paddingLeft: theme.smallPaddingH, paddingTop: '10px', paddingRight: theme.smallPaddingH} } paramOptions={paramOptions}/>
            <Grid style={{gridArea: 'plots'} }>
                <ChartHolder style={{gridArea:'genome'}}>
                    {geneLoaded && <GenomeChart  data={genes} xVar={'output_gen'} yVar={'position'} colorVar={'effect_size_freq_diff'} cutoff={cutoff} theme={theme}  />}
                </ChartHolder>
                <ChartHolder style={{gridArea:'line'}}>
                    {phenLoaded && <LineChart  data={phens} xVar={'output_gen'} yVar={'phen_diff'} theme={theme}/>}

                </ChartHolder>
                <ChartHolder style={{gridArea:'hist'}}>

                    {geneLoaded && <HistogramChart  data={genes} variable={'effect_size_freq_diff'} groupVar={'output_gen'} theme={theme}/>}
                </ChartHolder>
            </Grid>
            <VariableParamBar style={{gridArea: 'varbar'} } paramOptions={paramOptions} changeParam={changeParam}/>
        </Wrapper>
    )
}

export default Dashboard;