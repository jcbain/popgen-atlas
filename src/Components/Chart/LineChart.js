import React, { useRef, useEffect, useState } from "react";
import Axis from './Axis';
import {dashedLine, drawText, fillRectangle} from './CanvasFunctions'

export default function LineChart(props) {
  const ref = useRef() //Ref to current canvas, to rerender
  const[ctx, setCtx] = useState ()
  const[event, setEvent] = useState(false)

  const data = props.filteredData
  const chartRatio = 2
  const width = 1000, // Height and width of canvas
        height = 400
  const font = width / 50
  const maxX = Math.max(...data.map(e => e.x)) // Max output_gen in data
  const maxY = Math.max(...data.map(e => e.y)) // Max y avergae to graph
  const padding = 100
  const chartWidth = 850
  const chartHeight = 250
  const textWidth = 80
  const textHeight = 35

  useEffect(() => { // Draws one continous line
    let canvas = ref.current
    let ctx = canvas.getContext('2d')

    setCtx(ctx)
    setEvent(true)
    ctx.clearRect(0, 0, width, height)
    
    lines()
  });

  const lines = () => {
    let canvas = ref.current
    let ctx = canvas.getContext('2d')

    ctx.lineWidth = 5
    ctx.strokeStyle = '#6f00ff'
    ctx.lineJoin = "round";
    ctx.beginPath()

    data.forEach(elem => {
      const x = (elem.x / maxX) * chartWidth + padding
      const y = chartHeight - (elem.y / maxY) * chartHeight + padding
      ctx.lineTo(x, y)
    });

    ctx.stroke()
  };

  const hoverLine = (mouseX) => {
    dashedLine(ctx, mouseX, padding-(textHeight/2), mouseX, (chartHeight+padding-textHeight), '#919191', 10, 3)
  }

  const displayValue = (x, y, yVal) => {
    fillRectangle(ctx, '#ffffff', '#6f00ff', 0.7, 0.7, x, y, textWidth, textHeight, 10, 5)
    drawText(ctx, '#6f00ff', yVal, "15pt Roboto Slab", x+(textHeight)/2, y+(textWidth-(17*2))/2)
  }

  const mouseEnter = (e) => {
    const mouseX = (e.clientX)
  
    if (event&&(mouseX >= padding && mouseX <= chartWidth+padding)) {
      ctx.clearRect(0, 0, width, height)
      lines()
      hoverLine(mouseX)
    
      for(var i = 1; i<data.length; i++) {
        const x = Math.ceil((data[i].x / maxX) * chartWidth + padding)
        const y = Math.ceil(chartHeight - (data[i].y / maxY) * chartHeight + padding)
  
        if (mouseX == x) {
          displayValue(x, y, (data[i].y).toFixed(3))
          break;
        } else if (mouseX < x) {
          displayValue(x, y, (data[i-1].y).toFixed(3))
          break;
        }
      }
    }
  }

  const mouseExit = (e) => {
    if (event) {
      ctx.clearRect(0, 0, width, height)
      lines()
    }
  }

  return (
    <div>
      <canvas
        id="lineC"
        ref={ref}
        width={width}
        height={height}
        style={{zIndex:1, position: 'absolute'}}
        onMouseMove={mouseEnter}
        onMouseLeave={mouseExit}>
      </canvas>

      <Axis
        chartRatio={chartRatio}
        width={width}
        height={height}
        padding={padding}
        chartWidth={chartWidth}
        chartHeight={chartHeight}
        font={font}
        maxX={maxX}
        maxY={maxY}
        precision={2}
        xGuides={5}
        yGuides={5}
        gColor={'#e3e3e3'} // Y line guide color
        textColor={'#4f4f4f'}
        guideOffset={1}
        titleX={'generation'}
        titleY={'mean phenotypic divergence'}
        textSize={13}
    />
    </div>
  );
};