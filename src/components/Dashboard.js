import React, { useState } from 'react';
import { toNumber } from 'lodash'
import styled from 'styled-components'

import DashboardComponent from './DashboardComponent';
import {DashboardComponentModified} from './DashboardComponentModified';
import { findUniqParamOptions } from '../helpers/DataHelpers';
import ParameterCollection from './ParameterCollection';
import { v4 as uuidv4 } from 'uuid';



const ParameterOptionCardDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: .25fr 1fr;
    align-items: start;
    margin-bottom: 2vh;
    border: 1px solid #f2f2f2;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-bottom: 0.5rem;
    border-radius: 3px;
`

const ParameterOptionTitle = styled.h2`
    font-family: 'Assistant', sans-serif;
    font-size: .9rem;
`

const DashboardDiv = styled.div`
    background-color: #f2f2f2;
    display: grid;
    grid-template-columns: 48.5vw 48.5vw;
    grid-template-rows:  48.5vh 48.5vh;
    grid-template-areas: 
        "main fourth"
        "secondary tertiary";
    height: 98vh;
    width: 98vw;
    column-gap: 1vw;
    row-gap: 1vh;
    padding-left: 1vw;
    padding-right: 1vw;
    padding-bottom: 1vh;
    padding-top: 1vh;
`

const StyledParameterCollection = styled(ParameterCollection)`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const StyledDashboardComponentDiv = styled.div`
    background-color: #ffffff;
    box-shadow: 0px 0px 1px 0px rgba(168,168,168,1);
    grid-area: ${props => props.gridArea.name};
    padding-top: 2vh;
    padding-left: 1vw;
    padding-right: 1vw;
    padding-bottom: 1vh;
`;


const ParameterOptionCard = (props) => {
    return (
        <ParameterOptionCardDiv>
            <ParameterOptionTitle>{props.description.toUpperCase()}</ParameterOptionTitle>
            {props.children}
        </ParameterOptionCardDiv>
    )
}

const Dashboard = (props) => {
    const [params, setParams] = useState({...props.params})
    const paramMatrix = findUniqParamOptions(props.data, ['m', 'mu', 'r', 'sigsqr', 'pop']).map(d => {
        d.pop = toNumber(d.pop)
        return d;
    });
    const globalstate = props.dashboardState.globalstate;

    let fourthComponent;
    if(props.isStatic){
        fourthComponent = <StyledDashboardComponentDiv gridArea={{name: "fourth", displayDims: {width:46.5, height: 44.5}}}
        >
            <ParameterOptionCard key="params" 
                description={'choose your model parameters'}
                >
                <StyledParameterCollection className={`parameter-collection-${uuidv4()}`}
                    data={paramMatrix}
                    labels={{migration: 'm', mutation: 'mu', recombination: 'r', selection: 'sigsqr'}}
                    initParams={props.dashboardState.globalstate.params}
                    gridArea={{name: "fourth", displayDims: {width:46.5, height: 44.5}}}
                    paramFunc={props.changeParamOption('globalstate')}
                >
                </StyledParameterCollection>
            </ParameterOptionCard>
        </StyledDashboardComponentDiv>
    } else {
        fourthComponent = <DashboardComponentModified
        key={"4"}
        removeX={props.isStatic}
        gridArea={{name: "fourth", displayDims: {width:46.5, height: 44.5}}}
        dataPopPhen={props.dataPopPhen}
        data={props.data}
        template={props.template}
        params={params}
        paramMatrix={paramMatrix}
        componentState={props.dashboardState.component4}
        xAction={props.xAction('component4')}
        chooseChart={props.chooseChart('component4')}
        renderChart={props.renderChart('component4')}
        changeParamOption={props.changeParamOption('component4')}
        getSpecialParamOpts={props.getSpecialParamOpts('component4')}
    >
    </DashboardComponentModified>

    }

    return(
        <DashboardDiv className={props.className}>
            <DashboardComponentModified
                key={"1"}
                removeX={props.isStatic}
                gridArea={{name: "main", displayDims: {width:46.5, height: 44.5}}}
                dataPopPhen={props.dataPopPhen}
                data={props.data}
                template={props.template}
                params={params}
                paramMatrix={paramMatrix}
                componentState={props.isStatic? globalstate : props.dashboardState.component1}
                xAction={props.xAction('component1')}
                chooseChart={props.chooseChart('component1')}
                renderChart={props.renderChart('component1')}
                changeParamOption={props.changeParamOption('component1')}
                getSpecialParamOpts={props.getSpecialParamOpts('component1')}
            >
            </DashboardComponentModified>
            <DashboardComponentModified
                key={"2"}
                removeX={props.isStatic}
                gridArea={{name: "secondary", displayDims: {width:46.5, height: 44.5}}}
                dataPopPhen={props.dataPopPhen}
                data={props.data}
                template={props.template}
                params={params}
                paramMatrix={paramMatrix}
                componentState={props.isStatic? globalstate : props.dashboardState.component2}
                xAction={props.xAction('component2')}
                chooseChart={props.chooseChart('component2')}
                renderChart={props.renderChart('component2')}
                changeParamOption={props.changeParamOption('component2')}
                getSpecialParamOpts={props.getSpecialParamOpts('component2')}
            >
            </DashboardComponentModified>
            <DashboardComponentModified
                key={"3"}
                removeX={props.isStatic}
                gridArea={{name: "tertiary", displayDims: {width:46.5, height: 44.5}}}
                dataPopPhen={props.dataPopPhen}
                data={props.data}
                template={props.template}
                params={params}
                paramMatrix={paramMatrix}
                componentState={props.isStatic? globalstate : props.dashboardState.component3}
                xAction={props.xAction('component3')}
                chooseChart={props.chooseChart('component3')}
                renderChart={props.renderChart('component3')}
                changeParamOption={props.changeParamOption('component3')}
                getSpecialParamOpts={props.getSpecialParamOpts('component3')}
            >
            </DashboardComponentModified>
            {fourthComponent}

        </DashboardDiv>
    )
}


export const StaticDashboard = (props) => {
    const [params, setParams] = useState({...props.params});
    const paramMatrix = findUniqParamOptions(props.data, ['m', 'mu', 'r', 'sigsqr', 'pop']).map(d => {
        d.pop = toNumber(d.pop);
        return d;
    })

    return(
        <DashboardDiv className={props.className}>

        </DashboardDiv>
    )
}



export default Dashboard