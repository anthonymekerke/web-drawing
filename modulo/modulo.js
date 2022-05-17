const SVGNS = 'http://www.w3.org/2000/svg';

const cx = window.innerWidth  / 2;
const cy = window.innerHeight / 2;
const r  = 300;

watermark.setAttribute('cx', cx);
watermark.setAttribute('cy', cy);
watermark.setAttribute('r', r);

function computeCoordinate(n) {
    let coordinates = [];

    let angle = (360/n) * Math.PI / 180;

    for(let i = 0; i < n; i++){
        let x = cx + r * Math.sin(i * angle);
        let y = cy - r * Math.cos(i * angle);

        coordinates.push({x,y});
    }

    return coordinates;
}

function drawPoints(coordinates) {

    for(let i = 0; i < coordinates.length; i++){
        const circle = document.createElementNS(SVGNS, 'circle');
        circle.setAttribute('cx', coordinates[i].x);
        circle.setAttribute('cy', coordinates[i].y);
        circle.setAttribute('r', "5");
        circle.setAttribute('fill', "white");
        drawing.appendChild(circle);
    }
}

function drawLines(coordinates, mulTable) {

    for(let i = 0; i < coordinates.length; i++) {
        let point1 = coordinates[i];
        let point2 = coordinates[(i * mulTable)%coordinates.length];

        const line = document.createElementNS(SVGNS, 'line');

        line.setAttribute('x1',point1.x);
        line.setAttribute('y1',point1.y);
        line.setAttribute('x2',point2.x);
        line.setAttribute('y2',point2.y);
        line.setAttribute('fill', "white");
        drawing.appendChild(line);
    }
}

document.querySelector('#modulo').onchange = function () {
    while (drawing.firstChild) {
        drawing.removeChild(drawing.firstChild);
    }

    let mulTable = document.querySelector('#mul_table').value;

    let coordinates = computeCoordinate(this.value);
    drawPoints(coordinates);
    drawLines(coordinates, mulTable);
};

document.querySelector('#mul_table').onchange = function () {
    while (drawing.firstChild) {
        drawing.removeChild(drawing.firstChild);
    }

    let nbPoints = document.querySelector('#modulo').value;

    let coordinates = computeCoordinate(nbPoints);
    drawPoints(coordinates);
    drawLines(coordinates, this.value);
};