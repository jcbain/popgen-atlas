import React, {useMemo} from 'react';
import { scaleLinear } from 'd3-scale';


const YAxis = ({domain=[0, 100], scale, range=[0, 100], width, axisMargin=0, includeAxisLine=true, fontSize=10}) => {
    const ticks = useMemo(() => {
        // const yScale = scaleLinear()
        //   .domain(domain)
        //   .range(range)
        const height = range[1] - range[0]
        const pixelsPerTick = 20
        const numberOfTicksTarget = Math.max(
          1,
          Math.floor(
            height / pixelsPerTick
          )
        )
        return scale.ticks(numberOfTicksTarget)
          .map(value => ({
            value,
            yOffset: scale(value)
          }))
      }, [
          domain.join("-"),
          range.join("-")
        ]
      )
      let axisLine;
      if( includeAxisLine ){
        axisLine = <path d={[
          "M", 0, range[1] - axisMargin,
          "h", 0,
          "V", axisMargin,
          "h", 0].join(" ")}
          fill="none"
          stroke="currentColor" />
      }


      return (
        <svg>
          {axisLine} 
          {ticks.filter(({yOffset})=> yOffset > axisMargin && yOffset < range[1] - axisMargin).map(({ value, yOffset }) => (
            <g
              key={value}
              transform={`translate(0, ${yOffset})`}
            //   transform={`translate(${width}, ${yOffset})`}
            >
              <line
                x1="0"
                x2={width}
                stroke={value < 0.01 && value > -0.01 ? "green" : "grey"}
              />
              <text
                key={value}
                style={{
                  fontSize: `${fontSize}px`,
                  textAnchor: "middle",
                  transform: "translateY(0px) translateX(20px)"
                }}>
                { value }
              </text>
            </g>
          ))}
        </svg>
      )

}

export default YAxis;