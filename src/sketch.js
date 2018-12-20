const SCALE = 50; //height and width need to be divisible by this
const foodAmount = 10;
const pixelAmount = 5;
const mutationRate = 0.01;
const PopLength = 10; //seconds

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


    if (frameCount % (PopLength * 60) == 0) { Pixels, Foods = MakeNewPop(Pixels); }
    
}

function MakeNewPop(Pixels) {
    console.log("Making new pop")
    let surviviors = []
    for (let i = 0; i < Pixels.length; i++) {
        if (random(0, 1) < (Pixels[i].score) / (floor(foodAmount / 2))) surviviors.push(Pixels[i].Mutate(mutationRate))
    }
    
    console.log(pixelAmount- surviviors.length);
    for (let i = 0; i < (pixelAmount - surviviors); i++) {
        surviviors.push(new Pixel);
    }

    var newFood = []
    for (let i = 0; i < foodAmount; i++) {
        newFood.push(new Food);
    }

    for (let i = 0; i < surviviors; i++){
        surviviors[i].randomise();
    }

    return surviviors, newFood;
}
