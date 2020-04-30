import React, { Component } from 'react';
import { select, selectAll, event } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { min, max } from 'd3-array';
import { axisBottom } from 'd3-axis';


import { unique, removeParams, filterDataByParams, leftJoinByAttr} from '../helpers/DataHelpers';
import { interpolateHcl } from 'd3-interpolate';

import BrushGeneric from '../components/BrushGeneric';
import {closestFromArray, createLabel} from '../helpers/Helpers';

class GeneArchitecture extends Component {
    constructor(props){
        super(props);
        // this.props.template.forEach((v,i) => v.ind = i);
        this.gradients = this.props.gradients;
        this.colorScale = scaleLinear()
        .domain([min(this.props.data, d => d.positional_phen), 0, max(this.props.data, d => d.positional_phen)])
            .range(['#4056a1', '#f1f0eb', '#f13c20'])
            .interpolate(interpolateHcl);
        
    }
    archRef = React.createRef();

    // xAxis = g => g
    //     .attr("transform", `translate(0,${this.props.height})`)
    //     .call(axisBottom(this.xScale));

    // componentDidMount(){
    //     select(this.archRef.current)
    //         .append('g')
    //         .call(this.xAxis)
    // }


    render(){
        const params = removeParams(this.props.params, ['output_gen', 'pop']);
        const data = leftJoinByAttr(filterDataByParams(this.props.data, params), this.props.template, ['position'], {positional_map: 'ind'}).filter(d => d.pop === 1);
        const generations = this.props.data.map(d => d.output_gen).filter(unique);
        const genWidth = this.props.width/generations.length;
        const xScale = scaleLinear().domain([min(this.props.data, d => d.output_gen), max(this.props.data, d => d.output_gen)]).range([0, this.props.width - genWidth]);
        const yScale = scaleLinear().domain([min(this.props.template, d => d.ind), max(this.props.template, d => d.ind)]).range([0, this.props.height])
        const generationReferences = generations.concat(Math.round(xScale.invert(this.props.width)))
        const interval = closestFromArray(generationReferences)
        const brushFn = this.props.changeBrush;
        const idSelector = () => this.props.uniqId;


        // function SingleGrandient(props){
        //     let selectedData = props.data.filter(d => d.output_gen === props.gen)
        //     const selectSingle = (i) => selectedData.find(e => e.positional_map === i)
        //     const gradient = props.template.map( d =>
        //         <stop key={`stop-gen-${props.gen}-ind-${d.ind}`}
        //               stopColor={(selectSingle(d.ind) !== undefined) ? props.colorScale(selectSingle(d.ind).positional_phen) : props.colorScale(0)}
        //               offset={props.yScale(d.ind) + "%"}>
        //         </stop>
        //     )
        //     return gradient;
        // }

        function SingleGeneration(props){
            const opac = props.addBrush ? 0.2 : 1;
            const generation = <rect className="genome-cross"
                                    id={createLabel('genome-cross', props.uniqId, props.gen)}
                                    //  id={`genome-cross-${props.gen}`}
                                     x={props.xScale(props.gen)}
                                     y={0}
                                     width={props.genWidth}
                                     height={props.height}
                                     fill={`url(#${createLabel('gen-grad', props.uniqId, props.gen)})`}
                                    //  fill={`url(#gen-grad-${props.gen})`}
                                    //  stroke={`url(#gen-grad-${props.gen})`}
                                     opacity={opac}
                                     strokeOpacity={0.5}>
            </rect>

            return generation;
        }

        // const gradients = generations
        // // TODO: I need to speed this up with few joins on the fly. It is slowing down other compoents
        // //       Perhaps look into better data joining or lifecyclee methods
        //     .map( d => <linearGradient key={`gen-grad-${d}`}
        //                     gradientUnits='userSpaceOnUse'
        //                     id={createLabel('gen-grad', this.props.uniqId, d)}
        //                     // id={`gen-grad-${d}`}
        //                     x1={0}
        //                     x2={0}
        //                     y1={0}
        //                     y2={this.props.height}>
        //         <SingleGrandient data={data} template={this.props.template} gen={d} colorScale={this.colorScale} yScale={yScale}>
        //         </SingleGrandient>
        //     </linearGradient>)

        const gens = generations.map(
            d => <SingleGeneration key={`genome-cross-${d}`}
                                   gen={d}
                                   xScale={xScale}
                                   genWidth={genWidth}
                                   height={this.props.height}
                                   uniqId={this.props.uniqId}
                                   addBrush={this.props.addBrush}></SingleGeneration>
        )

        function brushed() {
            const uniqId = idSelector()
            const selection = event.selection;
            if (!event.sourceEvent || !selection) return;
            if (selection !== null) {
                let [x0, x1] = selection.map(d => interval(xScale.invert(d)))
                select(this.brushRef.current).transition().duration(1).call(this.genericBrush.move, x1 > x0 ? [x0, x1].map(xScale) : null);
                const relevantIds = generationReferences.filter(d => d >= x0 && d < x1).map(d => `#${createLabel('genome-cross', uniqId, d)}`)
                const irrelevantIds = generationReferences.filter(d => d < x0 || d >= x1).map(d => `#${createLabel('genome-cross', uniqId, d)}`)
                brushFn([x0, x1])
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
        




        let brush;
        if(this.props.addBrush){
            brush = <BrushGeneric endExtentX={this.props.width}
                                  endExtentY={this.props.height}
                                  brushed={brushed}>
                    </BrushGeneric>
        }

        return(
            <svg className={this.props.uniqId} viewBox={[0, 0, this.props.width, this.props.height]} ref={this.archRef}>
                {/* {gradients} */}
                {this.gradients}
                {gens}
                {brush}

            </svg>
        )
    }
}




export default GeneArchitecture;