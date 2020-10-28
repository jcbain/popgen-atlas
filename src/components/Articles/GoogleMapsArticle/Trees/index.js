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
    
    
    const springProps = useSpring({ x: toggle ? popTwo.posX : popOne.posX, y: toggle ? popTwo.posY : popOne.posY })
    const springProps2 = useSpring({ x: toggle ? popOne.posX : popTwo.posX, y: toggle ? popOne.posY : popTwo.posY })

    return (
        <>
            <SingleTree h={popOne.h} w={popOne.w} posX={popOne.posX} posY={popOne.posY} opac={0.5} color={'green'} />
            <SingleTree h={popTwo.h} w={popTwo.w} posX={popTwo.posX} posY={popTwo.posY} opac={0.5} color={'red'}  />
            <animated.circle cx={springProps.x} cy={springProps.y} r={2} fill={'#7a7736'}/>
            <animated.circle cx={springProps2.x} cy={springProps2.y} r={2} fill={'#7a7736'}/>
        </>
    )
}


const Trees = (props) => {
    const [ toggle, setToggle ] = useState(false)
    

   

    const treeGroups = props.data.map((d, i) => {
        const { popOne, popTwo } = d;
        return <GroupedTrees key={i} popOne={popOne} popTwo={popTwo} toggle={toggle}/>
    })

    const popOne = { h: 20, w: 10, posX: 10, posY: 10 },
          popTwo = { h: 20, w: 10, posX: 375, posY: 10 }

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