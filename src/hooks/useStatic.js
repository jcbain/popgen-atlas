import {useEffect, useState} from 'react'

const useStatic = () => {
    const [ isStatic, setStatic ] = useState(false);
    return {
        isStatic,
        setStatic,
    }
}


export default useStatic;