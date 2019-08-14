
const vec2d = require('./mathServer.js');
function randomInterval(min, max) {
    return Math.random() * (max - min) + min;
}

function lerpN(a, b, n) {
    return (1 - n) * a + n * b;
}
class fruit {
    constructor(posx, posy) {
        
           this.pos = new vec2d(posx, posy);
           this.dir = new vec2d(0, 0);
           this.dirAng = 0;
           this.rotate = randomInterval(360, 0);
           this.size = 20;
           this.life = 100;

           this.zero = new vec2d(randomInterval(10, -10), randomInterval(-10, 10));

           this.zero.normalize();

           this.zero.mult(0.1);

           this.zeroRot = randomInterval(-1, 1) * (Math.PI / 8);
           this.debug;

    }
    checkLife() {
           return this.life >= 0;
    }
    checkWalls(width, height) {

           const quick = 1.5;
           let force = new vec2d(0, 0);
           if (this.pos.x >= width - 20 || this.pos.x <= -width + 20) {
                  if (this.pos.x < 0) {
                         const f = new vec2d(1, 0);
                         force.add(f);

                  } else {
                         const f = new vec2d(-1, 0);
                         force.add(f);
                  }
           }

           if (this.pos.y > height - 20 || this.pos.y <= -height + 20) {
                  if (this.pos.y < 0) {
                         const _f = new vec2d(0, 1)
                         force.add(_f);
                  } else {
                         const _f = new vec2d(0, -1)
                         force.add(_f);
                  }
           }
           this.zero.x += force.x * quick;
           this.zero.y += force.y * quick;
    }
    update(width, height) {
           this.checkWalls(width, height);
           if (this.zero.magSq() > 0.1) {
                  let zero = this.zero.clone();
                  zero.mult(0.1);
                  this.zero.lerp(zero, 0.5);
           }

           this.dir.lerp(this.zero, 0.15);
           this.dirAng = lerpN(this.dirAng, this.zeroRot, 0.4);

           this.rotate += this.dirAng;
          // let dir = this.dir;
           this.pos.add(this.dir);

           this.pos.constrain(-width, height);

           this.x = this.pos.x;
           this.y = this.pos.y;
    }
    aplyMovement(dir, force) {
           dir.mult(force);
           this.dir.copy(dir);
    }
    aplyForce(dir, force) {
       
           this.zero.x = dir.x * force;
           this.zero.y = dir.y * force;

    }
}
module.exports = fruit;