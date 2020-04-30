import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { min, max } from 'd3-array';
import { interpolateHcl } from 'd3-interpolate';


import { unique, removeParams, filterDataByParams, leftJoinByAttr} from '../helpers/DataHelpers';
import {createLabel} from '../helpers/Helpers';

import './styles/gene_arch_group_styles.css'

import GeneArchitecture from '../charts/GeneArchitecture';
import { create } from 'd3';

class GeneArchGroup extends Component {
    constructor(props){
        super(props);
        this.props.template.forEach((v,i) => v.ind = i);
        this.onBrush = this.onBrush.bind(this);
        this.archLabels = ['arch-1', 'arch-2'];
        this.params = removeParams(this.props.params, ['output_gen', 'pop']);
        this.data = leftJoinByAttr(filterDataByParams(this.props.data, this.params), this.props.template, ['position'], {positional_map: 'ind'}).filter(d => d.pop === 1);
        this.generations = this.props.data.map(d => d.output_gen).filter(unique);
        this.yScale = scaleLinear().domain([min(this.props.template, d => d.ind), max(this.props.template, d => d.ind)]).range([0, 100]);
        this.colorScale = scaleLinear()
            .domain([min(this.props.data, d => d.positional_phen), 0, max(this.props.data, d => d.positional_phen)])
            .range(['#4056a1', '#f1f0eb', '#f13c20'])
            .interpolate(interpolateHcl);
        this.state = {start: 40000, end:44000};
    }

    onBrush(d) {
        this.setState({start: d[0], end: d[1]});  
    }

    render(){
        const start = this.state.start;
        const end = this.state.end;
        const filterData = this.props.data.filter(d => d.output_gen >=start && d.output_gen < end)
        const gradsArch1 = createGradients(this.generations, this.data, this.props.template, this.colorScale, this.yScale, this.archLabels[0])
        const gradsArch2 = createGradients(this.generations, this.data, this.props.template, this.colorScale, this.yScale, this.archLabels[1])
        

        function SingleGradient(props){
            // TODO: I need to speed this up with few joins on the fly. It is slowing down other compoents
        //       Perhaps look into better data joining or lifecyclee methods
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

        function createGradients(generations, data, template, colorScale, yScale, name){
            const gradients = generations
            .map( d => <linearGradient key={`gen-grad-${d}`}
                            gradientUnits='userSpaceOnUse'
                            id={createLabel('gen-grad', name, d)}
                            // id={`gen-grad-${d}`}
                            x1={0}
                            x2={0}
                            y1={0}
                            y2={100}>
                <SingleGradient data={data} template={template} gen={d} colorScale={colorScale} yScale={yScale}>
                </SingleGradient>
            </linearGradient>)

            return gradients

        }

        return(
            <div>
                <GeneArchitecture key="gene-arch-1" 
                          data={filterData}
                          template={this.props.template}
                          params={this.props.params}
                          height={100}
                          width={200}
                          uniqId={this.archLabels[0]}
                          changeBrush={this.onBrush}
                          addBrush={false}
                          gradients={gradsArch1}></GeneArchitecture>
                <GeneArchitecture key="gene-arch-2" 
                          data={this.props.data}
                          template={this.props.template}
                          params={this.props.params}
                          height={100}
                          width={800}
                          uniqId={this.archLabels[1]}
                          changeBrush={this.onBrush}
                          addBrush={true}
                          gradients={gradsArch2}>
                          </GeneArchitecture>
            </div>
        )
    }
}

export default GeneArchGroup;