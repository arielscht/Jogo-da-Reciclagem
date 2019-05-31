let width = window.innerWidth - 1;
let height = window.innerHeight - 4;

//objetos
let trashes = [];
let cans = [];
//fim objetos

//imagens
let canImages = [];
let metalTrashes = [];
let paperTrashes = [];
let plasticTrashes = [];
let organicTrashes = [];
let glassTrashes = [];

let trashImages = [];
//fim imagens

//variáveis de controle

//lixos
let qtdMetal = 5;
let qtdPaper = 2;
let qtdPlastic = 2;
let qtdOrganic = 1;
let qtdGlass = 2;
let qtdTotal = qtdMetal + qtdPaper + qtdPlastic + qtdOrganic + qtdGlass;

let initialX;
let initialY;

let heldTrash;

//timer
let minute = 0;
let second = 0;
let currentTime;
let timerOn = false;

//elementos dos modais
let scoreField = document.getElementById("scoreField");
let btnTryAgain = document.getElementById("btnTryAgain");
let timeSelect = document.getElementById("timeSelect");
let btnStart = document.getElementById("btnStart");

//fim variáveis de controle

//fontes
let boogaloo;
//fim fontes
let ground;


let score = 0;

//variáveis do banco
let username = 'arielsch';
let userLevel = 1;
//fim variáveis do banco
let sizeArray = [];

function preload(){
    //carrega as imagens das lixeiras
    for(let i = 0; i < 5; i++) {
        canImages[i] = loadImage('_images/lixeiras/lixeira' + (i+1) + '.png');
    }
//    //carrega as imagens dos lixos
//    for(let i = 0; i < qtdMetal; i++){
//       metalTrashes[i] = loadImage('_images/lixos/metal/metal' + (i+1) + '.png');
//    }
    
    let j = 0;
    let k = 1;
    let address = ['metal/metal','papel/papel','plastico/plastico','organico/organico','vidro/vidro'];
    
    for(let i = 0; i < qtdTotal; i ++){
        if(k == qtdMetal + 1 && j == 0){
           j++;
           k = 1;
            console.log('j=1');
        } 
        if(k == qtdPaper + 1 && j == 1){
           j++; 
           k = 1;
            console.log('j=2');
        } 
        if(k == qtdPlastic + 1 && j == 2){
            j++;
            k = 1;
            console.log('j=3');
        } 
        if(k == qtdOrganic + 1 && j == 3){
            j++;
            k = 1;
            console.log('j=4');
        } 
        if(k == qtdGlass + 1 && j == 4){
            j = 0;
            k = 1;
        }
        trashImages[i] = loadImage('_images/lixos/' + address[j] + k + '.png');
        k++;
        sizeArray.push(j);
    }
    
    //carrega a fonte boogaloo
    boogaloo = loadFont('_fonts/Boogaloo-Regular.otf');
    //ground = loadImage('_images/ground.jpg')
}

let counterSize = 0;
let trashSize = [0.08,0.12,0.08,0.1,0.12];
            //metal, paper, plastic, organic, glass

function setup() {
  createCanvas(width,height);
    for(let i = 0; i < qtdTotal; i++){
        trashes[i]= new Trash(random(0, width-height*trashSize[sizeArray[i]]), random(height*0.5, height-height*trashSize[sizeArray[i]]), height*trashSize[sizeArray[i]], trashImages[i], sizeArray[i]);
    }
    for(let i = 0; i < 5; i++){
        cans[i] = new Can(i*width*0.1 + 100, height*0.55-height*0.3, height*0.3, width*0.1, i, canImages[i]);
        //can(x,y,height,width,type,img);
    }
    
    noLoop();
    $('#inicioModal').modal('show');
}

function draw() {
//Time setting
    if(timerOn){
        if((millis()-currentTime) >= 1000){
            if(second > 0){
                second--;
            } else{
                minute--;
                second = 59;
            }
            currentTime = millis();
            if(minute == 0 && second == 0){
                $("#resultadoModal").modal("show");
                scoreField.value = score;
                timerOn = false;
                noLoop();
            }
        }
    }
//fim time setting
    
  background('#81d8d0');
//Timer
    noStroke();
    fill(255);
    textFont(boogaloo);
    textSize(width*0.05);
    text(nf(minute,2) + ":" + nf(second,2), width*0.01,width*0.04);
    stroke(0);
//fim Timer
    
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
    //image(ground, 0, height*0.5, width, height*0.5);
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
    
    //abre a aba de resultados se não tiver mais lixos
    if(trashes.length == 0){
        $("#resultadoModal").modal("show");
        scoreField.value = score;
        timerOn = false;
    }
}

function mousePressed(){
    
    for(let i = 0; i< qtdTotal; i++){
       if(trashes[i].click()){
           trashes[i].setHeld(true);
           heldTrash = i;
           initialX = trashes[heldTrash].x;
           initialY = trashes[heldTrash].y;
           document.getElementsByTagName('canvas')[0].style.cursor = "url('_images/hand-cursor-closed.cur'), auto";
           break;
       } 
    }
}


//////possível otimização/////// ==== armazenar o indíce do objeto que está sendo arrastado para assim desativar o movimento somente deste único objeto e n de todo o array
function mouseReleased(){
    for(let i = 0; i < 5; i++){
            if((trashes[heldTrash].x > cans[i].x && trashes[heldTrash].x < cans[i].x + cans[i].width)&&(trashes[heldTrash].y > cans[i].y && trashes[heldTrash].y < cans[i].y + cans[i].height)){
                console.log('inside');
                if(trashes[heldTrash].getType() == cans[i].getType()){
                    score += 10;
                    console.log(score);
                } else {
                    score -= 5;
                }
                trashes.splice(heldTrash,1);
                break;
                console.log('entrou if check inside');
            } 
            if(i == 4) {
                if(trashes[heldTrash].y < height*0.5){
                    trashes[heldTrash].setX(initialX);
                    trashes[heldTrash].setY(initialY);
                    trashes[heldTrash].setHeld(false);  
                    console.log('entrou else 1');
                } 
                else {
                    trashes[heldTrash].setHeld(false);
                    console.log('entrou else 2');
                }
            }
    }
//    for(let trash of trashes){
//        trash.setHeld(false); 
//    }
    document.getElementsByTagName('canvas')[0].style.cursor = "url('_images/hand-cursor-open.cur'), auto";
}
////fim possível otimização/////


function mouseDragged(){
    for(let trash of trashes){
        if(trash.getHeld()){
            trash.move();
        }
    }
//    trashes[heldTrash].move();   
}

function tryAgain(){
    window.location.reload();
}

function startGame(){
    timerOn = true;
    switch (timeSelect.value){
        case '0':
            minute = 0;
            second = 0;
            timerOn = false;
            break;
        case '1':
            minute = 0;
            second = 10;
            break;
        case '2':
            minute = 0;
            second = 30;
            break;
        case '3':
            minute = 1;
            second = 0;
            break;
        case '4':
            minute = 1;
            second = 30;
            break;
        case '5':
            minute = 2;
            second = 0;
    }
    currentTime = millis();
    loop();
}

btnTryAgain.addEventListener('click', tryAgain);
btnStart.addEventListener('click', startGame);

