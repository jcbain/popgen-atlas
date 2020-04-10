import React, { Component } from 'react';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { min, max, histogram } from 'd3-array';
import { select } from 'd3-selection';

import { unique } from '../helpers/DataHelpers';


class Histogram extends Component {
    constructor(props){
        super(props);
        this.xScale = scaleLinear()
            .domain([
                min(this.props.data, d => d.ind_phen),
                max(this.props.data, d => d.ind_phen)
            ])
            .range([0, 200]);

        this.focusColor = scaleOrdinal()
            .domain([0,1,2])
            .range(['#E27D60', '#C38D9E', '#E8A87C']);
    }
    
    histRef = React.createRef();

    componentDidMount(){
        let hist = histogram()
            .value(d => d.ind_phen)
            .domain(this.xScale.domain())
            .thresholds(this.xScale.ticks(30));

        // let bins = hist(this.props.data);
        let binGroups = [];
        this.props.data.map(d => d.pop).filter(unique).forEach(d => {
            binGroups.push(hist(this.props.data.filter(v => v.pop === d)))
        })

        let yScale = scaleLinear()
            .range([200, 0])
            // .domain([0, max(bins, d => d.length)]);
            .domain([0, 1000]) // because there are 1000 individuals

        let graph = select(this.histRef.current)    

        // console.log(binGroups)
        binGroups.forEach((d, i) => {
            graph
                .selectAll(`.bins-${i}`)
                .data(d)
                .enter()
                .append('rect')
                .attr('x', 1)
                .attr('transform', v => `translate(${this.xScale(v.x0)}, ${yScale(v.length)})`)
                .attr('width', v => this.xScale(v.x1) - this.xScale(v.x0) - 1)
                .attr('height', v => 200 - yScale(v.length))
                .attr('fill', this.focusColor(i))
                .attr('opacity', 0.6)
        })

        // select(this.histRef.current)
        //     .selectAll('.hist-bins')
        //     .data(bins)
        //     .enter()
        //     .append('rect')
        //     .attr('x', 1)
        //     .attr('transform', d => `translate(${this.xScale(d.x0)}, ${yScale(d.length)})`)
        //     .attr('width', d => this.xScale(d.x1) - this.xScale(d.x0) - 1)
        //     .attr('height', d => 200 - yScale(d.length))
        //     .attr('fill', '#69b3a2')


    }

    render(){
        return(
        <svg viewBox={[0, 0, 200, 200]}
             ref={this.histRef}>

        </svg>
        )
    }
}


export default Histogram;
