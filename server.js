

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var arrayPlayersObject = [];

var playerProt = function (x, y, id){
  
  this.x = x;
  this.y = y;
  this.id = id;
  
};

io.on('connect', (socket) => {
  
    var newSocket = new playerProt(Math.random()*500, Math.random()*500, socket.id);
  
    socket.broadcast.emit('newSocket', newSocket);

    arrayPlayersObject.push(newSocket);

    socket.emit('mensagem', arrayPlayersObject);
  
    socket.on('disconnect', function(){

      socket.broadcast.emit('disconectPlayer', socket.id);

      for(var i = 0; i < arrayPlayersObject.length; i++){

             if(arrayPlayersObject[i]['id'] == socket.id){

                    arrayPlayersObject.splice(i, 1);

             }

      }
      
    });
  
    socket.on('update', (playerX, playerY)=> {

          for(var i = 0; i < arrayPlayersObject.length; i++){

                 if(arrayPlayersObject[i]['id'] == socket.id){

                        arrayPlayersObject[i]['x'] = playerX;

                        arrayPlayersObject[i]['y'] = playerY;

                 }

                 socket.broadcast.emit('updatePositions', socket.id, playerX, playerY);

          }

   });
  
});

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

