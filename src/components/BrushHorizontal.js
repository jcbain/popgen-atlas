import React, { Component } from 'react';
import { brushX } from 'd3-brush';
import { select } from 'd3-selection';

import './styles/brush_generic_styles.css';


class BrushHorizontal extends Component{
    constructor(props){
        super(props);
        this.brushed = this.props.brushed.bind(this)
        this.genericBrush = brushX()
            .extent([[0, 0], [this.props.endExtentX, this.props.endExtentY]])
            .on('brush', this.brushed)

    }

    brushRef = React.createRef()

    componentDidMount(){
        const genericBrush = this.genericBrush;
        const touchCentered = this.props.touchCentered.bind(this.brushRef.current);
        const startExtent = this.props.startExtent;
        function referenceBrushForTouch(brush) {
            return () => touchCentered(brush)
        }
        const brushOnTouch = referenceBrushForTouch(genericBrush);

        select(this.brushRef.current)
            .call(this.genericBrush)
            .call(this.genericBrush.move, [startExtent[0], startExtent[1]].map(this.props.xScale))
            .call(g => g.select('.overlay')
            .datum({type: 'selection'})
            .on('mousedown touchstart', brushOnTouch));
    }


    render(){
        
        return (
            <g ref={this.brushRef} 
               className="generic-brush">
            </g>
        )
    }
}


export default BrushHorizontal;