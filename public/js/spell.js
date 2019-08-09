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

        const angle = map(acurac, 0, 1, -PI / 4, PI/4);
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
        const dir = this.dir.copy().mult(world.getDelta());
        this.pos.add(dir)
        this.life -= world.deltaTime;

        if (this.checkLife()) {
            for (let food of world.fruits) {
                if (this.pos.dist(food.pos) < food.size) {
                    food.life -= this.damage;
                    food.dir.x = dir.x;
                    food.dir.y = dir.y;
                    food.hit.startTimer();
                    if (food.dir.x > food.dir.y) {
                        food.dirAng = food.dir.x * random(10);
                    } else {
                        food.dirAng = food.dir.y * random(10);
                    }
                    this.life = 0;
                }
            }
        } else {
            world.playerPrincipal.bullets.splice(world.playerPrincipal.bullets.indexOf(this), 1);
            

        }
    }
}