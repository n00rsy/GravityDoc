
class Letter {
    constructor(x, y, bodySize, c, font, fontSize, offsetX, offsetY, exitForce, randomForce, fontStyle, underline) {

        this.body = Matter.Bodies.rectangle(x, y, bodySize, bodySize);
        Matter.World.add(world, this.body);

        Matter.Body.setVelocity(this.body, { x: -exitForce + randomForce, y: randomForce });
        Matter.Body.setAngularVelocity(this.body, randomForce / 13);

        this.bodySize = bodySize;
        this.font = font;
        this.fontSize = fontSize;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.fontStyle = fontStyle;

        if(underline){
        this.underlinePos = this.bodySize / 2 + 2;
        this.underlineSize = underline ? bodySize * 0.04 : 0;
        this.drawLetter = this.drawWithUnderline;
        }
        else{
            this.drawLetter = this.drawWithoutUnderline;
        }
        this.c = c;
    }

    show() {
        const pos = this.body.position;
        const angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        this.drawLetter();
        pop();
    }

    drawWithUnderline(){
        rectMode(CENTER);
        rect(0, this.underlinePos, this.bodySize, this.underlineSize);
        fill(0);
        textSize(this.fontSize);
        textStyle(this.fontStyle);
        textFont(this.font);
        text(this.c, this.offsetX, this.offsetY);
    }

    drawWithoutUnderline(){
        fill(0);
        textSize(this.fontSize);
        textStyle(this.fontStyle);
        textFont(this.font);
        text(this.c, this.offsetX, this.offsetY);
    }

    remove() {
        Matter.Composite.remove(world, this.body);
    }
    add() {
        Matter.Composite.add(world, this.body);
    }

}