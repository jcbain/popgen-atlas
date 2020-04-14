import React, { Component } from 'react';
import { select } from 'd3-selection';


class GeneArchitecture extends Component {
    constructor(props){
        super(props);

    }

    componentDidMount(){
        console.log(this.props.data)
    }


    render(){

        return(
            <svg></svg>
        )
    }
}

export default GeneArchitecture;