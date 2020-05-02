import React, { Component } from 'react';
import { nest } from 'd3-collection';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { min, max } from 'd3-array';


import { removeParams, filterDataByParams} from '../helpers/DataHelpers';
import {closestFromArray, createLabel} from '../helpers/Helpers';

import LineChart from '../charts/LineChart';

class LineChartGroup extends Component{
    constructor(props){
        super(props);
        this.params = removeParams(this.props.params, ['output_gen', 'pop']) 
        this.data = nest().key(d => d.pop).entries(filterDataByParams(this.props.data, this.params));
        this.lineLabels = ['line-1', 'line-2']
    }
    render(){
        let xScale = scaleLinear();
        let yScale = scaleLinear().domain([min(this.props.data, d => d.pop_phen), max(this.props.data, d => d.pop_phen)]);
        const popKeys = this.data.map( d => d.key );
        const focusColor = scaleOrdinal().domain(popKeys).range(['#E27D60', '#C38D9E', '#E8A87C']);
        const outsideColor = scaleOrdinal().domain(popKeys).range(['#f0b7a8', '#d9bac4', '#E8A87C']);
        const lineGrads = createGradients(popKeys, 400, this.lineLabels[0])

        function createGradients(popKeys, width, name){
            const gradients = popKeys
                .map(d => <linearGradient key={`line-grad-${d}`}
                    gradientUnits={'userSpaceOnUse'}
                    id={createLabel('gradient-pop', d, name)}
                    x1={0}
                    x2={width}
                    y1={0}
                    y2={0}>
                        <stop stopColor={outsideColor(d)} className={`left ${createLabel(name, 'start01')}`} offset={'10%'}></stop>
                        <stop stopColor={focusColor(d)} className={`left ${createLabel(name, 'start02')}`} offset={'10%'}></stop>
                        <stop stopColor={focusColor(d)} className={`right ${createLabel(name, 'end01')}`} offset={'90%'}></stop>
                        <stop stopColor={outsideColor(d)} className={`right ${createLabel(name, 'end02')}`} offset={'90%'}></stop>
                </linearGradient>)

            return gradients;
        }


        return(
            <div>
                <LineChart data={this.data}
                    width={400}
                    height={200}
                    uniqId={this.lineLabels[0]}
                    domain={[min(this.props.data, d => d.output_gen), max(this.props.data, d => d.output_gen)]}
                    xScale={xScale}
                    yScale={yScale}
                    gradients={lineGrads}>

                </LineChart>

            </div>
        )
    }
}

export default LineChartGroup;