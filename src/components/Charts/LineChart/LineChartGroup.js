import React, {useState} from 'react';
import { min, max } from 'd3-array';
import { v4 as uuidv4 } from 'uuid';

import LineChart from './LineChart';
import {ParamLister} from './DashboardComponentCard/DashboardComponentCardsStyles'
import {ParamSelector} from './ParamSelector/ParamSelector';


const LineChartGroup = (props) => {
    const { data, nestedVar, xVar, yVar, useLocalParams } = props;
    const minX = min(data.map(d => min(d[nestedVar], v => v[xVar]))),
          maxX = max(data.map(d => max(d[nestedVar], v => v[xVar])));
    const [contextDomain, setContextDomain] = useState([minX, maxX])
    
    const getDomain = (domain) => {
        setContextDomain(domain)
    }

    let paramBar;
    if( useLocalParams ) {
        
    }

    return (
        <div>
            <LineChart data={data}
                uniqId={uuidv4()}
                xDomain={contextDomain}
                contextDomain={[minX, maxX]}
                nestedVar={nestedVar}
                displayDims={{width: 100, height: 40}}
                xVar={xVar}
                yVar={yVar}
                visibleOpacity={false}
                addReferenceLine={true}>
            </LineChart>
            <LineChart data={data}
                uniqId={uuidv4()}
                xDomain={[minX, maxX]}
                contextDomain={contextDomain}
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
    getDomain: () => console.log('you need a function here'),
    useLocalParams: true,
}

export default LineChartGroup;