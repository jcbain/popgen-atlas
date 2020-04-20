import React, { Component } from 'react';
import { brushX } from 'd3-brush';
import { select } from 'd3-selection';


class BrushGeneric extends Component{
    brushRef = React.createRef()
    componentDidMount(){
        const genericBrush = brushX()
            .extent([[0, 0], [100, 100]])

        select(this.brushRef.current)
            .call(genericBrush)
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