import React from 'react';

import {ChartViewLineChart} from './ChartView/ChartViewComponent';
import {ParamViewLineChart} from './ParamView/ParamViewComponent';

export const DashboardComponentLineChart = (props) => {
    const { selectedView, lineChartData, viewwidth, viewheight, 
            params, useLocalParams, specialOpts, paramOptions,
            handleSwitch, xAction, renderAction} = props;


    let viewDisplay;
    switch(selectedView){
        case('chartview'):
            viewDisplay = (
                <ChartViewLineChart lineChartData={lineChartData}
                    viewwidth={viewwidth}
                    viewheight={viewheight}
                    useLocalParams={useLocalParams}
                    params={params}
                    specialOpts={specialOpts}
                    xAction={xAction}>
                </ChartViewLineChart>
            )
        break;
        case('paramview'):
            viewDisplay = (
                <ParamViewLineChart viewwidth={viewwidth}
                    viewheight={viewheight}
                    paramOptions={paramOptions}
                    handleSwitch={handleSwitch}
                    renderAction={renderAction}>
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