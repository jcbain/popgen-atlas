import { useState, useEffect } from 'react';
import { tidy, summarize, sum, groupBy, mutate } from '@tidyjs/tidy'
import { uniq } from 'lodash'

import genes from '../data/genome_data.json'

const defaultParams = ['m', 'mu', 'sigsqr', 'pop',  'r'];


const createFlexFilter = (selectedParams) => {
    const filter = []
    for(const [param, value] of Object.entries(selectedParams)){

        const func =  (row) => row[param] === value
        filter.push(func)
    }
    return filter
}

const useData = (colorVar) => {
    const [gene, setGene] = useState([])
    const [ geneLoaded, setGeneLoaded ] = useState(false)
    const [phen, setPhen] = useState([])
    const [phenLoaded, setPhenLoaded] = useState(false)
    const [ params, setParams ] = useState({})
    const [selectedParams, setSelectedParam ] = useState({})

    const grouped = tidy(genes, 
        groupBy(['m', 'mu', 'sigsqr', 'pop', 'output_gen', 'r'], [summarize({ phen_diff: sum(colorVar) })]),
        mutate({ 'phen_diff': d => d.phen_diff * 2})
    )
   

    useEffect(() => {
        let newParams = {}
        defaultParams.forEach( param => {
            console.log(param)
            newParams[param] = uniq(genes.map(d => d[param]))
        } )
        setParams(newParams)
    }, [])

    useEffect(() => {
        let newSelectedParams = {}
        for(const [key, val] of Object.entries(params)) {
            newSelectedParams[key] = val[0]
        }

        setSelectedParam(newSelectedParams)
    }, [params])

    useEffect(() => {
        const filters = createFlexFilter(selectedParams)
        console.log(selectedParams)
        const result = genes.filter(row => filters.every(f => f(row)))
        setGene(result)
        setGeneLoaded(true)
        const result2 = grouped.filter(row => filters.every(f=> f(row)))
        setPhen(result2)
        setPhenLoaded(true)
    }, [selectedParams])

    const changeParams = () => {
        setGeneLoaded(false)
        setPhenLoaded(false)
        const m = 0.0001
        const mu = 0.000001
        setSelectedParam(prev => {
            return { ...prev, m: m, mu: mu}
        })
    }

    return { 
        phen, phenLoaded,
        gene, geneLoaded,
        changeParams 
    }
}


export default useData; 