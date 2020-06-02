import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { min, max } from 'd3-array';
import { interpolateHcl } from 'd3-interpolate';
import { toNumber } from 'lodash'

import { unique, removeParams, filterDataByParams, leftJoinByAttr, findUniqParamOptions} from '../helpers/DataHelpers';
import {createLabel} from '../helpers/Helpers';
import ParameterCollection from './ParameterCollection';

import './styles/gene_arch_group_styles.css'

import GeneArchitecture from '../charts/GeneArchitecture';

class GeneArchGroup extends Component {
    constructor(props){
        super(props);
        this.props.template.forEach((v,i) => v.ind = i);
        this.onBrush = this.onBrush.bind(this);
        this.archLabels = ['arch-1', 'arch-2'];
        this.chartWidths = [1000, 800];
        this.chartHeights = [500, 200];
        // this.params = removeParams(this.props.params, ['output_gen']);
        this.generations = this.props.data.map(d => d.output_gen).filter(unique);
        this.yScale = scaleLinear().domain([min(this.props.template, d => d.ind), max(this.props.template, d => d.ind)]).range([0, 100]);
        this.colorScale = scaleLinear()
            .domain([min(this.props.data, d => d.positional_phen), 0, max(this.props.data, d => d.positional_phen)])
            .range(['#569dcf', '#f5f5e6', '#fd1743'])
            .interpolate(interpolateHcl);
        this.state = {start: 1000, end: 10000, params: {...removeParams(this.props.params, ['output_gen'])}};
    }

    onBrush(d) {
        this.setState({start: d[0], end: d[1]});  
    }

    componentDidUpdate(){

    }

    render(){
        const start = this.state.start;
        const end = this.state.end;
        const params = this.props.useLocalParams ? this.state.params : removeParams(this.props.params, ['output_gen']);
        const paramObj = {population: 'pop', migration: 'm', mutation: 'mu', recombination: 'r', selection: 'sigsqr', generation: 'output_gen'};
        const data = leftJoinByAttr(filterDataByParams(this.props.data, params), this.props.template, ['position'], {positional_map: 'ind'});
        const filterData = this.props.data.filter(d => d.output_gen >= start && d.output_gen < end)
        const gradsArch1 = createGradients(this.generations, data, this.props.template, this.colorScale, this.yScale, this.chartHeights[0], createLabel(this.archLabels[0], this.props.identifier))
        const gradsArch2 = createGradients(this.generations, data, this.props.template, this.colorScale, this.yScale, this.chartHeights[1], createLabel(this.archLabels[1], this.props.identifier))
        const paramMatrix = findUniqParamOptions(this.props.data, ['pop', 'm', 'mu', 'r', 'sigsqr']).map(d => {
            d.pop = toNumber(d.pop)
            return d;
        });
        



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

        function createGradients(generations, data, template, colorScale, yScale, height, name){
            const gradients = generations
                .map( d => <linearGradient key={`gen-grad-${d}`}
                            gradientUnits='userSpaceOnUse'
                            id={createLabel('gen-grad', name, d)}
                            x1={0}
                            x2={0}
                            y1={0}
                            y2={height}>
                <SingleGradient data={data} template={template} gen={d} colorScale={colorScale} yScale={yScale}>
                </SingleGradient>
            </linearGradient>)

            return gradients
        }

        let paramFunctions = {}
        Object.keys(paramObj).map(k => {
            paramFunctions[k] = (d) => this.setState(prevState => ({
                params: {
                    ...prevState.params,
                    [paramObj[k]] : d
                }

            }))
            return paramFunctions;
        })

        let paramBar;
        if(this.props.useLocalParams){
            paramBar =  <ParameterCollection data={paramMatrix}
                            labels={{population: 'pop', migration: 'm', mutation: 'mu', recombination: 'r', selection: 'sigsqr'}}
                            initParams={params}
                            paramFunc={paramFunctions}>
                        </ParameterCollection>
        }

        return(
            <div className="gene-arch-group">
                {paramBar}
                <GeneArchitecture key="gene-arch-1" 
                          data={filterData}
                          startExtent={[this.state.start, this.state.end]}
                          template={this.props.template}
                          params={this.props.params}
                          height={this.chartHeights[0]}
                          width={this.chartWidths[0]}
                          svgHeight={59}
                          uniqId={createLabel(this.archLabels[0], this.props.identifier)}
                          changeBrush={this.onBrush}
                          addBrush={false}
                          gradients={gradsArch1}></GeneArchitecture>
                <GeneArchitecture key="gene-arch-2" 
                          data={this.props.data}
                          startExtent={[this.state.start, this.state.end]}
                          template={this.props.template}
                          params={this.props.params}
                          height={this.chartHeights[1]}
                          width={this.chartWidths[1]}
                          svgHeight={19}
                          uniqId={createLabel(this.archLabels[1], this.props.identifier)}
                          changeBrush={this.onBrush}
                          addBrush={true}
                          gradients={gradsArch2}>
                </GeneArchitecture>
            </div>
        )
    }
}

export default GeneArchGroup;