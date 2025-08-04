// Snake game implementation
// Selecting DOM elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('highScore');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');

const cellSize = 20; // each square is 20px
const gridSize = canvas.width / cellSize; // 20x20 grid for 400px canvas

let snake = [];
let direction = { x: 0, y: 0 };
let nextDirection = { x: 0, y: 0 };
let food = {};
let score = 0;
let highScore = 0;
let running = false;
let gameSpeed = 150; // initial speed in ms (lower is faster)

// Initialize high score from local storage
function loadHighScore() {
  const stored = localStorage.getItem('snakeHighScore');
  highScore = stored ? parseInt(stored, 10) : 0;
  highScoreEl.textContent = highScore;
}

// Save high score when game ends
function saveHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('snakeHighScore', String(highScore));
  }
}

// Generate a random position for food that does not collide with the snake
function randomFood() {
  let pos;
  while (true) {
    pos = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
    // Check collision with snake
    if (!snake.some(segment => segment.x === pos.x && segment.y === pos.y)) {
      return pos;
    }
  }
}

// Draw game objects onto canvas
function draw() {
  // Clear canvas
  ctx.fillStyle = '#0e1f44';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Draw food
  ctx.fillStyle = '#f54242'; // red apple
  ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
  // Draw snake
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? '#73b700' : '#a1d400';
    ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
  });
}

// Update game state
function update() {
  // Update direction with queued value
  direction = { ...nextDirection };
  // If not moving (game hasn't started), skip
  if (direction.x === 0 && direction.y === 0) return;
  // Compute new head position
  const newHead = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };
  // Check wall collisions: wrap around (optional). We'll allow wrap-around; or game over if hit wall.
  if (newHead.x < 0 || newHead.x >= gridSize || newHead.y < 0 || newHead.y >= gridSize) {
    return gameOver();
  }
  // Check self-collision
  if (snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
    return gameOver();
  }
  // Insert new head at the beginning of snake
  snake.unshift(newHead);
  // Check if food eaten
  if (newHead.x === food.x && newHead.y === food.y) {
    score += 10;
    scoreEl.textContent = score;
    // Increase speed slightly but not too high (min 100ms)
    if (gameSpeed > 100) {
      gameSpeed -= 5;
    }
    food = randomFood();
  } else {
    // Remove last segment
    snake.pop();
  }
}

// Main game loop controlled via setTimeout to allow dynamic speed changes
function gameLoop() {
  if (!running) return;
  update();
  draw();
  // Schedule next frame
  setTimeout(gameLoop, gameSpeed);
}

// Start the game
function startGame() {
  // Reset state
  running = true;
  gameSpeed = 150;
  score = 0;
  scoreEl.textContent = score;
  snake = [
    { x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) },
  ];
  direction = { x: 1, y: 0 };
  nextDirection = { x: 1, y: 0 };
  food = randomFood();
  draw();
  // Start the loop after a brief delay
  setTimeout(gameLoop, gameSpeed);
}

// End the game
function gameOver() {
  running = false;
  saveHighScore();
  highScoreEl.textContent = highScore;
  // Show overlay message
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.font = '24px Tajawal, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('انتهت اللعبة!', canvas.width / 2, canvas.height / 2 - 10);
  ctx.fillText('اضغط على إعادة للبدء من جديد', canvas.width / 2, canvas.height / 2 + 20);
}

// Handle keyboard input for arrow keys
function changeDirection(event) {
  const key = event.key;
  const directions = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
  };
  if (!directions[key]) return;
  const newDir = directions[key];
  // Prevent reversing direction when length > 1
  if (snake.length > 1) {
    const opposite = (direction.x + newDir.x === 0 && direction.y + newDir.y === 0);
    if (opposite) return;
  }
  // Queue the new direction to apply on next update to avoid double-turn
  nextDirection = newDir;
}

// Event listeners
window.addEventListener('keydown', changeDirection);
startButton.addEventListener('click', () => {
  if (!running) {
    loadHighScore();
    startGame();
  }
});
resetButton.addEventListener('click', () => {
  running = false;
  loadHighScore();
  startGame();
});

// On page load, show high score and static board
loadHighScore();
snake = [
  { x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) },
];
food = randomFood();
draw();