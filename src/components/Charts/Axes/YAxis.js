import React, {useMemo} from 'react';

import { TickText } from './AxisParts';

const YAxis = (props) => {
  const { scale, width, x0, pixelsPerTick, 
          axisMargin, includeAxisLine, includeTicks, 
          includeAxisLabel, labelText, fontSize, paddingLeft } = props;
    const rangeMin = scale.range()[0];
    const rangeMax = scale.range()[1];
    const tickXMove = (0.75 * paddingLeft)
    const ticks = useMemo(() => {
        const height = rangeMax - rangeMin
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
      }, [rangeMax, rangeMin, scale, pixelsPerTick
        ]
      )
      let axisLine;
      if( includeAxisLine ){
        axisLine = <path d={[
          "M", 0, rangeMax - axisMargin,
          "h", 0,
          "V", axisMargin,
          "h", 0].join(" ")}
          fill="none"
          stroke="currentColor" />
      }

      let axisTicks;
      if ( includeTicks ){
        axisTicks = ticks.filter(({yOffset}) => yOffset > axisMargin && yOffset < rangeMax - axisMargin).map(({ value, yOffset}) => (
          <g
              key={value}
              transform={`translate(0, ${yOffset})`}
            //   transform={`translate(${width}, ${yOffset})`}
            >
              <line
                x1={x0}
                x2={width}
                stroke={"#e0e0e0"}
                strokeDasharray={5}
                strokeWidth={1}
              />
              <TickText
                key={value}
                style={{
                  fontSize: `${fontSize}px`,
                  textAnchor: "middle",
                  alignmentBaseline: "middle",
                  transform: `translateY(0px) translateX(${tickXMove}px)`
                }}>
                { value }
              </TickText>
            </g>
        ))
      }

      let axisLabel;
      if ( includeAxisLabel ) {
        axisLabel = <TickText fontSize={fontSize}
          style={{
            textAnchor: 'middle',
            transform: `translate(${0}px, ${(rangeMax - rangeMin)/2}px) rotate(90deg)`
          }

          }
          // transform={`translate(${20} ${(rangeMax - rangeMin)/2})`}
        >
          {labelText}
        </TickText>
      }


      return (
        <svg>
          {axisLine} 
          {axisTicks}
          {axisLabel}
        </svg>
      )

}

YAxis.defaultProps = {
    axisMargin: 0,
    includeAxisLine: true,
    includeTicks: true,
    fontSize: 10,
    includeAxisLabel: true,
    labelText: 'Y Axis Label',
    paddingLeft: 20,
}

export default YAxis;