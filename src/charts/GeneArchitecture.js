import React, { Component } from 'react';
import { select } from 'd3-selection';

import { removeParams, filterDataByParams} from '../helpers/DataHelpers';


class GeneArchitecture extends Component {
    constructor(props){
        super(props);
        this.params = removeParams(this.props.params, ['output_gen', 'pop']);
        this.filteredData = filterDataByParams(this.props.data, this.params)
        this.genWidth = 5;


    }

    componentDidMount(){
        console.log(this.filteredData)
    }


    render(){

        return(
            <svg></svg>
        )
    }
}

export default GeneArchitecture;