var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

//? set colors for the lines
//? set background color
//? set font

const drawGraph = (data, canvas) => {
    const ctx = canvas.getContext("2d");
    const m = genMeasureMents(canvas);
    drawBackground(ctx, m, "#101023");
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white"
    ctx.font = `${m.min * (1 - m.gridRatio) / 5}px Arial`;
    drawYAxisNumbers(ctx, m);
    drawXAxisNumbers(ctx, m);
    const lineWidth = 0.2;
    // draw vertical lines
    drawVerticalLines(ctx, m, lineWidth);
    // draw horizontal lines
    drawHorizontalLines(ctx, m, lineWidth);
    drawAxes(ctx, m);
    drawData(data, ctx, m);
}
const drawVerticalLines = (ctx, measurements, lineWidth) => {
    const tmp = ctx.lineWidth;
    ctx.lineWidth = lineWidth;
    for (let i = 0; i <= measurements.unitsAcross; i++) {
        ctx.beginPath();
        ctx.moveTo(measurements.leftOffset + i * measurements.cellWidth, measurements.topOffset);
        ctx.lineTo(measurements.leftOffset + i * measurements.cellWidth, measurements.topOffset + measurements.gridHeight + (i === 0 ? 0 : measurements.xScaleLineLength));
        ctx.stroke();
    }
    ctx.lineWidth = tmp;
}

const drawXAxisNumbers = (ctx, measurements) => {
    for (let i = 1; i <= measurements.unitsAcross; i++) {
        const day = i + "";
        const boundingBox = ctx.measureText(day);
        const height = boundingBox.actualBoundingBoxAscent + boundingBox.actualBoundingBoxDescent;
        ctx.fillText(day, measurements.leftOffset + i * measurements.cellWidth - boundingBox.width / 2, measurements.topOffset + measurements.gridHeight + measurements.xScaleLineLength * measurements.scaleGapFactor + height);
    }
}

const drawYAxisNumbers = (ctx, measurements) => {
    for (let i = 0; i <= measurements.unitsDown; i++) {
        const stars = (measurements.unitsDown - i) + "";
        const boundingBox = ctx.measureText(stars);
        const height = boundingBox.actualBoundingBoxAscent + boundingBox.actualBoundingBoxDescent;
        ctx.fillText(stars, measurements.leftOffset - measurements.yScaleLineLength * measurements.scaleGapFactor - boundingBox.width, measurements.topOffset + i * measurements.cellHeight + height / 2);
    }
}
const drawBackground = (ctx, measurements, backgroundColor) => {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, measurements.width, measurements.height);
}
const genMeasureMents = (canvas) => {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const unitsAcross = 25;
    const unitsDown = 50;
    const gridRatio = 0.9;
    return {
        gridRatio: gridRatio,
        unitsAcross: unitsAcross,
        unitsDown: unitsDown,
        width: canvas.clientWidth,
        height: canvas.clientHeight,
        min: Math.min(canvas.clientWidth, canvas.clientHeight),
        cellWidth: canvas.clientWidth * gridRatio / unitsAcross,
        cellHeight: canvas.clientHeight * gridRatio / unitsDown,
        leftOffset: canvas.clientWidth * (1 - gridRatio) / 2,
        topOffset: canvas.clientHeight * (1 - gridRatio) / 2,
        gridWidth: canvas.clientWidth * gridRatio,
        gridHeight: canvas.clientHeight * gridRatio,
        yScaleLineLength: canvas.clientWidth * (1 - gridRatio) / 8,
        xScaleLineLength: canvas.clientHeight * (1 - gridRatio) / 8,
        scaleGapFactor: 1.15
    };
}
const drawAxes = (ctx, measurements) => {
    const lineWidth = ctx.lineWidth;
    ctx.lineWidth = 2;
    // y-axis
    ctx.beginPath();
    ctx.moveTo(measurements.leftOffset, measurements.topOffset);
    ctx.lineTo(measurements.leftOffset, measurements.topOffset + measurements.gridHeight);
    ctx.stroke();
    // x-axis
    ctx.beginPath();
    ctx.moveTo(measurements.leftOffset, measurements.topOffset + measurements.gridHeight);
    ctx.lineTo(measurements.leftOffset + measurements.gridWidth, measurements.topOffset + measurements.gridHeight);
    ctx.stroke();
    ctx.lineWidth = lineWidth;
}
const drawHorizontalLines = (ctx, measurements, lineWidth) => {
    const tmp = ctx.lineWidth;
    ctx.lineWidth = lineWidth;
    for (let i = 0; i <= measurements.unitsDown; i++) {
        ctx.beginPath();
        ctx.moveTo(measurements.leftOffset - measurements.yScaleLineLength, measurements.topOffset + i * measurements.cellHeight);
        ctx.lineTo(measurements.leftOffset + measurements.gridWidth, measurements.topOffset + i * measurements.cellHeight);
        ctx.stroke();
    }
    ctx.lineWidth = tmp;
}

const drawData = (data, ctx, measurements) => {
    //draw the circles
    const fillStyle = ctx.fillStyle;
    let index = 0;
    data.forEach(player => {
        ctx.fillStyle = colorArray[index];
        const starsSoFar = player.pointsSoFar;
        const min = Math.min(measurements.cellWidth, measurements.cellHeight);
        let points = [];
        starsSoFar.forEach((starCount, i) => {
            ctx.beginPath();
            const xOffset = Math.random() * measurements.cellWidth / 4;
            const cx = measurements.leftOffset + (i + 1) * measurements.cellWidth + xOffset;
            const cy = measurements.topOffset + measurements.gridHeight - starCount * measurements.cellHeight;
            points.push({ x: cx, y: cy });
            ctx.arc(cx, cy, min / 3, 0, 2 * Math.PI);
            ctx.fill();
        });
        // draw the lines
        drawGraphLine(points, ctx, 0.5, 0.6, colorArray[index]);
        index++;
    });
    ctx.fillStyle = fillStyle
}

const gradient = (a, b) => {
    return (b.y - a.y) / (b.x - a.x);
}

const drawGraphLine = (points, ctx, f, t, strokeStyle) => {
    const tmp = ctx.strokeStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    let dx1 = 0;
    let dy1 = 0;
    let dx2 = 0;
    let dy2 = 0;
    let preP = points[0];
    points.slice(1).forEach((curP, i) => {
        const nexP = points[i + 2];
        if (nexP) {
            const m = gradient(preP, nexP);
            dx2 = (nexP.x - curP.x) * -f;
            dy2 = dx2 * m * t;
        } else {
            dx2 = 0;
            dy2 = 0;
        }
        ctx.bezierCurveTo(
            preP.x - dx1, preP.y - dy1,
            curP.x + dx2, curP.y + dy2,
            curP.x, curP.y
        );
        dx1 = dx2;
        dy1 = dy2;
        preP = curP;
    })
    ctx.stroke();
    ctx.strokeStyle = tmp;
}

export default drawGraph;