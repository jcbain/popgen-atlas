import { useState, useEffect } from 'react';

const usePopup = (defaultShow, blurDiv) => {
    const [ show, setShow ] = useState(defaultShow);

    const handleOpen = () => {
        if(!show) {
            setShow(true)
        }
    }

    useEffect(() => {
        if(blurDiv.current && show) {
            blurDiv.current.style.filter = 'blur(5px) opacity(50%)'
            blurDiv.current.style.background = '#303030'
            document.body.style.overflow = "hidden"
        } else {
            blurDiv.current.style.filter = 'unset';
            blurDiv.current.style.background = 'initial'
            document.body.style.overflow = "initial"
        }
    },[show])

    return [ show, setShow, handleOpen ]
}

export default usePopup