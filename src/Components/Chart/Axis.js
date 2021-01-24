import React, { useRef, useEffect } from "react";

export default function Axis(props) {
    const {
        chartRatio,
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
        guideOffset} = props

    const ref = useRef()
    const tickSize = 5

    function drawYGuide(ctx) { // Draws y guide lines
      const startX = padding+tickSize
      const endX = width - padding
      
      Array(yGuides).fill(0).map((_, index) => {
        const ratio = (index + guideOffset) / yGuides
        const yOffset = chartHeight - chartHeight * ratio + padding

        ctx.setLineDash([10, 20])
        ctx.lineWidth = 3
        ctx.strokeStyle = gColor

        ctx.beginPath()
        ctx.moveTo(startX, yOffset)
        ctx.lineTo(endX, yOffset)
        ctx.stroke()
      });
    };
  
    function LabelsXAxis(ctx) { // Where to change X label
      const xIncrement = Math.ceil(maxX/xGuides)

      Array(xGuides+1).fill(0).map((_, index) => {
        const ratio = index / xGuides
        const temp = maxX * (ratio)
        const xLabel = (temp - (temp % xIncrement))
        const xOffset = (xLabel / maxX) * chartWidth + padding - font

        if(parseFloat(xLabel).toFixed(1) != 0) {
          const yOffset = chartHeight - chartHeight * (guideOffset/yGuides) + padding + font + tickSize

          ctx.font = "17px Comic Sans MS"
          ctx.fillStyle = "#4f4f4f"
          ctx.fillText(xLabel+"k", xOffset, yOffset)
        };
      });
    };
  
    function LabelsYAxis(ctx) { // Y labels
      Array(yGuides+1).fill(0).map((_, index) => {
        const ratio = index / yGuides
        const yLabel = maxY * ratio

        if(parseFloat(yLabel).toFixed(precision) != 0) {
          const yOffset = chartHeight - chartHeight * ratio + padding + font / chartRatio

          ctx.font = "17px Comic Sans MS"
          ctx.fillStyle = "#4f4f4f"
          ctx.fillText(yLabel, padding-(font+tickSize), yOffset)
        };
      });
    };
    
    useEffect( () => {
        let canvas = ref.current
        let ctx = canvas.getContext('2d')

        ctx.clearRect(0, 0, width, height)
        ctx.fillStyle="#ffffff"
        ctx.fillRect(font, font, width, height)
        ctx.lineCap = 'round'

        drawYGuide(ctx)
        LabelsXAxis(ctx)
        LabelsYAxis(ctx)
      }
    );

    return (
        <canvas id="axis" ref={ref} width={width} height={height} style={{zIndex:2, position: 'inherit'}}></canvas>
    );
}