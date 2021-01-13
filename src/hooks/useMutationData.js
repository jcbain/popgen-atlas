import { useState, useEffect } from 'react';
import axios from 'axios';

const useMutationData = () => {
    const [mutations, setMutations] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get("/mutations")
            .then(resp => {
                setMutations(resp.data)
                setLoaded(true)
            })
            .catch(err => console.log('error fetching data', err))
    }, [])

    return { mutations, loaded }
}

export default useMutationData;