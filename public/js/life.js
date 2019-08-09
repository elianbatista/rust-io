class life{
    constructor(maxLife){
        this.max = maxLife;
        this.size = 40;
    }
    display(life, pos, offset){
        fill(255,0,0);
        rect(pos.x,pos.y-offset,this.size,10, 20);
        fill(0,255,0);
        rect(pos.x,pos.y-offset,map(life,0,this.max,0,this.size),10,20);
    }
    
}