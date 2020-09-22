let width = window.innerWidth - 5;
let height = window.innerHeight - 5;

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

//Initial Time
let initialTimer = 3;
let initialCurrentTimer;

//Score object
let scores = [];

//Score variables
let score = 0;
let scored = false;


//elementos dos modais
let scoreField = document.getElementById("scoreField");
let btnTryAgain = document.getElementById("btnTryAgain");
let timeSelect = document.getElementById("timeSelect");
let btnStart = document.getElementById("btnStart");

let volumeSlider = document.getElementById("volumeSlider");
let imgSpeaker = document.getElementById("imgSpeaker");
let lastVolume;

//input Score do placar
let inputScore = document.getElementById("score");

//fim variáveis de controle

//fontes
let boogaloo;
//fim fontes

//variáveis do banco
let username = 'arielsch';
let userLevel = 1;
//fim variáveis do banco
let sizeArray = [];

//sound variables
let Smetal;
let Spaper;
let Splastic;
let Sorganic;
let Sglass;
let SgameOver;
let Smisplaced;
let music;

//LOADING
let loading = true;
let loaded = 0;

let counterSize = 0;
let trashSize = [0.08,0.12,0.08,0.1,0.12];
            //metal, paper, plastic, organic, glass

let restarted = false;

function setup() {
    if(!restarted){
        createCanvas(width,height);
    }

    if(loading){
    //=====================LOAD ELEMENTS======================
    Sglass = loadSound('_sounds/effects/glass.wav',loadElement);
    Smetal = loadSound('_sounds/effects/metal.wav',loadElement);
    Splastic = loadSound('_sounds/effects/plastic.wav',loadElement);
    Spaper = loadSound('_sounds/effects/paper.mp3',loadElement);
    Sorganic = loadSound('_sounds/effects/organic.wav',loadElement);
    Smisplaced = loadSound('_sounds/misplaced2.mp3',loadElement);
    SgameOver = loadSound('_sounds/gameover.mp3',loadElement);
    music = loadSound('_sounds/musics/music.mp3',loadElement);

    //carrega as imagens das lixeiras
    for(let i = 0; i < 5; i++) {
        canImages[i] = loadImage('_images/lixeiras/lixeira' + (i+1) + '.png',loadElement);
    }

    let j = 0;
    let k = 1;
    let address = ['metal/metal','papel/papel','plastico/plastico','organico/organico','vidro/vidro'];

    for(let i = 0; i < qtdTotal; i ++){
        if(k == qtdMetal + 1 && j == 0){
           j++;
           k = 1;
        } 
        if(k == qtdPaper + 1 && j == 1){
           j++; 
           k = 1;
        } 
        if(k == qtdPlastic + 1 && j == 2){
            j++;
            k = 1;
        } 
        if(k == qtdOrganic + 1 && j == 3){
            j++;
            k = 1;
        } 
        if(k == qtdGlass + 1 && j == 4){
            j = 0;
            k = 1;
        }
        trashImages[i] = loadImage('_images/lixos/' + address[j] + k + '.png', loadElement);
        k++;
        sizeArray.push(j);
    }

    boogaloo = loadFont('_fonts/Boogaloo-Regular.ttf', loadElement);

    //====================END OF LOAD ELEMENTS=========================
    }
    if(!loading){ //ADDED
        for(let i = 0; i < qtdTotal; i++){
            trashes[i]= new Trash(random(0, width-height*trashSize[sizeArray[i]]), random(height*0.5, height-height*trashSize[sizeArray[i]]), height*trashSize[sizeArray[i]], trashImages[i], sizeArray[i]);
        }
        for(let i = 0; i < 5; i++){
            cans[i] = new Can(i*width*0.1 + 100, height*0.55-height*0.3, height*0.3, width*0.1, i, canImages[i]);
        }

        music.play();
        music.setVolume(0.1)

        volumeSlider.value = 50;

        noLoop();
        $('#placar').css('visibility','visible');
        $('#inicioModal').modal('show');
    } //ADDED
}

function loadElement(element){
    loaded += 1;
}

function setMusicVolume(){
    if(volumeSlider.value == 0){
        imgSpeaker.src = '_images/speaker0.png';
    } else if(volumeSlider.value > 0 && volumeSlider.value <= 40){
        imgSpeaker.src = '_images/speaker1.png';
    } else if(volumeSlider.value > 40 && volumeSlider.value < 80){
        imgSpeaker.src = '_images/speaker2.png';
    } else {
        imgSpeaker.src = '_images/speaker3.png';
    }
    music.setVolume(map(volumeSlider.value,0,100,0,0.1));
}

let barLength = 0;

function draw() {

//Loading bar
if(loading){
    background('#8cce53');

    noFill();
    strokeWeight(4);
    stroke(255);
    rect(width*0.2, height*0.45, width*0.6, height*0.05,width*height/1000);
    noStroke();
    fill(255);

    textSize(width*height/30000);
    text('Carregando...', width*0.42, height*0.6);

    if(barLength < width*0.595/(qtdTotal+14)*loaded) {
        barLength += 5;
    }

    rect(width*0.202, height*0.455, barLength, height*0.04, width*height/1000);
    
    if(barLength >= width*0.595){
        loading = false;
        setup();
    }
}


if(!loading){ //ADDED
background('#81d8d0');
//desenho do chão
fill('#8dce55');
stroke('#0B5345');
strokeWeight(1);
rect(0, height*0.5, width,height*0.5);
//fim chão

//Timer setting
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
                music.stop();
                SgameOver.setVolume(0.05);
                SgameOver.play();
                $("#resultadoModal").modal("show");
                scoreField.value = score;
                timerOn = false;
                noLoop();
            }
        }
    }
