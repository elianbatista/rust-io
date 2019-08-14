const vec2d = require('./mathServer.js');
//const io = require('socket.io')
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
              return this.players.lenth == 0;
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
              for (f of this.fruits) {
                     f.update();
              }
       }
       update(io) {

              this.runClock();
              // console.log(this.newTime);

              this.updateFruits();
              this.updateBullets()

              io.emit("spawnBullets", this.bullets);
              //io.emit("spawnFruits", arrayFruitsObject);

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