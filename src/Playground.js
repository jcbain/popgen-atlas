import React, {useState, useEffect} from 'react';

import { ParamSelector } from './components/ParamSelector/ParamSelector';
import { ParamCard } from './components/DashboardComponentCard/DashboardComponentCards'
import { ParamLister } from './components/DashboardComponentCard/DashboardComponentCardsStyles';
import {ThemeProvider} from 'styled-components';
import {ParamViewLineChart} from './components/DashboardComponent/ParamView/ParamViewComponent'

const theme = {
    color: {
      main: '#fff',
      secondary: '#6fa1c7',
      grayMain: '#6e6e6e',
      graySecondary: '#efefef'
    }
  }

const options = [
    {label: 'Jennifer', value: 1},
    {label: 'James', value: 2},
    {label: 'Chewey', value: 3}
]

const options2 = [
    {label: 'hi', value: 'hi1'},
    {label: 'hello', value: 'hi2'},
    {label: 'yes', value: 'hi3'}
]
const options3 = [
    {label: 1, value: 1},
    {label: 2, value: 2},
    {label: 3, value: 3}
]
const options4 = [
    {label: 'cat', value: 'cat'},
    {label: 'dog', value: 'dog'},
    {label: 'cow', value: 'cow'}
]
const paramOptions = [
    {paramName: 'names', options: options},
    {paramName: 'greetings', options: options2},
    {paramName: 'values', options: options3},
    {paramName: 'animals', options: options4},

]

export const PlayGround = (props) => {
    let initParams = {}
    paramOptions.map(d => {
        return initParams[d.paramName] = d.options[0].value;
    })
    const [params, setParams] = useState({...initParams})

    const handleSwitch = (k, v) => {
        setParams(prevState => ({
            ...prevState, [k]: v
        }))
    }

    // useEffect(() => {
    //     // props.handleParamSwitch(params);
    // }, [params])


    // const selectors = paramOptions.map((d, i) => {
    //     return (
    //         <ParamSelector key={i}
    //             className={'sample-class'}
    //             paramName={d.paramName} 
    //             options={d.options}
    //             viewwidth={10}
    //             viewheight={7}
    //             handleSwitch={handleSwitch}
    //         >
    //         </ParamSelector>        
    //     )

    // })

    // const numParams = selectors.length;

    return (
        <div>
            <ThemeProvider theme={theme}>
                {/* <ParamCard description={"Some Description"}>
                    <ParamLister numparams={numParams}
                        viewwidth={40}>
                        {selectors}
                    </ParamLister>
                </ParamCard> */}
                <ParamViewLineChart viewwidth={50}
                    viewheight={40}
                    paramOptions={paramOptions}
                    handleSwitch={handleSwitch}>
                </ParamViewLineChart>
 
            </ThemeProvider>
        </div>
    )
}