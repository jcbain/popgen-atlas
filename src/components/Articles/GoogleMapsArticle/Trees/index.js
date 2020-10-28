import React, { useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring'

import SingleTree from './SingleTree';

const ContainerSvg = styled.svg`
    position: sticky;
    top: 0px;
    border: 2px solid black;
`

const GroupedTrees = (props) => {
    const { popOne, popTwo, toggle } = props;
    
    
    const springProps = useSpring({ x: toggle ? popTwo.posX : popOne.posX })

    return (
        <>
            <SingleTree h={popOne.h} w={popOne.w} posX={popOne.posX} posY={popOne.posY} />
            <SingleTree h={popTwo.h} w={popTwo.w} posX={popTwo.posX} posY={popTwo.posY}  />
            <animated.circle cx={springProps.x} cy={popTwo.posY} r={2}/>
        </>
    )
}

const Trees = (props) => {
    const [ toggle, setToggle ] = useState(false)
    const width = 400,
          height = 400;

    const popOne = { h: 20, w: 10, posX: 10, posY: 10 },
          popTwo = { h: 20, w: 10, posX: 375, posY: 10 }

    return (
        <>
            <ContainerSvg width='50%' height='100%' viewBox={[0, 0, width, height]}>
                <GroupedTrees popOne={popOne} popTwo={popTwo} toggle={toggle}/>
                
            </ContainerSvg>
            <button onClick={() => setToggle(prev => !prev)}>Hello</button>
        </>
    )

}

export default Trees;