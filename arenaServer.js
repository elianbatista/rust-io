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

              this.width = width;
              this.height = height;


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

                     //this.collideAndPush(0.05, this.playerPrincipal, fruit, 1, 0);
                     j = 0;
                     
                     for (let b of this.fruits) {
                            if (i == j) {
                                   continue;
                            }
                            b.debug = 0;
                            const dist = b.pos.dist(f.pos);
                            if (dist < b.size / 2 + f.size / 2) {
                                   let mov =  new vec2d(0,0);
                                   mov.copy(b.pos);
                                   mov.sub(f.pos);
                                 
                                   mov.normalize();

                                   b.aplyForce(mov, dist * 0.1)
                                 
                                   j++;
                                  
                                   f.debug = 1;
                                   b.debug = 2;
                            }
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

              this.runClock();
              // console.log(this.newTime);

              this.updateFruits();
              this.updateBullets()

              io.emit("spawnBullets", this.bullets);
              io.emit("spawnFruits", this.fruits);

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
module.exports = arena;