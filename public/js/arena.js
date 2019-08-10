class arena {
    constructor(_width, _height) {
        this.playerPrincipal;
        this.players = [];

        this.fruits = [];

        this.size = {
            width: _width,
            height: _height
        }

        this.oldTime = 0;
        this.newTime = millis();
        this.deltaTime;

        const center = createVector(0,0);

        this.quadFruits = new quadFood(center,_width*2,_height*2);
        this.quadFruits.insert(this.randomFruit());
        this.quadFruits.insert(this.randomFruit());
        this.quadFruits.insert(this.randomFruit());
        this.quadFruits.insert(this.randomFruit());
        this.quadFruits.insert(this.randomFruit());
        this.quadFruits.insert(this.randomFruit());
        this.quadFruits.insert(this.randomFruit());
        this.quadFruits.insert(this.randomFruit());
        this.quadFruits.insert(this.randomFruit());
        this.quadFruits.insert(this.randomFruit());
        this.quadFruits.insert(this.randomFruit());
        this.quadFruits.insert(this.randomFruit());
        this.quadFruits.insert(this.randomFruit());
        this.quadFruits.insert(this.randomFruit());
        this.quadFruits.insert(this.randomFruit());
        this.quadFruits.insert(this.randomFruit());
        this.quadFruits.insert(this.randomFruit());
        this.quadFruits.insert(this.randomFruit());
        this.quadFruits.insert(this.randomFruit());
        this.quadFruits.insert(this.randomFruit());
        this.quadFruits.insert(this.randomFruit());

    }
    randomFruit(){
        return new food(random(-this.size.width, this.size.width),
        random(-this.size.height, this.size.height))
    }
    setPlayer(player) {
        this.playerPrincipal = player;
    }
    getDelta(){
        return this.deltaTime/1000;
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
    createPlayers(protPlayers){

    }
    getPlayer(){
        return this.playerPrincipal;
    }

    displayPlayers(protPlayers){
        //this.playerPrincipal.display();
    }
    update() {
        this.deltaTime = this.newTime - this.oldTime;
        this.oldTime = this.newTime;
        this.newTime = millis();
        
        
        let i = 0;
        for (let fruit of this.fruits) {
            //fruit.update();
           // fruit.display();
        }
        this.playerPrincipal.update(camera.mouseX, camera.mouseY);
        this.playerPrincipal.display();

        displayGui(this.getPlayer());

        this.quadFruits.display();
        
    }
    display() {
        //fill(200, 150, 230);
        fill(255, 255, 255);
        stroke(0);
        rect(0, 0, this.size.width * 2, this.size.height * 2)

       

        noStroke();
    }
}
function displayGui(player){
    fill(10,10,75,100);
    push();
    translate(player.camera.x,player.camera.y)
    translate(0,height/2)
    rect(0,0,width/2,200,50);
    
    fill(255,0,0);
    rect(0,-125,width/4,50,50)

    fill(0,255,0);
    rect(0,-125,map(player.life,0,100,0,width/4),50,50)
    
    fill(255,230,230,255);
    textSize(52);
    textAlign(CENTER);
    textStyle(BOLD);
    text(`${player.life}/100`,0,-110);

    fill(0,0,255);
    rect(0,-155,width/6,10,50)

    fill(255,255,0);
    
    rect(0,-155,map((player.xp%100),0,100,0,width/6),10,50)
    
    stroke(0)
    fill(255,230,230,200);
    textSize(72);
    textAlign(CENTER);
    textStyle(BOLD);
    text(`${parseInt(player.xp/100)}.   ${player.name.toUpperCase()}`, 0,-30 );
    pop();
}