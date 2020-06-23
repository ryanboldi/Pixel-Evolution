class Pixel {
    constructor(brain) {
        this.x = floor(random(w));
        this.y = floor(random(h));

        this.energy = 50;
        this.score = 0; //JUST USED FOR GRAPHING

        this.sight = new Array(((playerSight * 2) + 1) * ((playerSight * 2) + 1));

        if (brain) {
            this.brain = brain;
        }
        else {
            this.brain = new Architect.Random(((playerSight * 2) + 1) * ((playerSight * 2) + 1), 10, 4);
            //console.log(this.brain);
        }
    }

    update() {
        this.sight = new Array(((playerSight * 2) + 1) * ((playerSight * 2) + 1));
        //starting in top left corner
        let x = this.x - playerSight;
        let y = this.y - playerSight;
        for (let i = 0; i < this.sight.length; i++) {
            this.sight[i] = (getFood(x, y));
            x = x + 1;
            if (x > this.x + playerSight) {
                x = this.x - playerSight;
                y += 1;
            }
        }

        let toDel = -1;
        //find which food we ate, and delete it
        for (let i = 0; i < food.length; i++) {
            if (food[i].x == this.x && food[i].y == this.y) {
                //delete food[i] and make new random food
                toDel = i;
            }
        }
        if (toDel >= 0) {
            this.score += 1;
            this.energy += foodEnergy;
            food[toDel] = new Food();
            
        }

        if (this.energy >= 100){
            replaceRandom(this.createOffspring());
            this.energy -= 50;
        }

        if (this.energy <= 0){
            this.die();
        }


        let outputs = this.brain.activate(this.sight);
        this.move(outputs);
    }

    draw() {
        board[this.x][this.y] = 2;
    }

    //[u,d,l,r]
    move(moves) {
        //HANDLE WRAPPING around the world 

        let big = - Infinity
        let dir = 0
        for (let i = 0; i < moves.length; i++) {
            if (moves[i] > big) {
                big = moves[i]
                dir = i
            }
        }

        if (dir == 0) {
            //move up
            this.y = getPos(this.x, this.y - 1).y;
        }
        else if (dir == 1) {
            //move down
            this.y = getPos(this.x, this.y + 1).y;
        }
        else if (dir == 2) {
            //move left
            this.x = getPos(this.x - 1, this.y).x;
        }
        else if (dir == 3) {
            //move right
            this.x = getPos(this.x + 1, this.y).x;
        }

        this.energy -= 1;
    }

    createOffspring() {
        console.log("OFFSPRING");
        //fixes proto not being cloned
        let newBrain = _.cloneDeep(this.brain);

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

        newBrain.mutate(choice);
        return new Pixel(newBrain);
    }

    die() {
        //if dead, make a new random to take your place
        this.brain = new Architect.Random(((playerSight * 2) + 1) * ((playerSight * 2) + 1), ((playerSight * 2) + 1) * ((playerSight * 2) + 1), 4);
        this.x = floor(random(w));
        this.y = floor(random(h));
        this.energy = 50;
        this.score = 0;
    }
}