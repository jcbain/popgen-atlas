import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { min, max, histogram } from 'd3-array';
import { select, selectAll } from 'd3-selection';


class Histogram extends Component {
    constructor(props){
        super(props);
        this.xScale = scaleLinear()
            .domain([
                min(this.props.data, d => d.ind_phen),
                max(this.props.data, d => d.ind_phen)
            ])
            .range([0, 200])
    }
    
    histRef = React.createRef();

    componentDidMount(){
        let hist = histogram()
            .value(d => d.ind_phen)
            .domain(this.xScale.domain())
            .thresholds(this.xScale.ticks(30));

        let bins = hist(this.props.data.map(d => d.ind_phen));

        let yScale = scaleLinear()
            .range([200, 0])
            .domain([0, max(bins, d => d.length)]);

        console.log(bins)
        console.log(select(this.histRef.current))

        select(this.histRef.current)
            .selectAll('.hist-bins')
            .data(bins)
            .enter()
            .append('rect')
            .attr('x', 1)
            .attr('transform', d => `translate(${this.xScale(d.x0)}, ${yScale(d.length)})`)
            .attr('width', d => this.xScale(d.x1) - this.xScale(d.x0) - 1)
            .attr('height', d => 200 - yScale(d.length))
            .attr('fill', '#69b3a2')


    }

    render(){
        return(
        <svg viewBox={[0, 0, 200, 200]}
             preserveAspectRatio="xMidYMid Meet"
             ref={this.histRef}>

        </svg>
        )
    }
}

export default Histogram;
