import React, { Component } from 'react';
import { brushX } from 'd3-brush';
import { select } from 'd3-selection';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import './styles/brush_horizontal_styles.css';


class BrushHorizontal extends Component{
    constructor(props){
        super(props);
        this.brushed = this.props.brushed.bind(this)
        this.horizontalBrush = brushX()
            .extent([[0, 0], [this.props.endExtentX, this.props.endExtentY]])
            .on('start brush end', this.brushed)

    }

    brushRef = React.createRef()

    componentDidMount(){
        const horizontalBrush = this.horizontalBrush;
        const touchCentered = this.props.touchCentered.bind(this.brushRef.current);
        const startExtent = this.props.startExtent;
        function referenceBrushForTouch(brush) {
            return () => touchCentered(brush)
        }
        const brushOnTouch = referenceBrushForTouch(horizontalBrush);

        select(this.brushRef.current)
            .call(this.horizontalBrush)
            .call(this.horizontalBrush.move, [startExtent[0], startExtent[1]].map(this.props.xScale))
            .call(g => g.select('.overlay')
            .datum({type: 'selection'})
            .on('mousedown touchstart', brushOnTouch));

        
    }


    render(){
        
        return (
            <g ref={this.brushRef} 
               className="horizontal-brush">
            </g>
        )
    }
}


export default BrushHorizontal;