import * as React from "react"

function Buddy(props) {
  return (
    <svg
      id="prefix__Layer_1"
      data-name="Layer 1"
      viewBox="0 0 87.69 56.59"
      width="10%"
      {...props}
    >
      {/* <defs>
        <style>
          {".prefix__cls-1{fill:none;stroke:#0d87ff;stroke-miterlimit:10}"}
        </style>
      </defs> */}
      <path
        className="prefix__cls-1"
        d="M6.5 47.5a12.81 12.81 0 013-5c8-8.78 32-22.74 56-13 12.51 5.08 29.17 18.28 27 30-3.24 17.52-48.44 31.31-71 15-6.65-4.8-18-17.04-15-27z"
        transform="translate(-5.5 -25.68)"
        fill="lightblue"
        stroke="blue"
      />
      <ellipse
        className="prefix__cls-1"
        cx={30.5}
        cy={26.32}
        rx={4.5}
        ry={5.5}
      />
      <ellipse className="prefix__cls-1" cx={52.5} cy={28.82} rx={4.5} ry={6} />
      <path
        className="prefix__cls-1"
        d="M41.5 59.5a5.37 5.37 0 009-1M20.5 45.5s-4-1-4 2M74.78 53.39s-.76-4-3.49-2.8"
        transform="translate(-5.5 -25.68)"
        fill="none"
        stroke="black"
      />
    </svg>
  )
}

export default Buddy