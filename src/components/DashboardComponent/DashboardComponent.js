import React from 'react';
import styled from 'styled-components';

import ChartViewMain from './ChartView/ChartViewComponent';
import ParamViewMain from './ParamView/ParamViewComponent';
import ChartCardView from './ChartCardView/ChartCardViewComponent';

const DashboardComponentMainContainer = styled.div`
    grid-area: ${props => props.gridarea || 'none'};
    background-color: ${props => props.theme.color.main};
    width: 95%;
    height: 95%;
    border-radius: 10px;
`

export const DashboardComponent = (props) => {
    const { selectedView, params, useLocalParams, specialOpts, paramOptions,
            handleSwitch, xAction, renderAction, handleSlider,
            selectedChart, cardAction, gridarea, ...rest} = props;

    let viewDisplay;
    switch(selectedView){
        case('chartview'):
            viewDisplay = (
                <ChartViewMain selectedChart={selectedChart}
                    useLocalParams={useLocalParams}
                    params={params}
                    paramOptions={paramOptions}
                    handleSwitch={handleSwitch}
                    handleSlider={handleSlider}
                    xAction={xAction}
                    {...rest}
                    >
                </ChartViewMain>
            )
        break;
        case('paramview'):
            viewDisplay = (
                <ParamViewMain 
                    selectedChart={selectedChart}
                    paramOptions={paramOptions}
                    handleSwitch={handleSwitch}
                    renderAction={renderAction}
                    params={params}
                    xAction={xAction}>
                </ParamViewMain>
            )
        break;
        case('cardview'):
            viewDisplay = <ChartCardView cardAction={cardAction} />
            break;
        default: viewDisplay = <div></div>;
    }

    return (
        <DashboardComponentMainContainer gridarea={gridarea}>
            {viewDisplay}
        </DashboardComponentMainContainer>
    )
}