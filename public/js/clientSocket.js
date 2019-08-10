socket.on('mensagem', function (mensagem) {

    world.createPlayers(mensagem);

});
//this.pos.x,this.pos.y,this.size, this.mousex, this.mousey
socket.on('updatePositions', (id, playerX, playerY, size, mousex, mousey) => {
  
    for (let p of world.players) {
      
     // console.log(p.id, id);

        if (p.id == id) {

            p.pos.x = playerX;

            p.pos.y = playerY;
          
            p.size = size;
            
            p.mira.x = mousex;
          
            p.mira.y = mousey;

        }

    }

});


socket.on('newSocket', (newSocket) => {

    world.players.push(new protPlayer(newSocket.x,
                                      newSocket.y,
                                      newSocket.id, 
                                      newSocket.size,
                                      newSocket.mousex,
                                      newSocket.mousey));

});

/*

socket.on('disconectPlayer', (disconectedID) => {

    for (var i = 0; i < world.players.length; i++) {

        if (players[i]['id'] == disconectedID) {

            players.splice(i, 1);

        }

    }

});
*/