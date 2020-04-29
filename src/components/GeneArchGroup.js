import React, { Component } from 'react';
import { unique, removeParams, filterDataByParams, leftJoinByAttr} from '../helpers/DataHelpers';

import './styles/gene_arch_group_styles.css'

import GeneArchitecture from '../charts/GeneArchitecture';

class GeneArchGroup extends Component {
    constructor(props){
        super(props);
        this.onBrush = this.onBrush.bind(this);
        this.params = removeParams(this.props.params, ['output_gen', 'pop']);

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
        const filterData = this.props.data.filter(d => d.output_gen >=start && d.output_gen <= end)
        return(
            <div>
                <GeneArchitecture key="gene-arch-1" 
                          data={filterData}
                          template={this.props.template}
                          params={this.props.params}
                          height={100}
                          width={200}
                          uniqId={'arch-1'}
                          changeBrush={this.onBrush}
                          addBrush={false}></GeneArchitecture>
                <GeneArchitecture key="gene-arch-2" 
                          data={this.props.data}
                          template={this.props.template}
                          params={this.props.params}
                          height={100}
                          width={800}
                          uniqId={'arch-2'}
                          changeBrush={this.onBrush}
                          addBrush={true}></GeneArchitecture>
            </div>
        )
    }
}

export default GeneArchGroup;