const vec2d = require('./mathServer.js');
const fruit = require('./fruitServer.js');
//const io = require('socket.io')
function randomInterval(min, max) {
       return Math.random() * (max - min) + min;
}
class arena {
       constructor(width, height) {
              this.players = [];
              this.bullets = [];
              this.fruits = [];
              this.quadFruit;
         
              this.width = width;
              this.height = height;
              this.frame = 0;
              this.create = true;
              this.oldTime = 0;
              this.newTime = 0;
              this.deltaTime = 0;
       }
       havePlayers() {
              return this.players.length == 0;
       }
       getTime(optimize) {
              if (!optimize) {
                     this.runClock();
              }
              return this.newTime;

       }
       runClock() {
              let d = new Date();
              if (this.oldTime > this.newTime) {
                     this.newTime += 60;
              }
              this.deltaTime = this.newTime - this.oldTime;
              this.oldTime = this.newTime;
              this.newTime = d.getSeconds() + d.getMilliseconds() / 1000;
       }
       updateBullets() {
              for (let i = this.bullets.length - 1; i >= 0; i--) {
                     if (this.bullets[i].life <= 0) {
                            this.bullets.splice(i, 1);
                            continue;
                     }
                     if (this.bullets[i].x <= -this.width || this.bullets[i].x >= this.width ||
                            this.bullets[i].y <= -this.height || this.bullets[i].y >= this.height) {
                            this.bullets.splice(i, 1);
                            continue;
                     }

                     if (this.bullets.length != 0) {
                            let pos = new vec2d(this.bullets[i].x, this.bullets[i].y);
                            let dir = new vec2d(0, 0);
                            dir.fromAngle(this.bullets[i].angle, this.bullets[i].speed * this.deltaTime);
                            pos.add(dir);

                            this.bullets[i].x = pos.x;
                            this.bullets[i].y = pos.y;
                            this.bullets[i].life -= this.deltaTime * 1000;
                     }

              }
       }


       updateFruits() {
              
              let i = 0
              let j = 0;
              for (let f of this.fruits) {
                     /*
                     if (fruit.state == foodState.DEAD) {
                            this.fruits.splice(i, 1);
                            continue;
                     }
                     */
                    f.update(this.width, this.height);
        
                     
                     j = 0;
                     
                     for (let b of this.fruits) {
                            if(i != j){
                                collideAndPush(f, b,f.size,b.size, 1.5, true);
                                  
                            }
                  
                            j++;
                     }
                     
                     
                     
                     /* f.aplyForce(force, quick);
                     if (f.state != foodState.DYING) {
                            this.quadfs.insert(f)
                     }
                     */
                     i++;
              }
             
           


       }

       createFruit() {
              this.fruits.push(new fruit(randomInterval(-this.width, this.width),
                     randomInterval(-this.height, this.height)))
       }
       update(io) {
              this.frame++;
         
              this.runClock();
              // console.log(this.newTime);

              this.updateFruits();
              this.updateBullets()

              io.emit("spawnBullets", this.bullets);
         if(this.frame%2 ==0){
           //io.emit("spawnFruits", this.fruits);
         }
              

       }

}
function collideAndPush(a, b, sizeA, sizeB, force, options){
      let con = new vec2d(0,0);
      con.copy(b.pos);
      con.sub(a.pos);
      const dist = con.mag();
      if (dist < sizeB / 2 + sizeA / 2) {
          con.normalize();
          b.aplyForce(con, dist * 0.4)
          
          if(options){
            con.mult(-1);
            a.aplyForce(con, dist * 0.4)
          }
          

      }
}
/*
function updateBullets() {
       for (let i = arrayBulletsObject.length - 1; i >= 0; i--) {
              let bullet = arrayBulletsObject[i];
              if (bullet.life <= 0) {
                     arrayBulletsObject.splice(i, 1);
                     continue;
              }
              if (bullet.x <= -400 || bullet.x >= 400 || bullet.y <= -400 || bullet.y >= 400) {
                     arrayBulletsObject.splice(i, 1);
                     continue;
              }
              let pos = new vec2d(bullet.x, bullet.y);
              let dir = new vec2d(0, 0);
              dir.fromAngle(bullet.angle, bullet.speed * serverDeltaTime);

              pos.add(dir);
              //pos.print();
              bullet.x = pos.x;
              bullet.y = pos.y;

              bullet.life -= serverDeltaTime * 1000;
       }
}

*/
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
                    return this.rightUp.getQuadbyPos(x, y);
                } else {
                    return this.rightDown.getQuadbyPos(x, y);

                }
            }
        } else {
            return this;
        }
    }
 
    display() {
        if (debugMode) {
            noFill();
            stroke(255, 0, 0);
            strokeWeight(2);
            rect(this.center.x, this.center.y, this.w, this.h)
        }


        if (this.fruits.length > 0) {
            for (let food of this.fruits) {
               // food.display();
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
        const center = new vec2d(this.center.x - this.w / 4, this.center.y - this.h / 4);
        this.leftUp = new quadFood(center, this.w / 2, this.h / 2);
    }
    createLeftDown() {
        const center = new vec2d(this.center.x - this.w / 4, this.center.y + this.h / 4);
        this.leftDown = new quadFood(center, this.w / 2, this.h / 2);
    }

    createRightUp() {
        const center = new vec2d(this.center.x + this.w / 4, this.center.y - this.h / 4);
        this.rightUp = new quadFood(center, this.w / 2, this.h / 2);
    }
    createRightDown() {
        const center = new vec2d(this.center.x + this.w / 4, this.center.y + this.h / 4);
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
        const pos = new vec2d(fruit.pos.x, fruit.pos.y);

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
            }
            this.checkQuad(fruit);
        }
    }
}
module.exports = arena;