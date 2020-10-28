import React from 'react';
import styled from 'styled-components';

const TreeSVG = styled.rect`
    fill: ${({ color }) =>  color};
    opacity: ${({ opac }) => opac};
`

const Tree = (props) => {
    const { posX, posY, h, w, opac, color } = props;

    return (
        <TreeSVG x={posX} y={posY} height={h} width={w} color={color} opac={opac}/>
    )
}

export default Tree;