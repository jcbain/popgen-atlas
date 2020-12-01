import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring'
import { random } from 'lodash'

import useScrollTrigger from '../../../../hooks/useScrollTrigger'
import Buddy from './Buddy';

const ContainerSvg = styled.svg`
    position: sticky;
    top: 0px;
`


const GroupedBuddies = (props) => {

    const { toggle, popOne, popTwo, transferOne, transferTwo } = props;

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
                fillOpacity={0.75}   
                width={"10%"}                    
                colorPrimary={'#9696fa'} 
                // colorSecondary={'#5252D4'}
                colorSecondary={"#3e3e3e"}
                toggle={toggle}
                initialX={popOne.posX}
                newX={newPositionOne.x}
                initialY={popOne.posY}
                newY={newPositionOne.y}
            />
            <Buddy strokeWidth={2} 
                fillOpacity={0.75}   
                width={"10%"}                  
                colorPrimary={'#f77286'} 
                // colorSecondary={'#E71435'}
                colorSecondary={"#3e3e3e"}
                toggle={toggle}
                initialX={popTwo.posX}
                newX={newPositionTwo.x}
                initialY={popTwo.posY}
                newY={newPositionTwo.y}
            />
        </>
    )
}

const flippedy = (prob) => Math.random() < prob ? true : false;

const Trees = forwardRef((props, ref) => {
    const { height, width, buddyRefs } = props;
    // const [ toggle, setToggle ] = useState(false)
    const [ toggle ] = useScrollTrigger(buddyRefs.ref, buddyRefs.trigger)
    


    const buddyGroups = props.data.map((d, i) => {
        const { popOne, popTwo } = d;
        const transferOne = flippedy(0.1)
        const transferTwo = flippedy(0.1)
        return <GroupedBuddies key={i} popOne={popOne} popTwo={popTwo} toggle={toggle} transferOne={transferOne} transferTwo={transferTwo} />
    })

    return (
            <ContainerSvg width='50%' height='100%' viewBox={[0, 0, width, height]}>
                { buddyGroups }
                
            </ContainerSvg>
    )

})

export default Trees;