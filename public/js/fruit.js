class food {
    constructor(posx, posy) {
        this.pos = createVector(posx, posy);
        this.dir = createVector(0, 0);
        this.dirAng = 0;
        this.rotate = random(360);
        this.size = 20;

        this.life = 100;
        this.lifeD = new life(100);
        this.zero = createVector(random(-10,10),random(-10,10));
        this.zero.normalize().mult(0.1);
        this.zeroRot = random(-1,1) * (PI/8);

        this.hit = spellTimer(15);

    }
    checkLife() {
        return this.life >= 0;
    }
    display() {
        if (this.checkLife()) {
            if (this.life < 100) {
                this.lifeD.display(this.life, this.pos, 20);
            }
            
            this.dir = p5.Vector.lerp(this.dir, this.zero, 0.15);
           
            this.dirAng = lerp(this.dirAng, this.zeroRot, 0.4);
            this.rotate += this.dirAng;
            this.pos.add(this.dir);

            push();

            translate(this.pos.x, this.pos.y);
            rotate(this.rotate * PI / 180)
            if(this.hit.checkTimer()){
                fill(50, 200, 50);
            }else{
                fill(250, 20, 50);
            }
            
            stroke(0);
            rect(0, 0, this.size, this.size);
            pop();
            fruit.hit.runTimer()
        }else{
            world.fruits.splice(world.fruits.indexOf(this),1);
        }

    }

}