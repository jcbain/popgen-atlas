import { useEffect } from 'react';

const useOutsideAlerter = (ref, callback) => {

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(ref.current && !ref.current.contains(e.target)) {
                callback()
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [ref])


}


export default useOutsideAlerter;