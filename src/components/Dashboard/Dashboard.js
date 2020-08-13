import React from 'react';
import styled from 'styled-components';

import { ParamLister } from '../DashboardComponentCard/DashboardComponentCardsStyles'
import {DashboardComponent} from '../DashboardComponent/DashboardComponent';
import { ParamCard } from '../DashboardComponentCard/DashboardComponentCards'
import { ParamSelector } from '../ParamSelector/ParamSelector';
import { DashboardComponentContainer } from '../DashboardComponent/DashboardComponentStyles';

const DashboardContainer = styled.div`
    background-color: ${props => props.theme.color.background};
    display: grid;
    grid-template-areas: 
        // "param param"
        "componentMain componentSecondary"
        "componentTertiary componentFourth";
    // grid-template-columns: 38vw 38vw;
    grid-template-columns: ${({componentviewwidth, gapwidth}) => componentviewwidth - (gapwidth * 1.5)}vw ${({componentviewwidth, gapwidth}) => componentviewwidth - (gapwidth * 1.5)}vw;
    grid-template-rows: 1fr 1fr;
    column-gap: ${({gapwidth}) => gapwidth}vw;
    row-gap: ${({gapwidth}) => gapwidth}vw;
    padding-left: ${({gapwidth}) => gapwidth}vw;
    padding-right: ${({gapwidth}) => gapwidth}vw;
    padding-top: 1vh;
    padding-bottom: 1vh;
`
DashboardContainer.defaultProps = {
    theme: {
        color: {
            background: '#bcbcbf'
        }
    }
}



const Dashboard = (props) => {
    const {paramOptions, handleSwitch, viewwidth, viewheight, dashboardState,
            lineChartData, geneArchData, identifier, template, handleSlider,
            isStatic, xAction, renderAction, cardAction, setStaticOpt, themes} = props;
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
                lineChartData={lineChartData}
                geneArchData={geneArchData}
                template={template}
                viewwidth={componentviewwidth - 1.5}
                viewheight={componentviewheight}
                params={isStatic ? componentGlobal['params'] : dashboardState[c]['params']}
                useLocalParams={!isStatic}
                paramOptions={paramOptions}
                selectedChart={dashboardState[c]['selectedChart']}
                identifier={identifier}
                handleSwitch={handleSwitch(c)}
                handleSlider={handleSlider(c)}
                xAction={xAction(c)}
                renderAction={renderAction(c)}
                cardAction={cardAction(c)}
                displayX={!isStatic}
                themes={themes}
            />

        )

    })



    return (
        <DashboardContainer componentviewwidth={componentviewwidth} 
            gapwidth={gapwidth}>
            {/* <DashboardComponentContainer  gridarea={'param'}
                display={'flex'}
                viewwidth={viewwidth}>
                <ParamCard description={'static?'}
                    viewwidth={halfviewwidth - 2}
                >
                    <button onClick={() => setStaticOpt(!isStatic)}>Change to {isStatic ? 'flexible' : 'static'}</button>
                </ParamCard>
                <ParamCard description={'choose your global parameters'}
                    viewwidth={halfviewwidth -1 }
                    display={isStatic ? 'grid' : 'none'}
                >
                    <ParamLister numparams={numParams}
                        viewwidth={halfviewwidth-2}
                    >
                        {selectors}
                    </ParamLister>
                </ParamCard>


            </DashboardComponentContainer> */}

            { dashboardcomponents }

        </DashboardContainer>
    )
}

export default Dashboard;