var express = require('express'),
       http = require('http');

var app = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server) //({ wsEngine: 'ws' });


const path = require('path');
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var arrayPlayersObject = [];

var arrayBulletsObject = [];

let serverDeltaTime = 0;
let serverNewTime = 0;
let serverOldTime = 0;


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

let protFruit = function (x, y, size, angle, life) {

       this.x = x;
       this.y = y;
       this.size = size;
       this.angle = angle;
       this.life = life;

}

io.on('connect', (socket) => {

       socket.on('conectei', function (name) {

              var newSocket = new playerProt(name, socket.id, 0, 0, 40, 0, 0);

              socket.broadcast.emit('newSocket', newSocket);

              arrayPlayersObject.push(newSocket);

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

});

function ServerGameLoop() {
       let d = new Date();
       serverDeltaTime = serverNewTime - serverOldTime;
       serverOldTime = serverNewTime;
       serverNewTime = d.getMilliseconds();

       for (let i = 0; i < arrayBulletsObject.length; i++) {
              let bullet = arrayBulletsObject[i];

              const dirx = bullet.speed*Math.cos(bullet.angle)
              const diry = bullet.speed*Math.sin(bullet.angle)
             
              bullet.x += dirx * serverDeltaTime;
              bullet.y += diry * serverDeltaTime;

              console.log(bullet.x, bullet.y, serverDeltaTime);

              /* Check if this bullet is close enough to hit any player 
              for (var id in players) {
                     if (bullet.owner_id != id) {
                            // And your own bullet shouldn't kill you
                            var dx = players[id].x - bullet.x;
                            var dy = players[id].y - bullet.y;
                            var dist = Math.sqrt(dx * dx + dy * dy);
                            if (dist < 70) {
                                   io.emit('player-hit', id); // Tell everyone this player got hit
                            }
                     }
              }
              */

       }
       // Tell everyone where all the bullets are by sending the whole array
       //io.emit("bullets-update", bullet_array);
}

setInterval(ServerGameLoop, 200);



server.listen(port, function () {

       console.log('Server listening at port %d', port);

});