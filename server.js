<<<<<<< HEAD
var express = require('express'),
       http = require('http');


var app = express();
var server = http.createServer(app);
//Deixar do jeito q tava antes do servidor
// colisão bala-fruta / bala-player / fruta-fruta 1.0
//Criar sistemas de pontos/level/xp
//ScoreBoard e update
//Classes
//


const mathServer = require('./mathServer.js');
const clockServer = require('./clockServer.js');
const playerServer = require('./playerServer.js');
const bulletServer = require('./bulletServer.js');
const fruitServer = require('./fruitServer.js');
const arenaServer = require('./arenaServer.js');




var io = require('socket.io').listen(server);

=======
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

const path = require('path');
>>>>>>> 0609e4bf93cbec187398ee37493165f6102d456e

const path = require('path');
const port = process.env.PORT || 3000;
//localStorage.debug = '*';
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var arrayPlayersObject = [];

var playerProt = function (x, y, angle, size, id) {

       this.x = x;
       this.y = y;
       this.angle = angle;
       this.size = size;

       this.id = id;

};

io.on('connect', (socket) => {

       var newSocket = new playerProt(Math.random() * 500, Math.random() * 500, socket.id);

       socket.broadcast.emit('newSocket', newSocket);

       arrayPlayersObject.push(newSocket);

       socket.emit('mensagem', arrayPlayersObject);

       socket.on('disconnect', function () {

              socket.broadcast.emit('disconectPlayer', socket.id);

              for (var i = 0; i < arrayPlayersObject.length; i++) {

                     if (arrayPlayersObject[i]['id'] == socket.id) {

                            arrayPlayersObject.splice(i, 1);

                     }

              }

       });

       socket.on('update', (playerX, playerY) => {

              for (var i = 0; i < arrayPlayersObject.length; i++) {

                     if (arrayPlayersObject[i]['id'] == socket.id) {

                            arrayPlayersObject[i]['x'] = playerX;

                            arrayPlayersObject[i]['y'] = playerY;

                     }

                     socket.broadcast.emit('updatePositions', socket.id, playerX, playerY);

              }

       });

});

<<<<<<< HEAD

let arenaInstance = new arenaServer(1600, 1600);

let bullet = new bulletServer();
let player = new playerServer('douglas', '123', 0, 0, 40);
let _fruit = new fruitServer(0,0);

//this.pos.x,this.pos.y,this.size, this.mousex, this.mousey



io.on('connect', (socket) => {

       socket.on('conectei', function (name) {
              socket.emit('criarSala', arenaInstance.create,
                     name,
                     arenaInstance.width,
                     arenaInstance.height)

              const newSocket = new playerServer(name, socket.id, 0, 0, 40);
              arenaInstance.players.push(newSocket);

              socket.broadcast.emit('newSocket', newSocket);
              socket.emit('mensagem', arenaInstance.players);
       });

       socket.on('disconnect', function () {
              socket.broadcast.emit('disconectPlayer', socket.id);

              arenaInstance.players.forEach(function (element, index, array) {
                     if (element.id == socket.id) {
                            array.splice(index, 1);
                            console.log("Disconected");
                     }
              })
       });

       socket.on('update', (playerX, playerY, size, mousex, mousey) => {

              arenaInstance.players.forEach(function (element, index, array) {
                     if (element.id == socket.id) {
                            array[index]['x'] = playerX;
                       
                            array[index]['y'] = playerY;
                            array[index]['size'] = size;
                            array[index]['mouseX'] = mousex;
                            array[index]['mousey'] = mousey;

                            socket.volatile.broadcast.emit('updatePositions', socket.id,
                                   playerX, playerY,
                                   size,
                                   mousex, mousey);

                     }
              })
       });
       

       socket.on('newBullet', function (x, y, angle, speed, life, damage) {
              let prot = new bulletServer(x, y, angle, speed, life, damage);
              arenaInstance.bullets.push(prot);
              socket.volatile.broadcast.emit('spawnBullet', prot);
       });
       socket.on('createFruits', function (n) {
              for (let i = 0; i <= n; i++) {
                     arenaInstance.createFruit();
              }
              arenaInstance.create = false;
       });


});
setInterval(function () {
       arenaInstance.update(io);
}, 16);




server.listen(port, function () {

       console.log('Server listening at port %d', port);

=======
server.listen(port, function () {
       console.log('Server listening at port %d', port);
>>>>>>> 0609e4bf93cbec187398ee37493165f6102d456e
});