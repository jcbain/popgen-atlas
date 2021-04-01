import { useState, useEffect } from 'react';
import { tidy, summarize, sum, groupBy, mutate } from '@tidyjs/tidy'

// const defaultParams = ['m', 'mu', 'sigsqr', 'pop',  'r'];
const defaultGroupParams = ['m', 'mu', 'sigsqr', 'pop', 'output_gen', 'r']

const useFilteredData = (data, loaded, colorVar, chosenSet) =>  {
    const [ genes, setGenes ] = useState([]);
    const [ phens, setPhens ] = useState([]);
    const [ geneLoaded, setGeneLoaded ] = useState(false);
    const [ phenLoaded, setPhenLoaded ] = useState(false);
    // const [ selectedParamSet, setSelectedParamSet ] = useState("m0.001_mu0.00001_r0.00625_sigsqr25_n1000_pop1")

    useEffect(() => {
        if(data[chosenSet]) {
            setGenes(data[chosenSet])
            setGeneLoaded(true)
        }
        
    }, [data, chosenSet])

    useEffect(() => { 
        if(data[chosenSet]) {
            const grouped = tidy(data[chosenSet], 
                groupBy(defaultGroupParams, [summarize({ phen_diff: sum(colorVar) })]),
                mutate({ 'phen_diff': d => d.phen_diff * 2})
            )
            setPhens(grouped)
            setPhenLoaded(true)

        }

    }, [data, chosenSet])

    return {
        genes, 
        geneLoaded,
        phens,
        phenLoaded
    }

}

export default useFilteredData;