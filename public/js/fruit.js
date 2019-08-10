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


        this.limit = 1;
    }
    getQuadbyPos(x, y) {
        if (!this.close) {
            if (x <= this.center.x) {
                if (y <= this.center.y) {
                    return this.leftUp.getQuadbyPos(x, y);
                } else {
                    return this.leftDown.getQuadbyPos(x, y);
                }
            } else {
                if (y <= this.center.y) {
                    return this.rightUp.getQuadbyPos(x,y);
                } else {
                   return this.rightDown.getQuadbyPos(x,y);

                }
            }
        } else {
            return this;
        }
    }
    display() {
        noFill();
        stroke(255, 0, 0);
        strokeWeight(2);
        rect(this.center.x, this.center.y, this.w, this.h)

        if (this.fruits.length > 0) {
            for (let food of this.fruits) {
                food.display();
            }
        }
        if (this.leftUp) {
            this.leftUp.display();
        }
        if (this.leftDown) {
            this.leftDown.display();
        }
        if (this.rightUp) {
            this.rightUp.display();
        }
        if (this.rightDown) {
            this.rightDown.display();
        }
    }
    createLeftUp() {
        const center = createVector(this.center.x - this.w / 4, this.center.y - this.h / 4);
        this.leftUp = new quadFood(center, this.w / 2, this.h / 2);
    }
    createLeftDown() {
        const center = createVector(this.center.x - this.w / 4, this.center.y + this.h / 4);
        this.leftDown = new quadFood(center, this.w / 2, this.h / 2);
    }

    createRightUp() {
        const center = createVector(this.center.x + this.w / 4, this.center.y - this.h / 4);
        this.rightUp = new quadFood(center, this.w / 2, this.h / 2);
    }
    createRightDown() {
        const center = createVector(this.center.x + this.w / 4, this.center.y + this.h / 4);
        this.rightDown = new quadFood(center, this.w / 2, this.h / 2);
    }
    createQuads() {
        this.createLeftUp();
        this.createLeftDown();
        this.createRightUp();
        this.createRightDown();

        this.close = false;
    }

    checkQuad(fruit) {
        const pos = fruit.pos.copy();

        if (pos.x <= this.center.x) {
            if (pos.y <= this.center.y) {
                this.leftUp.insert(fruit)
            } else {
                this.leftDown.insert(fruit)
            }
        } else {
            if (pos.y <= this.center.y) {
                this.rightUp.insert(fruit)
            } else {
                this.rightDown.insert(fruit)

            }
        }

    }
    insert(fruit) {
        if (this.fruits.length <= this.limit && this.close) {
            this.fruits.push(fruit);
        } else {
            if (this.close) {
                this.close = false;
                this.createQuads();

            }
            for (let i = this.fruits.length - 1; i >= 0; i--) {
                this.checkQuad(this.fruits[i]);
                this.fruits.splice(i, 1);
                console.log('a');
            }
            this.checkQuad(fruit);

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