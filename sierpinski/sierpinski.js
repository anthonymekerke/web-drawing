const SVGNS = 'http://www.w3.org/2000/svg';

const margin = 50;
const triangle_height = window.innerHeight - 2 * margin;

let points_list = [];

const side = initialize();

function initialize(){
    const p1_x = (window.innerWidth - triangle_height) / 2;
    const p1_y = window.innerHeight - margin;
    drawPoint({x: p1_x, y: p1_y});
    points_list.push({x: p1_x, y: p1_y});

    const p2_x =  (window.innerWidth + triangle_height) / 2;
    const p2_y = window.innerHeight - margin;
    drawPoint({x: p2_x, y: p2_y});
    points_list.push({x: p2_x, y: p2_y});

    const p3_x = window.innerWidth / 2;
    const p3_y = margin;
    drawPoint({x: p3_x, y: p3_y});
    points_list.push({x: p3_x, y: p3_y});

    let side = (p1_x - p2_x) * (p1_x - p2_x);
    side += (p1_y - p2_y) * (p1_y - p2_y);
    side = Math.sqrt(side);

    return side;
}

function drawPoint(coordinates){
    const circle = document.createElementNS(SVGNS, 'circle');

    circle.setAttribute('cx', coordinates.x);
    circle.setAttribute('cy', coordinates.y);
    circle.setAttribute('r', "2");
    circle.setAttribute('fill', "yellow");

    drawing.appendChild(circle);
}

function sierpinskiIFS(){
    let length = points_list.length;
    let index = getRandomInt(length);
    let p1 = points_list[index];
    let p2;

    console.log(p1);

    let ifs = getRandomInt(3) + 1;

    if(ifs == 1) {p2 = ifs1(p1);}
    if(ifs == 2) {p2 = ifs2(p1);}
    if(ifs == 3) {p2 = ifs3(p1);}
    
    points_list.push(p2);

    return p2;
}

function ifs1(p1){
    let p2_x = p1.x / 2;
    let p2_y = p1.y / 2;

    return {x: p2_x, y: p2_y};
}

function ifs2(p1){
    let p2_x = (p1.x + side) / 2;
    let p2_y = p1.y / 2;

    return {x: p2_x, y: p2_y};
}

function ifs3(p1){
    let p2_x = p1.x / 2 + side / 4;
    let p2_y = (p1.y + side) / 2;

    return {x: p2_x, y: p2_y};
}

function iteratePoint(){
    let p1 = points_list[points_list.length - 1];
    let index = getRandomInt(3); // choose between the first 3 points
    let p2 = points_list[index];

    let p3_x = (p1.x + p2.x) / 2;
    let p3_y = (p1.y + p2.y) / 2;

    return {x: p3_x, y: p3_y};
}

function cleanDrawingBoard(){
    while (drawing.firstChild) {
        drawing.removeChild(drawing.firstChild);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

document.querySelector('#step').onchange = function () {
    let new_point;
    cleanDrawingBoard();

    initialize();

    for(let i = 0; i < this.value; ++i){
        new_point = iteratePoint();
        drawPoint(new_point);
        points_list.push(new_point);
    }
};