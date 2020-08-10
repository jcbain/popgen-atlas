import React, { useState } from 'react';

import Histogram from './Histogram';
import {ChartDiv} from '../ChartStyles';
import { ParamSlider } from '../../ParamSelector/ParamSlider';

const HistogramChart = (props) => {
    const { className, displayDims, data, themes, options, 
            nestedVar, xVar, filteredVar} = props;
    const [sliderVal, updateSliderVal] = useState(1000);
    const updateValChange = (d) => {
        updateSliderVal(d)
    }

    let updatedData = [];
    data.map(d => {
        const {key} = d;
        const updatedValues = d[nestedVar].filter(d => d[filteredVar] === sliderVal)
        updatedData.push({key, values: updatedValues})
    })

    return (
        <ChartDiv className={className}
            displaywidth={displayDims.width}
            displayheight={displayDims.height * (8/10)}>
            <Histogram data={updatedData}
                nestedVar={nestedVar}
                xVar={xVar}
                themes={themes}
                displayDims={{...displayDims, height: displayDims.height * (8/10)}}>
            </Histogram>
            <ParamSlider updateValChange={updateValChange} 
                options={options}
                viewwidth={displayDims.width}
                viewheight={displayDims.height * (2/10)}
            ></ParamSlider>

        </ChartDiv>
    )
}

HistogramChart.defaultProps = {
    className: 'histogram-chart',
    updateValChange: () => console.log('this needs some sort of action')
}

export default HistogramChart;