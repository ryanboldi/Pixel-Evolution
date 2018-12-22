const SCALE = 50; //height and width need to be divisible by this
const mutationRate = 0.05;
const PopLength = 20; //seconds
const survivability = 100
const gameAmount = 10;
const trainSpeed = 100;

var bestGame;

var games = [];

function setup() {
    canvas = createCanvas(500, 500);

    for (let i = 0; i < gameAmount; i++) games.push(new Game(width / SCALE, height / SCALE));

    genBut = createButton('Do one generation');
    genBut.position(width + 50, 50);
    genBut.mousePressed(doOneGen);

    trainBut = createButton('train');
    trainBut.position(width + 50, 100);
    trainBut.mousePressed(train);

    bestGame = new Game();
}

function draw() {
    background(100);
    stroke(0, 0, 0, 15);

    var xlines = (width / SCALE);
    var ylines = (height / SCALE);
    for (let i = 1; i < xlines; i++)    line(i * SCALE, 0, i * SCALE, height);
    for (let j = 1; j < ylines; j++)    line(0, j * SCALE, width, j * SCALE);

    if (frameCount % (10*60*PopLength) == 0 ) bestGame = new Game (bestGame.p);

    if (frameCount % 10 == 0) {
        bestGame.Move();
        bestGame.Update();
    }
    bestGame.Draw();
}

function doOneGen() {
    for (let i = 0; i < (PopLength * 60); i++) {
        for (let j = 0; j < games.length; j++)  games[j].timeStep();
    }

    //normalise all the scores
    let maxScore = 0;

    for (let i = 0; i < games.length; i++) {
        if (games[i].score > maxScore) maxScore = games[i].score;
        if (games[i].score > bestGame.score) bestGame = games[i];
    }
    console.log(bestGame.score);
    let matingPool = [];
    for (let i = 0; i < games.length; i++) {
        if (random(1) < (games[i].score / maxScore)) {
            matingPool.push(games[i]);
        }
    }
    for (let i = 0; i < matingPool.length; i++) {
        matingPool[i] = matingPool[i].Mutate(mutationRate);
    }

    for (let i = 0; i < (gameAmount - matingPool.length); i++) {
        matingPool.push(new Game());
    }

    games = matingPool;
}

function train() {
    for (let i = 0; i < trainSpeed; i++) {
        doOneGen();
    }
}

// function keyPressed(){
//     if (keyCode == UP_ARROW) g.Move(1,0,0,0);
//     if (keyCode == DOWN_ARROW) g.Move(0,1,0,0);
//     if (keyCode == LEFT_ARROW) g.Move(0,0,0,1);
//     if (keyCode == RIGHT_ARROW) g.Move(0,0,1,0);
// }