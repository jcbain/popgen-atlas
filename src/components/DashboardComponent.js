import React, { Component } from 'react';
import Button from '@material-ui/core/Button';


import ChartLister from './ChartLister'

class DashboardComponent extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.state = {componentView: false,
                      selectedComponent: ''};
    }

    handleClick(d){
        this.setState({componentView: d})
    }

    render(){
        let display;
        if(this.state.componentView){
            display = <div>
                <h1>Hello</h1>
                <Button onClick={() => this.setState({componentView: false})} size="small">Remove</Button></div>
        } else {
            display = <ChartLister clickAction={this.handleClick}></ChartLister>
        }
        return(
            <div>
                {display}

            </div>
        )
    }
}

export default DashboardComponent;