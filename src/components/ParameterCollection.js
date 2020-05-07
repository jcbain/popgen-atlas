import React, { Component } from 'react';
import ParameterSet from './ParameterSet';
import {unique} from '../helpers/DataHelpers'

class ParameterCollection extends Component{
    render(){
        const paramSelections = Object.keys(this.props.labels).map(k => (
            <ParameterSet key={k} 
                label={k} 
                options={this.props.data.map(d => d[this.props.labels[k]]).filter(unique)}
                minWidth={120}></ParameterSet>
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