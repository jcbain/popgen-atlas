export const dashedLine = (ctx, startX, startY, endX, endY, color, dashSize, lineSize) => {
    ctx.save();
    ctx.setLineDash([dashSize])
    ctx.lineWidth = lineSize
    ctx.strokeStyle = color

    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)
    ctx.stroke()
    ctx.restore()
}

export const drawText = (ctx, color, text, font, x, y) => {
    ctx.save();
    ctx.fillStyle = color
    ctx.font = font
    ctx.fillText(text, x, y)
    ctx.restore();
}

export const fillRectangle = (ctx, fillC, borderC, fillOpacity, borderOpacity, x, y, width, height, corner, lineSize) => {
    ctx.save();
    ctx.fillStyle = fillC
    ctx.globalAlpha = fillOpacity
    ctx.strokeRect(x+(corner/2), y+(corner/2), width-corner, height-corner);
    ctx.fillRect(x+(corner/2), y+(corner/2), width-corner, height-corner);
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = borderC
    ctx.globalAlpha = borderOpacity
    ctx.lineJoin = "round";
    ctx.lineWidth = lineSize
    ctx.strokeRect(x+(corner/2), y+(corner/2), width-corner, height-corner);
    ctx.restore();
}

export default {dashedLine, drawText, fillRectangle}