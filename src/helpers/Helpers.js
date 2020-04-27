function closestFromArray (arr) {
    return (target) => arr.reduce(function(prev, curr){
        return (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev);
    })
}

function createLabel(...args) {
    return args.join('-')
}

export {closestFromArray, createLabel}