import { useState, useEffect } from 'react';

const useParams = (data, isStatic) => {
    const [ paramOptions, setParamOptions ] = useState({})
    const [ chosenSet, setChosenSet ] = useState({
        'lineSet': "",
        'histoSet': "",
        'genomeSet': ""
    })
    const [ loadedSet, setLoadedSet ] = useState(false) 
    const [ chartFocus, setChartFocus] = useState("");

    useEffect(() => {
        const paramSetStrings = Object.keys(data);
        const allOpts = paramSetStrings.flatMap(d => d.split("_"))
        let optValPairs = {}
        let order = 0;

        allOpts.forEach(o => {
            const [ param, value ] = o.match(/[a-z]+|[^a-z]+/gi)
            const numericVal = Number(value)

            if(!optValPairs[param]){
                const paramObj = { paramName: param, values: [numericVal], selectedValue: numericVal, order: order}
                optValPairs[param] = paramObj;
                order += 1;
            } else {
                if(!optValPairs[param].values.includes(numericVal)) {
                    optValPairs[param].values.push(numericVal)
                }
            }
        })
  
        for ( const [key, v] of Object.entries(optValPairs)) {
            const bool = (v.values.length > 1) ? true : false;
            optValPairs[key] = {...v, isVariable: bool}
        }

        setParamOptions(optValPairs)
    }, [data])


    useEffect(() => {
        const paramArray = Object.values(paramOptions).map((v, i) => {
            return v
        })
        let paramStringArray = []
        paramArray.forEach((v, i) => {
            const param = paramArray.find(d => d.order === i)
            const stringVal = `${param.paramName}${param.selectedValue}`
            paramStringArray.push(stringVal)
        })
        const paramSet = paramStringArray.join("_")

        if(!isStatic) {
            setChosenSet({
                lineSet: paramSet,
                histoSet: paramSet,
                genomeSet: paramSet
            })
        } else {
            setChosenSet({[chartFocus]:paramSet})
        }
        
        setLoadedSet(true)
    }, [paramOptions])


    const changeParam = (param, value, focus) => {
        setParamOptions(prev => {
            return {...prev, [param]: {...prev[param], selectedValue: value}}
        })
        setChartFocus(focus);
    }


    return {
        paramOptions,
        chosenSet,
        loadedSet,
        changeParam
    }
} 

export default useParams;