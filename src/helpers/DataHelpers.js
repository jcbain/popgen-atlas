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

}

returnRelevantParams([{hanes: 'hello', name: 'james'}, {item: 'name', name: 'jennifer', blog: 'somethin'}], {hanes: 'hello', name: 'james', blog: 'yes'})