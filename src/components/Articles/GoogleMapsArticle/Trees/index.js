import React, { useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring'
import { random } from 'lodash'


import SingleTree from './SingleTree';

const ContainerSvg = styled.svg`
    position: sticky;
    top: 0px;
    border: 2px solid black;
`

const GroupedTrees = (props) => {
    const { popOne, popTwo, toggle, transferOne, transferTwo } = props;

    const newPosXOne = transferOne ? popTwo.posX : random(0, 199),
          newPosYOne = transferOne ? popTwo.posY : random(0, 400),
          newPosXTwo = transferTwo ? popOne.posX : random(200, 400),
          newPosYTwo = transferTwo ? popOne.posY : random(0, 400);
    
    
    const springProps = useSpring({ x: toggle ? newPosXOne : popOne.posX, y: toggle ? newPosYOne : popOne.posY, config: {friction: 200} })
    const springProps2 = useSpring({ x: toggle ? newPosXTwo : popTwo.posX, y: toggle ? newPosYTwo : popTwo.posY, config: {friction: 200} })

    return (
        <>
            <SingleTree h={popOne.h} w={popOne.w} posX={popOne.posX} posY={popOne.posY} opac={0.5} color={'blue'} />
            <SingleTree h={popTwo.h} w={popTwo.w} posX={popTwo.posX} posY={popTwo.posY} opac={0.5} color={'red'}  />
            {/* <line x1={popOne.posX} x2={popTwo.posX} y1={popOne.posY} y2={popTwo.posY} stroke="orange" stroke-width="1"/> */}
            <animated.circle cx={springProps.x} cy={springProps.y} r={2} fill={'blue'}/>
            <animated.circle cx={springProps2.x} cy={springProps2.y} r={2} fill={'red'}/>
        </>
    )
}

const flippedy = (prob) => Math.random() < prob ? true : false;

const Trees = (props) => {
    const [ toggle, setToggle ] = useState(false)
    

   

    const treeGroups = props.data.map((d, i) => {
        const { popOne, popTwo } = d;
        const transferOne = flippedy(0.1)
        const transferTwo = flippedy(0.1)
        return <GroupedTrees key={i} popOne={popOne} popTwo={popTwo} toggle={toggle} transferOne={transferOne} transferTwo={transferTwo}/>
    })

    return (
        <>
            <ContainerSvg width='50%' height='100%' viewBox={[0, 0, props.width, props.height]}>
                {/* <GroupedTrees popOne={popOne} popTwo={popTwo} toggle={toggle}/> */}
                {treeGroups}
                
            </ContainerSvg>
            <button onClick={() => setToggle(prev => !prev)}>Hello</button>
        </>
    )

}

export default Trees;