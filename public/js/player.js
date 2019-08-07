class spellTimer {
    constructor(cd) {
        this.cd = cd;
        this.start = 0;
        this.end = 0;
    }
    startTimer() {
        this.start = millis();
        this.end = this.start + this.cd;
    }
    remainTime(){
        return this.end - this.start;
    }
    runTimer() {
        if(this.start <= this.end){
            this.start += world.deltaTime;
        }
    }
    checkTimer() {
        return (this.start >= this.end);
    }
}
class player {
    constructor(x, y, id) {
        this.pos = createVector(x, y);
        this.mira = createVector(x, y);
        this.dir = createVector(0, 0);
        this.vel = 0;
        this.speed = 200;
        this.target = createVector(x, y);
        
        this.size = 40;
        this.camera = createVector(this.pos.x, this.pos.y);
        camera.position = this.camera;

        this.state = 'parado';

        this.bullets = [];
        this.bulletDamage = 50;
        this.bulletLife = 1000
        this.bulletAcurac = 0.9
        this.bulletSpeed = 500
        this.bulletSize = 16;

        this.bulletTimer = new spellTimer(250);

    }
    display() {
        for (let bullet of this.bullets) {
            bullet.update();
            bullet.display();
            
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
        fill(255, 0, 0);
        circle(0, 0, this.size);
        //
        stroke(0)
        strokeWeight(8);
        
        line(0,0,this.mira.x/2,this.mira.y/2);
        
        noStroke();
        //
        fill(0);
        circle(this.mira.x / 2, this.mira.y / 2, 20);
        //------
       
        noStroke();
        //
        pop()

    }
    lookAt(x, y) {
        let a = createVector(x - this.pos.x, y - this.pos.y)
        return a.normalize()
    }
    handleMouseInput(mousex, mousey) {
        if (mouseIsPressed) {
            switch (mouseButton) {
                case LEFT:
                    if (this.bulletTimer.checkTimer()) {
                        //criar nova bala
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
                    break;

                case RIGHT:
                    this.state = 'andando';
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
            this.state = 'parado';
        } else {
            this.state = 'andando';
        }
        if (keyWentDown('q')) {

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
        this.camera = createVector(this.pos.x, this.pos.y)
        camera.position = this.camera;
        this.mira = this.lookAt(mousex, mousey).mult(this.size);
        this.bulletTimer.runTimer();

        this.handleMouseInput(mousex, mousey);
        this.handleKeyboardInput();

        //Se tiver clicado vai até o target
        //Se nao freia até chegar a 0 velocidade
        if (this.target.dist(this.pos) > 10 && this.state == 'andando') {
            this.seekTarget();
        } else {
            this.dir.x = lerp(this.dir.x, 0, 0.3);
            this.dir.y = lerp(this.dir.y, 0, 0.3);
        }
        this.aplyForce(this.dir);
        this.checkLimits();

    }
}