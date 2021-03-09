import * as d3 from 'd3'

export function getContainer(ref) {
    return d3.select(ref.current);
};

export function getSvg(container, outerWidth, outerHeight, margin) {
    return container.append('svg')
                    .attr('width', outerWidth)
                    .attr('height', outerHeight)
                    .style('position', 'absolute')
                    .style('margin-left', margin.left + 'px')
                    .append('g')
                    .attr('transform', `translate(${margin.left}, ${margin.top})`);
};

function showToolTip(toolTip, pointer, height, dataBox, yVal, text) {
    const dashSize = 10;

    toolTip.attr('stroke', 'black')
    .attr('x1', pointer[0])
    .attr('x2', pointer[0])
    .attr('y1', -dashSize)
    .attr('y2', height+dashSize)
    .style("stroke-dasharray",(dashSize, dashSize))
    .style("opacity", 0.55)
    .attr("stroke-width", 4);

    dataBox.attr('display', 'black')
            .style('fill', 'white')
            .style('opacity', .85)
            .style('stroke', '#8231eb')
            .style('stroke-width', 4)
            .style("stroke-linejoin", "round")
            .attr('x', pointer[0] + dashSize)
            .attr('y', pointer[1] - dashSize);

    text.attr('display', 'black')
        .attr('fill', '#6f00ff')
        .attr("font-weight", 'bold')
        .style("font-size", "17px")
        .attr('x', pointer[0] + 28)
        .attr('y', pointer[1] + dashSize)
        .text(yVal);
}

export function hoverContainer(chartSvg, container, data, x, width, height, canvasPad) {
    const bisect = d3.bisector(function(d) { return d.x; }).left;
    const toolTip = chartSvg.append('line');
    const dataBox = chartSvg.append('rect')
                    .attr('height', 30)
                    .attr('width', 80)
                    .attr('display', 'none');

    const text = chartSvg.append('text');

    container.append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('margin-left', canvasPad.left + 'px')
            .style('margin-top', canvasPad.top + 'px')
            .style('position', 'absolute')
            .attr('class', 'svgMouseOver')
            .on('mousemove', function (e) {
                if (data.length > 0) {
                    const pointer = d3.pointer(e);
                    const mouse = x.invert(pointer[0]);
                    const index = bisect(data, mouse, 1);
                    const yVal = data[index].y.toFixed(3);
                    showToolTip(toolTip, pointer, height, dataBox, yVal, text);
                }
            }).on('mouseout', function () {
                toolTip.attr('stroke', 'none')
                dataBox.attr('display', 'none')
                text.attr('display', 'none')
            });
};

export function getContext(container, width, height, canvasPad) {
    const dataCanvas = container.append('canvas')
                                .attr('width', width)
                                .attr('height', height)
                                .style('margin-left', canvasPad.left + 'px')
                                .style('margin-top', canvasPad.top + 'px')
                                .attr('class', 'canvasPlot');

    return dataCanvas.node().getContext('2d');
};

export function getX(data, width) {
    return d3.scaleLinear()
             .domain([d3.min(data, (d) => d.x), d3.max(data, (d) => d.x)])
             .range([0, width]);
};

export function getY(data, minY, height) {
    return d3.scaleLinear()
             .domain([minY, Math.ceil(d3.max(data, (d) => d.y))])
             .range([height, 0]);
};

export function getXAxis(x, format) {
    return d3.axisBottom(x)
             .ticks(4)
             .tickFormat(d3.format(format));
};

export function getYAxis(y, tickNum) {
    return d3.axisLeft(y).ticks(tickNum);
};

export function xScaleBand(data, margin, width) {
    return d3.scaleBand()
            .domain(data.map(d => d.x))
            .range([0, width])
            .padding(0.2)
}

export function yTickGuide(chartSvg, yAxis, width) {
    chartSvg.append('g') 
            .style("stroke-dasharray",("7, 15"))
            .style("stroke-linecap", "round")
            .style("opacity", 0.13)
            .attr("stroke-width", 2.5)
            .call(yAxis.tickSize(-width).tickFormat(""))
            .selectAll('.domain')
            .remove();

};

export function setXTick(chartSvg, xAxis, height) {
    return chartSvg.append('g')
                   .attr('transform', `translate(0, ${height+3})`)
                   .attr("stroke-width", 1.5)
                   .style("stroke-linecap", "round")
                   .style("font-size", "15px")
                   .call(xAxis.tickSize(7))
                   .selectAll('.domain')
                   .remove();
};

export function setYTick(chartSvg, yAxis) {
    chartSvg.append('g')
            .style("font-size", "15px")
            .call(yAxis)
            .selectAll('.domain, .tick line')
            .remove();
};

export function brush(chartSvg, x, setSelection, width, height) {
    const brush = d3.brushX()
                    .extent([[0, 0], [width, height+2]])
                    .on("start brush end", (event) => {
                        if (event.selection) {
                            const indexSelection = event.selection.map(x.invert);
                            setSelection(indexSelection)
                        }
                    });

    chartSvg.append('g')
        .call(brush)
        .call(brush.move, [0, width]);
};

export function chartTitle(chartSvg, yLabel, xLabel, width, height, margin, font) {
    chartSvg.append('text')
            .attr('x', `-${height / 2+(((yLabel.length)-5)*5)}`)
            .attr('dy', -(margin.right+font) + "px")
            .attr('transform', 'rotate(-90)')
            .attr("font-family", "Verdana")
            .text(yLabel);
    
    chartSvg.append('text')
        .attr('x', `${width / 1.95-(10)*5}`)
        .attr('y', `${height + 40}`)
        .attr("font-family", "Verdana")
        .text(xLabel);
};

export default { hoverContainer, brush, getXAxis, getYAxis, setXTick, setYTick, getX, getY, yTickGuide, getContext, getSvg, getContainer, chartTitle, xScaleBand }