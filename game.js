const gameBoard = (() => {
  let gameState = ["", "", "", "", "", "", "", "", ""];

  return { gameState };
})();

const playerFactory = (name) => {
  const win = function () {
    console.log(this.name + " wins");
  };
  let score = 0;
  let winner = "no";

  return { name, score, win, winner };
};

const playerOne = playerFactory("Player 1");
const playerTwo = playerFactory("Player 2");

const gameGrid = (() => {
  let grid;
  const container = document.getElementById("container");
  for (i = 0; i < gameBoard.gameState.length; i++) {
    grid = document.createElement("div");
    grid.className = "grid";
    grid.id = i;
    container.appendChild(grid);
    grid.textContent = gameBoard.gameState[i];
  }
})();

const gameFlow = (() => {
  let remainingSquares = 9;
  let mark = "x";

  //Unbedingt testen ob ich remainingSquares und mark nach gameBoard auslagern kann,
  //um sie von außen anzusteuern.

  const changeMark = function (grid) {
    let i = grid.target.id;
    if (mark === "x" && grid.target.textContent === "") {
      grid.target.textContent = "x";
      gameBoard.gameState[i] = "x";
      mark = "o";
      remainingSquares -= 1;
    } else if (mark === "o" && grid.target.textContent === "") {
      grid.target.textContent = "o";
      gameBoard.gameState[i] = "o";
      mark = "x";
      remainingSquares -= 1;
    }
    if (remainingSquares === 0) {
      console.log("Its a tie!");
    }
    checkWinner();
  };
  container.addEventListener("click", changeMark);
})();

const winningStates = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  winningStates.forEach((square) => {
    if (
      gameBoard.gameState[square[0]] === "x" &&
      gameBoard.gameState[square[1]] === "x" &&
      gameBoard.gameState[square[2]] === "x"
    ) {
      playerOne.winner = "yes";
      declareWinner();
    } else if (
      gameBoard.gameState[square[0]] === "o" &&
      gameBoard.gameState[square[1]] === "o" &&
      gameBoard.gameState[square[2]] === "o"
    ) {
      playerTwo.winner = "yes";
      declareWinner();
    }
  });
}

function declareWinner() {
  if (playerOne.winner === "yes") {
    console.log("Player 1 is the winner!");
  } else if (playerTwo.winner === "yes") {
    console.log("Player 2 is the winner!");
  }
  gameBoard.gameState = ["", "", "", "", "", "", "", "", ""];
  wipeGrid();
  playerOne.winner = "no";
  playerTwo.winner = "no";
  gameFlow.remainingSquares = 9;
}

function wipeGrid() {
  while (container.firstChild) {
    container.firstChild.remove();
  }
  for (i = 0; i < gameBoard.gameState.length; i++) {
    grid = document.createElement("div");
    grid.className = "grid";
    grid.id = i;
    container.appendChild(grid);
    grid.textContent = gameBoard.gameState[i];
  }
}

//Original winning Function, works but kinda dumb.
/*
if (
  (gameBoard.gameState[0] === "x" &&
    gameBoard.gameState[1] === "x" &&
    gameBoard.gameState[2] === "x") ||
  (gameBoard.gameState[3] === "x" &&
    gameBoard.gameState[4] === "x" &&
    gameBoard.gameState[5] === "x") ||
  (gameBoard.gameState[6] === "x" &&
    gameBoard.gameState[7] === "x" &&
    gameBoard.gameState[8] === "x") ||
  (gameBoard.gameState[0] === "x" &&
    gameBoard.gameState[3] === "x" &&
    gameBoard.gameState[6] === "x") ||
  (gameBoard.gameState[1] === "x" &&
    gameBoard.gameState[4] === "x" &&
    gameBoard.gameState[7] === "x") ||
  (gameBoard.gameState[2] === "x" &&
    gameBoard.gameState[5] === "x" &&
    gameBoard.gameState[8] === "x") ||
  (gameBoard.gameState[0] === "x" &&
    gameBoard.gameState[4] === "x" &&
    gameBoard.gameState[8] === "x") ||
  (gameBoard.gameState[2] === "x" &&
    gameBoard.gameState[4] === "x" &&
    gameBoard.gameState[6] === "x")
) {
  playerOne.win();
} else if (
  (gameBoard.gameState[0] === "o" &&
    gameBoard.gameState[1] === "o" &&
    gameBoard.gameState[2] === "o") ||
  (gameBoard.gameState[3] === "o" &&
    gameBoard.gameState[4] === "o" &&
    gameBoard.gameState[5] === "o") ||
  (gameBoard.gameState[6] === "o" &&
    gameBoard.gameState[7] === "o" &&
    gameBoard.gameState[8] === "o") ||
  (gameBoard.gameState[0] === "o" &&
    gameBoard.gameState[3] === "o" &&
    gameBoard.gameState[6] === "o") ||
  (gameBoard.gameState[1] === "o" &&
    gameBoard.gameState[4] === "o" &&
    gameBoard.gameState[7] === "o") ||
  (gameBoard.gameState[2] === "o" &&
    gameBoard.gameState[5] === "o" &&
    gameBoard.gameState[8] === "o") ||
  (gameBoard.gameState[0] === "o" &&
    gameBoard.gameState[4] === "o" &&
    gameBoard.gameState[8] === "o") ||
  (gameBoard.gameState[2] === "o" &&
    gameBoard.gameState[4] === "o" &&
    gameBoard.gameState[6] === "o")
) {
  playerTwo.win();
}*/
