import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import LineChartGroup from './LineChartGroup';
import GeneArchGroup from './GeneArchGroup'

import ChartLister from './ChartLister'
import LineChart from '../charts/LineChart';

class DashboardComponent extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.state = {componentView: false,
                      selectedComponent: '',
                      params: {mu: '1e-6', m: '1e-4', r: '1e-6' , sigsqr: '25', output_gen: 1000, pop: 0}
                    };
    }

    handleClick(d){
        this.setState({componentView: d[0], selectedComponent: d[1]})
    }

    render(){
        const charts = {
            geneArchGroup: <GeneArchGroup data={this.props.data}
                            template={this.props.template}
                            params={this.state.params}
                            useLocalParams={false}>
            </GeneArchGroup>,
            lineChartGroup: <LineChartGroup data={this.props.dataPopPhen}
                                            params={this.state.params}
                                            useLocalParams={false}></LineChartGroup>
        }

        const componentLabels = [
            {geneArchGroup : 'Genome Chart'},
            {lineChartGroup : 'Line Chart'}
        ]

        let paramFunctions = {};
        componentLabels.map(k => {
            return paramFunctions[Object.keys(k)] = (event) => event([true, Object.keys(k)])
        })
        console.log(paramFunctions)

        let display;
        if(this.state.componentView){
            display = <div>
                {charts[this.state.selectedComponent]}
                <Button onClick={() => this.setState({componentView: false, selectedComponent: ''})} size="small">Remove</Button></div>
        } else {
            display = <ChartLister 
                clickAction={this.handleClick} 
                labels={componentLabels}
                clickActions={paramFunctions}></ChartLister>
        }
        return(
            <div>
                {display}

            </div>
        )
    }
}

export default DashboardComponent;