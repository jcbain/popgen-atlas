import React, { Component } from 'react';
import { brushX } from 'd3-brush';
import { select, mouse } from 'd3-selection';

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
        const xScale = this.props.xScale;
        const interval = this.props.interval;
        const genericBrush = this.genericBrush;

        select(this.brushRef.current)
            .call(this.genericBrush)
            .call(this.genericBrush.move, [1000, 3000].map(this.props.xScale))
            .call(g => g.select('.overlay')
            .datum({type: 'selection'})
            .on('mousedown touchstart', centerBrushOnTouch))
        console.log(this.genericBrush)
        console.log(this.brushRef.current)

        function centerBrushOnTouch(){
            // perhaps move this out but need to figure out how to reference generic brush
            const dx = xScale(2000)
            console.log(this)
            const [cx] = mouse(this);
            let [x0, x1] = [cx - dx / 2, cx + dx / 2].map(d => interval(xScale.invert(d)));
            let [X0, X1] = xScale.domain();
            
            select(this.parentNode)
                .call(genericBrush.move, x1 > X1 ? [X1 - dx, X1].map(xScale) 
                    : x0 < X0 ? [X0, X0 + dx].map(xScale) 
                    : [x0, x1].map(xScale));
        }
        // select(this.brushRef.current)
        //     .call(g => g.select('.overlay')
        //         .datum({type: 'selection'})
        //         .on('mousedown touchstart', newFunc))
    

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