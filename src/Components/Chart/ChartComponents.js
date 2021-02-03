import * as d3 from 'd3'

export function getContainer(ref) {
    return d3.select(ref.current);;
};

export function getSvg(container, outerWidth, outerHeight, margin) {
    return container.append('svg')
                    .attr('width', outerWidth)
                    .attr('height', outerHeight)
                    .attr('class', 'svgPlot')
                    .style('position', 'absolute')
                    .style('margin-left', margin.left + 'px')
                    .append('g')
                    .attr('transform', `translate(${margin.left}, ${margin.top})`);
};

export function hoverContainer(container, data, x, width, height, canvasPad) {
    const bisect = d3.bisector(function(d) { return d.x; }).left;

    container.append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('margin-left', canvasPad.left + 'px')
            .style('margin-top', canvasPad.top + 'px')
            .style('position', 'absolute')
            .attr('class', 'svgMouseOver')
            .on('mousemove', function (e) {
                const mouse = x.invert(d3.pointer(e)[0])
                const index = bisect(data, mouse, 1);
                console.log(data[index])
            });
}
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
    return d3.scaleLinear().domain([d3.min(data, (d) => d.x), d3.max(data, (d) => d.x)]).range([0, width]);
};

export function getY(data, height) {
    return d3.scaleLinear().domain([0, Math.ceil(d3.max(data, (d) => d.y))]).range([height, 0]);
};

export function getXAxis(x) {
    return d3.axisBottom(x).ticks(4).tickFormat(d3.format(".2s"));
};

export function getYAxis(y, tickNum) {
    return d3.axisLeft(y).ticks(tickNum);
};

export function yTickGuide(chartSvg, y, tickNum, width) {
    chartSvg.append('g')
            .style("stroke-dasharray",("7, 15"))
            .style("stroke-linecap", "round")
            .style("opacity", 0.1)
            .attr("stroke-width", 2)
            .call(d3.axisLeft(y).ticks(tickNum).tickSize(-width));
};

export function getXTick(chartSvg, xAxis, height) {
    return chartSvg.append('g')
                   .attr('transform', `translate(0, ${height})`)
                   .attr("stroke-width", 0)
                   .style("font-size", "15px")
                   .call(xAxis);
};

export function getYTick(chartSvg, yAxis) {
    return chartSvg.append('g') 
                   .attr("stroke-width", 0)
                   .style("font-size", "15px")
                   .call(yAxis);
};

export function brush(chartSvg, x, setSelection, width, height) {
    const brush = d3.brushX().extent([[0, 0], [width, height+2]])
        .on("start brush end", (event) => {
            if(event.selection) {
                const indexSelection = event.selection.map(x.invert);
                setSelection(indexSelection)
            }
        }
    );

    chartSvg.append('g')
        .call(brush)
        .call(brush.move, [0, width]);
};

export function chartTitle(chartSvg, yLabel, xLabel, width, height, margin, font) {
    chartSvg.append('text')
            .attr('x', `-${height / 2+(((yLabel.length)-3)*5)}`) //(25*5 is length of text * 5)
            .attr('dy', -(margin.right+font) + "px")
            .attr('transform', 'rotate(-90)')
            .attr("font-family", "Verdana")
            .text(yLabel);
    
    chartSvg.append('text')
        .attr('x', `${width / 2-(10*5)}`)
        .attr('y', `${height + 40}`)
        .attr("font-family", "Verdana")
        .text(xLabel);
};

export default { hoverContainer, brush, getXAxis, getYAxis, getXTick, getYTick, getX, getY, yTickGuide, getContext, getSvg, getContainer, chartTitle}