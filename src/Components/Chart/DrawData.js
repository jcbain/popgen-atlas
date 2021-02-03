export function drawLine(transform, lineSize, color, data, context, x, y) {
    const scaleX = transform.rescaleX(x);
    const scaleY = transform.rescaleY(y);
  
    context.lineWidth = lineSize;
    context.strokeStyle = color;
    context.lineJoin = "round";
    context.beginPath();
  
    data.forEach(point => {
      const px = scaleX(point.x);
      const py = scaleY(point.y);
      context.lineTo(px, py);
    });
  
    context.stroke();
};

export function drawLocus(transform, data, context, x, y, barHeight) {
    const scaleX = transform.rescaleX(x);
    const scaleY = transform.rescaleY(y);
    
    const f = scaleX(4000);
    const d = scaleX(2000);
    const barWidth = f-d;
  
    data.forEach(point => {
      const px = scaleX(point.x);
      const py = scaleY(point.y);
      context.fillStyle = point.color;
      context.fillRect(px, py, barWidth, barHeight);
    });
};

export default { drawLine, drawLocus }