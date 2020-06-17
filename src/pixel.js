class Pixel {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.energy = startEnergy;
        this.sight = new Array(12);
    }

    update(){
        this.sight[0] = board[this.x][this.y + 2]//etc etc (HANDLE WRAPPING)
    }

    draw(){
        board[this.x][this.y] = 2;
    }

    move(){
        //HANDLE WRAPPING around the world 


        //MOVE TO THE LEFT


        //MOVE TO THE RIGHT


        //MOVE UP


        //MOVE DOWN
    }
}