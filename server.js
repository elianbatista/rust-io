var express = require('express'),
       http = require('http');


var app = express();
var server = http.createServer(app);


const mathServer = require('./mathServer.js');
const playerServer = require('./playerServer.js');
const bulletServer = require('./bulletServer.js');
const fruitServer = require('./fruitServer.js');
const arenaServer = require('./arenaServer.js');




var io = require('socket.io').listen(server)


const path = require('path');
const port = process.env.PORT || 3000;
//localStorage.debug = '*';
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


let world = {
       width: 400,
       height: 400
      // zero: vec2d(0,0),
      // xAxis: vec2d(1,0)
}
//this.pos.x,this.pos.y,this.size, this.mousex, this.mousey
var playerProt = function (name, id, x, y, size, mousex, mousey) {
       this.name = name;
       this.x = x;
       this.y = y;
       this.size = size;
       this.mousex = mousex;
       this.mousey = mousey;
       this.id = id;
};


let protBullet = function (x, y, angle, speed, life, damage) {
       this.x = x
       this.y = y;
       this.angle = angle;
       this.speed = speed;
       this.life = life;
       this.damage = damage;
       
}
function randomInterval(min, max) {
       return Math.random() * (max - min) + min;
}
function lerpN(a, b, n){
       return (1-n)*a + n*b;
}
class food {
       constructor(posx, posy) {
              this.pos = new vec2d(posx, posy);
              this.dir = new vec2d(0, 0);
              this.dirAng = 0;
              this.rotate = randomInterval(360,0);
              this.size = 20;
              this.life = 100;

              this.zero = new vec2d(randomInterval(10,-10), randomInterval(-10, 10));
           
              this.zero.normalize();
              
              this.zero.mult(0.1);
              
              this.zeroRot = randomInterval(-1, 1) * (Math.PI / 8);

       }
       checkLife() {
              return this.life >= 0;
       }
       checkWalls() {
              
              const quick = 1.5;
              let force = new vec2d(0, 0);
              if (this.pos.x >= world.width - 20 || this.pos.x <= -world.width + 20) {
                     if (this.pos.x < 0) {
                            const f = new vec2d(1, 0);
                            force.add(f);

                     } else {
                            const f = new vec2d(-1, 0);
                            force.add(f);
                     }
              }
              
              if (this.pos.y > world.height - 20 || this.pos.y <= -world.height + 20) {
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
       update() {
              this.checkWalls();
              if (this.zero.magSq() > 0.5) {
                     let zero = this.zero.clone();
                     zero.mult(0.1);
                     this.zero.lerp(zero, 0.5);
              }
       
              this.dir.lerp(this.zero, 0.15);
              this.dirAng = lerpN(this.dirAng, this.zeroRot, 0.4);

              this.rotate += this.dirAng;
              this.pos.add(this.dir);
              
              this.pos.constrain(-world.width, world.height);
           
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

io.on('connect', (socket) => {

       socket.on('conectei', function (name) {

              var newSocket = new playerProt(name, socket.id, 0, 0, 40, 0, 0);
              arrayPlayersObject.push(newSocket);

              if (arrayPlayersObject.length == 1) {
                     socket.emit('criarSala', true, name, world.width, world.height)
              } else {
                     socket.emit('criarSala', false, name, world.width, world.height)
              }



              socket.broadcast.emit('newSocket', newSocket);


              socket.emit('mensagem', arrayPlayersObject);

       });

       socket.on('disconnect', function () {

              socket.broadcast.emit('disconectPlayer', socket.id);

              for (var i = 0; i < arrayPlayersObject.length; i++) {

                     if (arrayPlayersObject[i]['id'] == socket.id) {

                            arrayPlayersObject.splice(i, 1);

                     }

              }

       });

       socket.on('update', (playerX, playerY, size, mousex, mousey) => {

              for (var i = 0; i < arrayPlayersObject.length; i++) {

                     if (arrayPlayersObject[i]['id'] == socket.id) {

                            arrayPlayersObject[i]['x'] = playerX;

                            arrayPlayersObject[i]['y'] = playerY;

                            arrayPlayersObject[i]['size'] = size;

                            arrayPlayersObject[i]['mousex'] = mousex;

                            arrayPlayersObject[i]['mousey'] = mousey;

                     }

                     socket.volatile.broadcast.emit('updatePositions', socket.id, playerX, playerY, size, mousex, mousey);

              }

       });


       socket.on('newBullet', function (x, y, angle, speed, life, damage) {
              let prot = new protBullet(x, y, angle, speed, life, damage);
              arrayBulletsObject.push(prot);
              //socket.volatile.broadcast.emit('spawnBullet', prot);
       });
       socket.on('createFruits',function(n){
              for(let i=0;i<=n;i++){
                     let fruit = new food(randomInterval(-world.width,world.width),
                                          randomInterval(-world.height,world.height));

                     arrayFruitsObject.push(fruit);
                     //console.log(fruit.pos.x, fruit.pos.y);
              }
       });
  

});
class serverClass{
       constructor(_width, _height) {
              this.players = [];
              this.bullets = [];
              this.fruits = [];
      

              this.oldTime = 0;
              this.newTime = 0;
              this.deltaTime = 0;
      
       }
       runClock(){
              let d = new Date();
              if (this.OldTime > this.NewTime) {
                     this.DeltaTime = this.NewTime - this.OldTime + 60;
              } else {
                     this.DeltaTime = this.NewTime - this.OldTime;
              }
              this.OldTime = this.NewTime;
              this.NewTime = d.getSeconds() + d.getMilliseconds() / 1000;
       }
       update(){
              this.runClock();

              updateFruits();
              updateBullets()
         
              io.emit("spawnBullets", arrayBulletsObject);
              io.emit("spawnFruits", arrayFruitsObject);

       }
       
}
function updateBullets(){
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
              let dir = new vec2d(0,0);
              dir.fromAngle(bullet.angle, bullet.speed * serverDeltaTime);
              
              pos.add(dir);
              //pos.print();
              bullet.x = pos.x;
              bullet.y = pos.y;

              bullet.life -= serverDeltaTime * 1000;
       }
}


function ServerGameLoop() {
       runClock();
       updateFruits();
       updateBullets()
  
       io.emit("spawnBullets", arrayBulletsObject);
       io.emit("spawnFruits", arrayFruitsObject);
}

setInterval(ServerGameLoop,16);


server.listen(port, function () {

       console.log('Server listening at port %d', port);

});