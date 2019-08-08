let world;

const playerState = {
  STOP: 0,
  WALK: 1,
  RUN: 2,
  SHOT: 3,
  DAMAGE: 4,
  DYING: 5,
  DEAD: 6,
}
const foodState = {
  WALK: 0,
  DAMAGE: 1,
  DYING: 3,
  DEAD: 4,
}
let flag = false;
function set(){
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  world = new arena(400, 400);
  world.setPlayer(new player(0, 0, 12345))
  world.setFruits(100);
  camera.position.x = 0;
  camera.position.y = 0;
  flag = true;
}
function setup() {
  

}


function draw() {
 if(flag){
     background(220);
    //frameRate(25);
    world.display();
    world.update();


    camera.off()
 }
  
}