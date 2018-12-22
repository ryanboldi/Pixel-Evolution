const SCALE = 100; //height and width need to be divisible by this
const mutationRate = 0.1;
const PopLength = 20; //seconds
const survivability = 100
const gameAmount = 10;
const speed = 10;

var games = [];

function setup() {
    canvas = createCanvas(500, 500);

    for (let i = 0; i < gameAmount; i++) games.push(new Game(width / SCALE, height / SCALE));

    g = new Game(width / SCALE, height / SCALE);

    p = new Pixel();
    f = new Food();
}

function draw() {
    background(100);
    stroke(0, 0, 0, 15);

    var xlines = (width / SCALE);
    var ylines = (height / SCALE);
    for (let i = 1; i < xlines; i++)    line(i * SCALE, 0, i * SCALE, height);
    for (let j = 1; j < ylines; j++)    line(0, j * SCALE, width, j * SCALE);

    for (let i = 0; i < speed; i++) {
        for (let j = 0; j < games.length; j++)  games[j].timeStep();
    }

}



// function keyPressed(){
//     if (keyCode == UP_ARROW) g.Move(1,0,0,0);
//     if (keyCode == DOWN_ARROW) g.Move(0,1,0,0);
//     if (keyCode == LEFT_ARROW) g.Move(0,0,0,1);
//     if (keyCode == RIGHT_ARROW) g.Move(0,0,1,0);
// }