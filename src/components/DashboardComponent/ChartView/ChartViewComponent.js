import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { nest } from 'd3-collection';

// import LineChartGroup from '../../LineChartGroup2';
import LineChartGroup from '../../Charts/LineChart/LineChartGroup';
import HistogramChart from '../../Charts/Histogram/HistogramChart';
import GeneArchGroup from '../../GeneArchGroup2';
import {filterDataByParams} from '../../../helpers/DataHelpers'
import { DashboardComponentContainer } from '../DashboardComponentStyles';
import { removeParams } from '../../../helpers/DataHelpers'

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    position: absolute;
    top: 1vh;
    right: 1vw;
    z-index: 1000;
    display: ${props => props.display || 'block'}
`;

export const ChartViewLineChart = (props) => {
    const {lineChartData, viewwidth, viewheight, params, useLocalParams, 
           specialOpts, paramOptions, xAction, handleSwitch, displayX, themes} = props;
    
    const paramsCopy = removeParams({...params}, ['pop', 'output_gen'])
    // delete paramsCopy.pop;
    const filteredLineChartData = filterDataByParams(lineChartData, paramsCopy)
    const nestedData = nest().key(d => d.pop).entries(filteredLineChartData);

    return (
        <DashboardComponentContainer viewwidth={viewwidth}
            viewheight={viewheight}>
            <StyledFontAwesomeIcon display={displayX ? 'block' : 'none'} onClick={xAction} size="xs" pull="right" icon={faTimes} />
            <LineChartGroup data={nestedData}
                className={'component-line-chart-group'}
                nestedVar={'values'}
                xVar={'output_gen'}
                yVar={'pop_phen'}
                params={paramsCopy}
                useLocalParams={useLocalParams}
                displayDims={{width: viewwidth, height: viewheight}}
                paramOptions={paramOptions.filter(d=> d.paramName !== 'pop')}
                handleSwitch={handleSwitch}
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
    const { geneArchData, viewwidth, viewheight, params, useLocalParams,
            paramOptions, themes, xAction,  handleSwitch, displayX } = props;
    const paramsCopy = removeParams({...params}, ['pop', 'output_gen'])


    const filteredGenomeData = filterDataByParams(geneArchData, params)
    const nestedData = nest().key(d => d.pop).entries(filteredGenomeData)

    return (
        <DashboardComponentContainer viewwidth={viewwidth}
            viewheight={viewheight}>
            <StyledFontAwesomeIcon display={displayX ? 'block' : 'none'} onClick={xAction} size="xs" pull="right" icon={faTimes} />
            <HistogramChart data={nestedData}
                themes={themes}
                displayDims={{width: viewwidth, height: viewheight}}>
            </HistogramChart>
        </DashboardComponentContainer>
    )


}

ChartViewHistogram.defaultProps = {
    xAction: () => console.log("I don't do anything")  
}

export const ChartViewGenomeChart = (props) => {
    const {geneArchData, template, params, paramOptions, handleSwitch, viewwidth, viewheight, xAction, useLocalParams, displayX} = props;
    const identifier = uuidv4()
    const paramsCopy = removeParams({...params}, ['output_gen'])
    return (
        <DashboardComponentContainer viewwidth={viewwidth}
            viewheight={viewheight}>
            <StyledFontAwesomeIcon display={displayX ? 'block' : 'none'} onClick={xAction} size="xs" pull="right" icon={faTimes} />
            <GeneArchGroup data={geneArchData}
                template={template}
                params={paramsCopy}
                useLocalParams={useLocalParams}
                paramOptions={paramOptions}
                identifier={identifier}
                handleSwitch={handleSwitch}
                displayDims={{width: viewwidth, height: viewheight}}
                >

            </GeneArchGroup>
            
        </DashboardComponentContainer>
    )
}

const ChartViewMain = (props) => {
    const {selectedChart} = props;


    let displayChart;
    switch(selectedChart){
        case('linechartgroup'):
            displayChart = <ChartViewLineChart {...props} />
            break;
        case('genearchgroup'):
            displayChart = <ChartViewGenomeChart {...props} />
            break;
        case('histogram'):
            displayChart = <ChartViewHistogram {...props} />
            break;
        default: 
            displayChart = <DashboardComponentContainer {...props} />
    }

    return displayChart;
}

ChartViewGenomeChart.defaultProps = {
    displayX: true,
    xAction: () => console.log("I don't do anything")
}

export default ChartViewMain;