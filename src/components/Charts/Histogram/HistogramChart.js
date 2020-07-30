import React from 'react';

import Histogram from './Histogram';
import {ChartDiv} from '../ChartStyles';

const HistogramChart = (props) => {
    const { className, displayDims, data, themes } = props;
    
    return (
        <ChartDiv className={className}
            displaywidth={displayDims.width}
            displayheight={displayDims.height}>
            <Histogram data={data}
                nestedVar={'values'}
                xVar={'positional_phen'}
                themes={themes}
                displayDims={displayDims}>
            </Histogram>

        </ChartDiv>
    )
}

HistogramChart.defaultProps = {
    className: 'histogram-chart'
}

export default HistogramChart;