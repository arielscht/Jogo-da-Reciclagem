class Trash {
    constructor(x, y, size, img){
        this.x = x;
        this.y = y;
        this.img = img;
        this.size = size;
        this.type;
        this.held = false;
    }
    
    setHeld(held){
        this.held = held;
    }
    
    getSize(){
        return this.size;
    }
    
    getHeld(){
        return this.held;
    }
    
    show(){
//        fill(255);
//        noStroke();
//        rect(this.x, this.y, this.size, this.size)
        image(this.img, this.x, this.y, this.size, this.size);
    }
    
    click(){
        if((mouseX > this.x && mouseX < this.x+ this.size) && (mouseY > this.y && mouseY < this.y+this.size)){
            return true;
        }
    }
    
    move(){
        if(mouseX > this.size/2 && mouseX < width-this.size/2){
            this.x = mouseX - this.size/2;
        }
        if(mouseY <= height-this.size/2 && mouseY > this.size/2) {
            this.y = mouseY - this.size/2;
        }
    }
}