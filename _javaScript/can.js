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
    
    show(){
//        fill(this.color);
//        rect(this.x, this.y, this.height, this.width);
        image(this.img, this.x, this.y, this.height, this.width);
    }
    
    type(){
        return this.type;
    }
}