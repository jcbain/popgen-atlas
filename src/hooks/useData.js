import { useState, useEffect } from 'react';
import { tidy, summarize, sum, groupBy, mutate } from '@tidyjs/tidy'

import genes from '../data/genome_data.json'

const useData = (colorVar) => {
    const [data, setData] = useState([])
    const [phen, setPhen] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [phenLoaded, setPhenLoaded] = useState(false)


    useEffect(() => {
        setData(genes)
        setLoaded(true)
    }, [])

    useEffect(() => {
        const grouped = tidy(data, 
            groupBy(['m', 'mu', 'sigsqr', 'pop', 'output_gen'], [summarize({ phen_diff: sum(colorVar) })]),
            mutate({ 'phen_diff': d => d.phen_diff * 2})
            )
        setPhen(grouped)
        setPhenLoaded(true)
    }, [data])

  
    return { 
        data, loaded,
        phen, phenLoaded 
    }
}

export default useData; 