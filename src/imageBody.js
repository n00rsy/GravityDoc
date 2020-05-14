
class ImageBody {
    constructor(x, y, img) {

        this.img = img;
        this.height = canvas.height*0.2;
        this.width = this.height/img.height*img.width;

        this.body = Matter.Bodies.rectangle(x, y, this.width, this.height);
        Matter.World.add(world, this.body);

        this.drawImg = this.drawNormalImg;
        this.inWorld = false;
    }

    show() {
        const pos = this.body.position;
        const angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        this.drawImg();
        pop();
    }


    

    drawNormalImg(){
        noFill();
        rectMode(CENTER);
        //rect(0,0,this.width,this.height);
        imageMode(CENTER);
        image(this.img,0,0,this.width,this.height);
    }

    remove() {
        Matter.Composite.remove(world, this.body);
        this.inWorld = false;
    }
    add() {
        Matter.Composite.add(world, this.body);
        Matter.Body.setAngularVelocity(this.body, 0.5);
        this.inWorld = true;
    }

}