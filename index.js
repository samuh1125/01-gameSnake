const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreBlock = document.querySelector(".score");
const levelBlock = document.querySelector(".level");


const snake = {
    x: 10,
    y: 10,
    dx: 0,
    dy: 0,
    cells: [{ x: 10, y: 10 }],
    maxCells: 4,
    score: 0,
};

const snakeColor = {
    tono1: "hsl(120, 100%, 15%)",
    tono2: "hsl(120, 100%, 20%)",
    tono3: "hsl(120, 100%, 25%)",
    tono4: "hsl(120, 100%, 30%)",
    tono5: "hsl(120, 100%, 35%)",
    tono6: "hsl(120, 100%, 40%)",
    tono7: "hsl(120, 100%, 45%)",
    tono8: "hsl(120, 100%, 50%)",
    tono9: "hsl(120, 100%, 55%)",
    tono10: "hsl(120, 100%, 60%)"
};

let snakeStats = {
    score: 0,
    level: 0,
    speed: 100,
    color: snakeColor.tono1,
};

const food = {
    x: 0,
    y: 0,
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function update() {
    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0) snake.x = canvas.width - 10;
    if (snake.y < 0) snake.y = canvas.height - 10;

    if (snake.x >= canvas.width) snake.x = 0;
    if (snake.y >= canvas.height) snake.y = 0;

    snake.cells.unshift({ 
        x: snake.x, 
        y: snake.y 
    });

    if (snake.cells.length > snake.maxCells) snake.cells.pop();
    
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = snakeStats.color;

    snake.cells.forEach((cell, index) => {
        ctx.fillRect(cell.x, cell.y, 10, 10);

        if (cell.x === food.x && cell.y === food.y) {
            snake.maxCells++;
            food.x = getRandomInt(0, canvas.width / 10 - 1) * 10;
            food.y = getRandomInt(0, canvas.height / 10 - 1) * 10;
            updateScore();
        }

        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                dafaultState();
            }
        }
    });

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 10, 10);
}

function dafaultState() {
    snake.x = 10;
    snake.y = 10;
    snake.cells = [{ x: 10, y: 10 }];
    snake.maxCells = 4;
    snake.dx = 10;
    snake.dy = 0;
    snake.score = 0 - 1;
    food.x = getRandomInt(0, canvas.width / 10 - 1) * 10;
    food.y = getRandomInt(0, canvas.height / 10 - 1) * 10;
 
    snakeStats.level = 0;
    snakeStats.speed = 100;
    snakeStats.score = 0 - 1;

    updateScore();
}

function updateScore() {
    snake.score++;
    let resto = snake.score % 5;
    if (resto === 0) {
        snakeStats.level++;
        snakeStats.speed -= 10;
        let tonoSnake = "tono" + snakeStats.level
        snakeStats.color = snakeColor[tonoSnake];           
    }

    scoreBlock.textContent = snake.score;
    levelBlock.textContent = snakeStats.level;
}

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, snakeStats.speed);
}

document.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "ArrowUp":
            if (snake.dy !== 10) {
                snake.dx = 0;
                snake.dy = -10;
            }
        break;

        case "ArrowDown":
            if (snake.dy !== -10) {
                snake.dx = 0;
                snake.dy = 10;
            }
        break;

        case "ArrowLeft":
            if (snake.dx !== 10) {
                snake.dx = -10;
                snake.dy = 0;
            }
        break;

        case "ArrowRight":
            if (snake.dx !== -10) {
                snake.dx = 10;
                snake.dy = 0;
            }
        break;
    }
});

gameLoop();