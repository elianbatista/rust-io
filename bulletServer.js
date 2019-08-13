console.log('Bullet Server');
function protBullet(x, y, angle, speed, life, damage) {
    this.x = x
    this.y = y;
    this.angle = angle;
    this.speed = speed;
    this.life = life;
    this.damage = damage;
}
protBullet.prototype.update = function(deltaTime){
    this.x += this.speed*Math.cos(this.angle)*deltaTime;
    this.y += this.speed*Math.sin(this.angle)*deltaTime;
    this.life -= deltaTime;
}
module.exports = protBullet;