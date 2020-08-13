import React, { useState } from 'react';
import { min, max } from 'd3-array';

import GenomeArchitecture from './GenomeArchitecture';
import { ChartDiv } from '../ChartStyles';
import { ParamLister } from '../../DashboardComponentCard/DashboardComponentCardsStyles'
import { ParamSelector } from '../../ParamSelector/ParamSelector';
import GradientLegend from './GradientLegend'

const GenomeArchGroup = (props) => {
    const { data, xVar, yVar, colorVar,
            displayDims, chartPadding, heightScaler,
            params, paramOptions, handleSwitch,
            className, useLocalParams, gradients, genKeys } = props;

    const minX = min(data, d => d[xVar]),
          maxX = max(data, d => d[xVar]);
    
    const [contextDomain, setContextDomain] = useState([minX, maxX]);

    const { dimsMain, dimsContextChart, dimsFocusChart } = displayDims;
    const { gradientsFocus, gradientsContext } = gradients;
    const filteredParamOptions = paramOptions.filter(d => d.paramName !== xVar);
    const paramOptionsHeight = dimsMain.height * 2/20;

    const getDomain = (domain) => {
        setContextDomain(domain)
    }

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
                    viewwidth={(dimsMain.width - (numParams + .5) )/numParams}
                    viewheight={paramOptionsHeight}
                    addHover={true}
                    selectedValue={params[paramName]}
                    handleSwitch={handleSwitch}>
                </ParamSelector>
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
            { paramBar }
            <div><GradientLegend /></div>
            <GenomeArchitecture data={data}
                yVar={yVar}
                xVar={xVar}
                colorVar={colorVar}
                displayDims={dimsFocusChart} 
                gradients={gradientsFocus}
                chartPadding={chartPadding} 
                heightScaler={heightScaler}
                genKey={genKeys.genKeyFocus} 
                addBrush={false}
                contextDomain={[minX, maxX]}
                xDomain={contextDomain}
                />
            <GenomeArchitecture data={data}
                yVar={yVar}
                xVar={xVar}
                colorVar={colorVar}
                displayDims={dimsContextChart} 
                gradients={gradientsContext}
                chartPadding={chartPadding} 
                heightScaler={heightScaler}
                genKey={genKeys.genKeyContext}
                addBrush={true}
                contextDomain={contextDomain}
                xDomain={[minX, maxX]}
                getDomain={getDomain}/>

        </ChartDiv>

    )
}

GenomeArchGroup.defaultProps = {
    className: 'genome-chart-group-brush',
    useLocalParams: false,
    displayDims: {width: 50, height: 50}
}

export default GenomeArchGroup