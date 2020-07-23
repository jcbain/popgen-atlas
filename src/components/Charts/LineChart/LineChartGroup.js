import React, {useState} from 'react';
import { scaleLinear } from 'd3-scale';
import { min, max } from 'd3-array';
import { v4 as uuidv4 } from 'uuid';

import LineChart from './LineChart';


const LineChartGroup = (props) => {
    const { data, nestedVar, xVar, yVar} = props;
    const minX = min(data.map(d => min(d[nestedVar], v => v[xVar]))),
          maxX = max(data.map(d => max(d[nestedVar], v => v[xVar])));
    const [contextDomain, setContextDomain] = useState([minX, maxX])
    
    

    let xScale = scaleLinear()
    const getDomain = (domain) => {
        setContextDomain(domain)
    }

    return (
        <div>
            <LineChart data={data}
                uniqId={uuidv4()}
                xDomain={contextDomain}
                contextDomain={[minX, maxX]}
                xScale={xScale}
                nestedVar={nestedVar}
                displayDims={{width: 100, height: 40}}
                xVar={xVar}
                yVar={yVar}
                visibleOpacity={false}>
            </LineChart>
            <LineChart data={data}
                uniqId={uuidv4()}
                xDomain={[minX, maxX]}
                contextDomain={contextDomain}
                xScale={xScale}
                nestedVar={nestedVar}
                displayDims={{width: 100, height: 20}}
                xVar={xVar}
                yVar={yVar}
                addBrush={true}
                getDomain={getDomain}>
            </LineChart>
        </div>
    )
    
}

LineChartGroup.defaultProps = {
    getDomain: () => console.log('you need a function here')
}

export default LineChartGroup;