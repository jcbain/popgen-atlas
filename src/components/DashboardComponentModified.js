import React, {useState} from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { v4 as uuidv4 } from 'uuid';

import LineChartGroup from './LineChartGroup';
import GeneArchGroup from './GeneArchGroup';


const StyledDashboardComponentDiv = styled.div`
    background-color: #ffffff;
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
    display: grid;
    justify-items: center;
    align-items: center;
    cursor: pointer;
    width: 20vw;
    height: 10vh;
    background-color: #fff;
    box-shadow: 0px 1px 2px 0px rgba(168,168,168,1);
    border: 1px solid #f2f2f2;
    border-radius: 3px;
    font-family: 'Assistant', sans-serif;
    transition: .5s;
    &:hover {
        box-shadow: none;
        background-color: #ffdbbf;
        color: #fffff7;
        border: 1px solid #ffdbbf;
        font-weight: 600;
    }
`;

const CardViewDiv = styled(ChartViewDiv)`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1vw;
    justify-items: center;
    align-items: center;
`;

const ChartOptionsDiv = styled(ChartViewDiv)`
    background-color: #ffffff;
`


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
    const label = props.label.toUpperCase();
    return (
        <ChartCardDiv onClick={props.onClick}>{label}</ChartCardDiv>
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

const ChartOptions = (props) => {

    return(
        <ChartOptionsDiv>
            <IconButton onClick={props.onBackClick} color="primary" aria-label="back" component="span">
                <ArrowBackIcon />
            </IconButton>
        </ChartOptionsDiv>
    )
}

export const DashboardComponentModified = (props) => {
    const [selectedChart, setSelectedChart] = useState({chartView: 'chartview', selectedChart: 'lineChartGroup'})
    const [params, setParams] = useState({mu: '1e-6', m: '1e-4', r: '1e-6' , sigsqr: '25', output_gen: 1000, pop: 0})
    const [paramOpts, setParamOpts] = useState({lineChartGroup: {pop: [0, 1]}})
    
    const xAction = () => setSelectedChart({chartView: 'chartlister', selectedChart: ''});
    const chooseChart = (chartId) => () => setSelectedChart({chartView: 'chartoptions', selectedChart: chartId})

    let viewDisplay;
    switch (selectedChart.chartView){
        case('chartview'):
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
        break;
        case('chartlister'):
            viewDisplay = (
                    <ChartCardLister
                        onClickLineChartGroup={chooseChart('lineChartGroup')}
                        onClickGeneArchGroup={chooseChart('geneArchGroup')}>
                    </ChartCardLister>
            )
        break;
        case('chartoptions'):
                viewDisplay = (
                    <ChartOptions onBackClick={xAction}>
                    </ChartOptions>
                )
        break;
        default: viewDisplay = <div></div>
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