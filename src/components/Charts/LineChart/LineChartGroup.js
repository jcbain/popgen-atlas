import React from 'react';
import { scaleLinear } from 'd3-scale';
import { v4 as uuidv4 } from 'uuid';

import LineChart from './LineChart';


const LineChartGroup = (props) => {
    const { data, nestedVar, xVar, yVar} = props;

    const xScale = scaleLinear()

    return (
        <div>
            <LineChart data={data}
                uniqId={uuidv4()}
                xDomain={[4000, 40000]}
                xScale={xScale}
                nestedVar={nestedVar}
                displayDims={{width: 100, height: 40}}
                xVar={xVar}
                yVar={yVar}
                visibleOpacity={false}>
            </LineChart>
            <LineChart data={data}
                uniqId={uuidv4()}
                xDomain={[1000, 50000]}
                xScale={xScale}
                nestedVar={nestedVar}
                displayDims={{width: 100, height: 20}}
                xVar={xVar}
                yVar={yVar}
                addBrush={true}>
            </LineChart>
        </div>
    )
    
}

export default LineChartGroup;