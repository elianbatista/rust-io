console.log('Bullet Server');
let protBullet = function (x, y, angle, speed, life, damage) {
    this.x = x
    this.y = y;
    this.angle = angle;
    this.speed = speed;
    this.life = life;
    this.damage = damage;
}

class bullet {
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
