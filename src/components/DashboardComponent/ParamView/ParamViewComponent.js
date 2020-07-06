import React from 'react';
import styled from 'styled-components';

import { ParamLister } from '../../DashboardComponentCard/DashboardComponentCardsStyles';
import { ParamCard } from '../../DashboardComponentCard/DashboardComponentCards'
import { ParamSelector } from '../../ParamSelector/ParamSelector';

// The purpose of this component is to build out the
// param view portion of the dashboard component
// It should serve as the template to any numnber of
// but maybe these need to be unique per chart???

const DashboardComponentContainer = styled.div`
    width: ${props => props.viewwidth}vw;
    height: ${props => props.viewheight}vh;
    padding-left: 1vw;
    padding-right: 1vw;
    padding-top: 2vh;
    border: 1px solid ${props => props.theme.color.graySecondary};
`

DashboardComponentContainer.defaultProps = {
    theme : {
        color : {
            graySecondary: '#efefef',
        }
    }
}


export const ParamViewLineChart = (props) => {
    const {viewwidth, viewheight, paramOptions, handleSwitch} = props;
    const numParams = paramOptions.length;
    const selectors = paramOptions.map((d, i) => {
        return (
            <ParamSelector key={i}
                className={'param-selector'}
                paramName={d.paramName}
                options={d.options}
                viewwidth={(viewwidth - (numParams + .5) )/numParams}
                viewheight={7}
                handleSwitch={handleSwitch}>
            </ParamSelector>

        )
    })

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

        </DashboardComponentContainer>
    )
}