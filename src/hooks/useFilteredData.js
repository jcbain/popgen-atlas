import { useState, useEffect } from 'react';
import { tidy, summarize, sum, groupBy, mutate } from '@tidyjs/tidy'

const defaultGroupParams = ['m', 'mu', 'sigsqr', 'pop', 'output_gen', 'r']

const useFilteredData = (data, loaded, colorVar, chosenSet) =>  {
    const [ genes, setGenes ] = useState([]);
    const [ phens, setPhens ] = useState([]);
    const [ histo, setHisto ] = useState([]);
    const [ geneLoaded, setGeneLoaded ] = useState(false);
    const [ phenLoaded, setPhenLoaded ] = useState(false);
    const [ histoLoaded, setHistoLoaded ] = useState(false);

    useEffect(() => {
        if(data[chosenSet.genomeSet]) {
            setGenes(data[chosenSet.genomeSet])
            setGeneLoaded(true)
        }
        
    }, [chosenSet.genomeSet])

    useEffect(() => {
        if(data[chosenSet.histoSet]) {
            setHisto(data[chosenSet.histoSet])
            setHistoLoaded(true)
        }
        
    }, [chosenSet.histoSet])

    useEffect(() => { 
        if(data[chosenSet.lineSet]) {
            const grouped = tidy(data[chosenSet.lineSet], 
                groupBy(defaultGroupParams, [summarize({ phen_diff: sum(colorVar) })]),
                mutate({ 'phen_diff': d => d.phen_diff * 2})
            )
            setPhens(grouped)
            setPhenLoaded(true)
        }
    }, [chosenSet.lineSet])


    return {
        genes, 
        geneLoaded,
        phens,
        phenLoaded,
        histo,
        histoLoaded
    }

}

export default useFilteredData;