class arena {
    constructor(_width, _height) {
        this.playerPrincipal;
        this.host = false;
        this.players = [];
        this.name;
        this.fruits = [];

        this.size = {
            width: _width,
            height: _height
        }

        this.oldTime = 0;
        this.newTime = millis();
        this.deltaTime;

        const center = createVector(0, 0);

        this.quadFruits = new quadFood(center, _width * 2, _height * 2);

    }
    setName(name){
      this.name = name;
    }
    randomFruit() {
        return new food(random(-this.size.width, this.size.width),
            random(-this.size.height, this.size.height))
    }
    setHost(){
      socket.on('host', function(mensagem){
          
          if(mensagem){                    
            world.setFruits(10);
            world.host = true;
          }

          
      });
    }
    setPlayer(player) {
        this.playerPrincipal = player;
        console.log('Player criado com sucesso',this.playerPrincipal);
      
    }
    getDelta() {
        return this.deltaTime / 1000;
    }
    setRandomFruit() {
        this.fruits.push(new food(random(-this.size.width, this.size.width),
            random(-this.size.height, this.size.height)));
    }
    setFruits(n) {
        for (var i = 0; i < n; i++) {
            this.setRandomFruit();
        }
    }
    createPlayers(protPlayers) {
        for(let p of protPlayers){
            
            if(p.id != socket.id){
                this.players.push(new protPlayer(p.name,p.x,p.x,p.id,p.size,p.mousex,p.mousey))
            }else{
                this.setPlayer(new player(p.x,p.y,p.id));
            }
            
        }
      
      this.drawPlayers();
    }
    getPlayer() {
        return this.playerPrincipal;
    }

    
    update() {
        this.deltaTime = this.newTime - this.oldTime;
        this.oldTime = this.newTime;
        this.newTime = millis();

        const center = createVector(0, 0);
        this.quadFruits = new quadFood(center, this.size.width * 2, this.size.height * 2);
        let pf= [];
        if(this.host){
          let i = 0
          let j = 0;
          console.log("hosteando");
          
          for (let fruit of this.fruits) {
              if (fruit.state == foodState.DEAD) {
                  this.fruits.splice(i, 1);
                  continue;
              }
              fruit.update();
              fruit.display();
              this.collideAndPush(0.05, this.playerPrincipal, fruit, 1, 0);
              j = 0;
              for (let fruit2 of this.fruits) {
                  this.collideAndPush(0.1, fruit, fruit2, i, j);
                  j++;
              }
              const quick = 1.5;
              let force = createVector(0, 0);
              if (fruit.pos.x >= this.size.width - 20 || fruit.pos.x <= -this.size.width + 20) {
                  if (fruit.pos.x < 0) {
                      force = createVector(1,0);
                      fruit.aplyForce(force, quick);
                  } else {
                      force = createVector(-1,0);
                      fruit.aplyForce(force, quick);
                  }
              }
              if (fruit.pos.y > this.size.height - 20 || fruit.pos.y <= -this.size.height + 20) {
                  if (fruit.pos.y < 0) {
                      force = createVector(0,1);
                      fruit.aplyForce(force, quick);
                  } else {
                      force = createVector(0,-1);
                      fruit.aplyForce(force, quick);
                  }
              }
             // fruit.aplyForce(force, quick);
              if (fruit.state != foodState.DYING) {
                  this.quadFruits.insert(fruit)
              }

              pf.push(new protFruit(fruit.x, fruit.y, fruit.size, fruit.rotate, fruit.life));
            
              i++;
          }
          
          socket.emit('hostUpdateFrutas', pf);
          
        }else{
          console.log("Clienteando");
          
          socket.on('clientUpdateFrutas', function(fruits){
            
            console.log(fruits);
            
            for(let fruit of fruits){
              
              simpleFruitDisplay(fruit);
              
            }
            
          });
          
        }
        
        this.playerPrincipal.update(camera.mouseX, camera.mouseY);
        this.playerPrincipal.display();
        //this.collideBullets();

        const quad = this.quadFruits.getQuadbyPos(camera.mouseX, camera.mouseY);
        this.quadFruits.display();
      
        this.drawPlayers();
    }
   
