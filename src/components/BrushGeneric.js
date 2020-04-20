import React, { Component } from 'react';
import { brushX } from 'd3-brush';
import { select } from 'd3-selection';


class BrushGeneric extends Component{
    constructor(props){
        super(props);
        this.brushed = this.props.brushed.bind(this)
    }

    brushRef = React.createRef()

    componentDidMount(){
        const brushFn = this.props.callBrush;
        const genericBrush = brushX()
            .extent([[0, 0], [this.props.endExtentX, this.props.endExtentY]])
            .on('brush', this.brushed)

        brushFn(genericBrush)
        console.log(brushFn)

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