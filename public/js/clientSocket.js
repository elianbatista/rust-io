socket.on('mensagem', function (mensagem) {

    world.createPlayers(mensagem);

});

socket.on('updatePositions', (id, playerX, playerY, angulo) => {
  
    //console.log("Player: " + id + "PosX: " + playerX + "PosY: " + playerY);

    for (let p of world.players) {

        if (p.id == id) {

            p.pos.x = playerX;

            p.pos.y = playerY;
            
            //p.angle = angulo;

        }

    }

});

/*
socket.on('newSocket', (newSocket) => {

    world.players.push(new protoPlayer(newSocket.x, newSocket.y, newSocket.id));

});

socket.on('disconectPlayer', (disconectedID) => {

    for (var i = 0; i < world.players.length; i++) {

        if (players[i]['id'] == disconectedID) {

            players.splice(i, 1);

        }

    }

});
*/