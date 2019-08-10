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
function createWorld(playerName){
  
  console.log(playerName)
  world = new arena(400, 400);
  world.setPlayer(new player(0, 0, 12345))
  world.setFruits(50);
  
  world.playerPrincipal.name = playerName;
  camera.position.x = 0;
  camera.position.y = 0;
  flag = true;
}

function preload(){
 
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  textFont('Dosis');
  
}
function draw() {
 // frameRate(10)
 if(flag){
    background(170, 0, 255);
    
    world.display();
    world.update();


    camera.off()
 }
}