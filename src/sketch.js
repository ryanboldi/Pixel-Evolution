const SCALE = 100;
var x, y;

function setup() {
    createCanvas(600, 600);
     x = (width/SCALE)/2
     y = (height/SCALE)/2

}

function draw() {
    background(100);
    rect(SCALE * x, SCALE * y, SCALE, SCALE)
}

function keyPressed() {
    if (keyCode == UP_ARROW) y -= 1
    if (keyCode == DOWN_ARROW) y += 1
    if (keyCode == LEFT_ARROW) x -= 1
    if (keyCode == RIGHT_ARROW) x += 1

}