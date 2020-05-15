import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import LineChartGroup from './LineChartGroup';
import GeneArchGroup from './GeneArchGroup'

import ChartLister from './ChartLister'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    poot: {
        background: 'black',
    }
})

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
        const { classes } = this.props;
        console.log(classes)

        const charts = {
            geneArchGroup: <GeneArchGroup data={this.props.data}
                            template={this.props.template}
                            params={this.state.params}
                            useLocalParams={true}>
            </GeneArchGroup>,
            lineChartGroup: <LineChartGroup data={this.props.dataPopPhen}
                                            params={this.state.params}
                                            useLocalParams={false}></LineChartGroup>
        }

        const componentLabels = [
            // change this to where the key is some value and the label is also another value
            {geneArchGroup : 'Genome Chart', id: 'geneArchGroup', labelReadable: 'Genome Chart'},
            {lineChartGroup : 'Line Chart', id: 'lineChartGroup', labelReadable: 'Line Chart'}
        ]

        let paramFunctions = {};
        componentLabels.map(k => {
            return paramFunctions[k.id] = (event) => event([true, k.id])
        })

        let display;
        if(this.state.componentView){
            display = <div>
                {charts[this.state.selectedComponent]}
                <Button onClick={() => this.setState({componentView: false, selectedComponent: ''})} size="small">Remove</Button></div>
        } else {
            display = <ChartLister className={classes.poot}
                clickAction={this.handleClick} 
                labels={componentLabels}
                clickActions={paramFunctions}></ChartLister>
        }
        return(
            <div className="dashboard-section">
                {display}
            </div>
        )
    }
}

DashboardComponent.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DashboardComponent);