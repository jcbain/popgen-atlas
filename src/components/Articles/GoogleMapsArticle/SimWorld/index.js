import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';

import useScrollTrigger from '../../../../hooks/useScrollTrigger'
import Buddy from './Buddy';

const ContainerSvg = styled.svg`
    position: sticky;
    top: 0px;
`


const GroupedBuddies = (props) => {

    const { toggle, isOffspring, invisible, popOne, popTwo } = props;

    const newPositionOne = {
        x: popOne.transfer ? popTwo.posX : popOne.posX,
        y: popOne.transfer ? popTwo.posY : popOne.posY
    }

    const newPositionTwo = {
        x: popTwo.transfer ? popOne.posX : popTwo.posX,
        y: popTwo.transfer ? popOne.posY : popTwo.posY
    }

    return (
        <>
            <Buddy strokeWidth={3} 
                fillOpacity={1}   
                // width={"10%"}                    
                colorPrimary={'#9696fa'} 
                // colorSecondary={'#5252D4'}
                colorSecondary={"#3e3e3e"}
                toggle={toggle}
                invisible={popOne.willDie ? invisible : false}
                isOffspring={isOffspring}
                initialX={popOne.posX}
                newX={newPositionOne.x}
                initialY={popOne.posY}
                newY={newPositionOne.y}
            />
            <Buddy strokeWidth={3} 
                fillOpacity={1}   
                // width={"10%"}                  
                colorPrimary={'#f77286'} 
                // colorSecondary={'#E71435'}
                colorSecondary={"#3e3e3e"}
                toggle={toggle}
                invisible={popTwo.willDie ? invisible : false}
                isOffspring={isOffspring}
                initialX={popTwo.posX}
                newX={newPositionTwo.x}
                initialY={popTwo.posY}
                newY={newPositionTwo.y}
            />
        </>
    )
}


const SimWorld = forwardRef((props, ref) => {
    const { height, width, buddyRefs, data, loaded } = props;
    const [ toggle ] = useScrollTrigger(buddyRefs.ref, buddyRefs.trigger)
    const [ shrink ] = useScrollTrigger(buddyRefs.ref, buddyRefs.shrinkTrigger)
    const [ disappear ] = useScrollTrigger(buddyRefs.ref, buddyRefs.disappearTrigger)


    // const buddyGroups = props.data.map((d, i) => {
    //     const { popOne, popTwo } = d;
    //     return <GroupedBuddies key={i} invisible={disappear} isOffspring={shrink} popOne={popOne} popTwo={popTwo} toggle={toggle}  />
    // })

    const buddies = data.map((d , i) => {
        return (
            <Buddy key={i}
            strokeWidth={3} 
            fillOpacity={1}                   
            colorPrimary={d.originPop === 1 ? '#9696fa' : '#f77286'} 
            colorSecondary={"#3e3e3e"}
            toggle={toggle}
            invisible={d.willDie ? disappear : false}
            isOffspring={shrink}
            initialX={d.posX}
            newX={d.transferPosX}
            initialY={d.posY}
            newY={d.transferPosY}
        />
        )
    })

    return (
            <ContainerSvg ref={ref} width='55%' height='100%' viewBox={[0, 0, width, height]}>
                {/* { buddyGroups }   */}
                {buddies}
            </ContainerSvg>
    )

})

export default SimWorld;