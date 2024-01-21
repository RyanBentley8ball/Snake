
//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var VelocityY = 0;


var snakeBody = [];

//food
var foodX;
var foodY;


var gameOver = false;

window.onload = function(){
    board = document.getElementById("board")
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");//used for drawing on the board    

    placefood();
    document.addEventListener("keyup", changeDirection);
    setInterval (update, 1000/10);
}

function update(){
    if (gameOver){
        return;
    }

    context.fillStyle= "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "Red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY])
        placefood();
    }

    for (let i = snakeBody.length-1; i >0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }


    context.fillStyle="Purple";
    snakeX += velocityX * blockSize;
    snakeY += VelocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i =0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize){
        gameOver = true;
        alert("GAME OVER");
    }

    for(let i = 0; i < snakeBody.length; i++) {
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert("GAME OVER")
        }
    }
    }


function changeDirection(e) {
    if (e.code == "ArrowUp" && VelocityY != 1){
        velocityX = 0;
        VelocityY = -1;
    }
    else if (e.code == "ArrowDown" && VelocityY != -1){
        velocityX = 0;
        VelocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        VelocityY = 0;
    }
   else if (e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        VelocityY = 0;
    }
}


function placefood() {
    //0-1) *cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

