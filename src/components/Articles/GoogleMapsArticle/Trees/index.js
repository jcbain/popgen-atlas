import React, { useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring'
import { random } from 'lodash'


import SingleTree from './SingleTree';
import Buddy from './Buddy';

const ContainerSvg = styled.svg`
    position: sticky;
    top: 0px;
    border: 2px solid black;
`

const GroupedTrees = (props) => {
    const { popOne, popTwo, toggle, transferOne, transferTwo, height, width } = props;

    const newPosXOne = transferOne ? popTwo.posX : random(0, width/2),
          newPosYOne = transferOne ? popTwo.posY : random(0, height),
          newPosXTwo = transferTwo ? popOne.posX : random(width/2, width),
          newPosYTwo = transferTwo ? popOne.posY : random(0, height);
    
    
    const springProps = useSpring({ x: toggle ? newPosXOne : popOne.posX, y: toggle ? newPosYOne : popOne.posY, config: {friction: 200} })
    const springProps2 = useSpring({ x: toggle ? newPosXTwo : popTwo.posX, y: toggle ? newPosYTwo : popTwo.posY, config: {friction: 200} })

    return (
        <>
            <SingleTree h={popOne.h} w={popOne.w} posX={popOne.posX} posY={popOne.posY} opac={0.5} color={'blue'} />
            <SingleTree h={popTwo.h} w={popTwo.w} posX={popTwo.posX} posY={popTwo.posY} opac={0.5} color={'red'}  />
            <animated.circle cx={springProps.x} cy={springProps.y} r={2} fill={'blue'} opacity={transferOne ? 1.0 : 0.2}/>
            <animated.circle cx={springProps2.x} cy={springProps2.y} r={2} fill={'red'} opacity={transferTwo ? 1.0 : 0.2}/>
        </>
    )
}

const flippedy = (prob) => Math.random() < prob ? true : false;

const Trees = (props) => {
    const { height, width } = props;
    const [ toggle, setToggle ] = useState(false)
    

   

    const treeGroups = props.data.map((d, i) => {
        const { popOne, popTwo } = d;
        const transferOne = flippedy(0.1)
        const transferTwo = flippedy(0.1)
        return <GroupedTrees key={i} popOne={popOne} popTwo={popTwo} toggle={toggle} transferOne={transferOne} transferTwo={transferTwo} height={height} width={width}  />
    })

    return (
        <>
            <ContainerSvg width='50%' height='100%' viewBox={[0, 0, width, height]}>
                {treeGroups}
                <Buddy width={"10%"} 
                    x={10} 
                    y={-10}
                    strokeWidth={3}
                    fillOpacity={1} 
                    colorPrimary={'#9696fa'} 
                    colorSecondary={'#5252D4'}
                />
                <Buddy width={"10%"} 
                    x={300} 
                    y={-10}
                    strokeWidth={3}
                    fillOpacity={1} 
                    colorPrimary={'#f77286'} 
                    colorSecondary={'#E71435'}
                />
                
            </ContainerSvg>
            <button onClick={() => setToggle(prev => !prev)}>Hello</button>
        </>
    )

}

export default Trees;