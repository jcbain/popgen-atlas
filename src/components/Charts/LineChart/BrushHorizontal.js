import React, { useRef, useEffect } from 'react';
import { brushX } from 'd3-brush';
import { scaleLinear } from 'd3-scale';
import { select, selectAll, event, mouse } from 'd3-selection';
import styled from 'styled-components';

const StyledG = styled.g`
    .selection {
        stroke: none;
        fill: #d1d1d1;
    }
    .handle {
        fill: ${props => props.theme.handlecolor};
        width: 4px;
    }
`

StyledG.defaultProps = {
    theme: {
        handlecolor: '#b5b5b5'
    }
}


function BrushHorizontal(props) {

    const { x1, x2, y1, y2, interval, xScale, getDomain} = props;
    const [ minX, maxX ]= xScale.domain();
    const brushRef = useRef(null);

    let horizontalBrush = brushX()
        .extent([[x1, y1], [x2, y2]])
        .on('start brush end', brushed)

    function brushed() {
        const selection = event.selection;
        if (!event.sourceEvent || !selection) return;
        if ( selection !== null ) {
            const [x0, x1] = selection.map(d => interval(xScale.invert(d)));
            select(brushRef.current).transition().duration(1).call(horizontalBrush.move, x1 > x0 ? [x0, x1].map(xScale) : null);
            getDomain([x0, x1])
        }
    }

    function centerBrushOnTouch(){
        const dx = xScale(5000);
        const [cx] = mouse(this);
        const [x0, x1] = [cx - dx / 2, cx + dx / 2].map(d => interval(xScale.invert(d)));
        select(brushRef.current)
            .call(horizontalBrush.move, x1 > maxX ? [maxX - dx, maxX].map(xScale) 
                : x0 < minX ? [minX, minX + dx].map(xScale) 
                : [x0, x1].map(xScale));
    }

    useEffect(() => {
        select(brushRef.current)
            .call(horizontalBrush)
            .call(horizontalBrush.move, [minX, maxX].map(xScale))
            .call(g => g.select('.overlay')
            .datum({type: 'selection'})
            .on('mousedown touchstart', centerBrushOnTouch));

    }, [])

    return (
        <StyledG ref={brushRef}>

        </StyledG>
    )

}

BrushHorizontal.defaultProps = {
    brushed: () => console.log('this needs a brushing function')
}

export default BrushHorizontal;