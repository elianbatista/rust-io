var express = require('express'),
    http = require('http');
var uws = require('uws');
var app = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server)//({ wsEngine: 'ws' });
io.ws = new uws.Server({ perMessageDeflate: false });

const path = require('path');
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var arrayPlayersObject = [];

var arrayFruitsObject = [];

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

let protBullet = function(x, y, mx, my, damage, speed, life){
  this.x = x
  this.y = y;
  this.mx = mx;
  this.my = my;           
  this.damage = damage;
  this.speed = speed;
  this.life = life;
}

let protFruit = function(x, y, size, angle, life){
  
       this.x = x;
       this.y = y;
       this.size = size;
       this.angle = angle;
       this.life = life;
  
}

io.on('connect', (socket) => {

       socket.on('conectei', function(name){
          
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

                     socket.volatile.broadcast.emit('updatePositions', socket.id, playerX, playerY, size, mousex, mousey);

              }

       });
                              
        socket.on('newBullet', function(x, y, mx, my, damage, speed, life){
          
          let prot = new protBullet(x, y, mx, my, damage, speed, life);
         
          socket.volatile.broadcast.emit('spawnBullet', prot);
      
    
        });
    
});


server.listen(port, function () {

       console.log('Server listening at port %d', port);

});

