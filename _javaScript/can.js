class Can{
    constructor(x, y, height, width, type, img){
        this.x = x;
        this.y = y;
        this.type = type;
        this.height = height;
        this.width = width;
        this.color = color;
        this.img = img;
    }
    
    getWidth(){
        return this.width;
    }
    
    getHeight(){
        return this.height;
    }
    
    getType(){
        return this.type;
    }
    
    
    show(){
//        fill(this.color);
//        rect(this.x, this.y, this.height, this.width);
        image(this.img, this.x, this.y, this.width, this.height);
    }
    
    
}