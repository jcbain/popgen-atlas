import React from 'react';

import { ParamLister } from '../../DashboardComponentCard/DashboardComponentCardsStyles';
import { ParamCard } from '../../DashboardComponentCard/DashboardComponentCards'
import { ParamSelector } from '../../ParamSelector/ParamSelector';
import { DashboardComponentContainer } from '../DashboardComponentStyles';


export const ParamViewLineChart = (props) => {
    const { paramOptions, handleSwitch, renderAction, params} = props;
    let paramOptionsCopy = [...paramOptions].filter(d => d.paramName !== 'pop' && d.paramName !== 'output_gen')
    const numParams = paramOptionsCopy.length;
    const selectors = paramOptionsCopy.map((d, i) => {
        return (
            <ParamSelector key={i}
                className={'param-selector'}
                paramName={d.paramName}
                paramNameReadable={d.paramNameReadable}
                options={d.options}
                selectedValue={params[d.paramName]}
                handleSwitch={handleSwitch}>
            </ParamSelector>

        )
    })


    return (
        <DashboardComponentContainer>
            <ParamCard description={'choose your parameters'}>
                <ParamLister numparams={numParams}>
                    {selectors}
                </ParamLister>
            </ParamCard>
            <button onClick={renderAction}>Render</button> 

        </DashboardComponentContainer>
    )
}

ParamViewLineChart.defaultProps = {
    renderAction: () => console.log("I don't do anything")
}

export const ParamViewGenomeChart = (props) => {
    const { paramOptions, handleSwitch, renderAction, params} = props;
    let paramOptionsCopy = [...paramOptions].filter(d => d.paramName !== 'output_gen')
    const numParams = paramOptionsCopy.length;
    const selectors = paramOptionsCopy.map((d, i) => {
        return (
            <ParamSelector key={i}
                className={'param-selector'}
                paramName={d.paramName}
                paramNameReadable={d.paramNameReadable}
                options={d.options}
                selectedValue={params[d.paramName]}
                handleSwitch={handleSwitch}>
            </ParamSelector>

        )
    })

    return (
        <DashboardComponentContainer>
            <ParamCard description={'choose your parameters'}>
                <ParamLister numparams={numParams}>
                    {selectors}
                </ParamLister>
            </ParamCard>
            <button onClick={renderAction}>Render</button> 

        </DashboardComponentContainer>
    )

}

ParamViewGenomeChart.defaultProps = {
    renderAction: () => console.log("I don't do anything")
}

export const ParamViewHistogram = (props) => {
    const { paramOptions, handleSwitch, renderAction, params} = props;
    let paramOptionsCopy = [...paramOptions].filter(d => d.paramName !== 'pop' && d.paramName !== 'output_gen')
    const numParams = paramOptionsCopy.length;
    const selectors = paramOptionsCopy.map((d, i) => {
        return (
            <ParamSelector key={i}
                className={'param-selector'}
                paramName={d.paramName}
                paramNameReadable={d.paramNameReadable}
                options={d.options}
                selectedValue={params[d.paramName]}
                handleSwitch={handleSwitch}>
            </ParamSelector>

        )
    })


    return (
        <DashboardComponentContainer>
            <ParamCard description={'choose your parameters'}>
                <ParamLister numparams={numParams}>
                    {selectors}
                </ParamLister>
            </ParamCard>
            <button onClick={renderAction}>Render</button> 

        </DashboardComponentContainer>
    )

}

const ParamViewMain = (props) => {
    const {selectedChart} = props;

    let displayView;
    switch(selectedChart){
        case('linechartgroup'):
            displayView = <ParamViewLineChart {...props} />
            break;
        case('genearchgroup'):
            displayView = <ParamViewGenomeChart {...props} />
            break;
        case('histogram'):
            displayView = <ParamViewHistogram {...props} />
            break;
        default: 
            displayView = <DashboardComponentContainer {...props} />
    }

    return displayView;

}

export default ParamViewMain;