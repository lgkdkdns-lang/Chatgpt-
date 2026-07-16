const player = document.getElementById("player");
const game = document.getElementById("game");
const pointsText = document.getElementById("points");
const gameOverScreen = document.getElementById("gameOver");
const restartBtn = document.getElementById("restart");


let playerX = 150;
let playerY = 150;

let score = 0;
let lives = 3;

let gameRunning = true;
let speed = 5;

let keys = {
    up:false,
    down:false,
    left:false,
    right:false
};


// Spieler bewegen

function update(){

    if(gameRunning){

        if(keys.up) playerY -= speed;
        if(keys.down) playerY += speed;
        if(keys.left) playerX -= speed;
        if(keys.right) playerX += speed;


        playerX = Math.max(0, Math.min(game.clientWidth-45, playerX));
        playerY = Math.max(0, Math.min(game.clientHeight-45, playerY));


        player.style.left = playerX+"px";
        player.style.top = playerY+"px";


        checkCollisions();

    }


    requestAnimationFrame(update);

}


// Touch Steuerung

function buttonControl(id, direction){

    let button=document.getElementById(id);


    button.addEventListener("touchstart",(e)=>{
        e.preventDefault();
        keys[direction]=true;
    });


    button.addEventListener("touchend",(e)=>{
        e.preventDefault();
        keys[direction]=false;
    });


    button.addEventListener("mousedown",()=>{
        keys[direction]=true;
    });


    button.addEventListener("mouseup",()=>{
        keys[direction]=false;
    });


    button.addEventListener("mouseleave",()=>{
        keys[direction]=false;
    });

}


buttonControl("up","up");
buttonControl("down","down");
buttonControl("left","left");
buttonControl("right","right");



// Müll erstellen

function spawnTrash(){

    if(!gameRunning)return;


    let trash=document.createElement("div");

    trash.className="trash";


    trash.style.left=Math.random()*(game.clientWidth-30)+"px";
    trash.style.top=Math.random()*(game.clientHeight-30)+"px";


    game.appendChild(trash);


}



// Katzen erstellen

function spawnCat(){

    if(!gameRunning)return;


    let cat=document.createElement("div");

    cat.className="cat";


    let x=Math.random()*(game.clientWidth-45);
    let y=Math.random()*(game.clientHeight-45);


    cat.style.left=x+"px";
    cat.style.top=y+"px";


    game.appendChild(cat);



    let moveX=Math.random()*2-1;
    let moveY=Math.random()*2-1;


    let interval=setInterval(()=>{

        if(!gameRunning){
            clearInterval(interval);
            return;
        }


        x+=moveX*2;
        y+=moveY*2;


        if(x<0||x>game.clientWidth-45)
            moveX*=-1;

        if(y<0||y>game.clientHeight-45)
            moveY*=-1;


        cat.style.left=x+"px";
        cat.style.top=y+"px";


    },30);



    setTimeout(()=>{

        clearInterval(interval);
        cat.remove();

    },10000);

}



// Kollisionen

function checkCollisions(){

    let playerBox=player.getBoundingClientRect();


    document.querySelectorAll(".trash").forEach(item=>{


        let box=item.getBoundingClientRect();


        if(hit(playerBox,box)){

            item.remove();

            score++;

            pointsText.innerText=score;


            if(score%10===0){
                speed+=1;
            }

        }

    });



    document.querySelectorAll(".cat").forEach(cat=>{


        let box=cat.getBoundingClientRect();


        if(hit(playerBox,box)){


            cat.remove();

            lives--;


            if(lives<=0){

                endGame();

            }

        }

    });


}



function hit(a,b){

    return(
        a.left<b.right &&
        a.right>b.left &&
        a.top<b.bottom &&
        a.bottom>b.top
    );

}




function endGame(){

    gameRunning=false;

    gameOverScreen.style.display="block";

}



restartBtn.onclick=()=>{


    document.querySelectorAll(".trash,.cat").forEach(e=>e.remove());


    score=0;
    lives=3;
    speed=5;


    pointsText.innerText=0;


    playerX=150;
    playerY=150;


    gameOverScreen.style.display="none";


    gameRunning=true;

};




// Neue Objekte

setInterval(spawnTrash,1200);

setInterval(spawnCat,6000);



update();
