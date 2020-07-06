import React from 'react';

import { ParamLister } from '../../DashboardComponentCard/DashboardComponentCardsStyles';
import { ParamCard } from '../../DashboardComponentCard/DashboardComponentCards'
import { ParamSelector } from '../../ParamSelector/ParamSelector';
import { DashboardComponentContainer } from '../DashboardComponentStyles';


export const ParamViewLineChart = (props) => {
    const {viewwidth, viewheight, paramOptions, handleSwitch, renderAction, params} = props;
    const numParams = paramOptions.length;
    const selectors = paramOptions.map((d, i) => {
        console.log(params[d.paramName])
        return (
            <ParamSelector key={i}
                className={'param-selector'}
                paramName={d.paramName}
                paramNameReadable={d.paramNameReadable}
                options={d.options}
                viewwidth={(viewwidth - (numParams + .5) )/numParams}
                viewheight={7}
                selectedValue={params[d.paramName]}
                handleSwitch={handleSwitch}>
            </ParamSelector>

        )
    })

    console.log('params from component', params)

    return (
        <DashboardComponentContainer
            viewwidth={viewwidth}
            viewheight={viewheight}
        >
            <ParamCard description={'choose your parameters'}>
                <ParamLister numparams={numParams}
                    viewwidth={viewwidth-2}>
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