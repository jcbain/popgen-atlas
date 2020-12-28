import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useScrollTrigger = (ref, triggerRef, initial=false, config={displayMarkers: true, start: "top 80%", end: "top 15%"}) => {
    const [ toggle, setToggle ] = useState(initial);

    useEffect(() => {
        if(ref.current){
            gsap.to(ref.current, {
                scrollTrigger: {
                    trigger: triggerRef.current,
                    markers: config.displayMarkers,
                    start: config.start,
                    end: config.end,
                    onEnter: () => setToggle(!initial),
                    onLeaveBack: () => setToggle(initial),
                }
            })

        }
    }, [config, ref, triggerRef, initial])


    return [ toggle ]
}

export default useScrollTrigger;