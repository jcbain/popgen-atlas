function closestFromArray (arr) {
    return (target) => arr.reduce(function(prev, curr){
        return (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev);
    })
}

export {closestFromArray}