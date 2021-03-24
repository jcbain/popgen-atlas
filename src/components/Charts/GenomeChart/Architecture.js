import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { scaleLinear, scaleBand, interpolateHcl, interpolateHsl } from 'd3'
import { range } from 'lodash';

import useResizeObserver from '../../../hooks/useResizeObserver'
import useDataSummaries from '../../../hooks/useDataSummaries'
import Brush from './Brush'
import useTheme from '../../../hooks/useTheme'
import XAxis from '../axes/XAxis'

const StyledCanvas = styled.canvas`
    position: absolute;
    width: 100%;
    height: 75%;
`

const StyledForeign = styled.foreignObject`
    width: 100%;
    height: 100%;
`

// TODO: use theme variables for all colors including gray
// TODO: make color vars dynamic with props

const Architecture = ({ xVar, yVar, data, upperLimit, lowerLimit, addBrush, setLowerLimit, setUpperLimit, secondaryUL, secondaryLL, minVal, maxVal}) => {
    const ref = useRef()
    const [ svgRef, observedEntry ] = useResizeObserver();
    const [ width, setWidth ] = useState()
    const [ height, setHeight ] = useState()
    const { theme } = useTheme();

    const newData = data.filter( d => d.output_gen <= upperLimit && d.output_gen >=lowerLimit)
    const { minY, maxY, uniqX } = useDataSummaries(newData, xVar, yVar)

    const uniqY = range(minY, maxY + 1)
    

    const colorScaleUp = scaleLinear().domain([0, maxVal]).range([theme.minGreaterZeroColor, theme.maxGreaterZeroColor]).interpolate(interpolateHcl)
    const colorScaleDown = scaleLinear().domain([minVal, 0]).range([theme.minLessZeroColor, theme.maxLessZeroColor]).interpolate(interpolateHcl)
   



    useEffect(() => {
        const canvas = ref.current;
        const context = canvas.getContext('2d');
        canvas.width = 1000;
        canvas.height = 1000;
        context.clearRect(0, 0, canvas.width, canvas.height)
    

        const xBand = scaleBand().domain(uniqX).range([0, canvas.width])
        const yBand = scaleBand().domain(uniqY).range([0, canvas.height])
        

        newData.forEach((v, i) => {
            if(secondaryLL) {
                if(v.output_gen < secondaryLL || v.output_gen >= secondaryUL){
                    context.fillStyle = 'lightgray'
                } else {
                    context.fillStyle = v.effect_size_freq_diff < 0 ? colorScaleDown(v.effect_size_freq_diff) : colorScaleUp(v.effect_size_freq_diff)
                }

            } else {
                context.fillStyle = v.effect_size_freq_diff < 0 ? colorScaleDown(v.effect_size_freq_diff) : colorScaleUp(v.effect_size_freq_diff)

            }
            context.fillRect(xBand(v[xVar]), yBand(v[yVar]), xBand.bandwidth(), yBand.bandwidth())
            
        })



    }, [newData, xVar, yVar, width])



    useEffect(() => {
        if(observedEntry.target){
          const { target } = observedEntry;
          setWidth(target.clientWidth)        
          setHeight(target.clientHeight * 0.75)

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
            <StyledForeign>
                <StyledCanvas ref={ref}></StyledCanvas>

            </StyledForeign>
            {addBrush && <Brush width={width} height={height} xScale={xScale} setUpperLimit={setUpperLimit} setLowerLimit={setLowerLimit}/>}
            <XAxis width={width} height={height} scale={xScale} includeAxisLine={false}/>
        </svg>
    )
}

export default Architecture;