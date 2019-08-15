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
<<<<<<< HEAD
    forceStop() {
        this.start = this.end;
    }
    remainTime() {
        return this.end - this.start;
    }
    runTimer() {
        if (this.start <= this.end) {
=======
    remainTime(){
        return this.end - this.start;
    }
    runTimer() {
        if(this.start <= this.end){
>>>>>>> 0609e4bf93cbec187398ee37493165f6102d456e
            this.start += world.deltaTime;
        }
    }
    checkTimer() {
        return (this.start >= this.end);
    }
}
class spell {
<<<<<<< HEAD
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
=======
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

>>>>>>> 0609e4bf93cbec187398ee37493165f6102d456e
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
<<<<<<< HEAD
        if (this.pos.x > world.size.width || this.pos.x < -world.size.width) {
            this.life = -10;
        }
        if (this.pos.y > world.size.height || this.pos.y < -world.size.height) {
=======
        if(this.pos.x > world.size.width || this.pos.x < -world.size.width){
            this.life = -10;
        }
        if(this.pos.y > world.size.height || this.pos.y < -world.size.height){
>>>>>>> 0609e4bf93cbec187398ee37493165f6102d456e
            this.life = -10;
        }
        const dir = this.dir.copy().mult(world.getDelta());
        this.pos.add(dir)
        this.life -= world.deltaTime;

        if (!this.checkLife()) {
<<<<<<< HEAD
            world.playerPrincipal.bullets.splice(world.playerPrincipal.bullets.indexOf(this), 1);
        }
=======
            world.playerPrincipal.bullets.splice(world.playerPrincipal.bullets.indexOf(this), 1); 
        } 
>>>>>>> 0609e4bf93cbec187398ee37493165f6102d456e
    }
}