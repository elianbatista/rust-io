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
    runClock() {
           let d = new Date();
           if (this.OldTime > this.NewTime) {
                  this.DeltaTime = this.NewTime - this.OldTime + 60;
           } else {
                  this.DeltaTime = this.NewTime - this.OldTime;
           }
           this.OldTime = this.NewTime;
           this.NewTime = d.getSeconds() + d.getMilliseconds() / 1000;
    }
    update() {
        setInterval(this.update, 16);
           this.runClock();
           console.log("Updating");

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