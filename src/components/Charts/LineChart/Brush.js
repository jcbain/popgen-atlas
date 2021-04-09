import React, { useRef, useEffect } from 'react';
import { brushX } from 'd3-brush';
import { select } from 'd3-selection';
import styled from 'styled-components';

const StyledG = styled.g`
    .selection {
        stroke: none;
        fill: #d1d1d1;
    }
    .handle {
        fill: black;
        width: 4px;
    }
`


const Brush = ({ width, height, xScale, setUpperLimit, setLowerLimit, brushClickRange }) => {

    const brushRef = useRef(null);

    let horizontalBrush = brushX()
        .on('start brush end', brushed)

    function brushed(e) {
        const { selection } = e;
 
        if ( !e.sourceEvent || !selection ) return;
        if (selection !== null ) {
            const [ x0, x1 ] = selection.map(d => xScale.invert(d))
            setUpperLimit(x1)
            setLowerLimit(x0)
            select(brushRef.current).transition().duration(0).call(horizontalBrush.move, x1 > x0 ? [x0, x1].map(xScale) : null);

        }
  
    }

    function centerBrushOnTouch(e) {
        const minX = xScale.range()[0];
        const maxX = width;
        const { clientX } = e;
        const offset = e.target.getBoundingClientRect().left

        const position = clientX - offset;
       
        const dx = xScale(brushClickRange)
        const [x0, x1] = [position - dx / 2, position + dx / 2].map(d => xScale(xScale.invert(d)));
        select(brushRef.current)
            .call(horizontalBrush.move, x1 > maxX ? [x0, maxX]
                    : x0 < minX ? [minX, x1]
                    : [x0, x1] 
                )
    }

 

    useEffect(() => {
        select(brushRef.current)
            .call(horizontalBrush.extent([[xScale.range()[0], 0], [width, height]]))
            .call(horizontalBrush.move, [xScale.range()[0], width])
            .call(g => g.select('.overlay')
                .datum({ type: 'selection' })
                .on('mousedown touchstart', centerBrushOnTouch))
    }, [width, height])


    return (
        <StyledG ref={brushRef} />
    )

}


export default Brush;