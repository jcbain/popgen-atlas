import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';

import useScrollTrigger from '../../../../hooks/useScrollTrigger'
import Buddy from './Buddy';

const ContainerSvg = styled.svg`
    position: sticky;
    top: 0px;
`


const GroupedBuddies = (props) => {

    const { toggle, isOffspring, invisible, popOne, popTwo, transferOne, transferTwo } = props;

    const newPositionOne = {
        x: transferOne ? popTwo.posX : popOne.posX,
        y: transferOne ? popTwo.posY : popOne.posY
    }

    const newPositionTwo = {
        x: transferTwo ? popOne.posX : popTwo.posX,
        y: transferTwo ? popOne.posY : popTwo.posY
    }

    return (
        <>
            <Buddy strokeWidth={2} 
                fillOpacity={0.1}   
                // width={"10%"}                    
                colorPrimary={'#9696fa'} 
                // colorSecondary={'#5252D4'}
                colorSecondary={"#3e3e3e"}
                toggle={toggle}
                invisible={invisible}
                isOffspring={isOffspring}
                initialX={popOne.posX}
                newX={newPositionOne.x}
                initialY={popOne.posY}
                newY={newPositionOne.y}
            />
            <Buddy strokeWidth={2} 
                fillOpacity={0.1}   
                // width={"10%"}                  
                colorPrimary={'#f77286'} 
                // colorSecondary={'#E71435'}
                colorSecondary={"#3e3e3e"}
                toggle={toggle}
                invisible={invisible}
                isOffspring={isOffspring}
                initialX={popTwo.posX}
                newX={newPositionTwo.x}
                initialY={popTwo.posY}
                newY={newPositionTwo.y}
            />
        </>
    )
}

const flippedy = (prob) => Math.random() < prob ? true : false;

const SimWorld = forwardRef((props, ref) => {
    const { height, width, buddyRefs } = props;
    const [ toggle ] = useScrollTrigger(buddyRefs.ref, buddyRefs.trigger)
    const [ shrink ] = useScrollTrigger(buddyRefs.ref, buddyRefs.shrinkTrigger)
    const [ disappear ] = useScrollTrigger(buddyRefs.ref, buddyRefs.disappearTrigger)


    const buddyGroups = props.data.map((d, i) => {
        const { popOne, popTwo } = d;
        const transferOne = flippedy(0.1)
        const transferTwo = flippedy(0.1)
        return <GroupedBuddies key={i} invisible={disappear} isOffspring={shrink} popOne={popOne} popTwo={popTwo} toggle={toggle} transferOne={transferOne} transferTwo={transferTwo} />
    })

    return (
            <ContainerSvg width='55%' height='100%' viewBox={[0, 0, width, height]}>
                { buddyGroups }  
            </ContainerSvg>
    )

})

export default SimWorld;