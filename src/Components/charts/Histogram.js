
import React, { useEffect, useRef } from "react";
import * as d3 from 'd3'
import { getXAxis, getYAxis, setXTick, setYTick, getX, getY, yTickGuide, getContext, getSvg, getContainer, chartTitle, xScaleBand } from './ChartComponents'
import { drawBar } from './DrawData'

const margin = { top: 80, right: 40, bottom: 70, left: 70 };
const canvasPad = {top: 80, right: 80, bottom: 140, left: 140, offset: 10 };
const font = 15;
const outerWidth = 850;
const outerHeight = 350;
const ticks = 4;
const width = outerWidth - margin.left - margin.right;
const height = outerHeight - margin.top - margin.bottom;

export default function Histogram(props) {
  const data = props.filteredData;
  const ref = useRef();

  useEffect(() => { //Fetch data stored in indexedDB
    const container = getContainer(ref);
    container.selectAll("*").remove();

    const xBand = xScaleBand(data, margin, width);
    const y = getY(data, 0, height);

    const chartSvg = getSvg(container, outerWidth, outerHeight, margin);
    const xAxis = getXAxis(xBand, "");
    const yAxis = getYAxis(y, ticks);

    const context = getContext(container, width, height, canvasPad);
    setXTick(chartSvg, xAxis, height);
    setYTick(chartSvg, yAxis);
    chartTitle(chartSvg, 'count', '', width, height, margin, font);
    yTickGuide(chartSvg, yAxis, width);
    drawBar(context, data, '#6f00ff', xBand, y, height);

  }, [data]);
    
  return (
    <React.Fragment>
        <div ref={ref}></div>
    </React.Fragment>
  );
}