export default function Histogram(props) {
    const SVG_WIDTH = 1000;
    const SVG_HEIGHT = 500;
    const x0 = 50;
    const xAxisLength = SVG_WIDTH - x0 * 2;
  
    const y0 = 50;
    const yAxisLength = SVG_HEIGHT - y0 * 2;
  
    const xAxisY = y0 + yAxisLength;
  
    return (
        <div className="Histogram">
            <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
                {/* X axis */}
                <line
                    x1={x0}
                    y1={xAxisY}
                    x2={x0 + xAxisLength}
                    y2={xAxisY}
                    stroke="grey"
                />
                <text x={x0 + xAxisLength + 5} y={xAxisY + 4}>
                    x
                </text>

                {/* Y axis */}
                <line 
                    x1={x0} 
                    y1={y0} 
                    x2={x0} 
                    y2={y0 + yAxisLength} 
                    stroke="grey" />
                <text x={x0} y={y0 - 8} textAnchor="middle">
                    y
                </text>
            </svg>
        </div>
    );
}