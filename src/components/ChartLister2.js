import React, { Component } from 'react';
import {CardTemplates} from './CardTemplates';

class ChartLister extends Component{
    constructor(props){
        super(props);
        this.state = {clicked: false}
    }

    render() {

        const handleClickAction = this.props.handleClick;
        const handleMultiSelect = this.props.handleMultiSelect;
        const cards = this.props.labels.map((d,i) => {
            return(
                CardTemplates[d.id]({
                    labels: this.props.labels,
                    handleClick: handleClickAction,
                    staticOpts: d.staticOpts,
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
