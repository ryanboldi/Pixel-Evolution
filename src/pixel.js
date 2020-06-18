class Pixel {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.energy = startEnergy;
        this.sight = new Array(12);

        this.brain = new Architect.Random(12, 12, 1, 2 * 12);
        //console.log(this.brain);
    }

    update() {
        this.sight[0] = board[this.x][this.y + 2]//etc etc (HANDLE WRAPPING)
    }

    draw() {
        board[this.x][this.y] = 2;
    }

    move() {
        //HANDLE WRAPPING around the world 


        //MOVE TO THE LEFT


        //MOVE TO THE RIGHT


        //MOVE UP


        //MOVE DOWN
    }

    createOffspring() {
        //fixes proto not being cloned
        let pixel = { ...this };

        let newBrain = pixel.brain;
        console.log(pixel.brain);
        console.log(this.brain);

        let choice = random([
            Methods.Mutation.ADD_NODE,
            Methods.Mutation.SUB_NODE,
            Methods.Mutation.ADD_CONN,
            Methods.Mutation.SUB_CONN,
            Methods.Mutation.MOD_WEIGHT,
            Methods.Mutation.MOD_BIAS,
            Methods.Mutation.MOD_ACTIVATION,
            Methods.Mutation.ADD_SELF_CONN,
            Methods.Mutation.SUB_SELF_CONN,
            Methods.Mutation.ADD_GATE,
            Methods.Mutation.SUB_GATE,
            Methods.Mutation.ADD_BACK_CONN,
            Methods.Mutation.SUB_BACK_CONN]);

        console.log(choice)
        newBrain.mutate(choice);

        console.log(newBrain);
        console.log(this.brain);

        return newBrain;
    }
}