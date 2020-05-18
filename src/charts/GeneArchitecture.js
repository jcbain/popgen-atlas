import React, { Component } from 'react';
import { select, selectAll, event, mouse} from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { min, max } from 'd3-array';
import { axisBottom } from 'd3-axis';


import { unique} from '../helpers/DataHelpers';
import {closestFromArray, createLabel} from '../helpers/Helpers';

import BrushHorizontal from '../components/BrushHorizontal';

class GeneArchitecture extends Component {
    constructor(props){
        super(props);
        this.gradients = this.props.gradients;
        this.startExtent = [1000, 10000]
        
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
        const generations = this.props.data.map(d => d.output_gen).filter(unique);
        const genWidth = this.props.width/generations.length;
        const xScale = scaleLinear().domain([min(this.props.data, d => d.output_gen), max(this.props.data, d => d.output_gen)]).range([0, this.props.width - genWidth]);
        const generationReferences = generations.concat(Math.round(xScale.invert(this.props.width)))
        const interval = closestFromArray(generationReferences)
        const brushFn = this.props.changeBrush;
        const idSelector = () => this.props.uniqId;

        function SingleGeneration(props){
            const opac = props.addBrush ? 0.2 : 1;
            const generation = <rect className="genome-cross"
                                    id={createLabel('genome-cross', props.uniqId, props.gen)}
                                     x={props.xScale(props.gen)}
                                     y={0}
                                     width={props.genWidth}
                                     height={props.height}
                                     fill={`url(#${createLabel('gen-grad', props.uniqId, props.gen)})`}
                                     opacity={props.gen >= props.startExtent[0] & props.gen < props.startExtent[1] ? 1 : opac}
                                     strokeOpacity={0.5}>
            </rect>

            return generation;
        }

        const gens = generations.map(
            d => <SingleGeneration key={createLabel('genome-cross', this.props.uniqId, d)}
                                   gen={d}
                                   xScale={xScale}
                                   genWidth={genWidth}
                                   height={this.props.height}
                                   uniqId={this.props.uniqId}
                                   addBrush={this.props.addBrush}
                                   startExtent={this.startExtent}></SingleGeneration>
        )

        function brushed() {
            const uniqId = idSelector()
            const selection = event.selection;
            if (!event.sourceEvent || !selection) return;
            if (selection !== null) {
                let [x0, x1] = selection.map(d => interval(xScale.invert(d)))
                select(this.brushRef.current).transition().duration(1).call(this.horizontalBrush.move, x1 > x0 ? [x0, x1].map(xScale) : null);
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

        function centerBrushOnTouch(brush) {
            const dx  = xScale(2000);
            const [cx] = mouse(this);
            const [x0, x1] = [cx - dx / 2, cx + dx / 2].map(d => interval(xScale.invert(d)));
            const [X0, X1] = xScale.domain();
            select(this)
                .call(brush.move, x1 > X1 ? [X1 - dx, X1].map(xScale) 
                : x0 < X0 ? [X0, X0 + dx].map(xScale) 
                : [x0, x1].map(xScale));
        }



        let brush;
        if(this.props.addBrush){
            brush = <BrushHorizontal endExtentX={this.props.width}
                                  endExtentY={this.props.height}
                                  startExtent={this.startExtent}
                                  brushed={brushed}
                                  xScale={xScale}
                                  touchCentered={centerBrushOnTouch}>
                    </BrushHorizontal>
        }

        return(
            <svg className={this.props.uniqId} viewBox={[0, 0, this.props.width, this.props.height]} ref={this.archRef}>
                {this.props.gradients}
                {gens}
                {brush}
            </svg>
        )
    }
}


export default GeneArchitecture;