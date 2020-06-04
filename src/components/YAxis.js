import React, {useMemo} from 'react';

const YAxis = ({scale, width, axisMargin=0, includeAxisLine=true, includeLabels=true, fontSize=10}) => {
    const rangeMin = scale.range()[0];
    const rangeMax = scale.range()[1];
    const ticks = useMemo(() => {
        const height = rangeMax - rangeMin
        const pixelsPerTick = 50
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
      }, [rangeMax, rangeMin, scale
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

      let axisLabels;
      if ( includeLabels ){
        axisLabels = ticks.filter(({yOffset}) => yOffset > axisMargin && yOffset < rangeMax - axisMargin).map(({ value, yOffset}) => (
          <g
              key={value}
              transform={`translate(0, ${yOffset})`}
            //   transform={`translate(${width}, ${yOffset})`}
            >
              <line
                x1="0"
                x2={width}
                stroke={"#e0e0e0"}
              />
              <text
                key={value}
                style={{
                  fontSize: `${fontSize}px`,
                  textAnchor: "end",
                  transform: "translateY(0px) translateX(50px)"
                }}>
                { value }
              </text>
            </g>
        ))
      }


      return (
        <svg>
          {axisLine} 
          {axisLabels}
        </svg>
      )

}

export default YAxis;