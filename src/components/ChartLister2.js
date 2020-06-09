import React, { Component } from 'react';
import {LineChartCard, GenomeChartCard} from './CardTemplates';

class ChartLister extends Component{
    constructor(props){
        super(props);
        this.state = {clicked: false}

    }

    render() {
        const handleClickAction = this.props.handleClick;
        const handleMultiSelect = this.props.handleMultiSelect;
        const handleSwitchDiff= this.props.handleSwitchDiff;
  
        return(
            <div className={this.props.className}>
                <LineChartCard labels={this.props.labels}
                    handleClick={handleClickAction}
                    staticOpts={this.props.labels.find(d => d.id === 'lineChartGroup').staticOpts}
                    identifier={this.props.labels.find(d => d.id === 'lineChartGroup').id}
                    handleMultiSelect={handleMultiSelect}
                    handleSwitchDiff={this.props.handleSwitchDiff}
                    specialOpts={this.props.specialOpts['lineChartGroup']}
                    labelReadable={'Line Chart'}
                    switchDiff={this.props.labels.find(d => d.id === 'lineChartGroup').switchDiff}
                ></LineChartCard>
                <GenomeChartCard labels={this.props.labels}
                    handleClick={handleClickAction}
                    staticOpts={this.props.labels.find(d => d.id === 'geneArchGroup').staticOpts}
                    identifier={this.props.labels.find(d => d.id === 'geneArchGroup').id}
                    labelReadable={'Genome Chart'}
                    handleSwitchDiff={handleSwitchDiff}
                    handleMultiSelect={handleMultiSelect}
                    switchDiff={this.props.labels.find(d => d.id === 'geneArchGroup').switchDiff}
                    handleSwitchFST={()=> console.log('hello')}>
                </GenomeChartCard>
            </div>
        )
    }
}

export default ChartLister;
