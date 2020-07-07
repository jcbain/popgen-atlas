import React, {useState, useEffect} from 'react';

import { ParamSelector } from './components/ParamSelector/ParamSelector';
import { ParamCard } from './components/DashboardComponentCard/DashboardComponentCards'
import { ParamLister } from './components/DashboardComponentCard/DashboardComponentCardsStyles';
import {ThemeProvider} from 'styled-components';
import {ParamViewLineChart} from './components/DashboardComponent/ParamView/ParamViewComponent'
import {DashboardComponentLineChart}  from './components/DashboardComponent/DashboardComponent'

const theme = {
    color: {
      main: '#fff',
      secondary: '#6fa1c7',
      grayMain: '#6e6e6e',
      graySecondary: '#efefef'
    }
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
    {paramName: 'pop', paramNameReadable: 'population', options: population}

]
let initParams = {}
paramOptions.map(d => {
    return initParams[d.paramName] = d.options[0].value;
})

export const PlayGround = (props) => {


    const [params, setParams] = useState({...initParams})
    const [view, setView] = useState('chartview')

    const handleSwitch = (k, v) => {
        setParams(prevState => ({
            ...prevState, [k]: v
        }))
    }

    const xAction = () => {
        setView('paramview')
    }

    const renderAction = () => {
        setView('chartview')
    }



    return (
        <div>
            <ThemeProvider theme={theme}>
                {/* <ParamViewLineChart viewwidth={50}
                    viewheight={40}
                    paramOptions={paramOptions}
                    handleSwitch={handleSwitch}>
                </ParamViewLineChart> */}
                <DashboardComponentLineChart selectedView={view}
                    lineChartData={props.lineChartData}
                    geneArchData={props.geneArchData}
                    template={props.template}
                    viewwidth={40}
                    viewheight={40}
                    params={params}
                    useLocalParams={false}
                    paramOptions={paramOptions}
                    handleSwitch={handleSwitch}
                    xAction={xAction}
                    renderAction={renderAction}>

                </DashboardComponentLineChart>
 
            </ThemeProvider>
        </div>
    )
}