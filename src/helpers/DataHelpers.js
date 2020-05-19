import { cloneDeep, flatMap } from 'lodash';
import { nest } from 'd3-collection';

const unique = (value, index, self) => {
    return self.indexOf(value) === index;
}

const returnRelevantParams = (data, params) => {
    const paramCopy = Object.assign({}, params);
    const originalKeys = Object.keys(params)
    const allDataKeys = data.map(d => Object.keys(d)).flat().filter(unique);
    const finalDataKeys = [];

    originalKeys.forEach(itemInArray1 => {
        allDataKeys.forEach(itemInArray2 => {
            if(itemInArray1 === itemInArray2){
                finalDataKeys.push(itemInArray1)
            }
        })
    })
    originalKeys.forEach(d => {
        if(!finalDataKeys.includes(d)){
            delete paramCopy[d];
        } 
    })

    return paramCopy
}



function filterDataByParams(data, parmamSelections){
    const relevantParams = returnRelevantParams(data, parmamSelections);
    Object.keys(relevantParams).forEach( d => {
        data = data.filter( v => {
            return v[d] === relevantParams[d]
        })
    })
    return data;
}

function filterDataByMultipleOptsWithinSingleParam(data, paramSelection){
    let dataCopy = cloneDeep(data);
    const relevantParams = returnRelevantParams(data, paramSelection);
    let filteredData = [];
    Object.keys(relevantParams).forEach( d => {
        if (Array.isArray(relevantParams[d])){
            relevantParams[d].map( v => {
                let newData = cloneDeep(dataCopy);
                let selection = newData.filter( r => {
                    return r[d] === v;
                })
                return filteredData.push(selection)
            })
            console.log(filteredData)
            dataCopy = flatMap(filteredData)
        } else {
            let newData = cloneDeep(data)
            let selection = newData.filter( r => {
                return r[d] === relevantParams[d];
            })
            
            return filteredData.push(selection)
        }
        console.log(filteredData)
        dataCopy = flatMap(filteredData)
    })
    return dataCopy;
}

function removeParams(params, keys){
    const paramCopy = Object.assign({}, params);

    keys.forEach(d => delete paramCopy[d]);
    return paramCopy;
}

function closestFromArray (arr){
    return (target) => arr.reduce(function(prev, curr){
        return (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev);
    })
}

function leftJoinByAttr(arrLeft, arrRight, byArr, returnAttr, emptyVal) {
    let arrLeftCopy = cloneDeep(arrLeft);
    let byLeft = byArr[0];
    let byRight = (byArr.length < 2) ? byLeft : byArr[1];
    arrLeftCopy.forEach( function(d) {
        let result = arrRight.filter(v => {
            return v[byRight] === d[byLeft];
        })
        Object.keys(returnAttr).forEach(k => {
            d[k] = (result[0] !== undefined) ? result[0][returnAttr[k]] : emptyVal;
        })
    })
     
     return arrLeftCopy;
}

function findUniqParamOptions(data, params){
    let keys = nest().key(d => params.map(v => d[v])).entries(data)
    let keyVals = keys.map(d => d.key.split(','))
    let uniqVals = []
    keyVals.map(d => {
        let rowVals = {};
        for(let i = 0; i < d.length; i++){
            rowVals[params[i]] = d[i]
        }
        return uniqVals.push(rowVals);
    })
    return uniqVals;
}


export {unique, returnRelevantParams, filterDataByParams, closestFromArray, removeParams, leftJoinByAttr, findUniqParamOptions, filterDataByMultipleOptsWithinSingleParam}