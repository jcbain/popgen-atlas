import React, { useState } from 'react';

import Histogram from './Histogram';
import { ChartDiv } from '../ChartStyles';
import { ParamSlider } from '../../ParamSelector/ParamSlider';
import { ParamLister } from '../../DashboardComponentCard/DashboardComponentCardsStyles'
import { ParamSelector } from '../../ParamSelector/ParamSelector';

const HistogramChart = (props) => {
    const { className, data, themes, 
            paramOptions, params, handleSwitch, readableLabels,
            nestedVar, xVar, filteredVar, useLocalParams} = props;
    
    const [sliderVal, updateSliderVal] = useState(2000);
    
    const xAxisLabel = readableLabels[xVar];
    const chartname = 'histogram'
    const options = paramOptions.find(d => d.paramName === filteredVar);
    const filteredParamOptions = paramOptions.filter(d=> d.paramName !== 'pop' && d.paramName !== filteredVar);

    const updateValChange = (d) => {
        updateSliderVal(d)
    }

    let updatedData = [];
    data.forEach(d => {
        const {key} = d;
        const updatedValues = d[nestedVar].filter(d => d[filteredVar] === sliderVal)
        updatedData.push({key, values: updatedValues})
    })

    let paramBar;
    if( useLocalParams ) {
        const numParams = filteredParamOptions.length;
        const selectors = filteredParamOptions.map( ( d, i ) => {
            const { paramName, paramNameReadable, options } = d;
            return (
                <ParamSelector key={i}
                    className={'histogram-chart-param-selector'}
                    paramName={paramName}
                    paramNameReadable={paramNameReadable}
                    options={options}
                    selectedValue={params[paramName]}
                    handleSwitch={handleSwitch}>
                </ParamSelector>
            )
        })
        paramBar = <ParamLister numparams={numParams}>
            { selectors }
        </ParamLister>

    }

    return (
        <ChartDiv className={className} chartname={chartname}>
            { paramBar }
            <Histogram data={updatedData}
                chartname={chartname}
                gridarea="focus"
                nestedVar={nestedVar}
                xVar={xVar}
                xAxisLabel={xAxisLabel}
                themes={themes}>
            </Histogram>
            <ParamSlider updateValChange={updateValChange} 
                chartname={chartname}
                gridarea="context"
                options={options}
            ></ParamSlider>
        </ChartDiv>
    )
}

HistogramChart.defaultProps = {
    className: 'histogram-chart',
    updateValChange: () => console.log('this needs some sort of action')
}

export default HistogramChart;