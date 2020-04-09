// import { nest } from 'd3-collection';

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
    originalKeys.map(d => {
        if(!finalDataKeys.includes(d)){
            delete paramCopy[d];
        }
    })

    return paramCopy
}



function filterDataByParams(data, parmamSelections){
    const relevantParams = returnRelevantParams(data, parmamSelections);

    Object.keys(relevantParams).map( d => {
        data = data.filter( v => {
            return v[d] === relevantParams[d]
        })
    })
    return data;
}

// returnRelevantParams([{hanes: 'hello', name: 'james'}, {item: 'name', name: 'jennifer', blog: 'somethin'}], {hanes: 'hello', name: 'james', blog: 'yes'})
// console.log(filterDataByParams([{name: 'james', age: 29}, {name: 'james', age: 30}, {name: 'jennifer', age: 29}, {name: 'jennifer', age: 29, gender: 'female'}], {age: 29, name: 'jennifer'}))

export {unique, returnRelevantParams, filterDataByParams}