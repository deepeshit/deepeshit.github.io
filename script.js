const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;

const gridSize = 20;
let snake = [{ x: gridSize * 5, y: gridSize * 5 }];
let snakeDirection = { x: 1, y: 0 }; // Start moving to the right
let food = { x: gridSize * Math.floor(Math.random() * (canvas.width / gridSize)), y: gridSize * Math.floor(Math.random() * (canvas.height / gridSize)) };
let score = 0;

function update() {
    // Move the snake by creating a new head and removing the last tail segment
    const newHead = {
        x: snake[0].x + snakeDirection.x * gridSize,
        y: snake[0].y + snakeDirection.y * gridSize
    };

    // Check for collision with walls or itself
    if (newHead.x < 0 || newHead.x >= canvas.width || newHead.y < 0 || newHead.y >= canvas.height || snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        return gameOver();
    }

    snake.unshift(newHead);

    // Check for food collision
    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        document.getElementById('score').innerText = `Score: ${score}`;
        placeFood();
    } else {
        snake.pop(); // Remove tail if no food was eaten
    }
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function placeFood() {
    food = {
        x: gridSize * Math.floor(Math.random() * (canvas.width / gridSize)),
        y: gridSize * Math.floor(Math.random() * (canvas.height / gridSize))
    };
}

function gameOver() {
    alert(`Game Over! Your score was: ${score}`);
    snake = [{ x: gridSize * 5, y: gridSize * 5 }];
    snakeDirection = { x: 1, y: 0 }; // Reset to moving right
    score = 0;
    document.getElementById('score').innerText = `Score: ${score}`;
    placeFood();
}

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
}

// Listen for arrow key presses to control the snake
window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (snakeDirection.y === 0) snakeDirection = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (snakeDirection.y === 0) snakeDirection = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (snakeDirection.x === 0) snakeDirection = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (snakeDirection.x === 0) snakeDirection = { x: 1, y: 0 };
            break;
    }
});

// Start the game
placeFood();
gameLoop();
