import React, { Component } from 'react';
import { nest } from 'd3-collection';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { min, max } from 'd3-array';
import { toNumber } from 'lodash'


import { removeParams, filterDataByParams, unique, findUniqParamOptions, filterDataByMultipleOptsWithinSingleParam } from '../helpers/DataHelpers';
import {createLabel} from '../helpers/Helpers';
import ParameterCollection from './ParameterCollection';

import LineChart from '../charts/LineChart';

class LineChartGroup extends Component{
    constructor(props){
        super(props);
        this.params = removeParams(this.props.params, ['output_gen', 'pop']) 
        this.onBrush = this.onBrush.bind(this);
        this.generations = filterDataByParams(this.props.data, this.params).map(d => d.output_gen).filter(unique);
        this.lineLabels = ['line-1', 'line-2']
        this.startExtent = [1000, 10000]
        this.chartWidths = [1000, 1000]
        this.state = {start: this.startExtent[0], end: this.startExtent[1], params: {...this.params},
            height: window.innerHeight, width: window.innerWidth}

    }


    onBrush(d) {
        this.setState({start: d[0], end: d[1]});  
    }

    updateWidthAndHeight = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateWidthAndHeight);
    }
      
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWidthAndHeight);
    }



    render(){
        let xScale = scaleLinear();
        let yScale = scaleLinear().domain([min(this.props.data, d => d.pop_phen), max(this.props.data, d => d.pop_phen)]);
        const paramObj = {migration: 'm', mutation: 'mu', recombination: 'r', selection: 'sigsqr', generation: 'output_gen'};
        const paramMatrix = findUniqParamOptions(this.props.data, ['m', 'mu', 'r', 'sigsqr']).map(d => {
            d.pop = toNumber(d.pop)
            return d;
        })
        const specialParamOpts = (this.props.specialOpts !== undefined) ? this.props.specialOpts : undefined;
        const staticFilterData = (specialParamOpts !== undefined) ? filterDataByMultipleOptsWithinSingleParam(this.props.data, specialParamOpts) : this.props.data
        const params = this.props.useLocalParams ? this.state.params : removeParams(this.props.params, ['output_gen', 'pop']);
        const data = nest().key(d => d.pop).entries(filterDataByParams(staticFilterData.map(d =>{
            d.pop = toNumber(d.pop);
            return d;
        }), params));
        const popKeys = data.map( d => d.key );
        const brushScale = scaleLinear().domain([min(this.generations), max(this.generations)]).range([0,100])
        const focusColor = scaleOrdinal().domain(popKeys).range(['#E27D60', '#C38D9E', '#E8A87C']);
        const outsideColor = scaleOrdinal().domain(popKeys).range(['#f0b7a8', '#d9bac4', '#E8A87C']);
        const lineGrads1 = createGradients(popKeys, this.chartWidths[0], this.lineLabels[0], [min(this.generations), max(this.generations)])
        const lineGrads2 = createGradients(popKeys, this.chartWidths[1], this.lineLabels[1], this.startExtent)

        function createGradients(popKeys, width, name, startExtent){
            const gradients = popKeys
                .map(d => <linearGradient key={`line-grad-${d}`}
                    gradientUnits={'userSpaceOnUse'}
                    id={createLabel('gradient-pop', d, name)}
                    x1={0}
                    x2={width}
                    y1={0}
                    y2={0}>
                        <stop stopColor={outsideColor(d)} className={`left ${createLabel(name, 'start01')}`} offset={`${brushScale(startExtent[0])}%`}></stop>
                        <stop stopColor={focusColor(d)} className={`left ${createLabel(name, 'start02')}`} offset={`${brushScale(startExtent[0])}%`}></stop>
                        <stop stopColor={focusColor(d)} className={`right ${createLabel(name, 'end01')}`} offset={`${brushScale(startExtent[1])}%`}></stop>
                        <stop stopColor={outsideColor(d)} className={`right ${createLabel(name, 'end02')}`} offset={`${brushScale(startExtent[1])}%`}></stop>
                </linearGradient>)

            return gradients;
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
                            labels={{migration: 'm', mutation: 'mu', recombination: 'r', selection: 'sigsqr'}}
                            initParams={this.params}
                            paramFunc={paramFunctions}>
                        </ParameterCollection>
        }


        return(
            <div className="line-group" >
                {paramBar}
                <LineChart key='line-chart-1'
                    data={data}
                    width={this.chartWidths[0]}
                    height={600}
                    uniqId={this.lineLabels[0]}
                    generations={this.generations}
                    domain={[this.state.start, this.state.end]}
                    xScale={xScale}
                    yScale={yScale}
                    changeBrush={this.onBrush}
                    addBrush={false}
                    brushScale = {brushScale}
                    startExtent = {this.startExtent}
                    gradients={lineGrads1}>
                </LineChart>
                <LineChart key='line-chart-2'
                    data={data}
                    width={this.chartWidths[1]}
                    height={200}
                    uniqId={this.lineLabels[1]}
                    generations={this.generations}
                    domain={[min(this.generations), max(this.generations)]}
                    xScale={xScale}
                    yScale={yScale}
                    changeBrush={this.onBrush}
                    addBrush={true}
                    brushScale = {brushScale}
                    startExtent = {this.startExtent}
                    gradients={lineGrads2}>
                </LineChart>

            </div>
        )
    }
}

export default LineChartGroup;