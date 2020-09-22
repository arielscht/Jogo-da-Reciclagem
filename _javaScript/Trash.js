class Trash {
    constructor(x, y, size, img, type){
        this.x = x;
        this.y = y;
        this.img = img;
        this.size = size;
        this.type = type;
        this.held = false;
    }
    
    setHeld(held){
        this.held = held;
    }
    
    setX(x){
        this.x = x;
    }
    
    setY(y){
        this.y = y;
    }
    
    getSize(){
        return this.size;
    }
    
    getHeld(){
        return this.held;
    }
    
    getType(){
        return this.type;
    }
    
    show(){
        image(this.img, this.x, this.y, this.size, this.size);
    }
    
    click(){
        if((mouseX+26 > this.x && mouseX+26 < this.x+ this.size) && (mouseY+27 > this.y && mouseY+27 < this.y+this.size)){
            return true;
        }
    }
    
    move(){
        if((mouseX > this.size/2 && mouseX < width-this.size/2)){
            if(mouseX < width-width*0.25-this.size/2 || mouseY > height*0.2){
                this.x = mouseX+26 - this.size/2;
            }
        }
        if(mouseY <= height-this.size/2 && mouseY > this.size/2) {
            if(mouseX < width-width*0.25 || mouseY > height*0.2+this.size/2){
                this.y = mouseY+26 - this.size/2;
            }
        }
    }
}