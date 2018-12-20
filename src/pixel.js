class Pixel {
    constructor() {
        this.xSquares = width / SCALE;
        this.ySquares = height / SCALE;
        this.x = floor(random(this.xSquares));
        this.y = floor(random(this.ySquares));
    }

    Move(xMove, yMove) {
        this.x += xMove;
        this.y += yMove;
    }

    Draw() {
        print(this.x);

        if (this.x > this.xSquares - 1) this.x = 0;
        if (this.x < 0) this.x = this.xSquares - 1;
        if (this.y > this.ySquares - 1) this.y = 0;
        if (this.y < 0) this.y = this.ySquares - 1;


        rect(SCALE * this.x, SCALE * this.y, SCALE, SCALE)
    }


}