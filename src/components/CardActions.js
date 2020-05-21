// let staticFunctionObject = {};
// props.labels.map(k => {
//     let staticOptFunctions = {};
//     if(k.staticOpts !== undefined){
//         Object.keys(k.staticOpts).map( v => {
//             return staticOptFunctions[v] = (event, val) => event([k.id, v, val])
//         })
//         return staticFunctionObject[k.id] = staticOptFunctions;
//     }
// })

export function chooseMultiStaticOptions(componentArray){
    let multiStaticFunctionObj = {};
    componentArray.map(componentItem => {
        let individualOptionFunctions = {};
        if(componentItem.staticOpts !== undefined){
            Object.keys(componentItem.staticOpts).map(paramOpt => {
                return individualOptionFunctions[paramOpt] = (event, val) => event([componentItem.id, paramOpt, val])
            })
        return multiStaticFunctionObj[componentItem.id] = individualOptionFunctions;
        }
        return multiStaticFunctionObj;
    })
    return multiStaticFunctionObj;
}