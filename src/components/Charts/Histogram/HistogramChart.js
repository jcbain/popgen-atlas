import React, { useState } from 'react';

import Histogram from './Histogram';
import {ChartDiv} from '../ChartStyles';
import { ParamSlider } from '../../ParamSelector/ParamSlider';

const HistogramChart = (props) => {
    const { className, displayDims, data, themes, options } = props;
    const [sliderVal, updateSliderVal] = useState(1000);
    const updateValChange = (d) => {
        updateSliderVal(d)
    }

    let newData = [];
    data.map(d => {
        const {values, key} = d;
        const newValues = values.filter(d => d.output_gen === sliderVal)
        newData.push({key, values: newValues})
    })
    console.log(newData)

    return (
        <ChartDiv className={className}
            displaywidth={displayDims.width}
            displayheight={displayDims.height * (8/10)}>
            <Histogram data={newData}
                nestedVar={'values'}
                xVar={'positional_phen'}
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