import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { nest } from 'd3-collection';
import { v4 as uuidv4 } from 'uuid';


import LineChartGroup from '../../Charts/LineChart/LineChartGroup';
import HistogramChart from '../../Charts/Histogram/HistogramChart';
import GenomeArchGroup from '../../Charts/GenomeArchitecture/GenomeArchGroup';
import {filterDataByParams} from '../../../helpers/DataHelpers';
import { DashboardComponentContainer } from '../DashboardComponentStyles';
import { removeParams } from '../../../helpers/DataHelpers';

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    position: absolute;
    top: 1vh;
    right: 1vw;
    z-index: 1000;
    display: ${props => props.display || 'block'}
`;

export const ChartViewLineChart = (props) => {
    const {lineChartData, params, useLocalParams, 
           paramOptions, xAction, handleSwitch, displayX, readableLabels, themes} = props;
    const xVar = 'pop_phen_diff'
    const paramsCopy = removeParams({...params}, ['pop', 'output_gen'])
    let filteredLineChartData = filterDataByParams(lineChartData, paramsCopy)
    if(xVar === 'pop_phen_diff') {
        filteredLineChartData = filteredLineChartData.filter(d => d.pop === 1)
    }
    const nestedData = nest().key(d => d.pop).entries(filteredLineChartData);
    return (
        <DashboardComponentContainer>
            <StyledFontAwesomeIcon display={displayX ? 'block' : 'none'} onClick={xAction} size="xs" pull="right" icon={faTimes} />
            <LineChartGroup data={nestedData}
                className={'component-line-chart-group'}
                nestedVar={'values'}
                xVar={'output_gen'}
                yVar={xVar}
                params={paramsCopy}
                useLocalParams={useLocalParams}
                paramOptions={paramOptions.filter(d=> d.paramName !== 'pop')}
                handleSwitch={handleSwitch}
                readableLabels={readableLabels}
                themes={themes}
                >
            </LineChartGroup>
        </DashboardComponentContainer>
    )
}

ChartViewLineChart.defaultProps = {
    xAction: () => console.log("I don't do anything")
}

export const ChartViewHistogram = (props) => {
    const { geneArchData, params, useLocalParams, readableLabels,
            paramOptions, themes, xAction,  handleSwitch, displayX } = props;

    const xVar = 'effect_size_freq_diff'
    const paramsCopy = removeParams({...params}, ['pop', 'output_gen'])


    let filteredGenomeData = filterDataByParams(geneArchData, paramsCopy)
    // This needs a more elegant solution at some point
    if(xVar === 'effect_size_freq_diff'){
        filteredGenomeData = filteredGenomeData.filter(d => d.pop === 1)
    }
    const nestedData = nest().key(d => d.pop).entries(filteredGenomeData)

    return (
        <DashboardComponentContainer >
            <StyledFontAwesomeIcon display={displayX ? 'block' : 'none'} onClick={xAction} size="xs" pull="right" icon={faTimes} />
            <HistogramChart data={nestedData}
                themes={themes}
                params={paramsCopy}
                nestedVar={'values'}
                xVar={xVar}
                filteredVar={'output_gen'}
                useLocalParams={useLocalParams}
                paramOptions={paramOptions.filter(d=> d.paramName !== 'pop')}
                readableLabels={readableLabels}
                handleSwitch={handleSwitch}>
            </HistogramChart>
        </DashboardComponentContainer>
    )


}

ChartViewHistogram.defaultProps = {
    xAction: () => console.log("I don't do anything")  
}

export const ChartViewGenomeChart = (props) => {
    const { geneArchData, params, paramOptions, readableLabels, colorMin, colorMax, paramPermutationData,
            handleSwitch, xAction, useLocalParams, displayX} = props;

    const paramsCopy = removeParams({...params}, ['output_gen'])
    const filteredData = filterDataByParams(geneArchData, paramsCopy)
    const filteredParamPermutation = filterDataByParams(paramPermutationData, paramsCopy)

    const genKeyFocus = uuidv4(),
          genKeyContext = uuidv4();

    return (
        <DashboardComponentContainer >
            <StyledFontAwesomeIcon display={displayX ? 'block' : 'none'} onClick={xAction} size="xs" pull="right" icon={faTimes} />
            <GenomeArchGroup data={filteredData}
                    paramPermutationData={filteredParamPermutation}
                    yVar={'ind'} 
                    xVar={'output_gen'}
                    colorVar={'effect_size_freq_diff'}
                    colorMax={colorMax}
                    colorMin={colorMin}
                    genKeys={{genKeyFocus, genKeyContext}}
                    useLocalParams={useLocalParams}
                    paramOptions={paramOptions.filter(d=> d.paramName !== 'pop')}
                    params={paramsCopy}
                    readableLabels={readableLabels}
                    handleSwitch={handleSwitch}/>      
        </DashboardComponentContainer>
    )
}

ChartViewGenomeChart.defaultProps = {
    xAction: () => console.log("I don't do anything")
}

const ChartViewMain = (props) => {
    const {selectedChart, ...rest} = props;
 

    let displayChart;
    switch(selectedChart){
        case('linechartgroup'):
            displayChart = <ChartViewLineChart {...rest} />
            break;
        case('genearchgroup'):
            displayChart = <ChartViewGenomeChart {...rest} />
            break;
        case('histogram'):
            displayChart = <ChartViewHistogram {...rest} />
            break;
        default: 
            displayChart = <DashboardComponentContainer {...rest} />
    }

    return displayChart;
}

ChartViewGenomeChart.defaultProps = {
    displayX: true,
    xAction: () => console.log("I don't do anything")
}

export default ChartViewMain;