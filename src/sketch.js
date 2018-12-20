const SCALE = 30; //height and width need to be divisible by this
var p;

function setup() {
    createCanvas(600, 600);
    p = new Pixel;  
}

function draw() {
    
    background(100);
    stroke(0,0,0,10);

    var xlines = (width/SCALE);
    var ylines = (height/SCALE);
    for (let i = 1; i < xlines; i++)    line(i*SCALE, 0, i*SCALE, height);
    for (let j = 1; j < ylines; j++)    line(0,j*SCALE, width, j*SCALE);
    
    p.Draw();
    noStroke();
    
}

function keyPressed(){
    if (keyCode == UP_ARROW) p.Move(0,-1);
    if (keyCode == DOWN_ARROW) p.Move(0,1);
    if (keyCode == LEFT_ARROW) p.Move(-1,0);
    if (keyCode == RIGHT_ARROW) p.Move(1,0);
}
