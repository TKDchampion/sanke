//canvas繪製
var c = document.getElementById("canvas"); //取得元素
var ctx = c.getContext("2d"); //渲染環境

var snake = [];//定義一條蛇，畫蛇的身體
var snakeCount = 6;//初始化蛇的長度
var foodx = 0;
var foody = 0;
var togo = 0;

//畫地圖的函式
function drawtable() {

    //畫豎線
    for (var i = 0; i < 60; i++) {
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(15 * i, 0);
        ctx.lineTo(15 * i, 600);
        ctx.closePath();
        ctx.stroke();
    }

    //畫橫線
    for (var j = 0; j < 40; j++) {
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(0, 15 * j);
        ctx.lineTo(900, 15 * j);
        ctx.closePath();
        ctx.stroke();
    }

    //畫蛇
    for (var k = 0; k < snakeCount; k++) {
        ctx.fillStyle = "#000";
        if (k == snakeCount - 1) {
            ctx.fillStyle = "red";//蛇頭的顏色
        }
        ctx.fillRect(snake[k].x, snake[k].y, 15, 15);//蛇身
    }

    //繪製食物	
    ctx.fillStyle = "black";
    ctx.fillRect(foodx, foody, 15, 15);
    ctx.fill();
}

//定義蛇的起始座標
function start() {
    for (var k = 0; k < snakeCount; k++) {
        snake[k] = { x: k * 15, y: 0 };
    }
    drawtable();
}

//產生食物
function addfood() {
    foodx = Math.floor(Math.random() * 60) * 15;
    foody = Math.floor(Math.random() * 40) * 15;

    for (var k = 0; k < snake; k++) {
        if (foodx == snake[k].x && foody == sanke[k].y) {
            addfood();
        }
    }
}

function move() {
    switch (togo) {
        case 1: snake.push({ x: snake[snakeCount - 1].x - 15, y: snake[snakeCount - 1].y }); break;
        case 2: snake.push({ x: snake[snakeCount - 1].x, y: snake[snakeCount - 1].y - 15 }); break;
        case 3: snake.push({ x: snake[snakeCount - 1].x + 15, y: snake[snakeCount - 1].y }); break;
        case 4: snake.push({ x: snake[snakeCount - 1].x, y: snake[snakeCount - 1].y + 15 }); break;
        default: snake.push({ x: snake[snakeCount - 1].x + 15, y: snake[snakeCount - 1].y });
    }
    snake.shift();//刪除陣列第一個元素
    ctx.clearRect(0, 0, 900, 600);//清除畫布重新繪製
    isEat();
    isDead();
    drawtable();
}

function keydown(e) {
    switch (e.keyCode) {
        case 37: togo = 1; break;
        case 38: togo = 2; break;
        case 39: togo = 3; break;
        case 40: togo = 4; break;
    }
}

//吃到食物後長度加1
function isEat() {
    if (snake[snakeCount - 1].x == foodx && snake[snakeCount - 1].y == foody) {
        addfood();
        snakeCount++;
        snake.unshift({ x: -15, y: -15 });
    }
}

function isDead() {
    if (snake[snakeCount - 1].x > 885 || snake[snakeCount - 1].y > 585 || snake[snakeCount - 1].x < 0 || snake[snakeCount - 1].y < 0) {
        alert("GAME OVER!!!");
        window.location.reload();
    }
}

document.onkeydown = function (e) {
    keydown(e);
}

window.onload = function () {
    start();
    setInterval(move, 150);
}