import React, { Component } from 'react';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { min, max } from 'd3-array';

import { unique, removeParams, filterDataByParams, leftJoinByAttr} from '../helpers/DataHelpers';
import { interpolateHcl } from 'd3-interpolate';


class GeneArchitecture extends Component {
    constructor(props){
        super(props);
        this.props.template.forEach((v,i) => v.ind = i);
        this.params = removeParams(this.props.params, ['output_gen', 'pop']);
        this.data = leftJoinByAttr(filterDataByParams(this.props.data, this.params),this.props.template, ['position'], {positional_map: 'ind'}).filter(d => d.pop === 1);
        this.generations = this.data.map(d => d.output_gen).filter(unique);
        this.genWidth = this.props.width/this.generations.length;
        this.xScale = scaleLinear().domain([min(this.data, d => d.output_gen), max(this.data, d => d.output_gen)]).range([0, this.props.width - this.genWidth]);
        this.yScale = scaleLinear().domain([min(this.props.template, d => d.ind), max(this.props.template, d => d.ind)]).range([0, 100])
        this.colorScale = scaleLinear()
        .domain([min(this.props.data, d => d.positional_phen), 0, max(this.props.data, d => d.positional_phen)])
            .range(['#C38D9E', '#fffff7', '#E27D60'])
            .interpolate(interpolateHcl);

    }
    archRef = React.createRef();

    componentDidMount(){
       console.log( this.data.filter(d => d.output_gen === 50000))
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
            .attr('fill', d => `url(#gen-grad-${d})`)
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

        function SingleGrandient(props){
            const selectedData = props.data.filter(d => d.output_gen === props.gen)
            console.log(selectedData)
            const gradient = selectedData.map( d =>
                <stop key={`stop-gen-${props.gen}-ind-${d.positional_map}`}
                      stopColor={props.colorScale(d.positional_phen)}
                      offset={props.yScale(d.positional_map) + "%"}>
                </stop>
            )
            return gradient;
        }

        const gradients = this.generations
            .map( d => <linearGradient key={`gen-grad-${d}-yes`}
                            gradientUnits='userSpaceOnUse'
                            id={`gen-grad-${d}`}
                            x1={0}
                            x2={0}
                            y1={0}
                            y2={this.props.height}>
                <SingleGrandient data={this.data} gen={d} colorScale={this.colorScale} yScale={this.yScale}></SingleGrandient>

                

            </linearGradient>)
        return(
            <svg viewBox={[0, 0, this.props.width, this.props.height]}
                 ref={this.archRef}>
                {gradients}

            </svg>
        )
    }
}




export default GeneArchitecture;