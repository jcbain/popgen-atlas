import React, { Component } from 'react';
import { brushX } from 'd3-brush';
import { select } from 'd3-selection';

import './styles/brush_generic_styles.css';


class BrushGeneric extends Component{
    constructor(props){
        super(props);
        this.brushed = this.props.brushed.bind(this)
        this.genericBrush = brushX()
            .extent([[0, 0], [this.props.endExtentX, this.props.endExtentY]])
            .on('brush', this.brushed)

    }

    brushRef = React.createRef()

    componentDidMount(){
        // const genericBrush = brushX()
        //     .extent([[0, 0], [this.props.endExtentX, this.props.endExtentY]])
        //     .on('brush', this.brushed)



        select(this.brushRef.current)
            .call(this.genericBrush)
            
    }


    render(){
        
        return (
            <g ref={this.brushRef} 
               className="generic-brush">
               </g>
        )
    }
}


export default BrushGeneric;