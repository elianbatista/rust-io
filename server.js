var express = require('express'),
       http = require('http');


var app = express();
var server = http.createServer(app);


const mathServer = require('./mathServer.js');
const clockServer = require('./clockServer.js');
const playerServer = require('./playerServer.js');
const bulletServer = require('./bulletServer.js');
const fruitServer = require('./fruitServer.js');
const arenaServer = require('./arenaServer.js');

console.log(arenaServer);
let arenaInstance = new arenaServer();


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
       socket.on('createFruits', function (n) {
              for (let i = 0; i <= n; i++) {
                     let fruit = new food(randomInterval(-world.width, world.width),
                            randomInterval(-world.height, world.height));

                     arrayFruitsObject.push(fruit);
                     //console.log(fruit.pos.x, fruit.pos.y);
              }
       });


});
setInterval(function(){arenaInstance.update();}, 100);




server.listen(port, function () {

       console.log('Server listening at port %d', port);

});