class Pixel {
    constructor(brain = NaN) {
        if (brain instanceof NeuralNetwork) {
             this.brain = brain;
        } else {
            this.brain = new NeuralNetwork((width/SCALE) * (height/SCALE),50,4);
        }

        this.xSquares = width / SCALE;
        this.ySquares = height / SCALE;
        this.x = floor(this.xSquares / 2);
        this.y = floor(this.ySquares / 2);
    }

    Move(u, d, r, l) { //(u, d, r, l) --> (1 for up, -1 for down), (1 for right, -1 for left)
        if (d > 0.5) this.y += 1;
        if (u > 0.5) this.y -= 1;
        if (r > 0.5) this.x += 1;
        if (l > 0.5) this.x -= 1;
    }

    decide(inputs) {
        let outputs = this.brain.feedforward(inputs)
        this.Move(outputs[0], outputs[1], outputs[2], outputs[3]);
    }

    Update() {
        if (this.x > this.xSquares - 1) this.x = this.xSquares - 1;
        if (this.x < 0) this.x = 0;
        if (this.y > this.ySquares - 1) this.y = this.ySquares - 1;
        if (this.y < 0) this.y = 0;
    }

    Draw(score) {
        fill(50 * score, 10 * score, 5 * score);
        rect(SCALE * this.x, SCALE * this.y, SCALE, SCALE)
    }

    Distance(food) {
        return Math.sqrt((food.x - this.x) ** 2 + (food.y - this.y) ** 2)
    }

    Mutate(mr) {
        let nn = this.brain;
        return new Pixel(nn.mutate(mr));
    }

    randomise() {
        this.x = floor(this.xSquares / 2);
        this.y = floor(this.ySquares / 2);
    }

}