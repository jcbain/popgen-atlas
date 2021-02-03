
import React, { useEffect, useRef } from "react";
import { getXAxis, getYAxis, getXTick, getYTick, getX, getY, getContext, getSvg, getContainer, chartTitle } from './ChartComponents'
import { drawLocus } from './DrawData'
import * as d3 from 'd3'

const margin = { top: 70, right: 30, bottom: 50, left: 60 };
const canvasPad = {top: 70, right: 60, bottom: 100, left: 120 }
const font = 15
const outerWidth = 850;
const outerHeight = 350;
const width = outerWidth - margin.left - margin.right;
const height = outerHeight - margin.top - margin.bottom;

export default function DisplayView(props) {
  const ref = useRef()
  const data = props.filteredData
  const selection = props.selection

  const newData = data.filter((value, index) => value.x > selection[0] && value.x-1 < selection[1])

  useEffect(() => { //Fetch data stored in indexedDB
    const container = getContainer(ref)
    container.selectAll("*").remove()

    const chartSvg = getSvg(container, outerWidth, outerHeight, margin)
    const context = getContext(container, width, height, canvasPad)
    const x = getX(newData, width)
    const y = getY(newData, height)
    const xAxis = getXAxis(x)
    const yAxis = getYAxis(y, 4)
    const xTick = getXTick(chartSvg, xAxis, height)
    const yTick = getYTick(chartSvg, yAxis)

    chartTitle(chartSvg, 'locus', 'generation', width, height, margin, font)
    drawLocus(d3.zoomIdentity, data, context, x, y, 1.5)
    },[newData])
    
    return (
      <React.Fragment>
          <div ref={ref}></div>
      </React.Fragment>
    );
}