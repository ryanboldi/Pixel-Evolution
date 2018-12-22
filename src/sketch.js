const SCALE = 60; //height and width need to be divisible by this
const foodAmount = 5;
const pixelAmount = 5;
const mutationRate = 0.01;
const PopLength = 5; //seconds
const survivability = 100

var Pixels = [];
var Foods = [];

function setup() {
    createCanvas(600, 600);
    for (let i = 0; i < pixelAmount; i++)    Pixels.push(new Pixel);
    for (let i = 0; i < foodAmount; i++)    Foods.push(new Food);
}

function draw() {
    background(100);
    stroke(0, 0, 0, 15);

    var xlines = (width / SCALE);
    var ylines = (height / SCALE);
    for (let i = 1; i < xlines; i++)    line(i * SCALE, 0, i * SCALE, height);
    for (let j = 1; j < ylines; j++)    line(0, j * SCALE, width, j * SCALE);

    for (let i = 0; i < Pixels.length; i++)    Pixels[i].Draw();
    for (let i = 0; i < Foods.length; i++)    Foods[i].Draw();
    noStroke();

    if (frameCount % (PopLength * 60) == 0) { 
        MakeNewPop(Pixels);
        resetFood();
        resetPixels();
     }
}

function MakeNewPop(Pixels) {
    console.log("Making new pop");
    let survivors = [];
    let maxFit = 0;

    for (let i = 0; i < Pixels.length; i++) {
        if (Pixels[i].score > maxFit) maxFit = Pixels[i].score;
    }
    for (let i = 0; i < Pixels.length; i++) {
        if (random(0,1) < (Pixels[i].score/maxFit)) survivors.push(Pixels[i]);
    }
    
    console.log(pixelAmount- survivors.length);
    for (let i = 0; i < (pixelAmount - survivors); i++)  survivors.push(new Pixel);
    for (let i = 0; i < survivors; i++)    survivors[i] = survivors[i].Mutate();

    Pixels = survivors;
}

function resetFood (){
    newFood = []
    for (let i = 0; i< foodAmount; i++){
        newFood.push(new Food);
    }
    Foods = newFood;
}

function resetPixels (){
    newPixels =[]
    for (let i = 0; i< pixelAmount; i++){
        Pixels[i].randomise();
    }
}