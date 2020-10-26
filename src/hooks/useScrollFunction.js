import { useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);


const useScrollFunction = (ref, trigger, triggerFunc, triggerFuncBack, config={displayMarkers: true, start: "top 80%", end: "top 15%"}) => {

    const [ status, setStatus ] = useState("")
    
    const onEnter = useCallback(() => {
        triggerFunc()
        setStatus("on enter called")
    }, [triggerFunc])

    const onLeaveBack = useCallback(() => {
        triggerFuncBack()
        setStatus("on leave back called")
    }, [triggerFuncBack])

    useEffect(() => {
        if(ref) {
            gsap.to(ref.current, {
                scrollTrigger: {
                    trigger: trigger.current,
                    markers: true,
                    start: "top 80%",
                    end: "top 15%",
                    onEnter: onEnter, 
                    onLeaveBack: onLeaveBack
                }
            })
        }

        return () => console.log("unmounted")
    }, [trigger, ref, onEnter, onLeaveBack])

    return status

}

export default useScrollFunction;
