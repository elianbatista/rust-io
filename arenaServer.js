console.log('Arena Server');


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
       update() {

              this.runClock();
             // console.log(this.newTime);

              //updateFruits();
              //updateBullets()

              //io.emit("spawnBullets", arrayBulletsObject);
              //io.emit("spawnFruits", arrayFruitsObject);

       }

}

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
module.exports = arena;