console.log("Скрипты подключены!");

let game = document.getElementById("game");
let canvas = game.getContext("2d");

let isRunning = false;
let score = 0;
let lives = 10;

game.width = window.innerWidth;
game.height = window.innerHeight;
let { height, width } = game;
let paddle = new Paddle();
paddle.y = height * 0.9;
paddle.x = width * 0.5 - paddle.width / 2;

let ball = new Ball(width / 2, height / 2);

ball.game = game;
ball.paddle = paddle;

let currentLevel = 0;

let bricks = LEVELS[currentLevel];

let aliveBricks = [];

ball.bricks = aliveBricks;

function generateBricks() {
    let marginTop = 100;
    let marginBetweenBricks = 10;
    let etalonBrick = new Brick(0, 0);

    for (let i = 0; i < bricks.length; i++) {
        let countBricks = bricks[i].length;
        let allWidth = countBricks * etalonBrick.width
                        + marginBetweenBricks * (countBricks - 1);
        let x = width / 2 - allWidth / 2;
        let y = marginTop + i * etalonBrick.height + marginBetweenBricks * (i - 1);
        for (let j = 0; j < bricks[i].length; j++) {
            let brick;
            if (bricks[i][j] == 1) {
                brick = new Brick(x, y);
                // 1 - номер столбца, 2 - номер строки
                brick.imageX = 1 * 88; 
                brick.imageY = 2 * 48;
                aliveBricks.push(brick);
            }
            if (bricks[i][j] == 2) {
                brick = new Brick(x, y);
                brick.imageX = 3 * 88; 
                brick.imageY = 5 * 48;
                aliveBricks.push(brick);
            }
            if (bricks[i][j] == 10) {
                brick = new Brick(x, y);
                brick.imageX = 6 * 88; 
                brick.imageY = 4 * 48;
                aliveBricks.push(brick);
            }
            if (bricks[i][j] == 11 || bricks[i][j] == 12) {
                brick = new Brick(x, y);
                brick.imageX = 2 * 88; 
                brick.imageY = 2 * 48;
                aliveBricks.push(brick);
            }
            if (bricks[i][j] != 0) {
                brick.code = bricks[i][j];
                brick.ball = ball;
                brick.paddle = paddle;
            }
            x += marginBetweenBricks + etalonBrick.width;
        }
    }
}
generateBricks();

function gameOver() {
    lives--;
    if (lives !== 0) {
        ball.x = width / 2;
        ball.y = height / 2;
        return;
    }
    isRunning = false;
    let scoreText = document.getElementById("score");
    scoreText.innerHTML = `Ваш счёт: ${score}!`;
    let menu = document.getElementById("gameover");
    menu.style['display'] = 'flex';
    let retryButton = document.getElementById('retry');
    retryButton.onclick = () => {
        location.reload();
    }
}
ball.gameOver = gameOver;

function render() {
    if (isRunning) {
        requestAnimationFrame(render);
    }
    canvas.clearRect(0, 0, width, height);
    paddle.render(canvas);
    ball.render(canvas);
    ball.move();
    for (let brick of aliveBricks) {
        brick.render(canvas);
    }
    renderScore(canvas);
    renderLives(canvas);
    checkLevelComplete();
}
render();

function checkLevelComplete() {
    if (score === aliveBricks.length) {
        if (currentLevel === LEVELS.length - 1) {
            isRunning = false;
            let winner = document.getElementById("winner");
            winner.style['display'] = "flex";
        }
        currentLevel++;
        bricks = LEVELS[currentLevel];
        generateBricks();
    }
}

function renderLives(canvas) {
    canvas.font = "25px Arial";
    canvas.fillStyle = "#ff0000";
    let heartCode = "2764";
    let heart = String.fromCharCode(parseInt(heartCode, 16));
    let str = "";
    for (let i = 0; i < lives; i++) {
        str += heart + " ";
    }
    canvas.fillText(str, 130, 32);
}

function renderScore(canvas) {
    score = 0;
    for (let brick of aliveBricks) {
        if (brick.isDead) {
            score++;
        }
    }
    canvas.font = "20px Comic Sans MS";
    canvas.fillStyle = "#ff0000";
    canvas.fillText("Счёт: " + score, 16, 32);
}

game.addEventListener("touchmove", (event) => {
    let rect = game.getBoundingClientRect();
    let x = event.clientX - rect.left;
    paddle.move(x - paddle.width / 2, width);
}, false);

let menu = document.getElementById("menu");
let startGame = document.getElementById("startGame");
startGame.onclick = function () {
    isRunning = true;
    render();
    menu.style["display"] = "none";
}


let about = document.getElementById("about");
about.onclick = function() {
    let aboutContainer = document.getElementById("about-container");
    aboutContainer.style['display'] = "flex";
}
let closeAbout = document.getElementById('close-about');
closeAbout.onclick = function() {
    let aboutContainer = document.getElementById("about-container");
    aboutContainer.style['display'] = "none";
}