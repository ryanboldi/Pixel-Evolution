/** Rename vars */
let Neat = neataptic.Neat;
let Methods = neataptic.Methods;
let Config = neataptic.Config;
let Architect = neataptic.Architect;

Config.warnings = false;

const WIDTH = 800,
    HEIGHT = 800;

let playerSight = 2; //blocks on each side

const SCALE = 8; //height and width need to be divisible by this

let w = WIDTH / SCALE; //width of the board
let h = HEIGHT / SCALE; //height of the board

let timestep = 0;
let avgData = []; //array to store averages every 100 timesteps

const mutationRate = 0.05;

const foodEnergy = 30;

const startFood = 100;
const startPlayers = 100;
//const startEnergy = 50;

let board = [...Array(w)].map(e => Array(h).fill(0));

let food = [];
let players = [];

function setup() {
    createCanvas(WIDTH, HEIGHT);

    for (let i = 0; i < startFood; i++) {
        food.push(new Food());
    }

    for (let i = 0; i < startPlayers; i++) {
        players.push(new Pixel());
    }

    for (let i = 0; i < 0; i++) {
        if (i % 10 == 0) console.log(i);
        timeStep();
    }
}

function draw() {
    background(240);
    stroke(0);
    strokeWeight(SCALE / 100);

    //draw out the board based on the board values
    for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
            if (board[i][j] == 0) {
                //draw nothing
                fill(240);
            } if (board[i][j] == 1) {
                //draw food
                fill(0, 255, 0);
            }
            if (board[i][j] == 2) {
                //draw player
                fill(0, 0, 255);
            }
            //draw rect
            stroke(0);
            strokeWeight(SCALE / 100);
            rect(i * SCALE, j * SCALE, SCALE, SCALE);
        }
    }
    timeStep();
}

function timeStep() {
    timestep++;
    board = [...Array(w)].map(e => Array(h).fill(0));
    for (let i = 0; i < food.length; i++) {
        food[i].draw();
    }
    for (let i = 0; i < players.length; i++) {
        players[i].draw();
        players[i].update();
    }


    if (timestep % 100 == 0) {
        //get average score of alive population, and plot
        let tot = 0
        for (let i = 0; i < players.length; i++) {
            tot += players[i].score;
        }
        let avg = tot / players.length;
        console.log(avg);
    }
}

//gets board item at this location, handles wrapping (i.e. -1 => width)..
function getFood(x, y) {
    good = false;
    //we know board is w x h
    //if bigger:

    while (good == false) {
        if (x >= w) {
            x = x - w;
            good = false;
        }
        if (x < 0) {
            x = x + w;
            good = false;
        }
        if (y >= h) {
            y = y - h;
            good = false;
        }
        if (y < 0) {
            y = y + h;
            good = false;
        }
        if ((y < h) && (y >= 0)) {
            if ((x < w) && (x >= 0)) {
                good = true;
                if (board[x][y] == 1) return 1;
                else return 0;
            }
        }
    }
    //keep subtracting w from the x number till its in the range [0,w]
    //keep subrtacting h from the y number till its in range [0,h]

    //if smaller:
    //keep adding w, h respectivley till in range [0, w] and [0,h]

    //if in range:
    //return
}

//returns real world pos
function getPos(x, y) {
    good = false;
    //we know board is w x h
    //if bigger:

    while (good == false) {
        if (x >= w) {
            x = x - w;
            good = false;
        }
        if (x < 0) {
            x = x + w;
            good = false;
        }
        if (y >= h) {
            y = y - h;
            good = false;
        }
        if (y < 0) {
            y = y + h;
            good = false;
        }
        if ((y < h) && (y >= 0)) {
            if ((x < w) && (x >= 0)) {
                good = true;
                return { x: x, y: y }
            }
        }
    }
}

//replaces random pixel on the board with p, parent is n and can't be replaced
function replaceRandom(p) {
    let toRep = floor(random(0, startPlayers));
    players[toRep] = p;
}

function newFood() {
    food.push(new Food());
}