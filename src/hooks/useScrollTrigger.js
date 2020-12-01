import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useScrollTrigger = (ref, triggerRef, initial=false, config={displayMarkers: true, start: "top 80%", end: "top 15%"}) => {
    const [ toggle, setToggle ] = useState(initial);

    useEffect(() => {
        if(ref){
            gsap.to(ref.current, {
                scrollTrigger: {
                    trigger: triggerRef.current,
                    markers: config.displayMarkers,
                    start: config.start,
                    end: config.end,
                    onEnter: () => setToggle(!initial),
                    // onLeave: () => setToggle(false),
                    onLeaveBack: () => setToggle(initial),
                    // onEnterBack: () => setToggle(true)
                }
            })

        }
    }, [config.start, config.end, ref, triggerRef])


    return [ toggle ]
}

export default useScrollTrigger;