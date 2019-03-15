let width = window.innerWidth - 1;
let height = window.innerHeight - 4;
let images = [];
let trashes = [];
let cans = [];
let lixos = [];
let boogaloo;

let score = 240;

//variáveis do banco
let username = 'arielsch';
let userLevel = 1;
//fim variáveis do banco

function preload(){
    for(let i = 0; i < 5; i++) {
        images[i] = loadImage('_images/lixeiras/lixeira' + (i+1) + '.png');
    }
    boogaloo = loadFont('_fonts/Boogaloo-Regular.otf');
}

function setup() {
  createCanvas(width,height);
    for(let i = 0; i < 10; i++){
        trashes[i]= new Trash(random(0, width-height*0.05), random(height*0.5, height-height*0.05), height*0.05);
    }
    for(let i = 0; i < 5; i++){
        cans[i] = new Can(i*width*0.1 + 100, height*0.55-height*0.3, width*0.1, height*0.3, i+1, images[i]);
        //can(x,y,height,width,type,img);
    }
}

function draw() {
  background('#81d8d0');
//scoreboard
  fill(255);
  rect(width-width*0.25, 0, width*0.25, height*0.2);
    
  textSize(width*0.02);
  fill(0);
  textFont(boogaloo);
  //username    
  text(username, width-width*0.22, height*0.05);
  //nível
  text('Nível: ', width-width*0.09, height*0.05);
  text(userLevel, width-width*0.04, height*0.05);
  //pontuação
  text('Pontuação: ', width-width*0.18, height*0.15);
  text(score, width-width*0.10, height*0.15);
//fim scoreboard
    
//desenho do chão
  fill('#8dce55');
  stroke('#0B5345');
  rect(0, height*0.5, width,height*0.5);
//fim chão
    //desenha as latas de lixo
    for(let can of cans){
        can.show();
    }
    //fim lata de lixo
    //desenha os lixos
    for(let trash of trashes){
        trash.show();
    }
    //fim lixos
}

function mousePressed(){
    for(let trash of trashes){
       if(trash.click()){
           trash.setHeld(true);
           break;
       } 
    }
}


//////possível otimização/////// ==== armazenar o indíce do objeto que está sendo arrastado para assim desativar o movimento somente deste único objeto e n de todo o array
function mouseReleased(){
    for(let trash of trashes){
        trash.setHeld(false); 
    }
}
////fim possível otimização/////


function mouseDragged(){
    for(let trash of trashes){
        if(trash.getHeld()){
            trash.move();
        }
    }
}
