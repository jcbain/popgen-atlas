import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useScrollTrigger = (ref, triggerRef, config={displayMarkers: true, start: "top 80%", end: "top 15%"}) => {
    const [ toggle, setToggle ] = useState(false);

    useEffect(() => {
        if(ref){
            gsap.to(ref.current, {
                scrollTrigger: {
                    trigger: triggerRef.current,
                    markers: config.displayMarkers,
                    start: config.start,
                    end: config.end,
                    onEnter: () => setToggle(true),
                    onLeave: () => setToggle(false),
                    onLeaveBack: () => setToggle(false),
                    onEnterBack: () => setToggle(true)
                }
            })

        }
    }, [config.start, config.end, ref, triggerRef])


    return [ toggle ]
}

export default useScrollTrigger;