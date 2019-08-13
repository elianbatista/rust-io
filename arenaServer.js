console.log('Arena Server');


class arena {
    constructor() {
           this.players = [];
           this.bullets = [];
           this.fruits = [];


           this.oldTime = 0;
           this.newTime = 0;
           this.deltaTime = 0;
    }
    getTime(optimize){
           if(optimize){
              return this.
           }else{

           }
           
    }
    runClock() {
       let d = new Date();
       if (this.oldTime > this.newTime) {
              this.deltaTime = this.newTime - this.oldTime + 60;
       } else {
              this.deltaTime = this.newTime - this.oldTime;
       }
       this.oldTime = this.newTime;
       this.newTime = d.getSeconds() + d.getMilliseconds() / 1000;
    }
    update() {
       
           this.runClock();
           console.log(this.newTime);

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