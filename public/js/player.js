
class player {
    constructor(x, y, id) {
        this.name;
        this.pos = createVector(x, y);
        this.mira = createVector(x, y);
        this.dir = createVector(0, 0);
        this.vel = 0;
        this.speed = 200;
        this.target = createVector(x, y);
        
        this.size = 40;
        this.camera = createVector(this.pos.x, this.pos.y);

        this.state = playerState.STOP;

        this.bullets = [];
        this.bulletDamage = 50;
        this.bulletLife = 1000
        this.bulletAcurac = 0.9
        this.bulletSpeed = 500
        this.bulletSize = 16;

        this.bulletTimer = new spellTimer(1);


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
      
        textSize(24);
        textAlign(CENTER);
        textStyle(BOLD);
        text(this.name.toUpperCase(), 0,this.size + 12);
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
    shoot(){
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
        if(keyWentDown('a')){
          let prox = createVector(world.fruits[0].pos.x,world.fruits[0].pos.y);
          for(let f of world.fruits){
            if(this.pos.dist(prox) >= this.pos.dist(f.pos)  ){
              prox = createVector(f.pos.x, f.pos.y);
            }
          }
          if (this.bulletTimer.checkTimer()) {
                        //criar nova bala
                        const bullet = new spell(this.pos,
                            prox,
                            this.bulletAcurac,
                            this.bulletSpeed,
                            this.bulletLife,
                            this.bulletDamage,
                            this.bulletSize);


                        this.bullets.push(bullet)
                        this.bulletTimer.startTimer();
                    }
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
class protoPlayer{
    constructor(x, y, size, angle){
        this.x = x;
        this.y = y;
        this.size = size;
        this.angle = angle;
    }
    display(){
        let mira = p5.Vector.fromAngle(angle);
        mira.mult(this.size);
        push()

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
        circle(mira.x / 2,mira.y / 2, 20);
        //------
       
        noStroke();
        //
        pop()
    }
    update(x,y){
        this.x = x;
        this.y = y;
    }
