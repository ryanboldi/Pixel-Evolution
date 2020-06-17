class Pixel {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.energy = startEnergy;
    }

    draw(){
        board[this.x][this.y] = 2;
    }
}