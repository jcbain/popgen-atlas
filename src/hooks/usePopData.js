import { useState, useEffect } from 'react';
import { random } from 'lodash'


const usePopData = (n1, n2, options={minWidth: 0, maxWidth: 400, minHeight: -200, maxHeight: 200, padding: 30}) => {
    const [ popData, setPopData ] = useState({})
    const [ loading, setLoading ] = useState(true)

    const popOneMinX = options.minWidth + options.padding,
          popOneMaxX = options.maxWidth/2 - options.padding,
          popTwoMinX = options.maxWidth/2 + options.padding,
          popTwoMaxX = options.maxWidth - options.padding,
          minY       = options.minHeight + options.padding,
          maxY       = options.maxHeight - options.padding; 

    useEffect(() => {
        const popOne = generateData(popOneMinX, popOneMaxX, minY, maxY, popTwoMinX,popTwoMaxX, minY, maxY,  n1, 0.1, 0.5, 1),
              popTwo = generateData(popTwoMinX, popTwoMaxX, minY, maxY, popOneMinX, popOneMaxX, minY, maxY, n2, 0.1, 0.3, 2);
        console.log(popOne)
        const populations = joinPopulationArrays('willTransfer', popOne, popTwo);
        
        setPopData({ g1: populations})
        setLoading(false)
    }, [])
    
    return { popData, loading }
}

function flipWeightedCoin(prob) {
    return Math.random() < prob ? true : false;
}

function generateData(minX, maxX, minY, maxY, 
                      minTransferX, maxTransferX, minTransferY, maxTransferY,
                      num, transferProb, dieProb, originPop) {

    let data = [];
    for(let i = 0; i < num; i++) {
        const posX         = random(minX, maxX),
              posY         = random(minY, maxY),
              willTransfer = flipWeightedCoin(transferProb),
              willDie      = flipWeightedCoin(dieProb),
              transferPosX = willTransfer ? random(minTransferX, maxTransferX) : posX,
              transferPosY = willTransfer ? random(minTransferY, maxTransferY) : posY;
        const individual = { posX, posY, willTransfer, willDie, transferPosX, transferPosY, originPop };
        data.push(individual);
    }

    return data;
}

function joinPopulationArrays(logicVar, ...popArrays) {
    const res = popArrays.reduce((acc, val) => {
        return acc.concat(...val);
     }, []);

     res.sort((x, y) => (x[logicVar] === y[logicVar]) ? 0 : x[logicVar] ? 1 : -1)

     return res;
}

export default usePopData;