class Game {
    constructor(w, h) {
        this.w = w;
        this.h = h;

        this.score = 0;

        this.p = new Pixel();
        this.f = new Food();
    }

    Update() {
        this.p.Update();
        this.p.Draw();
        this.f.Draw();

        if (this.p.x == this.f.x & this.p.y == this.f.y) {
            this.score++;
            this.f = new Food();
        }
    }

    Draw() {
        this.f.Draw();
        this.p.Draw();
    }


    timeStep(){
        this.Update();
        this.Draw();
        this.Move();

    }

    // Move(u, d, r, l) {
    //     this.p.Move(u, d, r, l);
    // }
    Move(){
        this.p.decide(this.toArray());
    }

    getFitness() {
        return this.score;
    }

    toArray() {//1 for pixel, 2 for food;
        let arr = [];
        for (let i = 0; i < this.w; i++) {
            for (let j = 0; j < this.h; j++) {
                if (this.f.x != i | this.f.y != j) {
                    if (this.p.x != i | this.p.y != j) {
                        arr.push(0);
                    }
                    if (this.p.x == i & this.p.y == j) {
                        arr.push(1);
                    }
                }
                if (this.f.x == i & this.f.y == j) {
                    arr.push(2);
                }
            }
        }
        return arr;
    }
}