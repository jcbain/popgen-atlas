import React, { Component } from 'react';
import ParameterSet from './ParameterSet';
import {unique} from '../helpers/DataHelpers'

class ParameterCollection extends Component{
    constructor(props){
        super(props);
        this.onSelection = this.onSelection.bind(this);
        this.state = {item: 0, migration: 0}
    }

    onSelection(d){
        this.setState({item: d})
    }

    
    componentDidUpdate(){
        console.log(this.state);
    }

    render(){
        console.log(this.props)
        let functObj = {}
        Object.keys(this.props.labels).map(k => (
            functObj[k] = (d) => this.setState({[k]: d})
        ))
        const paramSelections = Object.keys(this.props.labels).map(k => (
            <ParameterSet key={k} 
                label={k} 
                options={this.props.data.map(d => d[this.props.labels[k]]).filter(unique)}
                minWidth={120}
                changeSelection={this.props.paramFunc[k]}></ParameterSet>
            )
        )


        console.log(functObj)
        return(
            <div>
                {paramSelections}
            </div>
        )
    }
}

export default ParameterCollection;