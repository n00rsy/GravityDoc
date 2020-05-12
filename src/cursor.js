class Cursor{
    constructor(x,y,cursorBoundX,cursorBoundY){
        this.x = x;
        this.y=y;
        this.cursorBoundX = cursorBoundX;
        this.cursorBoundY=cursorBoundY;
        this.i=0;
        this.letterSpacing = 0;
        this.lineSpacing = 1;
        this.showFunction = this.doShow;
    }

    step(bodySize){
        if(this.x+bodySize+this.letterSpacing<=width-cursorBoundX){
            this.x+=bodySize+this.letterSpacing;
        }
        else{
            if(this.y+bodySize+this.lineSpacing<=height-this.cursorBoundY){
            this.x = this.cursorBoundX;
            this.y+=bodySize+this.lineSpacing;
            }
            else{
                this.y = this.cursorBoundX;
                this.x = this.cursorBoundY;
            }
        }
        this.i=0;
        
    }
    stepBack(bodySize){
        if(this.x-bodySize-this.letterSpacing>=cursorBoundX){
            this.x-=bodySize-this.letterSpacing;
        }
        else{
            if(this.y-bodySize-this.lineSpacing>=this.cursorBoundY){
            this.x = width-this.cursorBoundX;
            this.y-=bodySize-this.lineSpacing;
            }
            else{
                this.y = this.cursorBoundX;
                this.x = this.cursorBoundY;
            }
        }
        this.i=0;
        
    }

    stepDown(bodySize){
        if(this.y+bodySize+this.lineSpacing<=height-cursorBoundY){
            this.y=this.y+bodySize+this.lineSpacing;
        }
        this.i=0;
    }

    stepUp(bodySize){
        if(this.y-bodySize-this.lineSpacing>=this.cursorBoundY){
            this.y=this.y-bodySize-this.lineSpacing;
        }
        this.i=0;
    }
    
    show(bodySize){
        this.showFunction(bodySize);
    }

    doShow(bodySize){
        if(this.i<60){
            fill(0);
            rectMode(CENTER);
            rect(this.x+bodySize/2,this.y, 0.5, bodySize+2);
        }
        if(this.i==90){
            this.i=0;
        }
        
        this.i++;
    }
    dontShow(){

    }
}