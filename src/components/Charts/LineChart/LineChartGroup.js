import React, {useState} from 'react';
import { min, max } from 'd3-array';
import { v4 as uuidv4 } from 'uuid';

import LineChart from './LineChart';
import { ParamLister } from '../../DashboardComponentCard/DashboardComponentCardsStyles'
import { ParamSelector } from '../../ParamSelector/ParamSelector';
import { ChartDiv } from '../ChartStyles';


const LineChartGroup = (props) => {
    const { data, nestedVar, xVar, yVar, useLocalParams, 
            displayDims, className, themes, readableLabels,
            paramOptions, params, handleSwitch } = props;
    const minX = min(data.map(d => min(d[nestedVar], v => v[xVar]))),
          maxX = max(data.map(d => max(d[nestedVar], v => v[xVar])));
    
    const [contextDomain, setContextDomain] = useState([minX, maxX]);
    
    const chartname = "linechartgroup";
    const paramOptionsHeight = displayDims.height * 2/20;
    
    const xAxisLabel = readableLabels[xVar]
    const yAxisLabel = readableLabels[yVar]
    
    const getDomain = (domain) => {
        setContextDomain(domain)
    }

    let paramBar;
    if( useLocalParams ) {
        const useableParams = paramOptions.filter(v => v.paramName !== xVar)
        const numParams = useableParams.length;
        const selectors = useableParams.filter(v => v.paramName !== xVar).map(( d, i ) => {
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
        <ChartDiv className={className} chartname={chartname}>
            {paramBar}
            <LineChart data={data}
                chartname={chartname}
                gridarea="focus"
                uniqId={uuidv4()}
                xDomain={contextDomain}
                contextDomain={[minX, maxX]}
                nestedVar={nestedVar}
                xVar={xVar}
                yVar={yVar}
                visibleOpacity={false}
                addReferenceLine={true}
                includeXAxisLabel={true}
                xAxisLabel={xAxisLabel}
                yAxisLabel={yAxisLabel}
                themes={themes}>
            </LineChart>

            <LineChart data={data}
                chartname={chartname}
                gridarea="context"
                uniqId={uuidv4()}
                xDomain={[minX, maxX]}
                contextDomain={contextDomain}
                nestedVar={nestedVar}
                xVar={xVar}
                yVar={yVar}
                addBrush={true}
                getDomain={getDomain}
                themes={themes}
                isContext={true}
                includeXAxisLabel={false}
                includeYAxisLabel={false}>
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