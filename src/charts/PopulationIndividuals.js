import React, { Component } from 'react';

import { scaleLinear } from 'd3-scale';
import { interpolateHcl } from 'd3-interpolate';
import { easeSinInOut } from 'd3-ease';
import { select, selectAll } from 'd3-selection';
import { min, max } from 'd3-array';
import { nest } from 'd3-collection';

import individualData from '../data/individuals_small';

class PopulationIndividuals extends Component {
    constructor(props){
        super(props);
        this.magnifySize = 20;
        this.genCounts = individualData.map(d => d.pop).filter(unique).map(v => countIndividualsPerGeneration(individualData, v));
        this.populations = individualData.map(d => d.pop).filter(unique);
        this.maxPopVal = maxPerPop(this.genCounts);
        this.minPhen = min(individualData, d => d.ind_phen);
        this.maxPhen = max(individualData, d => d.ind_phen);
        this.phenRange = [this.minPhen, this.maxPhen];
        this.colorScale = scaleLinear()
            .domain([this.minPhen, 0, this.maxPhen])
            .range(['#4056a1', '#f1f0eb', '#f13c20'])
            .interpolate(interpolateHcl)
    }

    popRef = React.createRef();

    createData() {
        const numCols = this.props.numCols;
        let filteredData = individualData.filter(d => d.mu === "1e-6" && d.m === "1e-4" && d.sigsqr === "25" && d.output_gen == 1000)
        let smallest = min(filteredData, d => d.ind_phen);
        let biggest = max(filteredData, d => d.ind_phen);
        let chosenData = [];
        this.populations.map(d => {
          let val = d;
          let popIndexes = new Array(this.maxPopVal[val]);
          [...popIndexes.keys()].map(function(v) {
            let x = {};
            x['pop'] = val;
            let result = filteredData.filter(d => d.pop == val)[v];
            x['ind_phen'] = (result !== undefined) ? result.ind_phen : 0;
            x['biggest'] = (x['ind_phen'] === biggest) ? true : false;
            x['smallest'] = (x['ind_phen'] === smallest) ? true : false;

            chosenData.push(x);
          })
        })

        this.populations.map(d => {
            let shifter = d * numCols;
            let currentYIndex = 1;
            let currentXIndex = 0;
            chosenData.filter(v => v.pop == d).forEach(function(r, i){
              if((i + 1)/(numCols) >= currentYIndex) {
                r['y'] = currentYIndex - 1;
                currentYIndex++
              } else {
                r['y'] = currentYIndex - 1;
              }
              if((i + 1) % (numCols) === 0){
                r['x'] = currentXIndex + shifter;
                currentXIndex = 0
              } else {
                r['x'] = currentXIndex + shifter;
                currentXIndex++;
              }
            })
          })
          return chosenData;
    }

    componentDidMount(){

        console.log(this.createData())

        select(this.popRef.current)
            .selectAll('.pop_rects')
            .data(this.createData())
            .enter()
            .append('rect')
            .attr('class', 'pop_rects')
            .attr('x', (d, i) => {
                return ((d.x * (this.props.paddingBetweenIndividuals)) * this.props.squareSize) +d.pop * this.props.marginBetweenPops;
            })
            .attr('y', d => d.y * this.props.squareSize)
            .attr('rx', 2)
            .attr('ry', 2)
            .attr('height', this.props.squareSize)
            .attr('width', this.props.squareSize)
            // .attr('fill', d => this.colorScale(d.ind_phen))
            .attr('fill', this.colorScale(0))


    }

    componentDidUpdate(){
        console.log('updated')
        select(this.popRef.current)
        .selectAll('.pop_rects')
        .data(this.createData())
        .enter()
        .append('rect')
        .attr('class', 'pop_rects')
        .transition(easeSinInOut)
        .duration(2000)
        .attr('x', (d, i) => {
            return ((d.x * (this.props.paddingBetweenIndividuals)) * this.props.squareSize) +d.pop * this.props.marginBetweenPops;
        })
        .attr('y', d => d.y * this.props.squareSize)
        .attr('rx', 2)
        .attr('ry', 2)
        .attr('height', this.props.squareSize)
        .attr('width', this.props.squareSize)
        .attr('fill', d => this.colorScale(d.ind_phen))

    }
    
    render(){
        return(
            <svg viewBox={[0, 0,
                           (this.props.squareSize * this.props.numCols * this.props.paddingBetweenIndividuals * 2) - this.props.paddingBetweenIndividuals + this.props.marginBetweenPops,
                           ((max(Object.values(this.maxPopVal))/ this.props.numCols) * this.props.paddingBetweenIndividuals * this.props.squareSize) + 100]
                        }
                 preserveAspectRatio="xMinYMid meet" 
                 ref={this.popRef}
                 className="pop-graphic">
                 </svg>
        )
    }



}

const countIndividualsPerGeneration = (data, val) => nest()
    .key( d => [d.output_gen, d.pop, d.m, d.mu, d.r, d.sigsqr])
    .rollup( v => v.length)
    .entries(data.filter(r => r.pop === val));

const unique = (value, index, self) => {
    return self.indexOf(value) === index;
}

const maxPerPop = (data) => {
    let maxPop = {};
  
    Object.keys(data).map((key, i) => {
      maxPop[key] = max(data[key], d => d.value);
    })
    return maxPop;
  }

export default PopulationIndividuals;