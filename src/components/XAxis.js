import React, {useMemo} from 'react';

const abbreviateValue = (val) =>{
   return   `${val/1000}K`;
}

const XAxis = ({scale, height, axisMargin=20, includeAxisLine=true, fontSize=10}) => {
    const rangeMin = scale.range()[0];
    const rangeMax = scale.range()[1];
    const ticks = useMemo(() => {
        const width = rangeMax - rangeMin
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