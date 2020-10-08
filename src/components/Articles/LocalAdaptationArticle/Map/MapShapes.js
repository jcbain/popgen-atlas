import React, { useEffect, forwardRef, useState } from 'react';
import { useSpring, animated } from 'react-spring'
import useScrollTrigger from '../../../../hooks/useScrollTrigger'

const MapShapes = forwardRef((props, ref) => {
    const { data, path, trigger, displayMarkers } = props;
    const [ color, setColor ] = useState(props.fill || 'green')
    const [ toggle ] = useScrollTrigger(ref, trigger)
    const animatedProps = useSpring({opacity: toggle ? 0.3 : 0.9})
    
    const shapes = data.map((d, i) => {
        return (
            <animated.path ref={ref} key={i}
                d={path(d)}
                // stroke={'green'}
                fill={color}
                opacity={animatedProps.opacity}
            />
        )
    })

    return shapes
});

export default MapShapes;