const board = document.getElementById('board');
const statusText = document.getElementById('status');
const playerXScoreText = document.getElementById('playerXScore');
const playerOScoreText = document.getElementById('playerOScore');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let playerXScore = 0;
let playerOScore = 0;

const winningConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
}

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute('data-index');

  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    updateScore();
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[b] === gameState[c]
    );
  });
}

function updateScore() {
  if (currentPlayer === 'X') {
    playerXScore++;
    playerXScoreText.textContent = `X: ${playerXScore}`;
  } else {
    playerOScore++;
    playerOScoreText.textContent = `O: ${playerOScore}`;
  }
}

function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
}

function newGame() {
  playerXScore = 0;
  playerOScore = 0;
  playerXScoreText.textContent = `X: 0`;
  playerOScoreText.textContent = `O: 0`;
  restartGame();
}

// Start the game
createBoard();
