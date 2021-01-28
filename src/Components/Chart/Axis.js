import React, { useRef, useEffect } from "react";
import {dashedLine, drawText, fillRectangle} from './CanvasFunctions'

export default function Axis(props) {
    const {
        width,
        height,
        padding,
        chartWidth,
        chartHeight,
        font,
        maxX,
        maxY,
        precision,
        xGuides,
        yGuides,
        gColor,
        textColor,
        guideOffset,
        titleX,
        titleY,
        textSize} = props

    const ref = useRef()
    const tickSize = 5
    const roundCorner = 20
    
    useEffect( () => {
      let canvas = ref.current
      let ctx = canvas.getContext('2d')

      ctx.clearRect(0, 0, width, height)
      fillRectangle(ctx, '#ffffff','#ffffff', 1.0, 1.0, font, font, width-roundCorner, height-roundCorner, roundCorner, roundCorner)

      drawYGuide(ctx)
      LabelsXAxis(ctx)
      LabelsYAxis(ctx)
      titleXAxis(ctx)
      titleYAxis(ctx)
    });

    const drawYGuide = (ctx) => { // Draws y guide lines
      const startX = padding+tickSize
      const endX = chartWidth+padding
      
      Array(yGuides).fill(0).map((_, index) => {
        const ratio = (index + guideOffset) / yGuides
        const yOffset = (chartHeight - ratio * chartHeight + padding)-tickSize

        dashedLine(ctx, startX, yOffset, endX, yOffset, gColor, 10, 2)
      });
    };
  
    const LabelsXAxis = (ctx) => { // Where to change X label
      const xIncrement = Math.ceil(maxX/xGuides)

      Array(xGuides+1).fill(0).map((_, index) => {
        const ratio = index / xGuides
        const temp = maxX * (ratio)
        const xLabel = (temp - (temp % xIncrement))
        const xOffset = (xLabel / maxX) * chartWidth + padding - font

        if(parseFloat(xLabel).toFixed(1) != 0) {
          const yOffset = chartHeight - chartHeight * (guideOffset/yGuides) + padding + font + tickSize
          drawText(ctx, textColor, xLabel+"k", "13pt Roboto Slab", xOffset, yOffset)
        };
      });
    };
  
    const LabelsYAxis = (ctx) => { // Y labels
      Array(yGuides+1).fill(0).map((_, index) => {
        const ratio = index / yGuides
        const yLabel = (maxY * ratio)

        if(parseFloat(yLabel) != 0) {
          const yOffset = (chartHeight - (yLabel / maxY) * chartHeight + padding)
          drawText(ctx, textColor, yLabel.toFixed(precision), "13pt Roboto", padding-(font+tickSize+precision), yOffset)
        };
      });
    };
    
    const titleXAxis = (ctx) => {
      const yOffset = chartHeight - chartHeight * (guideOffset/yGuides) + padding + font + tickSize
      const titleOffX = (chartWidth + padding) / 2
      drawText(ctx, textColor, titleX, "15pt Roboto Slab", titleOffX, yOffset+(font+tickSize+textSize))
    }
    
    const titleYAxis = (ctx) => {
      ctx.save();
      ctx.translate(padding-(font+tickSize+precision+(textSize*2)), padding+(chartHeight-((textSize-2.5)*titleY.length))/2)
      ctx.rotate(90*Math.PI/180);
      drawText(ctx, textColor, titleY, "15pt Roboto Slab",0, 0)
      ctx.restore();
    }

    return (
        <canvas id="axis" ref={ref} width={width} height={height} style={{zIndex:2, position: 'inherit'}}></canvas>
    );
}