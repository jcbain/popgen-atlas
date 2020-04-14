import React, { Component } from 'react';
import { select } from 'd3-selection';

import { removeParams, filterDataByParams, leftJoinByAttr} from '../helpers/DataHelpers';


class GeneArchitecture extends Component {
    constructor(props){
        super(props);
        this.params = removeParams(this.props.params, ['output_gen', 'pop']);
        this.filteredData = filterDataByParams(this.props.data, this.params)
        this.genWidth = 5;


    }

    componentDidMount(){
        console.log(this)
        this.props.template.forEach((v,i) => v.ind = i);
        // this.filteredData.forEach(d => {
        //     let result = this.props.template.filter(v => {
        //         return v.position === d.position
        //     })
        //     d.position_map = (result[0] !== undefined) ? result[0].ind : null;
        // })
        // console.log(this.filteredData)
        let dat = leftJoinByAttr(this.filteredData, this.props.template, ['position'], {positional_map: 'ind'})
        console.log(dat)
    }


    render(){

        return(
            <svg></svg>
        )
    }
}

export default GeneArchitecture;