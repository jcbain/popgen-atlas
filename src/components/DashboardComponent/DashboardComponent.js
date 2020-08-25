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
    const { selectedView, lineChartData, viewwidth, viewheight, 
            params, useLocalParams, specialOpts, paramOptions,
            handleSwitch, xAction, renderAction, handleSlider,
            geneArchData, template, identifier, selectedChart,
            cardAction, gridarea, displayX, readableLabels, themes, paramPermutationData } = props;
    const chartviewwidth = viewwidth - 2; // because of the padding
    const chartviewheight = viewheight- 2 
    let viewDisplay;
    switch(selectedView){
        case('chartview'):
            viewDisplay = (
                <ChartViewMain selectedChart={selectedChart}
                    lineChartData={lineChartData}
                    viewwidth={chartviewwidth}
                    viewheight={chartviewheight}
                    useLocalParams={useLocalParams}
                    params={params}
                    specialOpts={specialOpts}
                    paramOptions={paramOptions}
                    handleSwitch={handleSwitch}
                    handleSlider={handleSlider}
                    xAction={xAction}
                    geneArchData={geneArchData}
                    template={template}
                    identifier={identifier}
                    displayX={displayX}
                    readableLabels={readableLabels}
                    paramPermutationData={paramPermutationData}
                    themes={themes}
                    >
                </ChartViewMain>
            )
        break;
        case('paramview'):
            viewDisplay = (
                <ParamViewMain 
                    selectedChart={selectedChart}
                    viewwidth={chartviewwidth}
                    viewheight={chartviewheight}
                    paramOptions={paramOptions}
                    handleSwitch={handleSwitch}
                    renderAction={renderAction}
                    params={params}
                    xAction={xAction}>
                </ParamViewMain>
            )
        break;
        case('cardview'):
            viewDisplay = <ChartCardView 
                viewwidth={chartviewwidth}
                viewheight={chartviewheight}
                cardAction={cardAction}
                >

            </ChartCardView>
            break;
        default: viewDisplay = <div></div>;
    }

    return (
        <DashboardComponentMainContainer gridarea={gridarea}>
            {viewDisplay}
        </DashboardComponentMainContainer>
    )
}