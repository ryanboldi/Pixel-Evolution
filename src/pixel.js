class Pixel {
    constructor(brain = NaN) {
        if (brain != NaN) {
            this.brain = new NeuralNetwork(25, 50, 4);
        }
        else this.brain = brain;
        this.score = 0;

        this.xSquares = width / SCALE;
        this.ySquares = height / SCALE;
        this.x = floor(this.xSquares / 2);
        this.y = this.ySquares - 1;
    }

    Move(u, d, r, l) { //(u, d, r, l) --> (1 for up, -1 for down), (1 for right, -1 for left)
        if (d > 0.5 ) this.y += 1;
        if (u > 0.5) this.y -= 1;
        if (r > 0.5) this.x += 1;
        if (l > 0.5) this.x -= 1;
    }

    decide(inputs){
        let outputs = this.brain.feedforward(inputs)
        this.Move(outputs[0], outputs[1], outputs[2], outputs[3]);
    }

    Update(){
        if (this.x > this.xSquares - 1) this.x = this.xSquares - 1;
        if (this.x < 0) this.x = 0;
        if (this.y > this.ySquares - 1) this.y = this.ySquares - 1;
        if (this.y < 0) this.y = 0;
    }

    Draw() {
        fill(50 * this.score, 10 * this.score, 5 * this.score, 50);
        rect(SCALE * this.x, SCALE * this.y, SCALE, SCALE)
    }

    Distance(food) {
        return Math.sqrt((food.x - this.x) ** 2 + (food.y - this.y) ** 2)
    }

    Mutate(mr) {
        let nn = this.brain;
        this.brain = nn.mutate(mr);
    }

    randomise() {
        this.score = 0;

        this.xSquares = width / SCALE;
        this.ySquares = height / SCALE;
        this.x = floor(this.xSquares / 2);
        this.y = this.ySquares - 1;
    }

}