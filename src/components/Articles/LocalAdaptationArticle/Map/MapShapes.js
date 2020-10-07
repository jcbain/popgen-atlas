import React, { useEffect, forwardRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const MapShapes = forwardRef((props, ref) => {
    const { data, path, trigger, displayMarkers } = props;

    useEffect(() => {
        if(ref) {
            gsap.to(ref.current, {
                scrollTrigger: {
                    trigger: trigger.current,
                    markers: displayMarkers,
                    start: "top 80%",
                    end: "top 15%",
                    toggleActions: "restart pause reverse pause",
                },
                fill: 'purple'
            })
        }
    }, [])
    
    const shapes = data.map((d, i) => {
        return (
            <path ref={ref} key={i}
                d={path(d)}
                // stroke={'green'}
                fill={props.fill}
            />
        )
    })

    return shapes
});

export default MapShapes;