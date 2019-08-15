class arena {
    constructor(_width, _height) {
        this.playerPrincipal;
<<<<<<< HEAD
        this.haveNewSocket = false;
        this.players = [];
        this.bullets = [];
        this.name;
=======
        this.players = [];

>>>>>>> 0609e4bf93cbec187398ee37493165f6102d456e
        this.fruits = [];

        this.size = {
            width: _width,
            height: _height
        }
<<<<<<< HEAD
        this.buffer;
=======

>>>>>>> 0609e4bf93cbec187398ee37493165f6102d456e
        this.oldTime = 0;
        this.newTime = millis();
        this.deltaTime;

        const center = createVector(0, 0);

        this.quadFruits = new quadFood(center, _width * 2, _height * 2);

    }
<<<<<<< HEAD
    setName(name) {
        this.name = name;
    }
    setPlayer(player) {

        this.playerPrincipal = player;

=======
    randomFruit() {
        return new food(random(-this.size.width, this.size.width),
            random(-this.size.height, this.size.height))
    }
    setPlayer(player) {
        this.playerPrincipal = player;
>>>>>>> 0609e4bf93cbec187398ee37493165f6102d456e
    }
    getDelta() {
        return this.deltaTime / 1000;
    }
<<<<<<< HEAD
    setFruits(n) {
  
        socket.emit('createFruits', n);
    }
    createPlayers(protPlayers) {
        for (let p of protPlayers) {

            if (p.id != socket.id) {
                this.players.push(new protPlayer(p.name, p.x, p.x, p.id, p.size, p.mousex, p.mousey))
            } else {
                this.setPlayer(new player(p.x, p.y, p.id));
            }

        }
        this.haveNewSocket = true;
        this.drawPlayers();
=======
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

>>>>>>> 0609e4bf93cbec187398ee37493165f6102d456e
    }
    getPlayer() {
        return this.playerPrincipal;
    }

<<<<<<< HEAD
    drawBullets() {
        for (let p of this.bullets) {
            fill(0, 0, 255);
            circle(p.x, p.y, 20);
        }
=======
    displayPlayers(protPlayers) {
        //this.playerPrincipal.display();
>>>>>>> 0609e4bf93cbec187398ee37493165f6102d456e
    }
    update() {
        this.deltaTime = this.newTime - this.oldTime;
        this.oldTime = this.newTime;
        this.newTime = millis();

<<<<<<< HEAD
        socket.on('spawnBullets', (arrayBullets) => {
            for (let i = 0; i < arrayBullets.length; i++) {
                if (this.bullets[i] == undefined) {
                    let pos = createVector(arrayBullets[i].x, arrayBullets[i].y)
                    this.bullets[i] = new createVector(pos.x, pos.y);
                } else {
                    this.bullets[i].x = arrayBullets[i].x;
                    this.bullets[i].y = arrayBullets[i].y;
                }
            }
            for (let i = arrayBullets.length; i < this.bullets.length; i++) {
                this.bullets.splice(i, 1);
                this.bullets.splice(i, 1);
                i--;
            }

        });
        //...

        socket.on('spawnFruits', function (arrayFruits) {
            for (let i = 0; i < arrayFruits.length; i++) {
                if (world.fruits[i] == undefined) {
                    //let pos = createVector(arrayFruits[i].x, arrayBullets[i].y)
                    let _fruit = new protFruit(arrayFruits[i].pos.x, arrayFruits[i].pos.y,
                        arrayFruits[i].size,
                        arrayFruits[i].rotate, arrayFruits[i].life, arrayFruits[i].debug);
                    world.fruits[i] = _fruit;
                } else {
                    world.fruits[i].x = arrayFruits[i].x;
                    world.fruits[i].y = arrayFruits[i].y;
                }
            }
            for (let i = arrayFruits.length; i < world.fruits.length; i++) {
                world.fruits.splice(i, 1);
                world.fruits.splice(i, 1);
                i--;
            }
        });


        this.drawBullets();
        this.drawFruits();
        /*
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
                    force = createVector(1, 0);
                    fruit.aplyForce(force, quick);
                } else {
                    force = createVector(-1, 0);
=======
        const center = createVector(0, 0);
        this.quadFruits = new quadFood(center, this.size.width * 2, this.size.height * 2);

        let i = 0
        let j = 0;
        for (let fruit of this.fruits) {
            fruit.update();
            this.collideAndPush(0.05,this.playerPrincipal,fruit ,1,0);
            j = 0;
            for (let fruit2 of this.fruits) {
                this.collideAndPush(0.1,fruit, fruit2,i,j);
                j++;
            }
            const quick = 1.5
            if (fruit.pos.x >= this.size.width - 30 || fruit.pos.x <= -this.size.width + 30) {
                if (fruit.pos.x < 0) {
                    const force = createVector(1, 0);
                    fruit.aplyForce(force, quick);
                } else {
                    const force = createVector(-1, 0);
>>>>>>> 0609e4bf93cbec187398ee37493165f6102d456e
                    fruit.aplyForce(force, quick);
                }
            }
            if (fruit.pos.y > this.size.height - 20 || fruit.pos.y <= -this.size.height + 20) {
                if (fruit.pos.y < 0) {
<<<<<<< HEAD
                    force = createVector(0, 1);
                    fruit.aplyForce(force, quick);
                } else {
                    force = createVector(0, -1);
                    fruit.aplyForce(force, quick);
                }
            }
            // fruit.aplyForce(force, quick);
            if (fruit.state != foodState.DYING) {
                this.quadFruits.insert(fruit)
            }

            i++;
        }

=======
                    const force = createVector(0, 1);
                    fruit.aplyForce(force, quick);
                } else {
                    const force = createVector(0, -1);
                    fruit.aplyForce(force, quick);
                }
            }

            this.quadFruits.insert(fruit)
            i++;
        }
>>>>>>> 0609e4bf93cbec187398ee37493165f6102d456e
        this.playerPrincipal.update(camera.mouseX, camera.mouseY);
        this.playerPrincipal.display();
        this.collideBullets();

        const quad = this.quadFruits.getQuadbyPos(camera.mouseX, camera.mouseY);
        this.quadFruits.display();
<<<<<<< HEAD
        */
        this.playerPrincipal.update(camera.mouseX, camera.mouseY);
        this.playerPrincipal.display();
        this.drawPlayers();
    }
    drawFruits() {
        for (let f of this.fruits) {
            push()

            translate(f.x, f.y);
            rotate(f.angle * PI / 180)
            stroke(0);

            if (f.debug) {
                switch (f.debug) {
                    case 0:
                        fill(50, 200, 50);
                        break;
                    case 1:
                        fill(200, 200, 50);
                        break;
                    case 2:
                        fill(200, 0, 200);
                        break;
                }
            } else {

                fill(50, 200, 50);

            }

            rect(0, 0, f.size, f.size);
            pop()

        }
    }

    drawPlayers() {

        for (let p of this.players) {
            push()
            p.display();
            pop()

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
=======


        displayGui(this.getPlayer());
    }
    collideAndPush(force, a, b, i, j) {
        //fruit2 b
        const dist = b.pos.dist(a.pos);
        if (dist < b.size / 2 + a.size/2 && i != j) {
            const angle = a.pos.angleBetween(b.pos);

            const mov = b.pos.copy().sub(a.pos);
            if(a.type != 'fruit'){
                a.life -=10;
                b.life -=10;
            }
            if(debugMode){
                strokeWeight(10)
                stroke(0)
                line(b.pos.x,b.pos.y,b.pos.x+mov.x,b.pos.y+mov.y);
            }
            
>>>>>>> 0609e4bf93cbec187398ee37493165f6102d456e
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
<<<<<<< HEAD
                    if (debugMode) {
                        fill(0);
                        circle(food.pos.x, food.pos.y, 40);
                    }

=======
                    if(debugMode){
                        fill(0);
                        circle(food.pos.x, food.pos.y, 40);
                    }
                    
>>>>>>> 0609e4bf93cbec187398ee37493165f6102d456e
                }
            }
        }
    }
    display() {
<<<<<<< HEAD
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
=======
        //fill(200, 150, 230);
        fill(255, 255, 255);
        stroke(0);
        rect(0, 0, this.size.width * 2, this.size.height * 2)



        noStroke();
    }
}

function displayGui(player) {
    if(player.life<=0){
        return;
    }
    fill(10, 10, 75, 100);
    push();
    translate(player.camera.x, player.camera.y)
    translate(0, height / 2)
    rect(0, 0, width / 2, 200, 50);

    fill(255, 0, 0);
    rect(0, -125, width / 4, 50, 50)

    fill(0, 255, 0);
    rect(0, -125, map(player.life, 0, 100, 0, width / 4), 50, 50)

    fill(255, 230, 230, 255);
    textSize(52);
    textAlign(CENTER);
    textStyle(BOLD);
    text(`${player.life}/100`, 0, -110);

    fill(0, 0, 255);
    rect(0, -155, width / 6, 10, 50)

    fill(255, 255, 0);

    rect(0, -155, map((player.xp % 100), 0, 100, 0, width / 6), 10, 50)

    stroke(0)
    fill(255, 230, 230, 200);
    textSize(72);
    textAlign(CENTER);
    textStyle(BOLD);
    text(`${parseInt(player.xp/100)}.   ${player.name.toUpperCase()}`, 0, -30);
    pop();
}
>>>>>>> 0609e4bf93cbec187398ee37493165f6102d456e
