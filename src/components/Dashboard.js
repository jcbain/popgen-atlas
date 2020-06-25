import React, { useState } from 'react';
import { toNumber } from 'lodash'
import styled from 'styled-components'

import DashboardComponent from './DashboardComponent';
import {DashboardComponentModified} from './DashboardComponentModified';
import { findUniqParamOptions } from '../helpers/DataHelpers';


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

const Dashboard = (props) => {
    const [params, setParams] = useState({...props.params})
    const paramMatrix = findUniqParamOptions(props.data, ['m', 'mu', 'r', 'sigsqr', 'pop']).map(d => {
        d.pop = toNumber(d.pop)
        return d;
    });


    return(
        <DashboardDiv className={props.className}>
            {/* <DashboardComponent key="1" className={'dashboard-component-main'}
                gridArea={{name: "main", displayDims: {width:45, height: 44.5}}}
                data={props.data}
                dataDiff={props.dataDiff}
                dataPopPhen={props.dataPopPhen}
                dataPopPhenDiff={props.dataPopPhenDiff}
                template={props.template}
                params={params}
                paramMatrix={paramMatrix}
                // componentState={props.dashboardState.component1}
                >
            </DashboardComponent>

            <DashboardComponent key="2" className={'dashboard-component-secondary'}
                gridArea={{name: "secondary", displayDims: {width:45, height: 44.5}}}
                data={props.data}
                dataDiff={props.dataDiff}
                dataPopPhen={props.dataPopPhen}
                dataPopPhenDiff={props.dataPopPhenDiff}
                template={props.template}
                params={params}
                paramMatrix={paramMatrix}
                // componentState={props.dashboardState.component2}
                >
            </DashboardComponent> */}

            {/* <DashboardComponent key="3" className={'dashboard-component-tertiary'}
                gridArea={{name: "tertiary", displayDims: {width:45, height: 44.5}}}
                data={props.data}
                dataDiff={props.dataDiff}
                dataPopPhen={props.dataPopPhen}
                dataPopPhenDiff={props.dataPopPhenDiff}
                template={props.template}
                params={params}
                paramMatrix={paramMatrix}>
            </DashboardComponent> */}
            <DashboardComponentModified
                key={"1"}
                gridArea={{name: "main", displayDims: {width:46.5, height: 44.5}}}
                dataPopPhen={props.dataPopPhen}
                data={props.data}
                template={props.template}
                params={params}
                paramMatrix={paramMatrix}
                componentState={props.dashboardState.component1}
                xAction={props.xAction('component1')}
                chooseChart={props.chooseChart('component1')}
                renderChart={props.renderChart('component1')}
                changeParamOption={props.changeParamOption('component1')}
                getSpecialParamOpts={props.getSpecialParamOpts('component1')}
            >
            </DashboardComponentModified>
            <DashboardComponentModified
                key={"2"}
                gridArea={{name: "secondary", displayDims: {width:46.5, height: 44.5}}}
                dataPopPhen={props.dataPopPhen}
                data={props.data}
                template={props.template}
                params={params}
                paramMatrix={paramMatrix}
                componentState={props.dashboardState.component2}
                xAction={props.xAction('component2')}
                chooseChart={props.chooseChart('component2')}
                renderChart={props.renderChart('component2')}
                changeParamOption={props.changeParamOption('component2')}
                getSpecialParamOpts={props.getSpecialParamOpts('component2')}
            >
            </DashboardComponentModified>

            <DashboardComponentModified
                key={"3"}
                gridArea={{name: "tertiary", displayDims: {width:46.5, height: 44.5}}}
                dataPopPhen={props.dataPopPhen}
                data={props.data}
                template={props.template}
                params={params}
                paramMatrix={paramMatrix}
                componentState={props.dashboardState.component3}
                xAction={props.xAction('component3')}
                chooseChart={props.chooseChart('component3')}
                renderChart={props.renderChart('component3')}
                changeParamOption={props.changeParamOption('component3')}
                getSpecialParamOpts={props.getSpecialParamOpts('component3')}
            >
            </DashboardComponentModified>

            <DashboardComponentModified
                key={"4"}
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

            {/* <DashboardComponent key="4" className={'dashboard-component-fourth'}
                gridArea={{name: "fourth", displayDims: {width:45, height: 44.5}}}
                data={props.data}
                dataDiff={props.dataDiff}
                dataPopPhen={props.dataPopPhen}
                dataPopPhenDiff={props.dataPopPhenDiff}
                template={props.template}
                params={params}
                paramMatrix={paramMatrix}>
            </DashboardComponent> */}

        </DashboardDiv>
    )



}

export default Dashboard