import { useState, useEffect } from 'react';
import { tidy, summarize, sum, groupBy, mutate } from '@tidyjs/tidy'
import { uniq } from 'lodash'

import genes from '../data/genome_data.json'

const defaultParams = ['m', 'mu', 'sigsqr', 'pop',  'r'];


// const createFlexFilter = (selectedParams) => {
//     const filter = []
//     for(const [param, value] of Object.entries(selectedParams)){

//         const func =  (row) => row[param] === value
//         filter.push(func)
//     }
//     return filter
// }

const useData = (colorVar) => {
    const [gene, setGene] = useState([])
    const [ geneLoaded, setGeneLoaded ] = useState(false)
    const [phen, setPhen] = useState([])
    const [phenLoaded, setPhenLoaded] = useState(false)
    const allKeys = Object.keys(genes)
    const [tempParam, setTempParam] = useState(allKeys[0])
    

    useEffect(() => {
        setGene(genes[tempParam])
        setGeneLoaded(true)
    }, [tempParam])

    useEffect(() => {  
        const grouped = tidy(genes[tempParam], 
            groupBy(['m', 'mu', 'sigsqr', 'pop', 'output_gen', 'r'], [summarize({ phen_diff: sum(colorVar) })]),
            mutate({ 'phen_diff': d => d.phen_diff * 2})
        )
        setPhen(grouped)
        setPhenLoaded(true)

    }, [tempParam])
    

    const changeParams = () => {
        setTempParam(allKeys[2])
    }

    return { 
        phen, phenLoaded,
        gene, geneLoaded,
        changeParams 
    }
}


export default useData; 