import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { nest } from 'd3-collection';
import { map, uniq } from 'lodash'
import { v4 as uuidv4 } from 'uuid';


import LineChartGroup from '../../Charts/LineChart/LineChartGroup';
import HistogramChart from '../../Charts/Histogram/HistogramChart';
import GenomeArchGroup from '../../Charts/GenomeArchitecture/GenomeArchGroup';
import GenomeGradients from '../../Charts/GenomeArchitecture/GenomeGradients';
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
            paramOptions, themes, xAction,  handleSwitch, displayX, handleSlider } = props;
    const paramsCopy = removeParams({...params}, ['pop', 'output_gen'])


    const filteredGenomeData = filterDataByParams(geneArchData, paramsCopy)
    const nestedData = nest().key(d => d.pop).entries(filteredGenomeData)

    return (
        <DashboardComponentContainer viewwidth={viewwidth}
            viewheight={viewheight}>
            <StyledFontAwesomeIcon display={displayX ? 'block' : 'none'} onClick={xAction} size="xs" pull="right" icon={faTimes} />
            <HistogramChart data={nestedData}
                themes={themes}
                params={paramsCopy}
                nestedVar={'values'}
                xVar={'positional_phen'}
                filteredVar={'output_gen'}
                useLocalParams={useLocalParams}
                displayDims={{width: viewwidth, height: viewheight}}
                paramOptions={paramOptions}
                handleSwitch={handleSwitch}>
            </HistogramChart>
        </DashboardComponentContainer>
    )


}

ChartViewHistogram.defaultProps = {
    xAction: () => console.log("I don't do anything")  
}

export const ChartViewGenomeChart = (props) => {
    const { geneArchData, template, params, paramOptions, 
            handleSwitch, viewwidth, viewheight, xAction, useLocalParams, displayX} = props;
    console.log(paramOptions)
    const paramsCopy = removeParams({...params}, ['output_gen'])
    const filteredData = filterDataByParams(geneArchData, paramsCopy)
    const generations = uniq(filteredData.map(d => d.output_gen));
    const genomeData = React.useMemo(() => {
        let genomeData = [];
        map(generations, g => {
            const filtered = filteredData.filter(d => d.output_gen  === g);
            const emptyRow = {...filtered[0], position: undefined, select_coef: 0, freq: 0, positional_phen: 0};
            template.map((t,i) => {
                const position = t.position;
                let match = filtered.find(v => v.position === position)
                match = match !== undefined ?  match : {...emptyRow, position: position} 
                match.ind = i;
                genomeData.push(match)
            })
        })
        return genomeData
    }, [filteredData])
   
    const focusChartHeight = viewheight * (useLocalParams ? 10/20 : 10/20),
          contextChartHeight = viewheight * (useLocalParams ? 5/20 : 5/20),
          legendHeight = viewheight * (useLocalParams ? 2.5/20 : 2.5/20)
    const displayDimsFocus = {width: viewwidth, height: focusChartHeight},
          displayDimsContext = {width: viewwidth, height: contextChartHeight},
          legendDims = {width: viewwidth, height: legendHeight};
    const chartPadding = {left: 5, right: 5, top: 10, bottom: 40};
    const heightScaler = 6.5;
    const genKeyFocus = uuidv4(),
          genKeyContext = uuidv4();

    const gradientsFocus = <GenomeGradients key={`color-${genKeyFocus}`}
          data={genomeData}
          xVar={'output_gen'}
          yVar={'ind'}
          colorVar={'positional_phen'}
          chartPadding={chartPadding}
          heightScaler={heightScaler}
          displayDims={displayDimsFocus}
          genKey={genKeyFocus}
       />
  
    const gradientsContext = <GenomeGradients key={`color-${genKeyContext}`}
          data={genomeData}
          xVar={'output_gen'}
          yVar={'ind'}
          colorVar={'positional_phen'}
          chartPadding={chartPadding}
          heightScaler={heightScaler}
          displayDims={displayDimsContext}
          genKey={genKeyContext}
      />
  
    const gradientsGray = <GenomeGradients key={`gray-${genKeyContext}`}
          data={genomeData}
          xVar={'output_gen'}
          yVar={'ind'}
          colorVar={'positional_phen'}
          chartPadding={chartPadding}
          heightScaler={heightScaler}
          displayDims={displayDimsContext}
          genKey={genKeyContext}
          useGrayScale={true}
      />


    return (
        <DashboardComponentContainer viewwidth={viewwidth}
            viewheight={viewheight}>
            <StyledFontAwesomeIcon display={displayX ? 'block' : 'none'} onClick={xAction} size="xs" pull="right" icon={faTimes} />
            <GenomeArchGroup data={genomeData}
                    yVar={'ind'} 
                    xVar={'output_gen'}
                    colorVar={'positional_phen'}
                    gradients={{gradientsFocus : [gradientsFocus], gradientsContext : [gradientsContext, gradientsGray]}}
                    displayDims={{dimsMain: {width: viewwidth, height: viewheight}, dimsFocusChart: displayDimsFocus, dimsContextChart: displayDimsContext, dimsLegend: legendDims}}
                    chartPadding={chartPadding} 
                    heightScaler={heightScaler}
                    genKeys={{genKeyFocus, genKeyContext}}
                    useLocalParams={useLocalParams}
                    paramOptions={paramOptions}
                    params={paramsCopy}
                    handleSwitch={handleSwitch}/>
            
        </DashboardComponentContainer>
    )
}

ChartViewGenomeChart.defaultProps = {
    xAction: () => console.log("I don't do anything")
}

const ChartViewMain = (props) => {
    const {selectedChart, ...rest} = props;
    // const chartviewwidth = viewwidth - 2;
    // const chartviewheight = viewheight - 2


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