import React, {useMemo} from 'react';

import { TickText, TickLine } from './AxisParts';

// const abbreviateValue = (val) =>{
//   const updatedVal = val >= 1000 ? `${val/1000}K` : `${val}`
//    return updatedVal;
// }

const XAxis = (props) => {
  const { scale, height, axisMargin, 
          includeAxisLine, includeAxisLabel, fontSize,
          labelText } = props;

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

    let axisLabel;
    if ( includeAxisLabel ){
      axisLabel = <TickText fontSize={fontSize}
        textAnchor="start"
        transform={`translate(${(rangeMax - rangeMin)/2},${height + 25})`}>{labelText}</TickText>
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
              { value }
            </TickText>
          </g>
        ))}
        {axisLabel}

      </svg>
    )

}

XAxis.defaultProps = {
  axisMargin: 40,
  includeAxisLine: true,
  includeAxisLabel: true,
  fontSize: 10,
  labelText: 'X Axis Label'
}

export default XAxis;