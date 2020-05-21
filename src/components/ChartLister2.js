import React, { Component } from 'react';
import {cardTypes} from './DashboardCards';

class ChartLister extends Component{
    constructor(props){
        super(props);
        this.state = {clicked: false}
    }

    render() {
        const clickActions = this.props.clickActions;
        const handleClickAction = this.props.handleClick;
        const handleMultiSelect = this.props.handleMultiSelect;
        const staticOptAction = this.props.staticOptAction
        const cards = this.props.labels.map((d,i) => {
            return(
                cardTypes[d.id]({
                    clickActions: clickActions,
                    handleClick: handleClickAction,
                    staticOpts: d.staticOpts,
                    staticOptAction: staticOptAction,
                    identifier: d.id,
                    handleMultiSelect: handleMultiSelect,
                    labelReadable: d.labelReadable
                })
            )
        })
        return(
            <div className={this.props.className}>
                {cards} 
            </div>
        )
    }
}

export default ChartLister;
