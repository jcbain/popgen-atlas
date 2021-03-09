export function drawLine(lineSize, color, data, context, x, y) {
    context.lineWidth = lineSize;
    context.strokeStyle = color;
    context.globalAlpha = 1;
    context.lineJoin = "round";
    context.beginPath();
  
    data.forEach(point => {
      context.lineTo(x(point.x), y(point.y));
    });
  
    context.stroke();
};

export function drawLocus(data, context, x, y, barHeight) {
    const f = x(4000); // Need to change so not hardcoded
    const d = x(2000);
    const barWidth = f-d;

    data.forEach(point => {
      context.fillStyle = point.color;
      context.globalAlpha = 1;
      context.fillRect(x(point.x), y(point.y), barWidth, barHeight);
    });
};

export function drawBar(context, data, color, x, y, height) {
  const lineSize = 4;

  data.forEach(point => {
    context.rect(x(point.x), y(point.y)+(lineSize/2), x.bandwidth(), height-(y(point.y)+lineSize));
    context.fillStyle = "#bda6ff";
    context.fill();
    context.lineWidth = lineSize;
    context.strokeStyle = color;
    context.stroke();
  });
}

export default { drawLine, drawLocus, drawBar }