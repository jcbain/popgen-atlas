import React, {useState} from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import LineChartGroup from './LineChartGroup';
import GeneArchGroup from './GeneArchGroup';


const StyledDashboardComponentDiv = styled.div`
    background-color: #fffff7;
    box-shadow: 0px 0px 1px 0px rgba(168,168,168,1);
    grid-area: ${props => props.gridArea.name};
`;

const ChartViewDiv = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const StyledClearIcon = styled(ClearIcon)`
    position: absolute;
    top: 0;
    right: 0;
    fill: #e8e8e8;
    &:hover {
        fill: palevioletred;
    }
`

const ChartCardDiv = styled.div`
    width: 20vw;
    height: 10vh;
    background-color: #fff;
    box-shadow: 0px 0px 0px 0px rgba(168,168,168,1);
    border: 1px solid #f2f2f2;
    border-radius: 3px;
    font-family: 'Yanone Kaffeesatz', sans-serif;
    font-weight: 500;
`;

const CardViewDiv = styled(ChartViewDiv)`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1vw;
    justify-items: center;
    align-items: center;


`;

export const ChartView = (props) => {
    const identifier = uuidv4();
    
    const displayCharts = {
        lineChartGroup: (
            <LineChartGroup data={props.lineChartData}
                className={'component-line-chart-group'}
                params={props.params}
                useLocalParams={props.useLocalParams}
                specialOpts={props.paramOpts.lineChartGroup}
                displayDims={props.displayDims}
            >
            </LineChartGroup>
            ),
        geneArchGroup: (
            <GeneArchGroup data={props.geneArchData}
                template={props.template}
                params={props.params}
                useLocalParams={props.useLocalParams}
                identifier={identifier}
                displayDims={props.displayDims}
            >
            </GeneArchGroup>

        )

    };
    
    return (
        <ChartViewDiv>
            <StyledClearIcon onClick={props.xAction}></StyledClearIcon>
            {displayCharts[props.chosenChart]}
        </ChartViewDiv>
    )

}

const ChartCard = (props) => {
    return (
        <ChartCardDiv onClick={props.onClick}>{props.label}</ChartCardDiv>
    )
}

const ChartCardLister = (props) => {
    return(
        <CardViewDiv>
            <ChartCard label={'Line Chart'} onClick={props.onClickLineChartGroup}>Line Chart</ChartCard>
            <ChartCard label={'Genome Chart'} onClick={props.onClickGeneArchGroup}>Genome Chart</ChartCard>
        </CardViewDiv>
    )
}

export const DashboardComponentModified = (props) => {
    const [selectedChart, setSelectedChart] = useState({chartView: true, selectedChart: 'lineChartGroup'})
    const [params, setParams] = useState({mu: '1e-6', m: '1e-4', r: '1e-6' , sigsqr: '25', output_gen: 1000, pop: 0})
    const [paramOpts, setParamOpts] = useState({lineChartGroup: {pop: [0, 1]}})
    
    const xAction = () => setSelectedChart({chartView: false, selectedChart: ''});
    const chooseChart = (chartId) => () => setSelectedChart({chartView: true, selectedChart: chartId})

    let viewDisplay;
    if( selectedChart.chartView){
        viewDisplay = (
            <ChartView xAction={xAction}
                lineChartData={props.dataPopPhen}
                geneArchData={props.data}
                template={props.template}
                params={params}
                useLocalParams={false}
                paramOpts={paramOpts}
                displayDims={props.gridArea.displayDims}
                chosenChart={selectedChart.selectedChart}
            >
            </ChartView>
        )
    } else {
        viewDisplay = (
            <ChartViewDiv>
                <ChartCardLister
                    onClickLineChartGroup={chooseChart('lineChartGroup')}
                    onClickGeneArchGroup={chooseChart('geneArchGroup')}>

                </ChartCardLister>
                {/* <button onClick={chooseChart('lineChartGroup')}>LineChart</button>
                <button onClick={chooseChart('geneArchGroup')}>GenomeChart</button> */}
            </ChartViewDiv>
        )
    }
    

    return(
        <StyledDashboardComponentDiv 
            className={props.className}
            gridArea={props.gridArea}
        >
            {viewDisplay}

        </StyledDashboardComponentDiv>
    )

}