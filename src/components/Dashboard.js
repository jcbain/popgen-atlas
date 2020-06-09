import React, { Component } from 'react';
import { toNumber } from 'lodash'
import styled from 'styled-components'

import DashboardComponent from './DashboardComponent';
import { findUniqParamOptions } from '../helpers/DataHelpers';


class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = { params: {...this.props.params}}
    }

    render(){
        const paramMatrix = findUniqParamOptions(this.props.data, ['m', 'mu', 'r', 'sigsqr', 'pop']).map(d => {
            d.pop = toNumber(d.pop)
            return d;
        });
    

        return(
            <div className={this.props.className}>
                <DashboardComponent key="1" className={'dashboard-component-main'}
                    gridArea={{name: "main", displayDims: {width:61, height: 61}}}
                    data={this.props.data}
                    dataDiff={this.props.dataDiff}
                    dataPopPhen={this.props.dataPopPhen}
                    dataPopPhenDiff={this.props.dataPopPhenDiff}
                    template={this.props.template}
                    params={this.state.params}
                    paramMatrix={paramMatrix}>
                </DashboardComponent>

                <DashboardComponent key="2" className={'dashboard-component-secondary'}
                    gridArea={{name: "secondary", displayDims: {width:29, height: 61}}}
                    data={this.props.data}
                    dataDiff={this.props.dataDiff}
                    dataPopPhen={this.props.dataPopPhen}
                    dataPopPhenDiff={this.props.dataPopPhenDiff}
                    template={this.props.template}
                    params={this.state.params}
                    paramMatrix={paramMatrix}>
                </DashboardComponent>

                <DashboardComponent key="3" className={'dashboard-component-tertiary'}
                    gridArea={{name: "tertiary", displayDims: {width:61, height: 29}}}
                    data={this.props.data}
                    dataDiff={this.props.dataDiff}
                    dataPopPhen={this.props.dataPopPhen}
                    dataPopPhenDiff={this.props.dataPopPhenDiff}
                    template={this.props.template}
                    params={this.state.params}
                    paramMatrix={paramMatrix}>
                </DashboardComponent>

                <DashboardComponent key="4" className={'dashboard-component-fourth'}
                    gridArea={{name: "fourth", displayDims: {width:29, height: 29}}}
                    data={this.props.data}
                    dataDiff={this.props.dataDiff}
                    dataPopPhen={this.props.dataPopPhen}
                    dataPopPhenDiff={this.props.dataPopPhenDiff}
                    template={this.props.template}
                    params={this.state.params}
                    paramMatrix={paramMatrix}>
                </DashboardComponent>

            </div>
        )
    }
}

export default styled(Dashboard)`
    background-color: #f2f2f2;
    display: grid;
    grid-template-columns: 32vw 32vw 32vw;
    grid-template-rows: 32vh 32vh 32vh;
    grid-template-areas: 
        "main main fourth"
        "main main secondary"
        "tertiary tertiary secondary";
    height: 98vh;
    width: 98vw;
    column-gap: 1vw;
    row-gap: 1vh;
    padding-left: 1vw;
    padding-right: 1vw;
    padding-bottom: 1vh;
    padding-top: 1vh;
`;