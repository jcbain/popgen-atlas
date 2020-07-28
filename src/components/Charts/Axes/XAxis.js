import React, {useMemo} from 'react';

import { TickText, TickLine } from './AxesStyles';

const abbreviateValue = (val) =>{
  const updatedVal = val >= 1000 ? `${val/1000}K` : `${val}`
   return updatedVal;
}

const XAxis = ({scale, height, axisMargin=20, includeAxisLine=true, fontSize=10}) => {
    const rangeMin = scale.range()[0];
    const rangeMax = scale.range()[1];
    const ticks = useMemo(() => {
        const width = rangeMax - rangeMin
        const pixelsPerTick = 100
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
      }, [rangeMax, rangeMin, scale]
      )
      let axisLine;
      if( includeAxisLine ){
        axisLine = <path d={[
          "M", rangeMin + axisMargin, height,
          "v", 0,
          "H", rangeMax - axisMargin,
          "v", 0,].join(" ")}
          fill="none"
          stroke="currentColor" />
      }

      return (
        <svg>
          {axisLine} 
          {ticks.filter(({xOffset})=> xOffset > axisMargin && xOffset < rangeMax - axisMargin).map(({ value, xOffset }) => (
            <g
              key={value}
              transform={`translate(${xOffset}, ${height})`}
            >
              <TickLine
                y1="2"
                y2="6"
              />
              <TickText
                key={value}
                style={{
                  fontSize: `${fontSize}px`,
                  textAnchor: "middle",
                  transform: "translateY(15px) translateX(0px)"
                }}>
                { abbreviateValue(value) }
              </TickText>
            </g>
          ))}
        </svg>
      )

}

export default XAxis;