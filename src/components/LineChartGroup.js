import React, { Component } from 'react';
import { nest } from 'd3-collection';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { min, max } from 'd3-array';


import { removeParams, filterDataByParams} from '../helpers/DataHelpers';

import LineChart from '../charts/LineChart';

class LineChartGroup extends Component{
    constructor(props){
        super(props);
        this.params = removeParams(this.props.params, ['output_gen', 'pop']) 
        this.data = nest().key(d => d.pop).entries(filterDataByParams(this.props.data, this.params));
    }
    render(){
        let xScale = scaleLinear();
        let yScale = scaleLinear().domain([min(this.props.data, d => d.pop_phen), max(this.props.data, d => d.pop_phen)]);
        return(
            <div>
                <LineChart data={this.data}
                    width={400}
                    height={200}
                    domain={[min(this.props.data, d => d.output_gen), max(this.props.data, d => d.output_gen)]}
                    xScale={xScale}
                    yScale={yScale}>

                </LineChart>

            </div>
        )
    }
}

export default LineChartGroup;