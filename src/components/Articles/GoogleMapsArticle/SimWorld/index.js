import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';

import useScrollTrigger from '../../../../hooks/useScrollTrigger'
import Buddy from './Buddy';

const ContainerSvg = styled.svg`
    position: sticky;
    top: 0px;
`


const SimWorld = forwardRef((props, ref) => {
    const { height, width, buddyRefs, data, loaded } = props;
    const [ toggle ] = useScrollTrigger(buddyRefs.ref, buddyRefs.trigger)
    const [ shrink ] = useScrollTrigger(buddyRefs.ref, buddyRefs.shrinkTrigger, true)
    const [ disappear ] = useScrollTrigger(buddyRefs.ref, buddyRefs.disappearTrigger)

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
                {buddies}
            </ContainerSvg>
    )

})

export default SimWorld;