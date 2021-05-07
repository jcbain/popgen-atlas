import React from 'react';
import styled from 'styled-components';
import Architecture from './Architecture';


const Charts = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: 300px 75px;
    row-gap: 10px;
`

const GroupedGenomes = ({  data, xVar, yVar, colorVar, theme, upperLimit, lowerLimit, setUpperLimit, setLowerLimit, minVal, maxVal, isStatic }) => {
    return (
        <Charts>
            <Architecture data={data} 
                xVar={xVar} 
                yVar={yVar}   
                colorVar={colorVar}
                theme={theme}
                upperLimit={upperLimit} 
                lowerLimit={lowerLimit} 
                minVal={minVal} 
                maxVal={maxVal}
                addBrush={false}
                isStatic={isStatic}
            />
            <Architecture data={data} 
                xVar={xVar} 
                yVar={yVar} 
                colorVar={colorVar}
                theme={theme}  
                upperLimit={250000} 
                lowerLimit={1000} 
                addBrush={true} 
                setLowerLimit={setLowerLimit} 
                setUpperLimit={setUpperLimit} 
                secondaryLL={lowerLimit} 
                secondaryUL={upperLimit} 
                minVal={minVal} 
                maxVal={maxVal}
                isStatic={isStatic}
            />
        </Charts>
    )
}

export default GroupedGenomes;