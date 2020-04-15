import React, { Component } from 'react';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { min, max } from 'd3-array';

import { removeParams, filterDataByParams, leftJoinByAttr} from '../helpers/DataHelpers';


class GeneArchitecture extends Component {
    constructor(props){
        super(props);
        this.props.template.forEach((v,i) => v.ind = i);
        this.params = removeParams(this.props.params, ['output_gen', 'pop']);
        this.data = leftJoinByAttr(filterDataByParams(this.props.data, this.params),this.props.template, ['position'], {positional_map: 'ind'})
        this.genWidth = 5;
        this.xScale = scaleLinear().range([min(this.data, (d, i) => i), max(this.data, (d, i) => i)]).range([0, this.props.width]);
        this.yScale = scaleLinear().range([min(this.props.template, d => d.ind), max(this.props.template, d => d.ind)]).domain([0, this.props.height])


    }

    componentDidMount(){
        console.log(this)

    }


    render(){

        return(
            <svg viewBox={[0, 0, this.props.width, this.props.height]}></svg>
        )
    }
}

export default GeneArchitecture;