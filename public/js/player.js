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
<<<<<<< HEAD
        this.bulletDamage = 25;
        this.bulletLife = 5000
        this.bulletAcurac = 0.3
        this.bulletSpeed = 400
        this.bulletSize = 8;

        this.bulletTimer = new spellTimer(100);

        this.hitTimer = new spellTimer(700);
=======
        this.bulletDamage = 50;
        this.bulletLife = 16000
        this.bulletAcurac = 1
        this.bulletSpeed = 200
        this.bulletSize = 16;

        this.bulletTimer = new spellTimer(500);


>>>>>>> 0609e4bf93cbec187398ee37493165f6102d456e
    }

    display() {
        for (let bullet of this.bullets) {
            bullet.display();
            bullet.update();
<<<<<<< HEAD
        }
        if (!this.hitTimer.checkTimer()) {
            fill(0, 0, 255);

            circle(this.target.x, this.target.y, map(this.hitTimer.remainTime(), 0, this.hitTimer.cd,
                30, 0));
        }
        push()

    
        noStroke();

        translate(this.pos.x, this.pos.y);

        stroke(0)
        strokeWeight(8);
       
        fill(255, 0, 0);
        circle(0, 0, this.size);

=======
            

        }

        push()

        fill(0, 0, 255);
        circle(this.target.x, this.target.y, 20);
        //----
        stroke(0, 0, 255);
        strokeWeight(5);
        line(this.pos.x, this.pos.y, this.target.x, this.target.y);


        noStroke();
        //------

        translate(this.pos.x, this.pos.y);

        //  textSize(24);
        // textAlign(CENTER);
        // textStyle(BOLD);
        // text(this.name.toUpperCase(), 0,this.size + 12);
        fill(255, 0, 0);
        circle(0, 0, this.size);

        stroke(0)
        strokeWeight(8);
>>>>>>> 0609e4bf93cbec187398ee37493165f6102d456e

        line(0, 0, this.mira.x / 2, this.mira.y / 2);

        noStroke();
        //
        fill(0);
        circle(this.mira.x / 2, this.mira.y / 2, 20);
<<<<<<< HEAD
        pop()

    }
    takeDamage(amount) {
        this.life -= amount;
        GUIAtualizarLife();
    }
=======
        //------

        noStroke();
        //
        pop()

    }
>>>>>>> 0609e4bf93cbec187398ee37493165f6102d456e
    lookAt(x, y) {
        let a = createVector(x - this.pos.x, y - this.pos.y)
        return a.normalize()
    }
