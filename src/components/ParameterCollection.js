import React, { Component } from 'react';
import ParameterSet from './ParameterSet';
import {unique} from '../helpers/DataHelpers'

class ParameterCollection extends Component{
    constructor(props){
        super(props);
        this.initParams = this.props.initParams
    }


    render(){

        const paramSelections = Object.keys(this.props.labels).map(k => (
            <ParameterSet key={k} 
                label={k} 
                initVal={this.initParams[this.props.labels[k]]}
                options={this.props.data.map(d => d[this.props.labels[k]]).filter(unique)}
                minWidth={120}
                changeSelection={this.props.paramFunc[k]}></ParameterSet>
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