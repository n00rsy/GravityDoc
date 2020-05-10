
class Letter{
    constructor(x,y,w,h,c){

        this.body = Matter.Bodies.rectangle(x,y,w,h);
        Matter.World.add(world, this.body);
        Matter.Body.setVelocity( this.body, {x: -1.5, y:0});
        this.w=w;
        this.h=h;
        this.c = c;
    }

    show(){
        const pos = this.body.position;
        const angle = this.body.angle;
        push();
        translate(pos.x,pos.y);
        rotate(angle);
        rectMode(CENTER);
        //rect(0,0, this.w, this.h);
        fill(0);
        textSize(24);
        textFont('serif');
        text(this.c, -5, 10);
        pop();
    }
    remove(){
        Matter.Composite.remove(world,this.body);
    }
    add(){
        Matter.Composite.add(world,this.body);
    }

}