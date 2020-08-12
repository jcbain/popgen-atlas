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
        "param param"
        "componentMain componentSecondary"
        "componentTertiary componentFourth";
    grid-template-columns: 48.5vw 48.5vw;
    grid-template-rows: 0.25fr 1fr 1fr;
    column-gap: 1vw;
    row-gap: 1vw;
    width: 100vw;
    padding-left: 1vw;
    padding-right: 1vw;
    padding-top: 1vh;
`
DashboardContainer.defaultProps = {
    theme: {
        color: {
            background: '#bcbcbf'
        }
    }
}



const Dashboard = (props) => {
    const {paramOptions, handleSwitch, viewwidth, dashboardState,
            lineChartData, geneArchData, identifier, template, handleSlider,
            isStatic, xAction, renderAction, cardAction, setStaticOpt, themes} = props;
    const dashboardStateKeys = Object.keys(dashboardState)
    const { componentGlobal } = dashboardState;
    let paramOptionsCopy = [...paramOptions].filter(d => d.paramName !== 'pop' && d.paramName !== 'output_gen');
    const numParams = paramOptionsCopy.length;
    const halfviewwidth = viewwidth/2
    const selectors = paramOptionsCopy.map((d, i) => {
        return (
            <ParamSelector key={i}
                className={'param-selector'}
                paramName={d.paramName}
                paramNameReadable={d.paramNameReadable}
                options={d.options}
                viewwidth={(halfviewwidth - (numParams + .5) )/numParams}
                viewheight={7}
                addHover={false}
                selectedValue={componentGlobal['params'][d.paramName]}
                handleSwitch={handleSwitch('componentGlobal')}
                >
            </ParamSelector>
        )
    })

    const dashboardcomponents = dashboardStateKeys.filter(d => d !== 'componentGlobal').map((c, i) => {
        return (
            <DashboardComponent key={i}
            gridarea={c}
            selectedView={dashboardState[c]['view']}
            lineChartData={lineChartData}
            geneArchData={geneArchData}
            template={template}
            viewwidth={(viewwidth/2) - 1.5}
            viewheight={40}
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
        <DashboardContainer >
            <DashboardComponentContainer  gridarea={'param'}
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


            </DashboardComponentContainer>

            { dashboardcomponents }

        </DashboardContainer>
    )
}

export default Dashboard;