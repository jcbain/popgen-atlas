import styled from 'styled-components';
import React, { useEffect, useRef, useState } from "react";
import * as d3 from 'd3'
import { brush, getXAxis, getYAxis, getXTick, getYTick, getX, getY, yTickGuide, getContext, getSvg, getContainer, chartTitle } from './ChartComponents'
import { drawLine } from './DrawData'

const LineChart= styled.div`
    float: right;
    margin-top: 1%;
    margin-left: 20px;
    width: 1000px;
    height: 500px;
    background: white;
    border-radius: 10px;
`
const margin = { top: 50, right: 30, bottom: 60, left: 60 };
const canvasPad = {top: 50, right: 60, bottom: 120, left: 120 }
const font = 15
const outerWidth = 850;
const outerHeight = 350;
const width = outerWidth - margin.left - margin.right;
const height = (outerHeight - margin.top - margin.bottom)/3;

export default function GenomeArch(props) {
  const data = props.filteredData
  const children = props.children
  const ref = useRef()
  const [selection, setSelection] = useState([0, width]);

  useEffect(() => { //Fetch data stored in indexedDB
    const container = getContainer(ref)
    container.selectAll("*").remove()

    const chartSvg = getSvg(container, outerWidth, outerHeight, margin)
    const context = getContext(container, width, height, canvasPad)
    const x = getX(data, width)
    const y = getY(data, height)
    const xAxis = getXAxis(x)
    const yAxis = getYAxis(y, 2)
    const xTick = getXTick(chartSvg, xAxis, height)
    const yTick = getYTick(chartSvg, yAxis)

    yTickGuide(chartSvg, y, 2, width)
    brush(chartSvg, x, setSelection, width, height)
    drawLine(d3.zoomIdentity, 5, '#6f00ff', data, context, x, y)

    },[data])
    
    return (
      <React.Fragment>
        <LineChart>
          <div ref={ref}>
          </div>
          {children(selection)}
        </LineChart>
      </React.Fragment>
    );
}

