import React, { Component } from 'react';
import { nest } from 'd3-collection';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { min, max } from 'd3-array';
import { toNumber } from 'lodash'
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';



import { removeParams, filterDataByParams, unique, findUniqParamOptions, filterDataByMultipleOptsWithinSingleParam } from '../helpers/DataHelpers';
import {createLabel} from '../helpers/Helpers';
import ParameterCollection from './ParameterCollection';

import LineChart from '../charts/LineChart';

const ChartDiv = styled.div`
    width: ${props => props.displaywidth}vw;
    height: ${props => props.displayheight}vh;
`

class LineChartGroup extends Component{
    constructor(props){
        super(props);
        this.params = removeParams(this.props.params, ['output_gen', 'pop']) 
        this.onBrush = this.onBrush.bind(this);
        this.changeParamOption = this.changeParamOption.bind(this);
        this.viewScaleHeight = scaleLinear().domain([0, 100]).range([0, 1350])
        this.viewScaleWidth = scaleLinear().domain([0, 100]).range([0, 3000])
        this.generations = filterDataByParams(this.props.data, this.params).map(d => d.output_gen).filter(unique);
        this.lineLabels = [`line-${uuidv4()}`, `line-${uuidv4()}`]
        this.startExtent = [1000, 10000];
        this.chartWidths = [this.viewScaleWidth(this.props.displayDims.width), this.viewScaleWidth(this.props.displayDims.width)];
        this.chartHeights = [this.viewScaleHeight(this.props.displayDims.height * (7/9)), this.viewScaleHeight(this.props.displayDims.height * (2/9))];
        this.popStrokeWidths = [12, 5.5]
        this.state = {start: this.startExtent[0], end: this.startExtent[1], params: {...this.params}}

    }


    onBrush(d) {
        this.setState({start: d[0], end: d[1]});  
    }

    changeParamOption(name, val){
        this.setState(prevState => ({
            params: {
                ...prevState.params, [name]: val
            }
        }))
    }


    render(){
        const yDomain = [max(this.props.data, d => d.pop_phen),min(this.props.data, d => d.pop_phen)]
        let xScale = scaleLinear();
        let yScale = scaleLinear().domain(yDomain);
        const paramObj = {migration: 'm', mutation: 'mu', recombination: 'r', selection: 'sigsqr', generation: 'output_gen'};
        const paramMatrix = findUniqParamOptions(this.props.data, ['m', 'mu', 'r', 'sigsqr']).map(d => {
            d.pop = toNumber(d.pop)
            return d;
        })
        const specialParamOpts = (this.props.specialOpts !== undefined) ? this.props.specialOpts : undefined;
        console.log(specialParamOpts)
        const staticFilterData = (specialParamOpts !== undefined) ? filterDataByMultipleOptsWithinSingleParam(this.props.data, specialParamOpts) : this.props.data
        const params = this.props.useLocalParams ? this.state.params : removeParams(this.props.params, ['output_gen', 'pop']);
        const data = nest().key(d => d.pop).entries(filterDataByParams(staticFilterData.map(d =>{
            d.pop = toNumber(d.pop);
            return d;
        }), params));
        const popKeys = data.map( d => d.key );
        const brushScale = scaleLinear().domain([min(this.generations), max(this.generations)]).range([0,100])
        const focusColor = scaleOrdinal().domain(popKeys).range(['#E27D60', '#C38D9E', '#E8A87C']);
        const outsideColor = scaleOrdinal().domain(popKeys).range(['#dbd9d9', '#dbd9d9', '#dbd9d9']);
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


        let paramBar;
        if(this.props.useLocalParams){
            paramBar =  <ParameterCollection data={paramMatrix}
                            labels={{migration: 'm', mutation: 'mu', recombination: 'r', selection: 'sigsqr'}}
                            initParams={this.params}
                            gridArea={this.gridArea}
                            paramFunc={this.changeParamOption}>
                        </ParameterCollection>
        }
        
        return(
            <ChartDiv className="line-group"
                displaywidth={this.props.displayDims.width}
                displayheight={this.props.displayDims.height}>
                {paramBar}
                <LineChart key='line-chart-1'
                    className={createLabel(this.props.className, 'focus-chart')}
                    data={data}
                    width={this.chartWidths[0]}
                    height={this.chartHeights[0]}
                    uniqId={this.lineLabels[0]}
                    displayDims={{width: this.props.displayDims.width, height: (this.props.displayDims.height * (4/5)) }}
                    generations={this.generations}
                    xDomain={[this.state.start, this.state.end]}
                    yDomain={yDomain}
                    xScale={xScale}
                    yScale={yScale}
                    changeBrush={this.onBrush}
                    addBrush={false}
                    brushScale = {brushScale}
                    startExtent = {this.startExtent}
                    gradients={lineGrads1}
                    includeYAxisLabels={true}
                    popStrokeWidth={this.popStrokeWidths[0]}>
                </LineChart>
                <LineChart key='line-chart-2'
                    className={createLabel(this.props.className, 'context-chart')}
                    data={data}
                    width={this.chartWidths[1]}
                    height={this.chartHeights[1]}
                    uniqId={this.lineLabels[1]}
                    displayDims={{width: this.props.displayDims.width, height: (this.props.displayDims.height * (1/5))}}
                    generations={this.generations}
                    xDomain={[min(this.generations), max(this.generations)]}
                    yDomain={yDomain}
                    xScale={xScale}
                    yScale={yScale}
                    changeBrush={this.onBrush}
                    addBrush={true}
                    brushScale = {brushScale}
                    startExtent = {this.startExtent}
                    gradients={lineGrads2}
                    includeYAxisLabels={false}
                    popStrokeWidth={this.popStrokeWidths[1]}>
                </LineChart>

            </ChartDiv>
        )
    }
}

export default LineChartGroup;