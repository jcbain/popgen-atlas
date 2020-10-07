import React, { useEffect, forwardRef, useState } from 'react';
import { useSpring, animated } from 'react-spring'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const MapShapes = forwardRef((props, ref) => {
    const { data, path, trigger, displayMarkers } = props;
    const [ color, setColor ] = useState(props.fill || 'green')
    const [ toggle, setToggle ] = useState(false)

    const animatedProps = useSpring({opacity: toggle ? 0.3 : 0.9})
    useEffect(() => {
        if(ref) {
            gsap.to(ref.current, {
                scrollTrigger: {
                    trigger: trigger.current,
                    markers: displayMarkers,
                    start: "top 80%",
                    end: "top 15%",
                    onEnter: () => setToggle(true),
                    onLeave: () => setToggle(false),
                    // onLeaveBack: () => setColor(props.fill || 'green'),
                    onLeaveBack: () => setToggle(false),
                    onEnterBack: () => setToggle(true)
                }
            })
        }
    }, [])
    
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