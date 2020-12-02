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
        const popOne = generateData(popOneMinX, popOneMaxX, minY, maxY, n1, 0.1, 0.5),
              popTwo = generateData(popTwoMinX, popTwoMaxX, minY, maxY, n2, 0.1, 0.3);
        
        setPopData({ 1: { popOne, popTwo }})
        setLoading(false)
    }, [])
    
    return { popData, loading }
}

function flipWeightedCoin(prob) {
    return Math.random() < prob ? true : false;
}

function generateData(minX, maxX, minY, maxY, 
                      minTransferX, maxTransferX, minTransferY, maxTransferY,
                      num, transferProb, dieProb) {

    let data = [];
    for(let i = 0; i < num; i++) {
        const posX         = random(minX, maxX),
              posY         = random(minY, maxY),
              transfer     = flipWeightedCoin(transferProb),
              willDie      = flipWeightedCoin(dieProb),
              transferPosX = transfer ? random(minTransferX, maxTransferX) : posX,
              transferPosY = transfer ? random(minTransferY, maxTransferY) : posY;
        const individual = { posX, posY, transfer, willDie, transferPosX, transferPosY };
        data.push(individual);
    }

    return data;
}

export default usePopData;