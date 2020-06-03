import React, { Component } from 'react';
import { line, arc } from 'd3-shape';
import { select, selectAll, event, mouse, style } from 'd3-selection';
import styled from 'styled-components';


import {closestFromArray, createLabel} from '../helpers/Helpers';
import BrushHorizontal from '../components/BrushHorizontal';
import XAxis from '../components/XAxis';
import YAxis from '../components/YAxis';


class LineChart extends Component {
    constructor(props){
        super(props);
        this.gradients = this.props.gradients;
        this.generations = this.props.generations;
        this.startExtent = this.props.startExtent;
        this.StyledSVG = styled.svg`
            width: 38vw;
            height: ${this.props.svgHeight}vh;
            `
    }

    render(){        
        const uniqId = this.props.uniqId;
        const xScale = this.props.xScale.domain(this.props.xDomain.map(d => d)).range([0, this.props.width]);
        const yScale = this.props.yScale.range([0, this.props.height - 40]);
        const drawLine = line().x(d => xScale(d.output_gen)).y(d => yScale(d.pop_phen))
        const interval = closestFromArray(this.generations)
        const brushScale = this.props.brushScale;
        const brushFn = this.props.changeBrush;
        
        const contextLines = this.props.data
            .map((d, i) => <path
                key={createLabel('context-line', i, uniqId)}
                fill='none'
                strokeWidth={this.props.popStrokeWidth}
                stroke={`url(#${createLabel('gradient-pop', d.key, uniqId)})`}
                className={createLabel('context-line', uniqId)}
                d={drawLine(d.values)}>
            </path>);

        function brushed() {

            const selection = event.selection;
            if (!event.sourceEvent || !selection) return;
            if (selection !== null) {
                const [x0, x1] = selection.map(d => interval(xScale.invert(d)))
                brushFn([x0, x1])
                select(this.brushRef.current).transition().duration(1).call(this.horizontalBrush.move, x1 > x0 ? [x0, x1].map(xScale) : null);
                selectAll(`.${createLabel(uniqId, 'start01')}`).transition().duration(1).attr('offset', `${brushScale(x0)}%`)
                selectAll(`.${createLabel(uniqId, 'start02')}`).transition().duration(1).attr('offset', `${brushScale(x0)}%`)
                selectAll(`.${createLabel(uniqId, 'end01')}`).transition().duration(1).attr('offset', `${brushScale(x1)}%`)
                selectAll(`.${createLabel(uniqId, 'end02')}`).transition().duration(1).attr('offset', `${brushScale(x1)}%`)
            }
        }
   

        function centerBrushOnTouch(brush){
            const dx = xScale(5000);
            const [cx] = mouse(this);
            const [x0, x1] = [cx - dx / 2, cx + dx / 2].map(d => interval(xScale.invert(d)));
            const [X0, X1] = xScale.domain();
            select(this)
                .call(brush.move, x1 > X1 ? [X1 - dx, X1].map(xScale) 
                    : x0 < X0 ? [X0, X0 + dx].map(xScale) 
                    : [x0, x1].map(xScale));
        }

        let brush;
        if(this.props.addBrush){
            brush = <BrushHorizontal endExtentX={this.props.width}
                                endExtentY={this.props.height - 40}
                                startExtent={this.startExtent}
                                brushed={brushed}
                                xScale={xScale}
                                touchCentered={centerBrushOnTouch}>
                    </BrushHorizontal>
        }
        


        

        return(
            <this.StyledSVG className={this.props.className}
                 viewBox={[0,0,this.props.width, this.props.height]}>
                <YAxis domain={this.props.yDomain} scale={yScale} range={[0, this.props.height]} width={this.props.width} includeAxisLine={false} includeLabels={this.props.includeYAxisLabels} fontSize={20}></YAxis>
                {this.gradients}
                {contextLines}
                {brush}
                <XAxis scale={xScale} height={this.props.height - 40} includeAxisLine={false} fontSize={20}></XAxis>
            </this.StyledSVG>
        )
    }
}

export default LineChart;