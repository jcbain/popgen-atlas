import React from 'react';

import ChartViewMain from './ChartView/ChartViewComponent';
import ParamViewMain from './ParamView/ParamViewComponent';
import ChartCardView from './ChartCardView/ChartCardViewComponent';



export const DashboardComponent = (props) => {
    const { selectedView, lineChartData, viewwidth, viewheight, 
            params, useLocalParams, specialOpts, paramOptions,
            handleSwitch, xAction, renderAction,
            geneArchData, template, identifier, selectedChart,
            cardAction} = props;

    let viewDisplay;
    switch(selectedView){
        case('chartview'):
            viewDisplay = (
                <ChartViewMain selectedChart={selectedChart}
                    lineChartData={lineChartData}
                    viewwidth={viewwidth}
                    viewheight={viewheight}
                    useLocalParams={useLocalParams}
                    params={params}
                    specialOpts={specialOpts}
                    paramOptions={paramOptions}
                    handleSwitch={handleSwitch}
                    xAction={xAction}
                    geneArchData={geneArchData}
                    template={template}
                    identifier={identifier}
                    >
                </ChartViewMain>
            )
        break;
        case('paramview'):
            viewDisplay = (
                <ParamViewMain 
                    selectedChart={selectedChart}
                    viewwidth={viewwidth}
                    viewheight={viewheight}
                    paramOptions={paramOptions}
                    handleSwitch={handleSwitch}
                    renderAction={renderAction}
                    params={params}>
                </ParamViewMain>
            )
        break;
        case('cardview'):
            viewDisplay = <ChartCardView 
                viewwidth={viewwidth}
                viewheight={viewheight}
                cardAction={cardAction}>

            </ChartCardView>
            break;
        default: viewDisplay = <div></div>;
    }

    return (
        <div>
            {viewDisplay}
        </div>
    )
}