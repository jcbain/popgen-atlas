import { useState, useEffect } from 'react';
import { tidy, summarize, sum, groupBy, mutate } from '@tidyjs/tidy'


const useFilteredData = (data, loaded, colorVar, currentSet) =>  {
    const [ genes, setGenes ] = useState([]);
    const [ phens, setPhens ] = useState([]);
    const [ geneLoaded, setGeneLoaded ] = useState(false);
    const [ phenLoaded, setPhenLoaded ] = useState(false);
    const [ selectedParamSet, setSelectedParamSet ] = useState("m0.001_mu1e-05_r0.00625_sigsqr25_n1000_pop1")

    console.log(Object.keys(data))
    useEffect(() => {
        if(loaded){
            setGenes(data[currentSet])
            setGeneLoaded(true)
        }
        
    }, [data, currentSet])

    useEffect(() => { 
        if(loaded){
            const grouped = tidy(data[currentSet], 
                groupBy(['m', 'mu', 'sigsqr', 'pop', 'output_gen', 'r'], [summarize({ phen_diff: sum(colorVar) })]),
                mutate({ 'phen_diff': d => d.phen_diff * 2})
            )
            setPhens(grouped)
            setPhenLoaded(true)

        } 
       

    }, [data, currentSet])

    return {
        genes, 
        geneLoaded,
        phens,
        phenLoaded
    }

}

export default useFilteredData;