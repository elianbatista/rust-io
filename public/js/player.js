class player {
    constructor(x, y, id) {
        this.name;
        this.pos = createVector(x, y);
        this.mira = createVector(x, y);
        this.dir = createVector(0, 0);
        this.vel = 0;
        this.speed = 200;
        this.target = createVector(x, y);

        this.life = 100;
        this.xp = 0;
        this.size = 40;
        this.camera = createVector(this.pos.x, this.pos.y);

        this.state = playerState.STOP;


        this.bullets = [];
        this.bulletDamage = 25;
        this.bulletLife = 16000
        this.bulletAcurac = 1
        this.bulletSpeed = 500
        this.bulletSize = 16;

        this.bulletTimer = new spellTimer(200);

        this.hitTimer = new spellTimer(700);
    }

    display() {
        for (let bullet of this.bullets) {
            bullet.display();
            bullet.update();
        }
        if(!this.hitTimer.checkTimer()){
            fill(0,0,255);
         
            circle(this.target.x,this.target.y,map(this.hitTimer.remainTime(),0,this.hitTimer.cd,
            30,0));
        }
        push()

        strokeWeight(8);
        noStroke();
    
        translate(this.pos.x, this.pos.y);

        //  textSize(24);
        // textAlign(CENTER);
        // textStyle(BOLD);
        // text(this.name.toUpperCase(), 0,this.size + 12);
        stroke(0)
        strokeWeight(8);
        fill(255, 0, 0);
        circle(0, 0, this.size);


        line(0, 0, this.mira.x / 2, this.mira.y / 2);

        noStroke();
        //
        fill(0);
        circle(this.mira.x / 2, this.mira.y / 2, 20);
        pop()

    }
    takeDamage(amount){
        this.life -= amount;
        GUIAtualizarLife();
    }
    lookAt(x, y) {
        let a = createVector(x - this.pos.x, y - this.pos.y)
        return a.normalize()
    }
    
    shoot() {
        if (this.bulletTimer.checkTimer()) {
            const bullet = new spell(this.pos,
                this.mira,
                this.bulletAcurac,
                this.bulletSpeed,
                this.bulletLife,
                this.bulletDamage,
                this.bulletSize);

            this.bullets.push(bullet);
              
            this.bulletTimer.startTimer();
          
            socket.emit('newBullet', bullet.pos.x,
                              bullet.pos.y,
                              bullet.dir.x,
                              bullet.dir.y,
                              bullet.damage,
                              bullet.speed,
                              bullet.life);
          
        }
    }
    handleMouseInput(mousex, mousey) {
      
      
        if (mouseIsPressed) {
            switch (mouseButton) {
                case LEFT:
                    this.shoot();
                    break;

                case RIGHT:
                    this.state = playerState.WALK;
                    this.hitTimer.startTimer();
                    this.target = createVector(mousex, mousey);
                    
                    break;
            }
        }
    }
    handleKeyboardInput() {
        if (keyDown('space')) {
            this.camera = createVector(this.pos.x, this.pos.y)
            camera.position = this.camera;
        }
        if (keyDown('s')) {
            this.state = playerState.STOP;
            this.hitTimer.forceStop();
        } 
        if(keyWentDown('h')){
            debugMode = !debugMode;
        }
        if (keyWentDown('q')) {
            this.life -= 10;
        }
        if (keyWentDown('e')) {
            this.xp += 10;
        }
    }
    aplyForce(force) {
        this.pos.add(force.copy().mult(world.getDelta()));
    }
    seekTarget() {
        this.dir = this.lookAt(this.target.x, this.target.y);

        this.vel = lerp(this.vel, this.speed, 0.02);
        this.dir.mult(this.vel);
    }
    checkLimits() {
        this.pos.x = constrain(this.pos.x, -world.size.width, world.size.width)
        this.pos.y = constrain(this.pos.y, -world.size.height, world.size.height)
    }
    
    update(mousex, mousey) {
      
        const newMira = this.lookAt(mousex, mousey).mult(this.size);
        if(compareVectors(newMira, this.mira, 50)){
          socket.emit('update',this.pos.x,this.pos.y,this.size,this.mira.x,this.mira.y);
        }
        
        this.camera = createVector(this.pos.x, this.pos.y)
        camera.position = this.camera;
        this.mira = newMira;
        
        this.bulletTimer.runTimer();
        this.hitTimer.runTimer();

        this.handleMouseInput(mousex, mousey);
        this.handleKeyboardInput();
        
        socket.on('spawnBullet', function(protBullet){
  
          const pos = createVector(protBullet.x, protBullet.y);
          let bul = new spell(pos,pos,0,0,0,protBullet.damage,0);
          
          bul.pos = createVector(protBullet.x, protBullet.y);
          bul.dir = createVector(protBullet.mx, protBullet.my);
          bul.damage = protBullet.damage;
          bul.life = protBullet.life;
          
          world.playerPrincipal.bullets.push(bul);
        });
      
        
      
        //Se tiver clicado vai até o target
        //Se nao freia até chegar a 0 velocidade
        if (this.target.dist(this.pos) > 10 && this.state == playerState.WALK) {
            this.seekTarget();
        } else {
            this.dir.x = lerp(this.dir.x, 0, 0.3);
            this.dir.y = lerp(this.dir.y, 0, 0.3);
        }
        this.aplyForce(this.dir);

        this.checkLimits();

    }
}
class protPlayer {
    constructor(name, x, y, id, size, tx, ty) {
        this.pos = createVector(x,y);
        this.name = name;
        this.id = id;
        this.size = size;
        this.mira = createVector(tx,ty);
    }
    display() {
        push()

        translate(this.pos.x, this.pos.y);
        
        stroke(0)
        strokeWeight(8);
      
        fill(255,150,150);
        circle(0,0,this.size);
      
        line(0, 0, this.mira.x / 2, this.mira.y / 2);

        noStroke();
        //console.log(this.mira.x,this.mira.y);
        fill(0);
        circle(this.mira.x / 2, this.mira.y / 2, 20);
        textSize(24);
        textAlign(CENTER);
        textStyle(BOLD);
        text(this.name.toUpperCase(), 0,this.size + 12);
        pop()
     
      
        
       
    }
    update(x, y) {
        this.x = x;
        this.y = y;
    }
}
function compareVectors(a, b, n){
  return(abs(a.x-b.y)>n || abs(a.y-b.y)>n);
}