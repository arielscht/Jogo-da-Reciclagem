class Score{
    constructor(x, y, time){
        this.x = x;
        this.y = y;
        this.alpha = 1;
        this.score = 0;
        this.timeControl = time;
    }
    
    setAlpha(alpha){
        this.alpha = alpha;
    }
    
    setX(x){
        this.x = x;
    }
    
    setY(y){
        this.y = y;
    }
    
    setScore(score){
        this.score = score;
    }
    
    getAlpha(){
        return this.alpha;
    }
    
    getX(){
        return this.x;
    }
    
    show() {
        noStroke();
        if(this.score > 0) {
            fill('rgba(255,255,255,'+ this.alpha + ')');
        } else {
            fill('rgba(255,0,0,'+ this.alpha + ')');
        }
        textSize(width*0.03);
        text(this.score, this.x, this.y);
        if(millis()-this.timeControl >= 10) {
            this.y -= height*0.003;
            if(this.alpha > 0.015){
                this.alpha -= 0.015;
            } else {
                this.alpha = 0;
            }
            this.timeControl = millis();
        }
    }
    
//    move() {
//        if(millis()-this.timeControl >= 200) {
//            this.y -= 1;
//        }
//    }
    
}