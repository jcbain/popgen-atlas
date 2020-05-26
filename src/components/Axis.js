import React, {useMemo} from 'react';
import { scaleLinear } from 'd3-scale';


const Axis = ({domain=[0, 100], range=[0, 100], height}) => {
    const ticks = useMemo(() => {
        const xScale = scaleLinear()
          .domain(domain)
          .range(range)
        const width = range[1] - range[0]
        const pixelsPerTick = 30
        const numberOfTicksTarget = Math.max(
          1,
          Math.floor(
            width / pixelsPerTick
          )
        )
        return xScale.ticks(numberOfTicksTarget)
          .map(value => ({
            value,
            xOffset: xScale(value)
          }))
      })

      return (
        <svg>
          <path
            d={[
              "M", range[0], 0,
              "v", height,
              "H", range[1],
              "v", 0,
            ].join(" ")}
            fill="none"
            stroke="currentColor"
          />
          {ticks.map(({ value, xOffset }) => (
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
                  fontSize: "10px",
                  textAnchor: "middle",
                  transform: "translateY(20px)"
                }}>
                { value }
              </text>
            </g>
          ))}
        </svg>
      )

}

export default Axis;