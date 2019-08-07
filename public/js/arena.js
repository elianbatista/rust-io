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
    update() {
        this.deltaTime = this.newTime - this.oldTime;
        this.oldTime = this.newTime;
        this.newTime = millis();
        
        this.playerPrincipal.display();
        this.playerPrincipal.update(camera.mouseX, camera.mouseY);
        let i = 0;
        for (let fruit of this.fruits) {
            fruit.display();
     
       
        }
    }
    display() {
        fill(200, 150, 230);
        stroke(0);
        rect(0, 0, this.size.width * 2, this.size.height * 2)

    
        noStroke();
    }
}