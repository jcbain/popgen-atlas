
import React, { useEffect, useRef } from "react";
import * as d3 from 'd3'
import { hoverContainer, getXAxis, getYAxis, setXTick, setYTick, getX, getY, yTickGuide, getContext, getSvg, getContainer, chartTitle } from './ChartComponents'
import { drawLine } from './DrawData'

const margin = { top: 30, right: 30, bottom: 100, left: 60 };
const canvasPad = {top: 30, right: 60, bottom: 180, left: 120 };
const font = 15;
const outerWidth = 850;
const outerHeight = 350;
const ticks = 5;
const lineSize = 6;
const width = outerWidth - margin.left - margin.right;
const height = outerHeight - margin.top - margin.bottom;

export default function LineView(props) {
  const data = props.filteredData;
  const selection = props.selection;
  const minY = d3.min(data, (d) => d.y);
  const ref = useRef();

  const newData = data.filter((value) => value.x > selection[0] && value.x-1 < selection[1]);

  useEffect(() => { //Fetch data stored in indexedDB
    const container = getContainer(ref);
    container.selectAll("*").remove();

    const x = getX(newData, width);
    const y = getY(newData, minY, height);
    const chartSvg = getSvg(container, outerWidth, outerHeight, margin);
    const xAxis = getXAxis(x, ".2s");
    const yAxis = getYAxis(y, ticks);
    
    hoverContainer(chartSvg, container, data, x, width, height, canvasPad);
    const context = getContext(container, width, height, canvasPad);

    setXTick(chartSvg, xAxis, height);
    setYTick(chartSvg, yAxis);
    chartTitle(chartSvg, 'mean phenotipic divergence', '', width, height, margin, font);
    yTickGuide(chartSvg, yAxis, width);
    drawLine(lineSize, '#6f00ff', data, context, x, y);

  }, [newData]);
    
  return (
    <React.Fragment>
        <div ref={ref}></div>
    </React.Fragment>
  );
}