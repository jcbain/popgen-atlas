import React from 'react';

import Histogram from './Histogram';
import {ChartDiv} from '../ChartStyles';
import { ParamSlider } from '../../ParamSelector/ParamSlider';

const HistogramChart = (props) => {
    const { className, displayDims, data, themes, updateValChange, options } = props;
    
    return (
        <ChartDiv className={className}
            displaywidth={displayDims.width}
            displayheight={displayDims.height * (8/10)}>
            <Histogram data={data}
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