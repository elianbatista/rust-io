let world;
let debugMode = false;
let flag;

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
function createWorld(playerName) {

  //console.log(playerName)
  world = new arena(400, 400);
  
  //world.setFruits(30);
  world.setName( playerName ) ;
  world.setHost();
  
  camera.position.x = 0;
  camera.position.y = 0;
  flag = true;
}

function preload() {

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  pname = 'douglas';
  plife = 100;
  flag = false;
  textFont('Dosis');

}

function draw() {
  // frameRate(10)
  //resizeCanvas(windowWidth, windowHeight);
  if (flag) {
    if(world.playerPrincipal){
      background(170, 0, 255);

    world.display();
    world.update();


    camera.off()
    }
    
  }
}