    drawPlayers(){
      
      for(let p of this.players){
      
        p.display();
       

      }
    }
    collideAndPush(force, a, b, i, j) {
        const dist = b.pos.dist(a.pos);
        if (dist < b.size / 2 + a.size / 2 && i != j) {
            const angle = a.pos.angleBetween(b.pos);
            const mov = b.pos.copy().sub(a.pos);
            if (a.type != 'fruit') {
                a.takeDamage(10);
                b.life -= 10;
                
            }
            if (debugMode) {
                strokeWeight(10)
                stroke(0)
                line(b.pos.x, b.pos.y, b.pos.x + mov.x, b.pos.y + mov.y);
            }
            b.aplyForce(mov, dist * force)
        }
    }
    collideBullets() {
        for (let bullet of this.playerPrincipal.bullets) {
            const quad = world.quadFruits.getQuadbyPos(bullet.pos.x, bullet.pos.y);
            if (bullet.checkLife()) {
                for (let food of quad.fruits) {
                    if (bullet.pos.dist(food.pos) < food.size) {
                        if (food.type == 'fruit') {
                            const dir = bullet.dir.copy().mult(world.getDelta());
                            food.life -= bullet.damage;
                            food.aplyMovement(dir, 2)
                            food.aplyForce(dir, 0.5)
                            food.hit.startTimer();
                            if (food.dir.x > food.dir.y) {
                                food.dirAng = food.dir.x * random(10);
                            } else {
                                food.dirAng = food.dir.y * random(10);
                            }
                        } else {

                        }

                        bullet.life = 0;
                    }
                    if (debugMode) {
                        fill(0);
                        circle(food.pos.x, food.pos.y, 40);
                    }

                }
            }
        }
    }
    display() {
        fill(255, 255, 255);
        stroke(0);
        rect(0, 0, this.size.width * 2, this.size.height * 2)
        noStroke();
    }
}
/*
update() {
        this.deltaTime = this.newTime - this.oldTime;
        this.oldTime = this.newTime;
        this.newTime = millis();

        const center = createVector(0, 0);
        this.quadFruits = new quadFood(center, this.size.width * 2, this.size.height * 2);

        let i = 0
        let j = 0;
        for (let fruit of this.fruits) {
            if (fruit.state == foodState.DEAD) {
                this.fruits.splice(i, 1);
                continue;
            }
            fruit.update();
            fruit.display();
            this.collideAndPush(0.05, this.playerPrincipal, fruit, 1, 0);
            j = 0;
            for (let fruit2 of this.fruits) {
                this.collideAndPush(0.1, fruit, fruit2, i, j);
                j++;
            }
            const quick = 1.5;
            let force = createVector(0, 0);
            if (fruit.pos.x >= this.size.width - 20 || fruit.pos.x <= -this.size.width + 20) {
                if (fruit.pos.x < 0) {
                    force = createVector(1,0);
                    fruit.aplyForce(force, quick);
                } else {
                    force = createVector(-1,0);
                    fruit.aplyForce(force, quick);
                }
            }
            if (fruit.pos.y > this.size.height - 20 || fruit.pos.y <= -this.size.height + 20) {
                if (fruit.pos.y < 0) {
                    force = createVector(0,1);
                    fruit.aplyForce(force, quick);
                } else {
                    force = createVector(0,-1);
                    fruit.aplyForce(force, quick);
                }
            }
           // fruit.aplyForce(force, quick);
            if (fruit.state != foodState.DYING) {
                this.quadFruits.insert(fruit)
            }

            i++;
        }
        this.playerPrincipal.update(camera.mouseX, camera.mouseY);
        this.playerPrincipal.display();
        this.collideBullets();

        const quad = this.quadFruits.getQuadbyPos(camera.mouseX, camera.mouseY);
        this.quadFruits.display();
      
        this.drawPlayers();
    }



*/