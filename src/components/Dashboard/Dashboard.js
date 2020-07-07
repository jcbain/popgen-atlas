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
    const {paramOptions, handleSwitch, viewwidth, params,
            lineChartData, geneArchData, identifier, template} = props;
    let paramOptionsCopy = [...paramOptions].filter(d => d.paramName !== 'pop');
    const numParams = paramOptionsCopy.length;
    const selectors = paramOptionsCopy.map((d, i) => {
        return (
            <ParamSelector key={i}
                className={'param-selector'}
                paramName={d.paramName}
                paramNameReadable={d.paramNameReadable}
                options={d.options}
                viewwidth={(viewwidth - (numParams + .5) )/numParams}
                viewheight={7}
                addHover={false}
                selectedValue={params[d.paramName]}
                handleSwitch={handleSwitch}>
            </ParamSelector>

        )
    })



    return (
        <DashboardContainer>
            <DashboardComponentContainer gridarea={'param'}
                viewwidth={viewwidth}>
                <ParamCard description={'choose your parameters'}>
                    <ParamLister numparams={numParams}
                        viewwidth={viewwidth-2}
                    >
                        {selectors}
                    </ParamLister>
                </ParamCard>
            </DashboardComponentContainer>

            <DashboardComponent gridarea="main"
                selectedView={'chartview'}
                lineChartData={lineChartData}
                geneArchData={geneArchData}
                template={template}
                viewwidth={(viewwidth/2) - 1.5}
                viewheight={40}
                params={params}
                useLocalParams={false}
                paramOptions={paramOptions}
                handleSwitch={handleSwitch}
                selectedChart={'linechartgroup'}
                identifier={identifier}>
            </DashboardComponent>

            <DashboardComponent gridarea="secondary"
                selectedView={'chartview'}
                lineChartData={lineChartData}
                geneArchData={geneArchData}
                template={template}
                viewwidth={(viewwidth/2) - 1.5}
                viewheight={40}
                params={params}
                useLocalParams={false}
                paramOptions={paramOptions}
                handleSwitch={handleSwitch}
                selectedChart={'linechartgroup'}
                identifier={identifier}>
            </DashboardComponent>

            <DashboardComponent gridarea="tertiary"
                selectedView={'chartview'}
                lineChartData={lineChartData}
                geneArchData={geneArchData}
                template={template}
                viewwidth={(viewwidth/2) - 1.5}
                viewheight={40}
                params={params}
                useLocalParams={false}
                paramOptions={paramOptions}
                handleSwitch={handleSwitch}
                selectedChart={'genearchgroup'}
                identifier={identifier}>
            </DashboardComponent>

            <DashboardComponent gridarea="fourth"
                selectedView={'chartview'}
                lineChartData={lineChartData}
                geneArchData={geneArchData}
                template={template}
                viewwidth={(viewwidth/2) - 1.5}
                viewheight={40}
                params={params}
                useLocalParams={false}
                paramOptions={paramOptions}
                handleSwitch={handleSwitch}
                selectedChart={'genearchgroup'}
                identifier={identifier}>
            </DashboardComponent>

        </DashboardContainer>
    )
}

export default Dashboard;