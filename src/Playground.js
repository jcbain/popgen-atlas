import React, {useState, useEffect} from 'react';

import {ThemeProvider} from 'styled-components';
import AddTabs from './components/Tabs/Tabs'
import Dashboard from './components/Dashboard/Dashboard';
import { v4 as uuidv4 } from 'uuid';
import { DashboardComponentContainer } from './components/DashboardComponent/DashboardComponentStyles';
import LineChart from './components/Charts/LineChart/LineChart';

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
    tickfont: 'Roboto Slab',
    tickfill: '#6e6e6e'
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
const paramOptions = [
    {paramName: 'm', paramNameReadable: 'migration' ,options: migration},
    {paramName: 'mu', paramNameReadable: 'mutation', options: mutation},
    {paramName: 'r', paramNameReadable: 'recombination', options: recombination},
    {paramName: 'sigsqr', paramNameReadable: 'selection', options: selection},
    // {paramName: 'pop', paramNameReadable: 'population', options: population}

]
let initParams = {}
paramOptions.map(d => {
    return initParams[d.paramName] = d.options[0].value;
})


export const PlayGround = (props) => {


    const [params, setParams] = useState({...initParams})
    const [leftPerc, setLeftPerc] = useState(0)
    const [rightPerc, setRightPerc] = useState(100)
    const filteredLineChartData = filterDataByParams(props.lineChartData, params)

    const tmpData = nest().key(d => d.pop).entries(filteredLineChartData);
    // const [view, setView] = useState('cardview')
    // const [selectedChart, setSelectedChart] = useState('linegroupchart');
    // const identifier = uuidv4()


    // const handleSwitch = (k, v) => {
    //     setParams(prevState => ({
    //         ...prevState, [k]: v
    //     }))
    // }

    // const xAction = () => {
    //     setView('cardview')
    // }

    // const renderAction = () => {
    //     setView('chartview')
    // }

    // const cardAction = (id) => {
    //     setSelectedChart(id)
    //     setView('paramview')
    // }



    return (
        <div>
            <ThemeProvider theme={theme}>

                <LineChart data={tmpData}
                    xDomain={[1000, 50000]}
                    nestedVar={'values'}
                    xVar={'output_gen'}
                    yVar={'pop_phen'}>
                </LineChart>

                {/* <AddTabs viewwidth={96}
                    lineChartData={props.lineChartData}
                    geneArchData={props.geneArchData}
                    template={props.template}
                    identifier={identifier}>
                </AddTabs> */}

 
            </ThemeProvider>
        </div>
    )
}