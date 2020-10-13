import React, { useEffect, forwardRef, useState } from 'react';
import { useSpring, animated } from 'react-spring'
import useScrollTrigger from '../../../../hooks/useScrollTrigger'

const MapShapes = forwardRef((props, ref) => {
    const { data, path, trigger, displayMarkers } = props;
    const [ toggle ] = useScrollTrigger(ref, trigger)
    const animatedProps = useSpring({opacity: toggle ? 0.3 : 0.9})
    
    const shapes = data.map((d, i) => {
        return (
            <animated.path ref={ref} key={i}
                d={path(d)}
                fill={props.fill}
                opacity={animatedProps.opacity}
            />
        )
    })

    return shapes
});

export default MapShapes;