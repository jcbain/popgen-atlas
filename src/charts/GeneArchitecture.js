import React, { Component } from 'react';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { min, max } from 'd3-array';

import { unique, removeParams, filterDataByParams, leftJoinByAttr} from '../helpers/DataHelpers';
import { thresholdFreedmanDiaconis } from 'd3';


class GeneArchitecture extends Component {
    constructor(props){
        super(props);
        this.props.template.forEach((v,i) => v.ind = i);
        this.params = removeParams(this.props.params, ['output_gen', 'pop']);
        this.data = leftJoinByAttr(filterDataByParams(this.props.data, this.params),this.props.template, ['position'], {positional_map: 'ind'})
        this.generations = this.data.map(d => d.output_gen).filter(unique);
        this.genWidth = this.props.width/this.generations.length;
        this.xScale = scaleLinear().domain([min(this.data, d => d.output_gen), max(this.data, d => d.output_gen)]).range([0, this.props.width - this.genWidth]);
        this.yScale = scaleLinear().domain([min(this.props.template, d => d.ind), max(this.props.template, d => d.ind)]).range([0, this.props.height])


    }
    archRef = React.createRef();

    componentDidMount(){
       console.log( this.data.filter(d => d.pop === 0))
       console.log(this.xScale(50000))
       console.log(this.generations)
       select(this.archRef.current)
            .selectAll('.genome-cross')
            .data(this.generations)
            .enter()
            .append('rect')
            .attr('x', d => this.xScale(d))
            .attr('y',  0)
            .attr('width', this.genWidth)
            .attr('height', this.props.height)
            .attr('fill', '#fffff7')
        // select(this.archRef.current)
        //     .selectAll('.genome-cross')
        //     .data(this.data)
        //     .enter()
        //     .append('rect')
        //     .attr('x', (d, i) => this.xScale(i))
        //     .attr('y', 0)
        //     .attr('height', this.props.height)
        //     .attr('width', this.xScale(this.genWidth))


    }


    render(){
        return(
            <svg viewBox={[0, 0, this.props.width, this.props.height]}
                 ref={this.archRef}></svg>
        )
    }
}

export default GeneArchitecture;