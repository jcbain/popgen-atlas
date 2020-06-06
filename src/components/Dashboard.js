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
                <DashboardComponent className={'dashboard-component-main'}
                    data={this.props.data}
                    dataDiff={this.props.dataDiff}
                    dataPopPhen={this.props.dataPopPhen}
                    dataPopPhenDiff={this.props.dataPopPhenDiff}
                    template={this.props.template}
                    params={this.state.params}
                    paramMatrix={paramMatrix}></DashboardComponent>

                <DashboardComponent className={'dashboard-component-secondary'}
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
    display: flex;
    flex-direction: row;
`;