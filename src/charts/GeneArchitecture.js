import React, { Component } from 'react';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { min, max } from 'd3-array';

import { unique, removeParams, filterDataByParams, leftJoinByAttr} from '../helpers/DataHelpers';
import { interpolateHcl } from 'd3-interpolate';

let arr1 = [{name: 'james', color: 'yellow'}, {name: 'jennifer', color: 'purple'}, {name: 'jennifer', color: 'whoknow'}]
let arr2 = [{name: 'james'}, {name: 'jennifer'}, {name: 'penolope'}]

class GeneArchitecture extends Component {
    constructor(props){
        super(props);
        this.props.template.forEach((v,i) => v.ind = i);
        this.params = removeParams(this.props.params, ['output_gen', 'pop']);
        this.data = leftJoinByAttr(filterDataByParams(this.props.data, this.params),this.props.template, ['position'], {positional_map: 'ind'}, 'james').filter(d => d.pop === 1);
        this.newData = leftJoinByAttr(this.props.template, filterDataByParams(this.props.data, this.params), ['position'], {ind: 'ind'})
        this.generations = this.props.data.map(d => d.output_gen).filter(unique);
        this.genWidth = this.props.width/this.generations.length;
        this.xScale = scaleLinear().domain([min(this.props.data, d => d.output_gen), max(this.props.data, d => d.output_gen)]).range([0, this.props.width - this.genWidth]);
        this.yScale = scaleLinear().domain([min(this.props.template, d => d.ind), max(this.props.template, d => d.ind)]).range([0, 100])
        this.colorScale = scaleLinear()
        .domain([min(this.props.data, d => d.positional_phen), 0, max(this.props.data, d => d.positional_phen)])
            .range(['#4056a1', '#f1f0eb', '#f13c20'])
            .interpolate(interpolateHcl);

    }
    archRef = React.createRef();

    componentDidMount(){
        console.log(this.data)
        console.log(leftJoinByAttr(arr2, arr1, ['name'], {color: 'color'}))
    //    console.log( this.data.filter(d => d.output_gen === 50000))
    //    console.log(this.xScale(50000))
    //    console.log(this.generations)
    //    select(this.archRef.current)
    //    .selectAll('.genome-cross')
    //    .data(this.generations)
    //    .enter()
    //    .append('rect')
    //    .attr('x', d => this.xScale(d))
    //    .attr('y',  0)
    //    .attr('width', this.genWidth)
    //    .attr('height', this.props.height)
    //    .attr('fill', d => `url(#gen-grad-${d})`)
    //    .attr('stroke', d => `url(#gen-grad-${d})`)



    }


    render(){

        function SingleGrandient(props){
            let selectedData = props.data.filter(d => d.output_gen === props.gen)
            const selectSingle = (i) => selectedData.find(e => e.positional_map === i)
            const gradient = props.template.map( d =>
                <stop key={`stop-gen-${props.gen}-ind-${d.ind}`}
                      stopColor={(selectSingle(d.ind) !== undefined) ? props.colorScale(selectSingle(d.ind).positional_phen) : props.colorScale(0)}
                      offset={props.yScale(d.ind) + "%"}>
                </stop>
            )
            return gradient;
        }

        function SingleGeneration(props){
            const generation = <rect className="genome-cross"
                                     x={props.xScale(props.gen)}
                                     y={0}
                                     width={props.genWidth}
                                     height={props.height}
                                     fill={`url(#gen-grad-${props.gen})`}
                                     stroke={`url(#gen-grad-${props.gen})`}>

            </rect>

            return generation;
        }

        const gradients = this.generations
            .map( d => <linearGradient key={`gen-grad-${d}`}
                            gradientUnits='userSpaceOnUse'
                            id={`gen-grad-${d}`}
                            x1={0}
                            x2={0}
                            y1={0}
                            y2={this.props.height}>
                <SingleGrandient data={this.data} template={this.props.template} gen={d} colorScale={this.colorScale} yScale={this.yScale}>
                </SingleGrandient>
            </linearGradient>)

        const gens = this.generations.map(
            d => <SingleGeneration key={`genome-cross-${d}`}
                                   gen={d}
                                   xScale={this.xScale}
                                   genWidth={this.genWidth}
                                   height={this.props.height}></SingleGeneration>
        )
        return(
            <svg viewBox={[0, 0, this.props.width, this.props.height]} ref={this.archRef}>
                {gradients}
                {gens}

            </svg>
        )
    }
}




export default GeneArchitecture;