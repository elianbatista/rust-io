class quadFood {
    constructor(center, w, h) {
        this.fruits = [];
        this.close = true;
        this.leftUp = null;
        this.leftDown = null;
        this.rightUp = null;
        this.rightDown = null;

        this.center = center;
        this.w = w;
        this.h = h;


        this.limit = 2;
    }
    display(){
        noFill();
        stroke(255,0,0);
        rect(this.center.x,this.center.y,this.w,this.h)
    }
    createQuads() {
        this.leftUp = new quadFood(p5.Vector(this.center.x - this.w / 2,
            this.center.y - this.h / 2,
            this.w / 2, this.h / 2));
        //  this.leftDown = new quadFood();
        // this.rightUp = new quadFood();
        // this.rightDown = new quadFood();

        this.close = false;
    }
    checkQuad(pos) {
        const w = world.size.width;
        const h = world.size.height;
        const center = createVector(0, 0);

        if (pos.x <= this.center.x) {
            if (pos.y <= this.center.y) {
                //leftUp
            } else {
                //leftDown
            }
        } else {
            if (pos.y <= this.center.y) {
                //rightUp
            } else {
                //rightDown

            }
        }

    }
    insert(fruit) {
        if (this.fruits.lenght <= this.limit) {
            this.fruits.push(fruit);
        } else {

        }
    }
}
class food {
    constructor(posx, posy) {
        this.pos = createVector(posx, posy);
        this.dir = createVector(0, 0);
        this.dirAng = 0;
        this.rotate = random(360);
        this.size = 20;

        this.life = 100;
        this.lifeD = new life(100);
        this.zero = createVector(random(-10, 10), random(-10, 10));
        this.zero.normalize().mult(0.1);
        this.zeroRot = random(-1, 1) * (PI / 8);

        this.hit = new spellTimer(600);
        this.flag = true;
        this.state = foodState.WALK;
    }
    checkLife() {
        return this.life >= 0;
    }
    update() {
        this.dir = p5.Vector.lerp(this.dir, this.zero, 0.15);

        this.dirAng = lerp(this.dirAng, this.zeroRot, 0.4);
        this.rotate += this.dirAng;
        this.pos.add(this.dir);
    }
    display() {
        this.hit.runTimer()

        if (this.checkLife()) {
            if (this.life < 100) {
                this.lifeD.display(this.life, this.pos, 35);
            }

            push();
            translate(this.pos.x, this.pos.y);
            rotate(this.rotate * PI / 180)
            stroke(0);

            if (this.hit.checkTimer()) {
                fill(50, 200, 50);
                rect(0, 0, this.size, this.size);
            } else {
                fill(map(this.hit.remainTime(), 0, this.hit.cd, 255, 50), 60, 100);
                const anim = map(this.hit.remainTime(), 0, this.hit.cd, this.size, this.size * 1.2)
                rect(0, 0, anim, anim);
            }


            pop();

        } else {

            if (this.state == foodState.WALK) { //
                this.state = foodState.DYING;
                this.hit.startTimer();
            }

            if (this.hit.checkTimer()) {
                world.fruits.splice(world.fruits.indexOf(this), 1);
                world.setRandomFruit();

            } else {

                push()
                translate(this.pos.x, this.pos.y);

                rotate(this.rotate * PI / 180)
                stroke(0, 0, 0, map(this.hit.remainTime(), this.hit.cd, 0, 255, 0));
                fill(map(this.hit.remainTime(), 0, this.hit.cd, 255, 50), 60, 100, map(this.hit.remainTime(), this.hit.cd, 0, 255, 0));

                rect(0, 0, this.size, this.size);
                pop()

            }
        }

    }

}