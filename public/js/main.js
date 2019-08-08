let world;
var socket = io();
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  world = new arena(400, 400);
  world.setPlayer(new player(0, 0, 12345))
  world.setFruits(100);
  camera.position.x = 0;
  camera.position.y = 0;

}


function draw() {
 
  background(220);
  //frameRate(25);
  world.display();
  world.update();
  

  camera.off()
}