class Pixel {
    constructor(brain = NaN) {
        if (brain != NaN) {
            this.brain = new NeuralNetwork(4, 4, 3);
        }
        else this.brain = brain;
        this.score = 0;

        this.closestFood = Foods[0];

        this.xDir = 1;
        this.yDir = 0;

        this.xSquares = width / SCALE;
        this.ySquares = height / SCALE;
        this.x = floor(this.xSquares/2);
        this.y = this.ySquares-1;
    }

    Turn(input) { //1 for right, 0 for left, -1 for backwards
        if (input === 1) {
            if (this.xDir > 0) { this.xDir = 0; this.yDir = 1; }
            else if (this.xDir < 0) { this.xDir = 0; this.yDir = -1; }
            else if (this.yDir > 0) { this.xDir = -1; this.yDir = 0; }
            else if (this.yDir < 0) { this.xDir = 1; this.yDir = 0; }
        }

        else if (input === 0) {
            if (this.xDir > 0) { this.xDir = 0; this.yDir = -1; }
            else if (this.xDir < 0) { this.xDir = 0; this.yDir = 1; }
            else if (this.yDir > 0) { this.xDir = 1; this.yDir = 0; }
            else if (this.yDir < 0) { this.xDir = -1; this.yDir = 0; }
        }

        else if (input === -1) {
            if (this.xDir > 0) { this.xDir = -1; this.yDir = 0; }
            else if (this.xDir < 0) { this.xDir = 1; this.yDir = 0; }
            else if (this.yDir > 0) { this.xDir = 0; this.yDir = -1; }
            else if (this.yDir < 0) { this.xDir = 0; this.yDir = 1; }
        }
    }

    Draw() {
        this.closestFood = Foods[0];
        var foodX = this.closestFood.x;
        var foodY = this.closestFood.y;

        fill(50 * this.score, 10 * this.score, 5 * this.score);

        if (frameCount % 5 == 0) {
            this.x += this.xDir;
            this.y += this.yDir;

            let inputs = [this.xDir, this.yDir, (foodX - this.x), (foodY - this.y)]
            let outputs = this.brain.feedforward(inputs)
            if (outputs[0] > 0.5) this.Turn(1)
            if (outputs[1] > 0.5) this.Turn(0)
            if (outputs[2] > 0.5) this.Turn(-1)


            for (let i = 0; i < Foods.length; i++) {
                if (this.Distance(Foods[i]) < this.Distance(this.closestFood)) {
                    this.closestFood = Foods[i];
                }
                if ((this.x == Foods[i].x) & (this.y == Foods[i].y)) {
                    this.score++;
                    Foods.splice(i, 1);
                    if (Foods.length == 0) { Pixels, Foods = MakeNewPop(Pixels); }
                }
                
            }

        }


        if (this.x > this.xSquares - 1) this.x = 0;
        if (this.x < 0) this.x = this.xSquares - 1;
        if (this.y > this.ySquares - 1) this.y = 0;
        if (this.y < 0) this.y = this.ySquares - 1;

        rect(SCALE * this.x, SCALE * this.y, SCALE, SCALE)
    }

    Distance(food) {
        return Math.sqrt((food.x - this.x) ** 2 + (food.y - this.y) ** 2)
    }

    Mutate(mr) {
        return (new Pixel(this.brain.mutate(mr)));
    }

    randomise(){
        this.score = 0;

        this.xSquares = width / SCALE;
        this.ySquares = height / SCALE;
        this.x = floor(this.xSquares/2);
        this.y = this.ySquares-1;
    }

}