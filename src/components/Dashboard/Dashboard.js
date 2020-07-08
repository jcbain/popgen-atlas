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
        "main secondary"
        "tertiary fourth";
    grid-template-columns: 48.5vw 48.5vw;
    grid-template-rows: 0.25fr 1fr 1fr;
    column-gap: 1vw;
    row-gap: 1vh;
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
            lineChartData, geneArchData, identifier, template, 
            isStatic, xAction, renderAction, cardAction, setStaticOpt} = props;

    const {componentMain, componentSecondary, componentTertiary, componentFourth, componentGlobal} = dashboardState;
    let paramOptionsCopy = [...paramOptions].filter(d => d.paramName !== 'pop');
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

            <DashboardComponent gridarea="main"
                selectedView={componentMain['view']}
                lineChartData={lineChartData}
                geneArchData={geneArchData}
                template={template}
                viewwidth={(viewwidth/2) - 1.5}
                viewheight={40}
                params={isStatic ? componentGlobal['params'] : componentMain['params']}
                useLocalParams={!isStatic}
                paramOptions={paramOptions}
                selectedChart={componentMain['selectedChart']}
                identifier={identifier}
                handleSwitch={handleSwitch('componentMain')}
                xAction={xAction('componentMain')}
                renderAction={renderAction('componentMain')}
                cardAction={cardAction('componentMain')}
            >
            </DashboardComponent>

            <DashboardComponent gridarea="secondary"
                selectedView={componentSecondary['view']}
                lineChartData={lineChartData}
                geneArchData={geneArchData}
                template={template}
                viewwidth={(viewwidth/2) - 1.5}
                viewheight={40}
                params={isStatic ? componentGlobal['params'] : componentSecondary['params']}
                useLocalParams={!isStatic}
                paramOptions={paramOptions}
                selectedChart={componentSecondary['selectedChart']}
                identifier={identifier}
                handleSwitch={handleSwitch('componentSecondary')}
                xAction={xAction('componentSecondary')}
                renderAction={renderAction('componentSecondary')}
                cardAction={cardAction('componentSecondary')}
            >
            </DashboardComponent>

            <DashboardComponent gridarea="tertiary"
                selectedView={componentTertiary['view']}
                lineChartData={lineChartData}
                geneArchData={geneArchData}
                template={template}
                viewwidth={(viewwidth/2) - 1.5}
                viewheight={40}
                params={isStatic ? componentGlobal['params'] : componentTertiary['params']}
                useLocalParams={!isStatic}
                paramOptions={paramOptions}
                selectedChart={componentTertiary['selectedChart']}
                identifier={identifier}
                handleSwitch={handleSwitch('componentTertiary')}
                xAction={xAction('componentTertiary')}
                renderAction={renderAction('componentTertiary')}
                cardAction={cardAction('componentTertiary')}
            >
            </DashboardComponent>

            <DashboardComponent gridarea="fourth"
                selectedView={componentFourth['view']}
                lineChartData={lineChartData}
                geneArchData={geneArchData}
                template={template}
                viewwidth={(viewwidth/2) - 1.5}
                viewheight={40}
                params={isStatic ? componentGlobal['params'] : componentFourth['params']}
                useLocalParams={!isStatic}
                paramOptions={paramOptions}
                selectedChart={componentFourth['selectedChart']}
                identifier={identifier}
                handleSwitch={handleSwitch('componentFourth')}
                xAction={xAction('componentFourth')}
                renderAction={renderAction('componentFourth')}
                cardAction={cardAction('componentFourth')}
            >
            </DashboardComponent>

        </DashboardContainer>
    )
}

export default Dashboard;