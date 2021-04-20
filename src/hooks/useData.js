import { useState, useEffect } from 'react';

import mutations from '../data/genome_data.json'

const useData = () => {
    const [ data, setData ] = useState({})
    const [ loaded, setLoaded ] = useState(false)

    useEffect(() => {
        setData(mutations)
        setLoaded(true)

    }, [])
  
    return { 
        data, 
        loaded
    }
}


export default useData; 