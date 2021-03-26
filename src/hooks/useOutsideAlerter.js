import { useEffect } from 'react';

const useOutsideAlerter = (ref, callback) => {

    useEffect(() => {
        console.log(ref)
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