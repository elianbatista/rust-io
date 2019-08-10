/*
const express = require('express');
const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
const path = require('path');

*/
var express = require('express'),
    http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);


//server.listen(3000);
const path = require('path');
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var arrayPlayersObject = [];

var quantidadePlayers = 0;

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
let fruitProt = function(x, y, angle, zero, zeroRot, life){
  
}

io.on('connect', (socket) => {

       socket.on('conectei', function(name){  
         
              quantidadePlayers++;
         
              if(quantidadePlayers == 1){
                
                
                
              }
          
              var newSocket = new playerProt(name ,socket.id, 0, 0, 40, 0, 0);
         
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

                     socket.broadcast.emit('updatePositions', socket.id, playerX, playerY, size, mousex, mousey);

              }

       });

});

server.listen(port, function () {

       console.log('Server listening at port %d', port);

});