const gameboard = document.getElementById("gameboard");
const ctx = gameboard.getContext("2d");

const BOARDHEIGHT = 500;
const BOARDWIDTH = 500;
const PADDLESPIN = 5;

let ball = new Ball(250, 250, 1, -1, 12.5);
let paddleL = new Paddle(0,0, 100,25, "aqua");
let paddleR = new Paddle(475, 0, 100, 25, "aquamarine");
let scoreL = 0;
let scoreR = 0;

function clearBoard(){
    ctx.fillStyle = "beige"
    ctx.fillRect(0,0,500, 500) ;
    ctx.fill();
    
}

function draw() {
    clearBoard();
    ball.draw();
    paddleL.draw();
    paddleR.draw();
}

function updateScore(){
    const scoreboard = document.getElementById("scoreboard");
    scoreboard.innerHTML = `${scoreL} : ${scoreR}`
}

let intervalID;

function nextTick() {
    intervalID = setTimeout(
        () => {
            paddleL.move();
            paddleR.move();
            
            ball.bounceWall()
            if(ball.bouncePaddleL(paddleL)) score("right");
            if(ball.bouncePaddleR(paddleR)) score("left");
            ball.move()
            
            
            draw();
            nextTick();
        }, 10 
        );
    }

    function score(player) {
        if (player == "left") scoreL++;
        if (player == "right") scoreR++;
        let newX = Math.floor(Math.random()*(400-100)) + 100;
        let newY = Math.floor(Math.random()*(400-100)) + 100;
        let newVX = Math.floor(Math.random()* (5-1)) + 1;
        ball = new Ball(newX, newY, newVX, -1, 12.5);
       
        updateScore();
    }
    
    function resetGame() {
        clearInterval(intervalID);
        resetObjects();
        scoreL = 0;
        scoreR = 0;
        updateScore();
        nextTick();
    }
    
    function resetObjects(){
        let ball = new Ball(250, 250, 1, -1, 12.5);
        let paddleL = new Paddle(0,0, 100,25, "red");
        let paddleR = new Paddle(475, 0, 100, 25, "blue");
    }
    const UPARROW = 38;
    const DOWNARROW = 40;
    const WKEY = 87;
    const SKEY = 83;
    const PADDLEVELOCITY = 5;
    
    window.addEventListener("keydown", keyDown);
    function keyDown(event) {
        const key = event.keyCode;
        // console.log(`KEYDOWN: ${key}`);
        switch (key) {
            case(UPARROW):
            paddleR.vy = -PADDLEVELOCITY;
            break;
            case(DOWNARROW):
            paddleR.vy = PADDLEVELOCITY;
            break;
            case(WKEY):
            paddleL.vy = -PADDLEVELOCITY;
            break;
            case(SKEY):
            paddleL.vy = PADDLEVELOCITY;
            break;
        }
    }
    
    window.addEventListener("keyup", keyUp);
    function keyUp(event) {
        const key = event.keyCode;
        // console.log(`KEYUP: ${key}`);
        switch(key) {
            case (UPARROW):
            case (DOWNARROW):
            paddleR.vy= 0;
            break;
            case (WKEY):
            case (SKEY):
            paddleL.vy=0;
            break;
        }
    }