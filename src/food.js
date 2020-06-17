class Food {
    constructor() {
        this.x = floor(random(w));
        this.y = floor(random(h));
    }

    draw(){
        board[this.x][this.y] = 1;
    }
}