import React from 'react';
import styled from 'styled-components';

import { DashboardComponent } from '../DashboardComponent/DashboardComponent';


const DashboardContainer = styled.div`
    background-color: ${props => props.theme.color.background};
    display: grid;
    grid-template-areas: 
        "componentMain componentSecondary"
        "componentTertiary componentFourth";
    grid-template-columns: ${({componentviewwidth, gapwidth}) => componentviewwidth - (gapwidth * 1.5)}vw ${({componentviewwidth, gapwidth}) => componentviewwidth - (gapwidth * 1.5)}vw;
    grid-template-rows: ${({componentviewheight, gapwidth}) => componentviewheight - (gapwidth * 1.5)}vh ${({componentviewheight, gapwidth}) => componentviewheight - (gapwidth * 1.5)}vh;
    column-gap: ${({gapwidth}) => gapwidth}vw;
    row-gap: ${({gapwidth}) => gapwidth}vh;
    padding-left: ${({gapwidth}) => gapwidth}vw;
    padding-right: ${({gapwidth}) => gapwidth}vw;
    padding-top: ${({gapwidth}) => gapwidth}vh;
    padding-bottom: ${({gapwidth}) => gapwidth}vh;
`
DashboardContainer.defaultProps = {
    theme: {
        color: {
            background: '#bcbcbf'
        }
    }
}


const Dashboard = (props) => {
    const { handleSwitch, viewwidth, viewheight, dashboardState,
            identifier, handleSlider, 
            isStatic, xAction, renderAction, cardAction, ...rest } = props;
    const dashboardStateKeys = Object.keys(dashboardState)
    const { componentGlobal } = dashboardState;
    const componentviewwidth = viewwidth/2
    const componentviewheight = viewheight/2
    const gapwidth = 1;

    const dashboardcomponents = dashboardStateKeys.filter(d => d !== 'componentGlobal').map((c, i) => {
        return (
            <DashboardComponent key={i}
                gridarea={c}
                selectedView={dashboardState[c]['view']}
                params={isStatic ? componentGlobal['params'] : dashboardState[c]['params']}
                useLocalParams={!isStatic}
                selectedChart={dashboardState[c]['selectedChart']}
                identifier={identifier}
                handleSwitch={handleSwitch(c)}
                handleSlider={handleSlider(c)}
                xAction={xAction(c)}
                renderAction={renderAction(c)}
                cardAction={cardAction(c)}
                displayX={!isStatic}
                {...rest}
            />

        )

    })



    return (
        <DashboardContainer componentviewwidth={componentviewwidth}
            componentviewheight={componentviewheight} 
            gapwidth={gapwidth}>

            { dashboardcomponents }

        </DashboardContainer>
    )
}

export default Dashboard;