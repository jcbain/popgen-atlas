import React, {useState, useEffect} from 'react';

import {ThemeProvider} from 'styled-components';
import AddTabs from './components/Tabs/Tabs'
import { v4 as uuidv4 } from 'uuid';
import Histogram from './components/Charts/Histogram/Histogram'
import {ParamSlider} from './components/ParamSelector/ParamSlider'
import LineChartGroup from './components/Charts/LineChart/LineChartGroup';

import { nest } from 'd3-collection';
import { min, max } from 'd3-array';



import { filterDataByParams } from './helpers/DataHelpers'
import { line } from 'd3';


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
    {paramName: 'output_gen', paramNameReadable: 'generation', options: generation}
    // {paramName: 'pop', paramNameReadable: 'population', options: population}

]
let initParams = {}
paramOptions.map(d => {
    return initParams[d.paramName] = d.options[0].value;
})


export const PlayGround = (props) => {

    const [params, setParams] = useState({...initParams})
    const updateGeneration = (g) => {
        // console.log(g)
        setParams(prevState => ({
            ...prevState, 'output_gen': g
        }))
    }
    const [leftPerc, setLeftPerc] = useState(0)
    const [rightPerc, setRightPerc] = useState(100)

    const [tmpList, setTmpList] = useState([0, 2])
    const filteredGenomeData = filterDataByParams(props.geneArchData, params)
    const tmpData = nest().key(d => d.pop).entries(filteredGenomeData)
    // const filteredLineChartData = filterDataByParams(props.lineChartData, params)
    // const tmpData = nest().key(d => d.pop).entries(filteredLineChartData);
    const [view, setView] = useState('cardview')
    const [selectedChart, setSelectedChart] = useState('linegroupchart');
    const identifier = uuidv4()


    const handleSwitch = (k, v) => {
        setParams(prevState => ({
            ...prevState, [k]: v
        }))
    }

    const xAction = () => {
        setView('cardview')
    }

    const renderAction = () => {
        setView('chartview')
    }

    const cardAction = (id) => {
        setSelectedChart(id)
        setView('paramview')
    }


    return (
        <div>
            <ThemeProvider theme={theme}>
                <ParamSlider 
                     undateValChange={updateGeneration}
                     options={paramOptions.find(d => d.paramName === 'output_gen')}></ParamSlider>
                <Histogram data={tmpData}
                    nestedVar={'values'}
                    xVar={'positional_phen'}
  
                    themes={themes}></Histogram>

                {/* <AddTabs viewwidth={96}
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