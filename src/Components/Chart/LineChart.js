import React, { useRef, useEffect } from "react";
import Axis from './Axis';

export default function LineChart(props) {
  const ref = useRef() //Ref to current canvas, to rerender
  const data = props.filteredData

  const chartRatio = 2
  const width = 1000, // Height and width of canvas
        height = 500

  const font = width / 50
  const maxX = Math.max(...data.map(e => e.x)) // Max output_gen in data
  const maxY = Math.max(...data.map(e => e.y)) // Max y avergae to graph

  const digits = parseFloat(maxY.toString()).toFixed(1).length + 1 // Wtf does this do

  const padding = 75
  const chartWidth = 850
  const chartHeight = 300

  useEffect( () => { // Draws one continous? line
    let canvas = ref.current
    let ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, width, height)

    lines(ctx)
  });

  function lines(ctx) {
    ctx.lineCap = 'round'
    ctx.lineWidth = 5
    ctx.strokeStyle = '#6f00ff'   
    ctx.beginPath()

    data.forEach(elem => {
      const x = (elem.x / maxX) * chartWidth + padding
      const y = chartHeight - (elem.y / maxY) * chartHeight + padding
      ctx.lineTo(x, y)
    });
    
    ctx.stroke()
  };

  //@TODO implement hover event and brush
  return (
    <div>
      <canvas id="lineC" ref={ref} width={width} height={height} style={{zIndex:1, position: 'absolute'}}></canvas>

      <Axis
                chartRatio={chartRatio}
                width={width}
                height={height}
                padding={padding}
                chartWidth={chartWidth}
                chartHeight={chartHeight}
                font={font}
                maxX={maxX}
                maxY={Math.ceil(maxY)}
                precision={1}
                xGuides={5}
                yGuides={5}
                gColor={'#d6d6d6'} // Y line guide color
                guideOffset={1}
            />
    </div>
  );
};

