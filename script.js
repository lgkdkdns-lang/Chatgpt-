const player = document.getElementById("player");
const game = document.getElementById("game");
const pointsText = document.getElementById("points");
const gameOverScreen = document.getElementById("gameOver");
const restartBtn = document.getElementById("restart");

let x = 150;
let y = 150;
let score = 0;
let gameRunning = true;

let speed = 5;

let keys = {
    up:false,
    down:false,
    left:false,
    right:false
};


function updatePlayer(){

    if(!gameRunning) return;

    if(keys.up) y -= speed;
    if(keys.down) y += speed;
    if(keys.left) x -= speed;
    if(keys.right) x += speed;


    x = Math.max(0, Math.min(game.clientWidth - 40, x));
    y = Math.max(0, Math.min(game.clientHeight - 40, y));


    player.style.left = x + "px";
    player.style.top = y + "px";


    checkCollision();

    requestAnimationFrame(updatePlayer);
}


function spawnTrash(){

    if(!gameRunning) return;

    let trash = document.createElement("div");

    trash.className = "trash";

    trash.style.left =
    Math.random() * (game.clientWidth - 25) + "px";

    trash.style.top =
    Math.random() * (game.clientHeight - 25) + "px";


    game.appendChild(trash);
}


function checkCollision(){

    let playerRect = player.getBoundingClientRect();

    document.querySelectorAll(".trash").forEach(trash => {

        let trashRect = trash.getBoundingClientRect();


        if(
            playerRect.left < trashRect.right &&
            playerRect.right > trashRect.left &&
            playerRect.top < trashRect.bottom &&
            playerRect.bottom > trashRect.top
        ){

            trash.remove();

            score++;

            pointsText.innerText = score;

        }

    });

}


// Steuerung Buttons

function hold(button, direction){

    button.addEventListener("touchstart",()=>{
        keys[direction]=true;
    });

    button.addEventListener("touchend",()=>{
        keys[direction]=false;
    });


    button.addEventListener("mousedown",()=>{
        keys[direction]=true;
    });

    button.addEventListener("mouseup",()=>{
        keys[direction]=false;
    });
}


hold(document.getElementById("up"),"up");
hold(document.getElementById("down"),"down");
hold(document.getElementById("left"),"left");
hold(document.getElementById("right"),"right");


// Müll erzeugen

setInterval(()=>{
    spawnTrash();
},1200);


// Neustart

restartBtn.onclick = ()=>{

    score = 0;
    pointsText.innerText = 0;

    gameOverScreen.style.display="none";

    gameRunning=true;

};


// Start

updatePlayer();
