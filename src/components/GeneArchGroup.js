import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { min, max } from 'd3-array';
import { interpolateHcl } from 'd3-interpolate';


import { unique, removeParams, filterDataByParams, leftJoinByAttr} from '../helpers/DataHelpers';
import {createLabel} from '../helpers/Helpers';

import './styles/gene_arch_group_styles.css'

import GeneArchitecture from '../charts/GeneArchitecture';

class GeneArchGroup extends Component {
    constructor(props){
        super(props);
        this.props.template.forEach((v,i) => v.ind = i);

        this.onBrush = this.onBrush.bind(this);
        this.params = removeParams(this.props.params, ['output_gen', 'pop']);
        this.data = leftJoinByAttr(filterDataByParams(this.props.data, this.params), this.props.template, ['position'], {positional_map: 'ind'}).filter(d => d.pop === 1)
        this.generations = this.props.data.map(d => d.output_gen).filter(unique);
        this.yScale = scaleLinear().domain([min(this.props.template, d => d.ind), max(this.props.template, d => d.ind)]).range([0, 100])
        this.colorScale = scaleLinear()
        .domain([min(this.props.data, d => d.positional_phen), 0, max(this.props.data, d => d.positional_phen)])
            .range(['#4056a1', '#f1f0eb', '#f13c20'])
            .interpolate(interpolateHcl);
        this.state = {start: 40000, end:44000}
    }

    onBrush(d) {
        this.setState({start: d[0], end: d[1]})
        console.log(this.state)
  
    }

    render(){
        console.log(this.data)
        const start = this.state.start;
        const end = this.state.end;
        const filterData = this.props.data.filter(d => d.output_gen >=start && d.output_gen < end)

        function SingleGradient(props){
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

        const gradients = this.generations
        // TODO: I need to speed this up with few joins on the fly. It is slowing down other compoents
        //       Perhaps look into better data joining or lifecyclee methods
            .map( d => <linearGradient key={`gen-grad-${d}`}
                            gradientUnits='userSpaceOnUse'
                            id={createLabel('gen-grad', 'arch-2', d)}
                            // id={`gen-grad-${d}`}
                            x1={0}
                            x2={0}
                            y1={0}
                            y2={100}>
                <SingleGradient data={this.data} template={this.props.template} gen={d} colorScale={this.colorScale} yScale={this.yScale}>
                </SingleGradient>
            </linearGradient>)

        
const gradients2 = this.generations
// TODO: I need to speed this up with few joins on the fly. It is slowing down other compoents
//       Perhaps look into better data joining or lifecyclee methods
    .map( d => <linearGradient key={`gen-grad-${d}`}
                    gradientUnits='userSpaceOnUse'
                    id={createLabel('gen-grad', 'arch-1', d)}
                    // id={`gen-grad-${d}`}
                    x1={0}
                    x2={0}
                    y1={0}
                    y2={100}>
        <SingleGradient data={this.data} template={this.props.template} gen={d} colorScale={this.colorScale} yScale={this.yScale}>
        </SingleGradient>
    </linearGradient>)


        return(
            <div>
                {/* {gradients} */}
                <GeneArchitecture key="gene-arch-1" 
                          data={filterData}
                          template={this.props.template}
                          params={this.props.params}
                          height={100}
                          width={200}
                          uniqId={'arch-1'}
                          changeBrush={this.onBrush}
                          addBrush={false}
                          gradients={gradients2}></GeneArchitecture>
                <GeneArchitecture key="gene-arch-2" 
                          data={this.props.data}
                          template={this.props.template}
                          params={this.props.params}
                          height={100}
                          width={800}
                          uniqId={'arch-2'}
                          changeBrush={this.onBrush}
                          addBrush={true}
                          gradients={gradients}>
                          </GeneArchitecture>
            </div>
        )
    }
}

export default GeneArchGroup;