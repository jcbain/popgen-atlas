import React, {useState, useEffect} from 'react';

import {ThemeProvider} from 'styled-components';
import AddTabs from './components/Tabs/Tabs'
import { v4 as uuidv4 } from 'uuid';
import GenomeArchitecture from './components/Charts/GenomeArchitecture/GenomeArchitecture';
import GenomeArchGroup from './components/Charts/GenomeArchitecture/GenomeArchGroup';
import GenomeGradients from './components/Charts/GenomeArchitecture/GenomeGradients';

import { nest } from 'd3-collection';
import { min, max } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { map, uniq } from 'lodash'
import styled from 'styled-components';
import { interpolateHcl } from 'd3';


import { filterDataByParams } from './helpers/DataHelpers'



const theme = {
    color: {
      main: '#fff',
      secondary: '#6fa1c7',
      grayMain: '#6e6e6e',
      graySecondary: '#efefef',
      background: '#f2f2f2',
    },
    tickfont: 'Itim',
    tickfill: '#6e6e6e',
    handlecolor: '#2b2b2b',
    slidercolor: '#e0e0e0',
    thumbcolor: '#8a5a86',
    highcolorup: '#eb4034',
    highcolordown: '#ffd000',
    colormid: '#fffff7',
    lowcolorup: '#0082e6',
    lowcolordown: '#5d0096'
  }

  const themePop0 = {
    popColorFocus: '#ac9e47', // rbg(172, 159, 71)
    popColorOutside: '#d6d6d6',
    popColorAlpha: 'rgba(172, 159, 71, .5)',
}

const themePop1 = {
    popColorFocus: '#7ca1a1', // rgb(124, 161, 161)
    popColorOutside: '#d6d6d6',
    popColorAlpha: 'rgba(124, 161, 161, .5)',
}

const themes = {
    "0": themePop0,
    "1": themePop1,
}

const migration = [
    {label: '1e-4', value: '1e-4'},
    {label: '1e-5', value: '1e-5'},

]

const mutation = [
    {label: '1e-6', value: '1e-6'},
]
const recombination = [
    {label: '1e-6', value: '1e-6'},
]
const selection = [
    {label: 2, value: '2'},
    {label: 5, value: '5'},
    {label: 25, value: '25'}
]

const population = [
    {label: 0, value: 0},
    {label: 1, value: 1}
]

const generation = [...Array(50)].map((d, i) => {
    return {label: (i + 1) * 1000, value: (i + 1) * 1000}
})
const paramOptions = [
    {paramName: 'm', paramNameReadable: 'migration' ,options: migration},
    {paramName: 'mu', paramNameReadable: 'mutation', options: mutation},
    {paramName: 'r', paramNameReadable: 'recombination', options: recombination},
    {paramName: 'sigsqr', paramNameReadable: 'selection', options: selection},
    // {paramName: 'output_gen', paramNameReadable: 'generation', options: generation}
    {paramName: 'pop', paramNameReadable: 'population', options: population}

]
let initParams = {}
paramOptions.map(d => {
    return initParams[d.paramName] = d.options[0].value;
})

const ScaledStop = styled.stop`
    stop-color: ${props => props.val !== 0 ? props.colorscale.range([props.greaterthanzero ? props.theme.highcolordown : props.theme.lowcolorup, props.greaterthanzero ? props.theme.highcolorup : props.theme.lowcolordown])(props.val) : props.theme.colormid};
`

ScaledStop.defaultProps = {
    colorScale : scaleLinear().domain([0, 10]).interpolate(interpolateHcl),
    val: 5,
    highcolorup: '#eb4034',
    highcolordown: '#ffd000',
    colormid: '#fff',
    lowcolorup: '#0082e6',
    lowcolordown: '#5d0096',
    greaterthanzero: true,
}

const displayDims = {width: 90, height: 90}
// const displayDimsFocus = {width: 90, height: 70}
const chartPaddingFocus = {left: 20, right: 5, top: 10, bottom: 40}
const heightScalerFocus = 5.5;


export const PlayGround = (props) => {

    const [params, setParams] = useState({...initParams})
    const [useLocalParams, setUseLocalParams] = useState(false)

    const filteredGenomeData = filterDataByParams(props.geneArchData, params)

    // THIS PART IS VERY IMPORTANT
    const generations = uniq(filteredGenomeData.map(d => d.output_gen))
    let tmpData = []
    map(generations, g => {
        const filtered = filteredGenomeData.filter(d => d.output_gen === g);
        const emptyRow = {...filtered[0], position: undefined, select_coef: 0, freq: 0, positional_phen: 0}
        props.template.map((t,i) => {
            const position = t.position;
            let match = filtered.find(v => v.position === position)
            match = match !== undefined ?  match : {...emptyRow, position: position} 
            match.ind = i;
            tmpData.push(match)
        })
    })
    const focusChartHeight = displayDims.height * (useLocalParams ? 12/20 : 13/20),
          contextChartHeight = displayDims.height * (useLocalParams ? 6/20 : 7/20);

    const displayDimsFocus = Object.assign({}, displayDims, {height: focusChartHeight}),
          displayDimsContext = Object.assign({}, displayDims, {height: contextChartHeight})
    const genKeyFocus = uuidv4(),
          genKeyContext = uuidv4();

    const gradientsFocus = <GenomeGradients data={tmpData}
        xVar={'output_gen'}
        yVar={'ind'}
        colorVar={'positional_phen'}
        chartPadding={chartPaddingFocus}
        heightScaler={heightScalerFocus}
        displayDims={displayDimsFocus}
        genKey={genKeyFocus}
     />

     const gradientsContext = <GenomeGradients data={tmpData}
        xVar={'output_gen'}
        yVar={'ind'}
        colorVar={'positional_phen'}
        chartPadding={chartPaddingFocus}
        heightScaler={heightScalerFocus}
        displayDims={displayDimsContext}
        genKey={genKeyContext}
    />


    // const tmpData = nest().key(d => d.pop).entries(filteredGenomeData)
    // const filteredLineChartData = filterDataByParams(props.lineChartData, params)
    // const tmpData = nest().key(d => d.pop).entries(filteredLineChartData);

    return (
        <div>
            <ThemeProvider theme={theme}>
                {/* <button onClick={() => setLgen(lgen + 1000)}>Increase By 1000</button>
                <p>{lgen}</p>
                <button onClick={() => setUgen(ugen - 1000)}>Decrease By 1000</button>
                <p>{ugen}</p> */}

                <GenomeArchGroup data={tmpData}
                    yVar={'ind'} 
                    xVar={'output_gen'}
                    colorVar={'positional_phen'}
                    gradients={{gradientsFocus, gradientsContext}}
                    displayDims={{dimsMain: displayDims, dimsFocusChart: displayDimsFocus, dimsContextChart: displayDimsContext}}
                    chartPadding={chartPaddingFocus} 
                    heightScaler={heightScalerFocus}
                    genKeys={{genKeyFocus, genKeyContext}}/>
 
{/* 
                <AddTabs viewwidth={96}
                    lineChartData={props.lineChartData}
                    geneArchData={props.geneArchData}
                    template={props.template}
                    identifier={identifier}
                    themes={themes}>
                </AddTabs> */}

            </ThemeProvider>
        </div>
    )
}