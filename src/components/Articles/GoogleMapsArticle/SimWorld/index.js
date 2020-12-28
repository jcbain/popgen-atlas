import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { device } from '../../../../devices';
import useScrollTrigger from '../../../../hooks/useScrollTrigger'
import Squiggle from './Squiggle';

const ContainerSvg = styled.svg`
    width: 70%;
    margin-left: ${({ theme }) => theme.mainPaddingX};
    height: 100vh;
`


const SimWorld = forwardRef((props, ref) => {
    const { height, width, buddyRefs, data, migrate, disappear, grow, loaded } = props;


    const buddies = data.map((d , i) => {
        return (
            <Squiggle key={i}
                strokeWidth={3} 
                fillOpacity={1}                   
                colorPrimary={d.originPop === 1 ? '#9696fa' : '#f77286'} 
                colorSecondary={"#3e3e3e"}
                toggle={migrate}
                invisible={d.willDie ? disappear : false}
                isOffspring={grow}
                initialX={d.posX}
                newX={d.transferPosX}
                initialY={d.posY}
                newY={d.transferPosY}
        />
        )
    })

    return (
            <ContainerSvg ref={ref} viewBox={[0, 0, width, height]}>
                {buddies}
            </ContainerSvg>
    )

})

export default SimWorld;