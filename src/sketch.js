const WIDTH = 800,
    HEIGHT = 800;

const SCALE = 8; //height and width need to be divisible by this

let w = WIDTH / SCALE; //width of the board
let h = HEIGHT / SCALE; //height of the board

const mutationRate = 0.05;

const startFood = 50;
const startPlayers = 50;
const startEnergy = 50;

let board = [...Array(w)].map(e => Array(h).fill(0));

let food = [];
let players = [];

function setup() {
    createCanvas(WIDTH, HEIGHT);

    for (let i = 0; i < startFood; i++) {
        food.push(new Food());
    }

    for (let i = 0; i < startPlayers; i++) {
        players.push(new Pixel(floor(random(w)), floor(random(h))));
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
            }
            if (board[i][j] == 1) {
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
    board = [...Array(w)].map(e => Array(h).fill(0));

    for (let i = 0; i < food.length; i++) {
        food[i].draw();
    }
    for (let i = 0; i < players.length; i++) {
        players[i].draw();
    }
}

//gets board item at this location, handles wrapping (i.e. -1 => width)..
function getBoard(x, y) {
    //if bigger:
    //keep subtracting w from the x number till its in the range [0,w]
    //keep subrtacting h from the y number till its in range [0,h]

    //if smaller:
    //keep adding w, h respectivley till in range [0, w] and [0,h]

    //if in range:
    //return
}