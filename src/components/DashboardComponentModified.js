import React, {useState} from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import styled from 'styled-components';

import LineChartGroup from './LineChartGroup';

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

export const ChartView = (props) => {
    
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
            )

    };
    
    return (
        <ChartViewDiv>
            <StyledClearIcon onClick={props.xAction}></StyledClearIcon>
            {displayCharts[props.chosenChart]}
        </ChartViewDiv>
    )

}

export const DashboardComponentModified = (props) => {
    const [selectedChart, setSelectedChart] = useState({chartView: true, selectedChart: 'lineChartGroup'})
    const [params, setParams] = useState({mu: '1e-6', m: '1e-4', r: '1e-6' , sigsqr: '25', output_gen: 1000, pop: 0})
    const [paramOpts, setParamOpts] = useState({lineChartGroup: {pop: [0, 1]}})
    
    const xAction = () => setSelectedChart({chartView: false, selectedChart: ''});


    let viewDisplay;
    if( selectedChart.chartView){
        viewDisplay = (
            <ChartView xAction={xAction}
                lineChartData={props.dataPopPhen}
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