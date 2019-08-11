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
    forceStop() {
        this.start = this.end;
    }
    remainTime() {
        return this.end - this.start;
    }
    runTimer() {
        if (this.start <= this.end) {
            this.start += world.deltaTime;
        }
    }
    checkTimer() {
        return (this.start >= this.end);
    }
}
class spell {
    constructor(pos, angle, speed, life, damage) {
        this.pos = createVector(pos.x, pos.y);
        //this.dir = p5.Vector.fromAngle(angle).mult(speed);
        this.angle = angle;
        this.dir = createVector(speed*cos(angle),speed*sin(angle));
        this.speed = speed;
        this.life = life;
        this.damage = damage;
       
        //MUDAR
        this.size = 10;
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
        if (this.pos.x > world.size.width || this.pos.x < -world.size.width) {
            this.life = -10;
        }
        if (this.pos.y > world.size.height || this.pos.y < -world.size.height) {
            this.life = -10;
        }
        const dir = this.dir.copy().mult(world.getDelta());
        this.pos.add(dir)
        this.life -= world.deltaTime;

        if (!this.checkLife()) {
            world.playerPrincipal.bullets.splice(world.playerPrincipal.bullets.indexOf(this), 1);
        }
    }
}