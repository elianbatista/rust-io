class food {
    constructor(posx, posy) {
        this.pos = createVector(posx, posy);
        this.dir = createVector(0, 0);
        this.dirAng = 0;
        this.rotate = random(360);
        this.size = 20;

        this.life = 100;
        this.lifeD = new life(100);

    }
    checkLife() {
        return this.life >= 0;
    }
    display() {
        if (this.checkLife()) {
            if (this.life < 100) {
                this.lifeD.display(this.life, this.pos, 20);
            }
            const zero = this.dir.copy().normalize().mult(0.001);
            
            this.dir = p5.Vector.lerp(this.dir, zero, 0.2);
           
            this.dirAng = lerp(this.dirAng, 0, 0.4);
            this.rotate += this.dirAng;
            this.pos.add(this.dir);

            push();

            translate(this.pos.x, this.pos.y);
            rotate(this.rotate * PI / 180)
            fill(50, 200, 50);
            rect(0, 0, this.size, this.size);
            pop();
        }else{
            world.fruits.splice(world.fruits.indexOf(this),1);
        }

    }

}