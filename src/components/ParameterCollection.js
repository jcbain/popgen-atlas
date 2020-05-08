import React, { Component } from 'react';
import ParameterSet from './ParameterSet';
import {unique} from '../helpers/DataHelpers'

class ParameterCollection extends Component{
    constructor(props){
        super(props);
        this.onSelection = this.onSelection.bind(this);
        this.state = {item: 0}
    }

    onSelection(d){
        this.setState({item: d})
    }
    
    componentDidUpdate(){
        console.log(this.state);
    }

    render(){
        const paramSelections = Object.keys(this.props.labels).map(k => (
            <ParameterSet key={k} 
                label={k} 
                options={this.props.data.map(d => d[this.props.labels[k]]).filter(unique)}
                minWidth={120}
                changeSelection={this.onSelection}></ParameterSet>
            )
        )
        return(
            <div>
                {paramSelections}
            </div>
        )
    }
}

export default ParameterCollection;