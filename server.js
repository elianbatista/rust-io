
const express = require('express');
const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
const path = require('path');
/*
var express = require('express'),
    http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(3000);
const path = require('path');
const port = process.env.PORT || 3000;
*/
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

       socket.on('conectei', function(){  

              var newSocket = new playerProt(Math.random() * 500, Math.random() * 500, 0, 40, socket.id);

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

       socket.on('update', (playerX, playerY, angulo) => {

              for (var i = 0; i < arrayPlayersObject.length; i++) {

                     if (arrayPlayersObject[i]['id'] == socket.id) {

                            arrayPlayersObject[i]['x'] = playerX;

                            arrayPlayersObject[i]['y'] = playerY;
                       
                            arrayPlayersObject[i]['angle'] = angulo;

                     }

                     socket.broadcast.emit('updatePositions', socket.id, playerX, playerY, angulo);

              }
         
               //console.log("Player: " + socket.id + "PosX: " + playerX + "PosY: " + playerY);

       });

});

server.listen(port, function () {

       console.log('Server listening at port %d', port);

});