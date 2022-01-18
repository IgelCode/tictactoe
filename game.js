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

const gameBoard = (() => {
  let gameState = ["", "", "", "", "", "", "", "", ""];
  let remainingSquares = 9;
  let mark = "x";

  const wipeGrid = function () {
    while (container.firstChild) {
      container.firstChild.remove();
    }
    gameBoard.gameState = ["", "", "", "", "", "", "", "", ""];
    for (i = 0; i < gameBoard.gameState.length; i++) {
      grid = document.createElement("div");
      grid.className = "grid";
      grid.id = i;
      container.appendChild(grid);
      grid.textContent = gameBoard.gameState[i];
    }
    playerOne.winner = "no";
    playerTwo.winner = "no";
    gameBoard.remainingSquares = 9;
    gameBoard.mark = "x";
  };

  return { gameState, mark, remainingSquares, wipeGrid };
})();

const resetbtn = document.getElementById("resetbtn");
resetbtn.addEventListener("click", gameBoard.wipeGrid);

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
  const changeMark = function (grid) {
    let i = grid.target.id;
    if (gameBoard.mark === "x" && grid.target.textContent === "") {
      grid.target.textContent = "x";
      gameBoard.gameState[i] = "x";
      gameBoard.mark = "o";
      gameBoard.remainingSquares -= 1;
    } else if (gameBoard.mark === "o" && grid.target.textContent === "") {
      grid.target.textContent = "o";
      gameBoard.gameState[i] = "o";
      gameBoard.mark = "x";
      gameBoard.remainingSquares -= 1;
    }
    if (gameBoard.remainingSquares === 0) {
      console.log("Its a tie!");
      wipeGrid();
    }
    checkWinner();
  };
  container.addEventListener("click", changeMark);
})();

const checkWinner = () => {
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
  const declareWinner = function () {
    if (playerOne.winner === "yes") {
      console.log("Player 1 is the winner!");
    } else if (playerTwo.winner === "yes") {
      console.log("Player 2 is the winner!");
    }
    gameBoard.wipeGrid();
  };

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
};

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
