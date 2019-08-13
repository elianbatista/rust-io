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
       havePlayers(){
              return this.players.lenth==0;
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
       updateBullets(){
         this.bullets.slice().reverse().forEach(function(element, index, array) {
            if(element.life <= 0){
              array.splice(index,1);
              return true;
            }
           if(element.x <= -this.width || element.x >= this.width || element.y <= -this.height || element.y >= this.height){
             array.splice(index,1);
              return true;
           }
           let pos = new vec2d(element.x, element.y);
           let dir = new vec2d(0, 0);
           dir.fromAngle(element.angle, element.speed * this.deltaTime);
           pos.add(dir);
           
           element.x = pos.x;
           element.y = pos.y;
           element.life -= this.deltaTime * 1000;
            
         })
       }
       updateFruits(){
         for(f of this.fruits){
           f.update();
         }
       }
       update() {

              this.runClock();
             // console.log(this.newTime);

              this.updateFruits();
              this.updateBullets()

              //io.emit("spawnBullets", arrayBulletsObject);
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