import React from 'react';

import ChartViewMain from './ChartView/ChartViewComponent';
import {ParamViewLineChart} from './ParamView/ParamViewComponent';

export const DashboardComponentLineChart = (props) => {
    const { selectedView, lineChartData, viewwidth, viewheight, 
            params, useLocalParams, specialOpts, paramOptions,
            handleSwitch, xAction, renderAction,
            geneArchData, template} = props;


    let viewDisplay;
    switch(selectedView){
        case('chartview'):
            viewDisplay = (
                <ChartViewMain selectedChart={'linechartgroup'}
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
                    >
                </ChartViewMain>
            )
        break;
        case('paramview'):
            viewDisplay = (
                <ParamViewLineChart viewwidth={viewwidth}
                    viewheight={viewheight}
                    paramOptions={paramOptions}
                    handleSwitch={handleSwitch}
                    renderAction={renderAction}
                    params={params}>
                </ParamViewLineChart>
            )
        break;
        default: viewDisplay = <div></div>;
    }

    return (
        <div>
            {viewDisplay}
        </div>
    )
}