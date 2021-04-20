import { useState, useEffect } from 'react';

const useParams = (data) => {
   
    const [ paramOptions, setParamOptions ] = useState({})
    const [ chosenSet, setChosenSet ] = useState("")
    const [ loadedSet, setLoadedSet ] = useState(false) 

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
            if (v.values.length > 1) {
                optValPairs[key] = {...v, isVariable: true, include: key === 'pop' ? false : true}
            } else {
                optValPairs[key] = {...v, isVariable: false, include: key === 'pop' ? false : true}
            }
            
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
        setChosenSet(paramSet)
        setLoadedSet(true)
    }, [paramOptions])


    const changeParam = (param, value) => {
        setParamOptions(prev => {
            return {...prev, [param]: {...prev[param], selectedValue: value}}
        })
    }

 
    return {
        paramOptions,
        chosenSet,
        loadedSet,
        changeParam
    }
} 

export default useParams;