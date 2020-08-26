import React, { useState } from 'react';
import { min, max } from 'd3-array';
import styled from 'styled-components';

import GenomeArchitecture from './GenomeArchitecture';
import { ChartDiv } from '../ChartStyles';
import { ParamLister } from '../../DashboardComponentCard/DashboardComponentCardsStyles'
import { ParamSelector } from '../../ParamSelector/ParamSelector';
import GradientLegend from './GradientLegend'

const LegendDiv = styled.div`
    grid-area: ${({ chartname }) => chartname}-${({ gridarea }) => gridarea};
    width: 40%;
`

const LegendItems = styled.div`
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
    const { data, xVar, yVar, colorVar, paramPermutationData,
            colorMin, colorMax,
            params, paramOptions, handleSwitch, readableLabels,
            className, useLocalParams } = props;

    const minX = min(data, d => d[xVar]),
          maxX = max(data, d => d[xVar]);

    const [contextDomain, setContextDomain] = useState([minX, maxX]);
    const xAxisLabel = readableLabels[xVar],
          yAxisLabel = readableLabels[yVar],
          legendLabel = readableLabels[colorVar];
    
    const chartname = "genarchgroup"
    const filteredParamOptions = paramOptions.filter(d => d.paramName !== xVar);

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
                    selectedValue={params[paramName]}
                    handleSwitch={handleSwitch}>
                </ParamSelector>
            )
        })
        paramBar = <ParamLister numparams={numParams}>
            { selectors }
        </ParamLister>

    }



    return (
        <ChartDiv className={className} chartname={chartname}>
            <LegendDiv gridarea="legend"
                chartname={chartname}
            >
                <LegendItems>
                    <LegendTitle>{legendLabel}</LegendTitle>

                    <div>
                    <GradientLegend minVal={colorMin}
                        maxVal={colorMax}/>
                    </div>
                </LegendItems>
            </LegendDiv>
            { paramBar }

            <GenomeArchitecture data={data}
                chartname={chartname}
                gridarea="focus"
                yVar={yVar}
                xVar={xVar}
                colorVar={colorVar}
                paramPermutationData={paramPermutationData}
                addBrush={false}
                contextDomain={[minX, maxX]}
                xDomain={contextDomain}
                yAxisLabel={yAxisLabel}
                xAxisLabel={xAxisLabel}
                includeXAxisLabel={true}
                />
            <GenomeArchitecture data={data}
                chartname={chartname}
                gridarea="context"
                yVar={yVar}
                xVar={xVar}
                colorVar={colorVar}
                paramPermutationData={paramPermutationData}
                addBrush={true}
                contextDomain={contextDomain}
                xDomain={[minX, maxX]}
                getDomain={getDomain}
                includeXAxisLabel={false}
                includeYAxisLabel={false}
                isContext={true}
                />

        </ChartDiv>

    )
}

GenomeArchGroup.defaultProps = {
    className: 'genome-chart-group-brush',
    useLocalParams: false,
}

export default GenomeArchGroup