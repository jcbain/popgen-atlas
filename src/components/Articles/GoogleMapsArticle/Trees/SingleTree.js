import React from 'react';
import styled from 'styled-components';

const Tree = (props) => {
    const { posX, posY, h, w } = props;

    return (
        <rect x={posX} y={posY} height={h} width={w} />
    )
}

export default Tree;