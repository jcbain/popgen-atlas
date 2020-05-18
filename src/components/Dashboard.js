import React, { Component } from 'react';
import { toNumber } from 'lodash'

import DashboardComponent from './DashboardComponent';
import ParameterCollection from './ParameterCollection';
import { removeParams, filterDataByParams, unique, findUniqParamOptions } from '../helpers/DataHelpers';


class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = { params: {...this.props.params}}
    }

    componentDidUpdate(){
        console.log(this.state)
    }

    
    render(){
        const paramObj = {migration: 'm', mutation: 'mu', recombination: 'r', selection: 'sigsqr', generation: 'output_gen', population: 'pop'};
        const paramMatrix = findUniqParamOptions(this.props.data, ['m', 'mu', 'r', 'sigsqr', 'pop']).map(d => {
            d.pop = toNumber(d.pop)
            return d;
        });

        let paramFunctions = {}
        Object.keys(paramObj).map(k => {
            paramFunctions[k] = (d) => this.setState(prevState => ({
                params: {
                    ...prevState.params,
                    [paramObj[k]] : d
                }

            }))
            return paramFunctions;
        })
    

        return(
            <div>
                <DashboardComponent className={'dashboard-component-main'}
                    data={this.props.data}
                    dataPopPhen={this.props.dataPopPhen}
                    template={this.props.template}
                    params={this.state.params}></DashboardComponent>

                <ParameterCollection data={paramMatrix}
                        labels={{migration: 'm', mutation: 'mu', recombination: 'r', selection: 'sigsqr', population: 'pop'}}
                        initParams={this.state.params}
                        paramFunc={paramFunctions}>
                </ParameterCollection>
            </div>
        )
    }
}

export default Dashboard;