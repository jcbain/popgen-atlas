import React, {useState} from 'react';
import { min, max } from 'd3-array';
import { v4 as uuidv4 } from 'uuid';

import LineChart from './LineChart';
import { ParamLister } from '../../DashboardComponentCard/DashboardComponentCardsStyles'
import { ParamSelector } from '../../ParamSelector/ParamSelector';
import { ChartDiv } from '../ChartStyles';


const LineChartGroup = (props) => {
    const { data, nestedVar, xVar, yVar, useLocalParams, 
            displayDims, className, themes,
            paramOptions, params, handleSwitch } = props;
    const minX = min(data.map(d => min(d[nestedVar], v => v[xVar]))),
          maxX = max(data.map(d => max(d[nestedVar], v => v[xVar])));

    const [contextDomain, setContextDomain] = useState([minX, maxX]);
    
    const focusChartHeight = displayDims.height * (useLocalParams ? 12/20 : 13/20),
          contextChartHeight = displayDims.height * (useLocalParams ? 6/20 : 7/20),
          paramOptionsHeight = displayDims.height * 2/20;
    const dimsFocusChart = Object.assign({}, displayDims, {height: focusChartHeight}),
          dimsContextChart = Object.assign({}, displayDims, {height: contextChartHeight})
    
    const getDomain = (domain) => {
        setContextDomain(domain)
    }

    let paramBar;
    if( useLocalParams ) {
        const numParams = paramOptions.length;
        const selectors = paramOptions.map(( d, i ) => {
            return (
                <ParamSelector key={i}
                    className={'line-chart-param-selector'}
                    paramName={d.paramName}
                    paramNameReadable={d.paramNameReadable}
                    options={d.options}
                    viewwidth={(displayDims.width - (numParams + .5) )/numParams}
                    viewheight={paramOptionsHeight}
                    addHover={true}
                    selectedValue={params[d.paramName]}
                    handleSwitch={handleSwitch} />
            )
        })
        paramBar = <ParamLister numparams={numParams} viewwidth={displayDims.width}>
            { selectors }
        </ParamLister>

    }

    return (
        <ChartDiv className={className}
            displaywidth={displayDims.width}
            displayheight={displayDims.height}>
            {paramBar}
            <LineChart data={data}
                uniqId={uuidv4()}
                xDomain={contextDomain}
                contextDomain={[minX, maxX]}
                nestedVar={nestedVar}
                displayDims={dimsFocusChart}
                xVar={xVar}
                yVar={yVar}
                visibleOpacity={false}
                addReferenceLine={true}
                themes={themes}>
            </LineChart>
            <LineChart data={data}
                uniqId={uuidv4()}
                xDomain={[minX, maxX]}
                contextDomain={contextDomain}
                nestedVar={nestedVar}
                displayDims={dimsContextChart}
                xVar={xVar}
                yVar={yVar}
                addBrush={true}
                getDomain={getDomain}
                themes={themes}>
            </LineChart>
        </ChartDiv>
    )
    
}

LineChartGroup.defaultProps = {
    getDomain: () => console.log('you need a function here'),
    useLocalParams: false,
    displayDims: {width: 50, height: 50},
    className: "line-chart-group-brush"
}

export default LineChartGroup;