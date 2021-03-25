import { useState, useEffect } from 'react';
import { tidy, summarize, sum, groupBy, mutate } from '@tidyjs/tidy'

import mutations from '../data/genome_data.json'

const defaultParams = ['m', 'mu', 'sigsqr', 'pop',  'r'];



const useData = (colorVar) => {
    const [ data, setData ] = useState({})
    const [ loaded, setLoaded ] = useState(false)

    useEffect(() => {
        setData(mutations)
        setLoaded(true)

    }, [])
    // const [gene, setGene] = useState([])
    // const [ geneLoaded, setGeneLoaded ] = useState(false)
    // const [phen, setPhen] = useState([])
    // const [phenLoaded, setPhenLoaded] = useState(false)
    // const allKeys = Object.keys(genes)
    // const [tempParam, setTempParam] = useState(allKeys[0])
    


    // useEffect(() => {
    //     setGene(genes[tempParam])
    //     setGeneLoaded(true)
    // }, [tempParam])

    // useEffect(() => {  
    //     const grouped = tidy(genes[tempParam], 
    //         groupBy(['m', 'mu', 'sigsqr', 'pop', 'output_gen', 'r'], [summarize({ phen_diff: sum(colorVar) })]),
    //         mutate({ 'phen_diff': d => d.phen_diff * 2})
    //     )
    //     setPhen(grouped)
    //     setPhenLoaded(true)

    // }, [tempParam])
    

    // const changeParams = () => {
    //     setTempParam(allKeys[3])
    // }

    return { 
        data, 
        loaded
        // phen, phenLoaded,
        // gene, geneLoaded,
        // changeParams 
    }
}


export default useData; 