const SVGNS = 'http://www.w3.org/2000/svg';

const cx = window.innerWidth  / 2;
const cy = window.innerHeight / 2;
const neptune_r  = 280;
const mercury_r = 80;
const step = 350;

neptune.setAttribute('cx', cx);
neptune.setAttribute('cy', cy);
neptune.setAttribute('r', neptune_r);

mercury.setAttribute('cx', cx);
mercury.setAttribute('cy', cy);
mercury.setAttribute('r', mercury_r);

function drawPlanets(coordinates){
    const circle = document.createElementNS(SVGNS, 'circle');

    circle.setAttribute('cx', coordinates.x);
    circle.setAttribute('cy', coordinates.y);
    circle.setAttribute('r', "5");
    circle.setAttribute('fill', "red");

    drawing.appendChild(circle);
}

function drawLine(from, to){
    const line = document.createElementNS(SVGNS, 'line');

    line.setAttribute('x1',from.x);
    line.setAttribute('y1',from.y);
    line.setAttribute('x2',to.x);
    line.setAttribute('y2',to.y);
    line.setAttribute('fill', "white");
    drawing.appendChild(line);
}

function computeCoordinates(step, radius){

    // mercury -> 175 936 km/h | 371 400 566 km | 87.969 jours | 21% in 19 days
    // venus -> 126 062 km/h | 679 854 877 km | 224 jours | _% in 19 days
    // earth -> 107 243 km/h | 940 095 763 km | 365 jours | _% in 19 days
    // mars -> 87 226 km/h | 1 438 178 432 km | 687 jours terrestres | 0.029 % in 19 days
    // jupiter -> 47 196 km/h | 4 904 198 625 km | 4 329 jours terrestres | 0.0046% in 19 days
    // saturn -> 34 962 km/h | 9 021 609 406 km | 10 751 jours | _% in 19 days
    // uranus -> 24 459 km/h | 18 066 937 800 km | 30 777 jours | _% in 19 days
    // neptun -> 19 566 km/h | 28 245 335 630 km | 60 148 jours | _% in 19 days

    // the 'portion' value represents the proportion of the distance covered by the
    // planet around the sun in 19 days.
    // This means that the drawing simulate the position of the planets every 19 days.

    let portion = radius == mercury_r ? 0.029 : 0.0046;

    let angle = step * portion * 2 * Math.PI;
    console.log(angle);

    let x = cx + radius * Math.cos(angle);
    let y = cy - radius * Math.sin(angle);

    return {x: x, y: y};
}

function cleanDrawingBoard(){
    while (drawing.firstChild) {
        drawing.removeChild(drawing.firstChild);
    }
}


document.querySelector('#step').onchange = function () {
    let neptune;
    let mercury;

    cleanDrawingBoard();

    for(let i = 0; i < this.value; ++i){
        let neptune = computeCoordinates(i, neptune_r);
        let mercury = computeCoordinates(i, mercury_r);

        drawLine(from=mercury, to=neptune);
    }

    neptune = computeCoordinates(this.value, neptune_r);
    mercury = computeCoordinates(this.value, mercury_r);

    drawPlanets(neptune);
    drawPlanets(mercury);
};
