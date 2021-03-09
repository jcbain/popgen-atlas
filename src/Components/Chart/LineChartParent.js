import styled from 'styled-components';
import React, { useEffect, useRef, useState } from "react";
import * as d3 from 'd3'
import { brush, getXAxis, getYAxis, setXTick, setYTick, getX, getY, yTickGuide, getContext, getSvg, getContainer, chartTitle} from './ChartComponents'
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
const margin = { top: 70, right: 30, bottom: 50, left: 60 };
const canvasPad = {top: 70, right: 60, bottom: 100, left: 120 };
const font = 15;
const outerWidth = 850;
const outerHeight = 200;
const width = outerWidth - margin.left - margin.right;
const height = (outerHeight - margin.top - margin.bottom);

export default function GenomeArch(props) {
  const data = props.filteredData;
  const children = props.children;
  const minY = d3.min(data, (d) => d.y);
  const ref = useRef();
  const [selection, setSelection] = useState([0, width]);

  useEffect(() => {
    const container = getContainer(ref);
    container.selectAll("*").remove();

    const chartSvg = getSvg(container, outerWidth, outerHeight, margin);
    const context = getContext(container, width, height, canvasPad);
    const x = getX(data, width);
    const y = getY(data, minY, height);
    const xAxis = getXAxis(x, ".2s");
    const yAxis = getYAxis(y, 2);

    setXTick(chartSvg, xAxis, height);
    setYTick(chartSvg, yAxis);
    chartTitle(chartSvg, '', 'generation', width, height, margin, font);
    yTickGuide(chartSvg, yAxis, width);
    brush(chartSvg, x, setSelection, width, height);
    drawLine(5, '#6f00ff', data, context, x, y);

  },[data]);
    
  return (
    <React.Fragment>
      <LineChart>
        {children(selection)}
        <div ref={ref}></div>
      </LineChart>
    </React.Fragment>
  );
}

