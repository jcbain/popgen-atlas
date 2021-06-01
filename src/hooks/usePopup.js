import { useState, useEffect } from 'react';

const usePopup = (defaultShow, blurDiv) => {
    const [ show, setShow ] = useState(defaultShow);

    useEffect(() => {
        if(blurDiv.current && show) {
            blurDiv.current.style.filter = 'blur(5px)'
        }
    },[show])

    return [ show, setShow ]
}

export default usePopup