//fim timer setting
    
//Initial timer setting
    if(timeSelect.value != 0){
        if(initialTimer > 0){
            if((millis()-initialCurrentTimer) >= 1000){
                initialTimer--
                initialCurrentTimer = millis();
            }
        } else {
            timerOn = true;
        }
    }
//Fim initial timer setting

 
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
    
    //
    for(let i = 0; i < scores.length; i++){
        scores[i].show();
        if(scores[i].getAlpha() == 0){
            scores.splice(i,1);
        }
    }    
    //
    
    
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
    
    //Timer inicial
    if(initialTimer > 0){
        noStroke();
        fill('rgba(0,0,0, 0.9)');
        rect(width*0.45, height/2-height*0.3/2, width*0.1, height*0.3, 20, 20, 20, 20);
        fill(255);
        textSize(height*0.35);
        text(initialTimer, width*0.455, height/2+height*0.11);
        stroke(0);
    }
    //Timer Inicial
    
    
    
    //abre a aba de resultados se não tiver mais lixos
    if(trashes.length == 0){
        $("#resultadoModal").modal("show");
        scoreField.value = score;
        timerOn = false;
    }
}
}

function mousePressed(){
    for(let i = 0; i< trashes.length; i++){
       if(trashes[i].click()){
           trashes[i].setHeld(true);
           heldTrash = i;
           initialX = trashes[heldTrash].x;
           initialY = trashes[heldTrash].y;
           cursor('_images/hand-cursor-closed.cur');
           break;
       } 
    }
}


function mouseReleased(){
    if(heldTrash != null){
        for(let i = 0; i < 5; i++){
            if((trashes[heldTrash].x+trashes[heldTrash].getSize()/2 > cans[i].x && trashes[heldTrash].x+trashes[heldTrash].getSize()/2 < cans[i].x + cans[i].width)&&(trashes[heldTrash].y+trashes[heldTrash].getSize()/2 > cans[i].y && trashes[heldTrash].y+trashes[heldTrash].getSize()/2 < cans[i].y + cans[i].height)){
                let objectScore = new Score(cans[i].x + cans[i].getWidth()/3, cans[i].y + cans[i].getHeight()/6, millis());
                    
                if(trashes[heldTrash].getType() == cans[i].getType()){
                    score += 10;
                    objectScore.setScore('+10');
                    objectScore.setX(cans[i].x + cans[i].getWidth()/4.5);
                } else {
                    Smisplaced.setVolume(0.2);
                    Smisplaced.play();
                    score -= 5;
                    if(score > 0){
                        objectScore.setScore('-5');
                        objectScore.setX(cans[i].x + cans[i].getWidth()/3);
                    }else {
                        objectScore.setScore('X');
                        objectScore.setX(cans[i].x + cans[i].getWidth()/2.5);
                    }
                    if(score < 0){
                        score = 0;
                    }
                }

                switch(trashes[heldTrash].getType()){
                    case 0:
                        Smetal.play();
                        break;
                    case 1:
                        Spaper.play();
                        break;
                    case 2:
                        Splastic.play();
                        break;
                    case 3:
                        Sorganic.play();
                        break;
                    case 4:
                        Sglass.play();
                        break;
                }
                    
                trashes.splice(heldTrash,1);
                    
                scores.push(objectScore);

                break;
            } 
            if(i == 4) {
                if(trashes[heldTrash].y < height*0.5){
                    trashes[heldTrash].setX(initialX);
                    trashes[heldTrash].setY(initialY);
                    trashes[heldTrash].setHeld(false);  
                } 
                else {
                    trashes[heldTrash].setHeld(false);
                }
            }
        }
        heldTrash = null;
    }
    cursor('_images/hand-cursor-open.cur');
}


function mouseDragged(){
    for(let trash of trashes){
        if(trash.getHeld() && initialTimer == 0){
            trash.move();
        }
    } 
}

function restart(){
    music.stop();
    timerOn = false;
    trashes = [];
    scores = [];
    restarted = true;
    initialTimer = 3;
    timeSelect.value = 0;
    //noLoop();
    draw();
    setup();
}

function startGame(){
    //document.getElementsByTagName('canvas')[0].style.cursor = "url('_images/hand-cursor-open.cur'), auto";
    cursor('_images/hand-cursor-open.cur');
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
    initialCurrentTimer = millis();
    loop();
    if(timeSelect.value == 0){
        initialTimer = 0;
    }
    score = 0;
}

btnTryAgain.addEventListener('click', restart);
btnStart.addEventListener('click', startGame);
volumeSlider.addEventListener('input', setMusicVolume);


imgSpeaker.addEventListener('click', function(){
    if(volumeSlider.value > 0) {
        lastVolume = volumeSlider.value;
        volumeSlider.value = 0;
        setMusicVolume();
    } else {
        volumeSlider.value = lastVolume;
        setMusicVolume();
    }
});

