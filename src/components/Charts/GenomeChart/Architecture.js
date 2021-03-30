import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { scaleLinear, scaleBand, interpolateHcl } from 'd3'
import { range } from 'lodash';

import useResizeObserver from '../../../hooks/useResizeObserver'
import useDataSummaries from '../../../hooks/useDataSummaries'
import useFriendlyLabels from '../../../hooks/useFriendlyLabels'
import Brush from './Brush'
import XAxis from '../axes/XAxis'

const StyledCanvas = styled.canvas`
    position: absolute;
    width: 100%;
    height: ${({ heightperc }) => heightperc}%;
`

const StyledForeign = styled.foreignObject`
    width: 100%;
    height: 100%;
`


const Architecture = ({ data, xVar, yVar, colorVar, theme, upperLimit, 
                        lowerLimit, addBrush, setLowerLimit, setUpperLimit, 
                        secondaryUL, secondaryLL, minVal, maxVal}) => {
    const ref = useRef()
    const { friendlyLabels } = useFriendlyLabels()
    const [ svgRef, observedEntry ] = useResizeObserver();
    const [ width, setWidth ] = useState()
    const [ height, setHeight ] = useState()
    const heightModifier = addBrush ? .6 : .75;
    const heightPerc = heightModifier * 100;

    const newData = data.filter( d => d[xVar] <= upperLimit && d[xVar] >=lowerLimit)
    const { minY, maxY, uniqX } = useDataSummaries(newData, xVar, yVar)

    const uniqY = range(minY, maxY + 1)
    
    const colorScale = colorScaleCreator(minVal, maxVal, theme)
    
    useEffect(() => {
        const canvas = ref.current;
        const context = canvas.getContext('2d');
        canvas.width = 1000;
        canvas.height = 500;
        context.clearRect(0, 0, canvas.width, canvas.height)
    

        const xBand = scaleBand().domain(uniqX).range([0, canvas.width])
        const yBand = scaleBand().domain(uniqY).range([0, canvas.height])
        
        newData.forEach((v, i) => {
            if(secondaryLL) {
                if(v[xVar] < secondaryLL || v[xVar] >= secondaryUL){
                    context.fillStyle = theme.nonFocusColor;
                } else {
                    context.fillStyle = colorScale(v[colorVar])
                }

            } else {
                context.fillStyle = colorScale(v[colorVar])

            }
            context.fillRect(xBand(v[xVar]), yBand(v[yVar]), xBand.bandwidth(), yBand.bandwidth())
            
        })

    }, [newData, xVar, yVar, width, colorVar])



    useEffect(() => {
        if(observedEntry.target){
          const { target } = observedEntry;
          setWidth(target.clientWidth)     
          // TODO: FIX THIS IS TOO HACKY AND DEPENDS ON ELEMENT ABOVE   
          addBrush ? setHeight(75 * heightModifier) : setHeight(300 * heightModifier)
        }
      }, [observedEntry])

   
    const xScale = scaleBand().domain(uniqX).range([0, width])

    xScale.invert = function(i){
        const eachBand = this.step()
        const adjuster = this.range()[0]

        const index = Math.round(( i -adjuster) / eachBand)

        const value = this.domain()[index]
        return value ? value: this.domain()[this.domain().length - 1]
    }


    return (
        <svg ref={svgRef} width="100%" height="100%">
            <XAxis width={width} height={height} scale={xScale} includeAxisLine={false} includeAxisLabel={addBrush ? true : false} labelText={friendlyLabels[xVar]}/>
            <StyledForeign>
                <StyledCanvas ref={ref} heightperc={heightPerc}></StyledCanvas>

            </StyledForeign>
            {addBrush && <Brush width={width} height={height} xScale={xScale} setUpperLimit={setUpperLimit} setLowerLimit={setLowerLimit}/>}
        </svg>
    )
}

function colorScaleCreator(minVal, maxVal, theme){
    const colorScaleUp = scaleLinear().domain([0, maxVal]).range([theme.minGreaterZeroColor, theme.maxGreaterZeroColor]).interpolate(interpolateHcl)
    const colorScaleDown = scaleLinear().domain([minVal, 0]).range([theme.minLessZeroColor, theme.maxLessZeroColor]).interpolate(interpolateHcl)

    return (i) => i === 0 ? theme.zeroColor : i < 0 ? colorScaleDown(i) : colorScaleUp(i)

}

export default Architecture;