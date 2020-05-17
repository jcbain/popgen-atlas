import React, { Component } from 'react';

import DashboardComponent from './DashboardComponent';

class Dashboard extends Component{
    render(){
        return(
            <div>
                <DashboardComponent className={'dashboard-component-main'}
                    data={this.props.data}
                    dataPopPhen={this.props.dataPopPhen}
                    template={this.props.template}></DashboardComponent>
            </div>
        )
    }
}

export default Dashboard;