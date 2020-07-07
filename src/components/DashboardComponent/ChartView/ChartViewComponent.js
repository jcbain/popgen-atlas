import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import LineChartGroup from '../../LineChartGroup2';
import GeneArchGroup from '../../GeneArchGroup2';
import { DashboardComponentContainer } from '../DashboardComponentStyles';

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    position: absolute;
    top: 1vh;
    right: 1vw;
    z-index: 1000;
`;

export const ChartViewLineChart = (props) => {
    const {lineChartData, viewwidth, viewheight, params, useLocalParams, specialOpts, paramOptions, xAction, handleSwitch} = props;
    
    const paramsCopy = {...params}
    delete paramsCopy.pop;

    return (
        <DashboardComponentContainer viewwidth={viewwidth}
            viewheight={viewheight}>
            <StyledFontAwesomeIcon onClick={xAction} size="xs" pull="right" icon={faTimes} />
            <LineChartGroup data={lineChartData}
                className={'component-line-chart-group'}
                params={paramsCopy}
                useLocalParams={useLocalParams}
                specialOpts={specialOpts}
                displayDims={{width: viewwidth, height: viewheight}}
                paramOptions={paramOptions.filter(d=> d.paramName !== 'pop')}
                handleSwitch={handleSwitch}
                >
            </LineChartGroup>

        </DashboardComponentContainer>
    )
}

ChartViewLineChart.defaultProps = {
    xAction: () => console.log("I don't do anything")
}

export const ChartViewGenomeChart = (props) => {
    const {geneArchData, template, params, paramOptions, handleSwitch, viewwidth, viewheight, xAction, useLocalParams, identifier} = props;

    return (
        <DashboardComponentContainer viewwidth={viewwidth}
            viewheight={viewheight}>
            <StyledFontAwesomeIcon onClick={xAction} size="xs" pull="right" icon={faTimes} />
            <GeneArchGroup data={geneArchData}
                template={template}
                params={params}
                useLocalParams={useLocalParams}
                paramOptions={paramOptions}
                identifier={identifier}
                handleSwitch={handleSwitch}
                displayDims={{width: viewwidth, height: viewheight}}
                >

            </GeneArchGroup>
            
        </DashboardComponentContainer>
    )
}

const ChartViewMain = (props) => {
    const {selectedChart} = props;


    let displayChart;
    switch(selectedChart){
        case('linechartgroup'):
            displayChart = <ChartViewLineChart {...props} />
            break;
        case('genearchgroup'):
            displayChart = <ChartViewGenomeChart {...props} />
            break;
        default: 
            displayChart = <DashboardComponentContainer {...props} />
    }

    return displayChart;
}

ChartViewGenomeChart.defaultProps = {
    xAction: () => console.log("I don't do anything")
}

export default ChartViewMain;