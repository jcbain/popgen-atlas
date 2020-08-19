import React, { useState } from 'react';
import { min, max } from 'd3-array';
import styled from 'styled-components';

import GenomeArchitecture from './GenomeArchitecture';
import { ChartDiv } from '../ChartStyles';
import { ParamLister } from '../../DashboardComponentCard/DashboardComponentCardsStyles'
import { ParamSelector } from '../../ParamSelector/ParamSelector';
import GradientLegend from './GradientLegend'

const LegendDiv = styled.div`
    width: ${props => props.viewwidth}vw;
    height: ${props => props.viewheight}vh;
`

const LegendItems = styled.div`
    width: ${props => props.viewwidth}vw;
    height: ${props => props.viewheight}vh;
    display: flex;
    flex-direction: column;
`;

const LegendTitle = styled.p`
    font-family: 'Baloo Tamma 2', cursive;
    font-size: .75em;
    margin-block-start: 0;
    margin-block-end: 0;
`

const GenomeArchGroup = (props) => {
    const { data, xVar, yVar, colorVar,
            displayDims, chartPadding, heightScaler, colorMin, colorMax,
            params, paramOptions, handleSwitch, readableLabels,
            className, useLocalParams, gradients, genKeys } = props;

    const minX = min(data, d => d[xVar]),
          maxX = max(data, d => d[xVar]);

    const [contextDomain, setContextDomain] = useState([minX, maxX]);
    const xAxisLabel = readableLabels[xVar]
    const legendLabel = readableLabels[colorVar]

    const { dimsMain, dimsContextChart, dimsFocusChart, dimsLegend } = displayDims;
    const { gradientsFocus, gradientsContext } = gradients;
    const filteredParamOptions = paramOptions.filter(d => d.paramName !== xVar);
    const paramOptionsHeight = dimsMain.height * 2.5/20;

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
            <LegendDiv viewwidth={dimsLegend.width}
                viewheight={dimsLegend.height}
            >
                <LegendItems viewwidth={dimsLegend.width * (2/4)}
                    viewheight={dimsLegend.height}>
                    <LegendTitle>{legendLabel}</LegendTitle>

                    <div>
                    <GradientLegend viewwidth={dimsLegend.width/3}
                        viewheight={dimsLegend.height/4} 
                        minVal={colorMin}
                        maxVal={colorMax}/>
                    </div>
                </LegendItems>
            </LegendDiv>
            { paramBar }

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
                includeAxisLabel={false}
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
                getDomain={getDomain}
                xAxisLabel={xAxisLabel}
                />

        </ChartDiv>

    )
}

GenomeArchGroup.defaultProps = {
    className: 'genome-chart-group-brush',
    useLocalParams: false,
    displayDims: {width: 50, height: 50}
}

export default GenomeArchGroup