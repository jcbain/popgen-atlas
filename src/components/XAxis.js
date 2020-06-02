import React, {useMemo} from 'react';
import { scaleLinear } from 'd3-scale';

const abbreviateValue = (val) =>{
   return   `${val/1000}K`;
}

const XAxis = ({domain=[0, 100], scale, range=[0, 100], height, axisMargin=20, includeAxisLine=true, fontSize=10}) => {
    const ticks = useMemo(() => {
        // const xScale = scaleLinear()
        //   .domain(domain)
        //   .range(range)
        const width = range[1] - range[0]
        const pixelsPerTick = 150
        const numberOfTicksTarget = Math.max(
          1,
          Math.floor(
            width / pixelsPerTick
          )
        )
        return scale.ticks(numberOfTicksTarget)
          .map(value => ({
            value,
            xOffset: scale(value)
          }))
      }, [
          domain.join("-"),
          range.join("-")
        ]
      )
      let axisLine;
      if( includeAxisLine ){
        axisLine = <path d={[
          "M", range[0] + axisMargin, height,
          "v", 0,
          "H", range[1] - axisMargin,
          "v", 0,].join(" ")}
          fill="none"
          stroke="currentColor" />
      }

      return (
        <svg>
          {axisLine} 
          {ticks.filter(({xOffset})=> xOffset > axisMargin && xOffset < range[1] - axisMargin).map(({ value, xOffset }) => (
            <g
              key={value}
              transform={`translate(${xOffset}, ${height})`}
            >
              <line
                y1="0"
                y2="6"
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

export default XAxis;