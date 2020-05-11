
class Letter{
    constructor(x,y,bodySize,c,font,fontSize,offsetX,offsetY,exitForce,random){

        this.body = Matter.Bodies.rectangle(x,y,bodySize,bodySize);
        Matter.World.add(world, this.body);
        
        Matter.Body.setVelocity( this.body, {x: -exitForce+random, y:random});

        this.bodySize = bodySize;
        this.font = font;
        this.fontSize = fontSize;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.c = c;
    }

    show(){
        const pos = this.body.position;
        const angle = this.body.angle;
        push();
        translate(pos.x,pos.y);
        rotate(angle);
        rectMode(CENTER);
        //rect(0,0, this.bodySize, this.bodySize);
        fill(0);
        textSize(this.fontSize);
        textFont(this.font);
        text(this.c, this.offsetX, this.offsetY);
        pop();
    }
    remove(){
        Matter.Composite.remove(world,this.body);
    }
    add(){
        Matter.Composite.add(world,this.body);
    }

}