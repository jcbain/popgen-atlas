import React, { Component } from 'react';
import { select, selectAll, event } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { min, max } from 'd3-array';
import { axisBottom } from 'd3-axis';

import { unique, removeParams, filterDataByParams, leftJoinByAttr} from '../helpers/DataHelpers';
import { interpolateHcl } from 'd3-interpolate';

import BrushGeneric from '../components/BrushGeneric';
import {closestFromArray} from '../helpers/Helpers'

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
        this.yScale = scaleLinear().domain([min(this.props.template, d => d.ind), max(this.props.template, d => d.ind)]).range([0, this.props.height])
        this.colorScale = scaleLinear()
        .domain([min(this.props.data, d => d.positional_phen), 0, max(this.props.data, d => d.positional_phen)])
            .range(['#4056a1', '#f1f0eb', '#f13c20'])
            .interpolate(interpolateHcl);
        this.generationReferences = this.generations.concat(Math.round(this.xScale.invert(this.props.width)))
        this.interval = closestFromArray(this.generationReferences)
        
    }
    archRef = React.createRef();

    xAxis = g => g
        .attr("transform", `translate(0,${this.props.height})`)
        .call(axisBottom(this.xScale));

    componentDidMount(){
        select(this.archRef.current)
            .append('g')
            .call(this.xAxis)
    }


    render(){
        const xScale = this.xScale;
        const interval = this.interval;
        const generationReferences = this.generationReferences;

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
                                     id={`genome-cross-${props.gen}`}
                                     x={props.xScale(props.gen)}
                                     y={0}
                                     width={props.genWidth}
                                     height={props.height}
                                     fill={`url(#gen-grad-${props.gen})`}
                                    //  stroke={`url(#gen-grad-${props.gen})`}
                                     opacity={0.2}
                                     strokeOpacity={0.5}>
            </rect>

            return generation;
        }

        const gradients = this.generations
        // TODO: I need to speed this up with few joins on the fly. It is slowing down other compoents
        //       Perhaps look into better data joining or lifecyclee methods
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

        function brushed() {
            const selection = event.selection;
            if (!event.sourceEvent || !selection) return;
            if (selection !== null) {
                let [x0, x1] = selection.map(d => interval(xScale.invert(d)))
                select(this.brushRef.current).transition().duration(1).call(this.genericBrush.move, x1 > x0 ? [x0, x1].map(xScale) : null);
                const relevantIds = generationReferences.filter(d => d >= x0 && d < x1).map(d => `#genome-cross-${d}`)
                const irrelevantIds = generationReferences.filter(d => d < x0 || d >= x1).map(d => `#genome-cross-${d}`)
                if(relevantIds.length !== 0){
                    selectAll(relevantIds.join(", "))
                        .transition()
                        .duration(1)
                        .attr('opacity', 1)
                }
                if(irrelevantIds.length !== 0){
                    selectAll(irrelevantIds.join(", "))
                        .transition()
                        .duration(1)
                        .attr('opacity', .2)}
            }
        }

        const brush = <BrushGeneric endExtentX={this.props.width}
                                    endExtentY={this.props.height}
                                    brushed={brushed}></BrushGeneric>
        return(
            <svg viewBox={[0, 0, this.props.width, this.props.height]} ref={this.archRef}>
                {gradients}
                {gens}
                {brush}

            </svg>
        )
    }
}




export default GeneArchitecture;