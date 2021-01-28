import React, { useRef, useEffect } from "react";
import Axis from './Axis';

export default function GenomeArchitecture(props) {
    const ref = useRef()
    const data = props.filteredData
    const chartRatio = 2.5 // Ratio of chart to canvas container
    const width = 1000, // Height and width of graph
          height = 400
    const font = width / 50
    const maxX = Math.max(...data.map(e => e.x)) // Max output_gen in data
    const maxY = Math.max(...data.map(e => e.y)) // Max y avergae to graph
    const padding = 100
    const chartWidth = 800
    const chartHeight = 200

    // ======== Calculates size of point to resemble dna ========
    const f = (4 / maxX) * chartWidth + padding - font / chartRatio
    const d = (2 / maxX) * chartWidth + padding - font / chartRatio
    const s = f-d;

    useEffect(() => {
        let canvas = ref.current
        let ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, width, height)

        bars(ctx)
    });

    function bars(ctx) {
        data.forEach(elem => {
            const x=((elem.x / maxX) * chartWidth + padding)
            const y=chartHeight - (elem.y / maxY) * chartHeight + padding

            ctx.fillStyle = elem.color
            ctx.fillRect(x, y, s, 1.2) //(x, y, barWidth, barHeight)
        });
    };

    return (
        <div>
            <canvas id="genomeC" ref={ref} width={width} height={height} style={{zIndex:1, position: 'absolute'}}></canvas>
            
            <Axis
                chartRatio={chartRatio}
                width={width}
                height={height}
                padding={padding}
                chartWidth={chartWidth}
                chartHeight={chartHeight}
                font={font}
                maxX={maxX}
                maxY={maxY - (maxY % 10)}
                precision={0}
                xGuides={5}
                yGuides={3}
                gColor={'#ffffff00'} // Y guide line color is white
                textColor={'#4f4f4f'}
                guideOffset={0}
                titleX={'generation'}
                titleY={'locus'}
                textSize={13}
            />
        </div>
    );
}