class Cursor{
    constructor(x,y,cursorBoundX,cursorBoundY){
        this.x = x;
        this.y=y;
        this.cursorBoundX = cursorBoundX;
        this.cursorBoundY=cursorBoundY;
        this.i=0;
        this.letterSpacing = 1;
        this.lineSpacing = 4;
        
    }

    step(bodySize){
        if(this.x+bodySize+this.letterSpacing<width-cursorBoundX){
            this.x+=bodySize+this.letterSpacing;
        }
        else{
            if(this.y+bodySize+this.lineSpacing<height-this.cursorBoundY){
            this.x = this.cursorBoundX;
            this.y+=bodySize+this.lineSpacing;
            }
            else{
                this.y = this.cursorBoundX;
                this.x = this.cursorBoundY;
            }
        }
        
    }
    stepBack(bodySize){
        if(this.x-bodySize-this.letterSpacing>cursorBoundX){
            this.x-=bodySize-this.letterSpacing;
        }
        else{
            if(this.y-bodySize-this.lineSpacing>this.cursorBoundY){
            this.x = width-this.cursorBoundX;
            this.y-=bodySize-this.lineSpacing;
            }
            else{
                this.y = this.cursorBoundX;
                this.x = this.cursorBoundY;
            }
        }
        
    }

    stepDown(bodySize){
        if(this.y+bodySize<height-cursorBoundY){
            this.y=this.y+bodySize;
        }
    }
    
    show(bodySize){
        if(this.i<60){
            fill(255);
            rectMode(CENTER);
            rect(this.x,this.y, 0.5, bodySize+2);
        }
        if(this.i==80){
            this.i=0;
        }
        
        this.i++;
    }
    dontShow(){
        fill(0);
            rect(this.x,this.y, 0.5, bodySize+2);
    }
}