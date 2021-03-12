import styled from 'styled-components';
import React, { useEffect, useRef, useState } from "react";
import {brush, getXAxis, getYAxis, setXTick, setYTick, getX, getY, getContext, getSvg, getContainer, chartTitle} from './ChartComponents'
import { drawLocus } from './DrawData'
import * as d3 from 'd3'

const GenomeChart= styled.div`
  margin-left: 1%;
  width: 100%;
  height: 450px;
  background: white;
  border-radius: 10px;
`
const margin = { top: 60, right: 30, bottom: 80, left: 60 };
const canvasPad = {top: 60, right: 60, bottom: 160, left: 120 };
const font = 15;
const outerWidth = 850;
const outerHeight = 195;
const width = outerWidth - margin.left - margin.right;
const height = (outerHeight - margin.top - margin.bottom);

export default function GenomeArch(props) {
  const data = props.filteredData;
  const children = props.children;
  const minY = d3.min(data, (d) => d.y);

  const ref = useRef();
  const [selection, setSelection] = useState([0, width]);

  useEffect(() => { //Fetch data stored in indexedDB
    const container = getContainer(ref);
    container.selectAll("*").remove();

    const chartSvg = getSvg(container, outerWidth, outerHeight, margin);
    const context = getContext(container, width, height, canvasPad);
    const x = getX(data, width);
    const y = getY(data, minY, height);
    const xAxis = getXAxis(x, ".2s");
    const yAxis = getYAxis(y, 0);

    setXTick(chartSvg, xAxis, height);
    setYTick(chartSvg, yAxis);
    chartTitle(chartSvg, '', 'generation', width, height, margin, font);
    brush(chartSvg, x, setSelection, width, height);
    drawLocus(data, context, x, y, 0.5);

  },[data]);
    
    return (
      <React.Fragment>
        <GenomeChart>
          {children(selection)}
          <div ref={ref}></div>
        </GenomeChart>
      </React.Fragment>
    );
}