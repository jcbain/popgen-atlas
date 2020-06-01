import React, {useMemo} from 'react';
import { scaleLinear } from 'd3-scale';

const abbreviateValue = (val) =>{
   return   `${val/1000}K`;
}

const YAxis = ({domain=[0, 100], range=[0, 100], width, axisMargin=20, includeAxisLine=true, fontSize=10}) => {
    const ticks = useMemo(() => {
        const yScale = scaleLinear()
          .domain(domain)
          .range(range)
        const width = range[1] - range[0]
        const pixelsPerTick = 150
        const numberOfTicksTarget = Math.max(
          1,
          Math.floor(
            width / pixelsPerTick
          )
        )
        return yScale.ticks(numberOfTicksTarget)
          .map(value => ({
            value,
            yOffset: yScale(value)
          }))
      }, [
          domain.join("-"),
          range.join("-")
        ]
      )
      let axisLine;
      if( includeAxisLine ){
        axisLine = <path d={[
          "M", range[0] + axisMargin, width,
          "v", 0,
          "H", range[1] - axisMargin,
          "v", 0,].join(" ")}
          fill="none"
          stroke="currentColor" />
      }

      return (
        <svg>
          {axisLine} 
          {ticks.filter(({yOffset})=> yOffset > axisMargin && yOffset < range[1] - axisMargin).map(({ value, yOffset }) => (
            <g
              key={value}
              transform={`translate(${width}, ${yOffset})`}
            >
              <line
                x1="0"
                x2="6"
                stroke="currentColor"
              />
              <text
                key={value}
                style={{
                  fontSize: `${fontSize}px`,
                  textAnchor: "middle",
                  transform: "translateY(25px) translateX(0px)"
                }}>
                { abbreviateValue(value) }
              </text>
            </g>
          ))}
        </svg>
      )

}

export default YAxis;