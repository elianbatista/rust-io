class spellTimer {
    constructor(cd) {
        this.cd = cd;
        this.start = 0;
        this.end = 0;
    }
    startTimer() {
        this.start = millis();
        this.end = this.start + this.cd;
    }
    remainTime(){
        return this.end - this.start;
    }
    runTimer() {
        if(this.start <= this.end){
            this.start += world.deltaTime;
        }
    }
    checkTimer() {
        return (this.start >= this.end);
    }
}
class spell {
    constructor(pos, target, acurac, speed, life, damage, size) {
        this.pos = createVector(pos.x, pos.y);
        

        this.size = size;
        this.speed = speed;
        this.dir = createVector(target.x, target.y);

        const angle = map(acurac, 0, 1, -PI / 4, 0);
        this.dir.rotate(random(angle, -angle));
        this.dir.normalize();
        this.dir.mult(speed);

        this.damage = damage;

        this.life = life;

    }
    display() {
        if (this.checkLife()) {
            fill(170, 0, 200);
            circle(this.pos.x, this.pos.y, this.size);
        }
    }
    checkLife() {
        return this.life >= 0;
    }
    update() {
        if(this.pos.x > world.size.width || this.pos.x < -world.size.width){
            this.life = -10;
        }
        if(this.pos.y > world.size.height || this.pos.y < -world.size.height){
            this.life = -10;
        }
        const dir = this.dir.copy().mult(world.getDelta());
        this.pos.add(dir)
        this.life -= world.deltaTime;

        if (this.checkLife()) {
            const quad = world.quadFruits.getQuadbyPos(this.pos.x,this.pos.y);
            for (let food of quad.fruits) {
                if (this.pos.dist(food.pos) < food.size) {
                    food.life -= this.damage;
                    food.aplyForce(dir,1)
                    food.hit.startTimer();
                    if (food.dir.x > food.dir.y) {
                        food.dirAng = food.dir.x * random(10);
                    } else {
                        food.dirAng = food.dir.y * random(10);
                    }
                    this.life = 0;
                }
                fill(0);
                circle(food.pos.x,food.pos.y,40);
            }
            
        } else {
            world.playerPrincipal.bullets.splice(world.playerPrincipal.bullets.indexOf(this), 1);
            

        }
    }
}