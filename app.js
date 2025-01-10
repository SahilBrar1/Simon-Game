let gameSeq = [];
let userSeq = [];


// sounds
const soundGameBtn = document.getElementById("soundGameBtn");

const soundGameOver = document.getElementById("soundGameOver");

const soundUserBtn = document.getElementById("soundUserBtn");
//sounds


let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let startBtn = document.querySelector(".start-btn");
startBtn.addEventListener("click" , function() {
    if(started == false) {
        started = true;
        
        userFlash(this);
        levelUp();
        startBtn.innerText ="";
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);

}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    soundGameBtn.currentTime = 0; 
    soundGameBtn.play();
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor); //purple, yellow
    // random btn choose
    gameFlash(randBtn);
}

function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press restart to restart.`;
        startBtn.innerText = "Restart";
        soundGameOver.currentTime = 0; 
        soundGameOver.play();
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        startBtn.addEventListener("click", reset);
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    soundUserBtn.currentTime = 0; 
    soundUserBtn.play();

    userColor = btn.getAttribute("id");
    userSeq.push(userColor); //purple  next -> //purple //green

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click",btnPress);
}

function reset() {
    userFlash(this);
    this.innerText = "";
    // started == false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    setTimeout(levelUp, 2000);
}