<<<<<<< HEAD
    produceBullet(){

        const xAxis = createVector(1,0);
        let angle = this.mira.angleBetween(xAxis);
        const angleError = map(this.bulletAcurac,0,1,-PI/4, 0);
        angle += random(-angleError, angleError);
        const pos = this.pos.copy().add(this.mira);
        if(this.pos.y + this.mira.y > this.pos.y){
            return new spell(pos, angle, this.bulletSpeed, this.bulletLife, this.bulletDamage);
        }else{
            return new spell(pos, -angle, this.bulletSpeed, this.bulletLife, this.bulletDamage);
        }
        
    
    }
    shoot() {
        if (this.bulletTimer.checkTimer()) {
            const bullet = this.produceBullet(this);

            //this.bullets.push(bullet);

            this.bulletTimer.startTimer();
            
            socket.emit('newBullet', bullet.pos.x,
                              bullet.pos.y,
                              bullet.angle,
                              bullet.speed,
                              bullet.life,
                              bullet.damage
                              );
          
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
=======
    shoot() {
        if (this.bulletTimer.checkTimer()) {
            const bullet = new spell(this.pos,
                this.mira,
                this.bulletAcurac,
                this.bulletSpeed,
                this.bulletLife,
                this.bulletDamage,
                this.bulletSize);

            this.bullets.push(bullet)
            this.bulletTimer.startTimer();
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
                    this.target = createVector(mousex, mousey);
>>>>>>> 0609e4bf93cbec187398ee37493165f6102d456e
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
<<<<<<< HEAD
            this.hitTimer.forceStop();
        }
        if (keyWentDown('h')) {
=======
        } else {
            this.state = playerState.WALK;
        }
        if(keyDown('h')){
>>>>>>> 0609e4bf93cbec187398ee37493165f6102d456e
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
<<<<<<< HEAD

    update(mousex, mousey) {

        const newMira = this.lookAt(mousex, mousey).mult(this.size);
        if (parseInt(this.mira.x) != parseInt(newMira.x) ||
            parseInt(this.mira.y) != parseInt(newMira.y) ||
            this.state != playerState.STOP ||
            world.haveNewSocket) {

            world.haveNewSocket = false;
            socket.emit('update',
                parseInt(this.pos.x),
                parseInt(this.pos.y),
                parseInt(this.size),
                parseInt(this.mira.x),
                parseInt(this.mira.y));
        }

        this.camera = createVector(this.pos.x, this.pos.y)
        camera.position = this.camera;
        this.mira = newMira;

        this.bulletTimer.runTimer();
        this.hitTimer.runTimer();
=======
    update(mousex, mousey) {
        
        this.camera = createVector(this.pos.x, this.pos.y)
        camera.position = this.camera;
        this.mira = this.lookAt(mousex, mousey).mult(this.size);
        this.bulletTimer.runTimer();
>>>>>>> 0609e4bf93cbec187398ee37493165f6102d456e

        this.handleMouseInput(mousex, mousey);
        this.handleKeyboardInput();

<<<<<<< HEAD
       



=======
>>>>>>> 0609e4bf93cbec187398ee37493165f6102d456e
        //Se tiver clicado vai até o target
        //Se nao freia até chegar a 0 velocidade
        if (this.target.dist(this.pos) > 10 && this.state == playerState.WALK) {
            this.seekTarget();
        } else {
<<<<<<< HEAD
            this.state = playerState.STOP
=======
>>>>>>> 0609e4bf93cbec187398ee37493165f6102d456e
            this.dir.x = lerp(this.dir.x, 0, 0.3);
            this.dir.y = lerp(this.dir.y, 0, 0.3);
        }
        this.aplyForce(this.dir);

        this.checkLimits();

    }
}
<<<<<<< HEAD
class protPlayer {
    constructor(name, x, y, id, size, tx, ty) {
        this.pos = createVector(x, y);
        this.name = name;
        this.id = id;
        this.size = size;
        this.mira = createVector(tx, ty);
    }
    display() {
        push()

        translate(this.pos.x, this.pos.y);

        stroke(0)
        strokeWeight(8);

        fill(255, 150, 150);
        circle(0, 0, this.size);

        line(0, 0, this.mira.x / 2, this.mira.y / 2);

        noStroke();
        //console.log(this.mira.x,this.mira.y);
        fill(0);
        circle(this.mira.x / 2, this.mira.y / 2, 20);
        textSize(24);
        textAlign(CENTER);
        textStyle(BOLD);
        text(this.name.toUpperCase(), 0, this.size + 12);
        pop()




=======
class protoPlayer {
    constructor(x, y, size, angle) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.angle = angle;
    }
    display() {
        let mira = p5.Vector.fromAngle(angle);
        mira.mult(this.size);
        push()

        translate(this.pos.x, this.pos.y);
        fill(255, 0, 0);
        circle(0, 0, this.size);
        //
        stroke(0)
        strokeWeight(8);

        line(0, 0, this.mira.x / 2, this.mira.y / 2);

        noStroke();
        //
        fill(0);
        circle(mira.x / 2, mira.y / 2, 20);
        //------

        noStroke();
        //
        pop()
>>>>>>> 0609e4bf93cbec187398ee37493165f6102d456e
    }
    update(x, y) {
        this.x = x;
        this.y = y;
    }
}