import React, { Component } from 'react';
import {CardTemplates, LineChartCard, GenomeChartCard} from './CardTemplates';
import LineChart from '../charts/LineChart';

class ChartLister extends Component{
    constructor(props){
        super(props);
        this.state = {clicked: false}
    }

    render() {

        const handleClickAction = this.props.handleClick;
        const handleMultiSelect = this.props.handleMultiSelect;
        const handleSwitchDiff = this.props.handleSwitchDiff;
        const cards = this.props.labels.map((d,i) => {
            return(
                CardTemplates[d.id]({
                    labels: this.props.labels,
                    handleClick: handleClickAction,
                    staticOpts: d.staticOpts,
                    identifier: d.id,
                    handleMultiSelect: handleMultiSelect,
                    handleSwitchDiff: handleSwitchDiff,
                    labelReadable: d.labelReadable,
                    switchDiff: d.switchDiff
                })
            )
        })

        return(
            <div className={this.props.className}>
                {/* {cards}  */}
                <LineChartCard labels={this.props.labels}
                    handleClick={handleClickAction}
                    staticOpts={this.props.labels.find(d => d.id === 'lineChartGroup').staticOpts}
                    identifier={this.props.labels.find(d => d.id === 'lineChartGroup').id}
                    handleMultiSelect={handleMultiSelect}
                    handleSwitchDiff={handleSwitchDiff}
                    labelReadable={this.props.labels.find(d => d.id === 'lineChartGroup').labelReadable}
                    switchDiff={this.props.labels.find(d => d.id === 'lineChartGroup').switchDiff}
                ></LineChartCard>
            </div>
        )
    }
}

export default ChartLister;
