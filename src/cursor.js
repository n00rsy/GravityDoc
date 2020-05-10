class Cursor{
    constructor(x,y,cursorBoundX,cursorBoundY){
        this.x = x;
        this.y=y;
        this.cursorBoundX = cursorBoundX;
        this.cursorBoundY=cursorBoundY;
        this.i=0;
        
    }

    step(){
        if(this.x+21<width-cursorBoundX){
            this.x+=21;
        }
        else{
            if(this.y+24<height-this.cursorBoundY){
            this.x = this.cursorBoundX;
            this.y+=24;
            }
            else{
                this.y = this.cursorBoundX;
                this.x = this.cursorBoundY;
            }
        }
        
    }
    stepBack(){
        if(this.x-21>cursorBoundX){
            this.x-=21;
        }
        else{
            if(this.y-24>this.cursorBoundY){
            this.x = width-this.cursorBoundX;
            this.y-=24;
            }
            else{
                this.y = this.cursorBoundX;
                this.x = this.cursorBoundY;
            }
        }
        
    }
    
    show(){
        if(this.i<60){
            fill(255);
            rect(this.x,this.y, 0.5, 20);
        }
        if(this.i==80){
            this.i=0;
        }
        
        this.i++;
    }
}