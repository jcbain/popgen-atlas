import { useState, useEffect } from 'react';

const usePopup = (defaultShow, blurDiv) => {
    const [ show, setShow ] = useState(defaultShow);

    useEffect(() => {
        if(blurDiv.current && show) {
            blurDiv.current.style.filter = 'blur(5px) opacity(50%)'
            document.body.style.overflow = "hidden"
        } else {
            blurDiv.current.style.filter = 'unset';
            document.body.style.overflow = "initial"

        }
    },[show])

    return [ show, setShow ]
}

export default usePopup