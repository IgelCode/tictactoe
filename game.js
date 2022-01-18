//Selectors...not hard to guess
const selectors = {
  resetbtn: document.getElementById("resetbtn"),
  lefttext: document.getElementById("lefttext"),
  righttext: document.getElementById("righttext"),
  leftscore: document.getElementById("leftscore"),
  rightscore: document.getElementById("rightscore"),
  leftname: document.getElementById("leftname"),
  rightname: document.getElementById("rightname"),
  turn: document.getElementById("turn"),
  toggleai: document.getElementById("toggleai"),
};

//Toggle the AI, any better ideas to get this into an object?
let ai = "off";
function aitoggle() {
  if (ai === "on") {
    ai = "off";
    toggleai.textContent = "Play vs AI (off)";
    leftname.textContent = "Player 2";
  } else {
    ai = "on";
    toggleai.textContent = "Play vs AI (on)";
  }
}
selectors.turn.textContent = "It is your turn: Player 1";
toggleai.addEventListener("click", aitoggle);

//Edit the Playernames Module
const editName = (() => {
  const changeName = function () {
    selectors.leftname.textContent = prompt(
      "Please enter the name of Player 1"
    );

    if (selectors.leftname.textContent === "") {
      alert("Must have a name!");
      selectors.leftname.textContent = "Player 1";
      return;
    }
    playerOne.name = selectors.leftname.textContent;
    yourTurn();

    selectors.rightname.textContent = prompt(
      "Please enter the name of Player 2"
    );
    if (selectors.rightname.textContent === "") {
      alert("Must have a name!");
      selectors.rightname.textContent = "Player 2";
      return;
    }
    playerTwo.name = selectors.rightname.textContent;
    yourTurn();
  };
  selectors.leftname.addEventListener("click", changeName);
  selectors.rightname.addEventListener("click", changeName);
})();

//Making the Players
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

//The Board with its beginning state, a wipe method (soft), a reset method (hard)
const gameBoard = (() => {
  let gameState = ["", "", "", "", "", "", "", "", ""];
  let remainingSquares = 9;
  let mark = "x";
  selectors.leftscore.textContent = "Score: " + playerOne.score;
  selectors.rightscore.textContent = "Score: " + playerTwo.score;

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
    selectors.turn.textContent = "It is your turn: Player 1";
  };

  const resetAll = function () {
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
    selectors.lefttext.textContent = "Win or lose?";
    selectors.righttext.textContent = "Win or lose?";
    playerOne.score = 0;
    playerTwo.score = 0;
    selectors.leftscore.textContent = "Score: 0";
    selectors.rightscore.textContent = "Score: 0";
    playerTwo.name = "Player 2";
    playerOne.name = "Player 1";
    selectors.leftname.textContent = "Player 1";
    selectors.rightname.textContent = "Player 2";
    selectors.turn.textContent = "It is your turn: Player 1";
    ai = "off";
    toggleai.textContent = "Play vs AI (off)";
  };
  return { gameState, mark, remainingSquares, wipeGrid, resetAll };
})();
resetbtn.addEventListener("click", gameBoard.resetAll);

//Deciding whos turn it is
const yourTurn = () => {
  if (gameBoard.mark === "x") {
    selectors.turn.textContent = "It is your turn: " + playerOne.name;
  } else if (gameBoard.mark === "o") {
    selectors.turn.textContent = "It is your turn: " + playerTwo.name;
  }
};

//Making the Grid of the Game
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

//The flow of the game, deciding if AI is playing
const gameFlow = (() => {
  const changeMark = function (grid) {
    let i = grid.target.id;
    if (gameBoard.mark === "x" && grid.target.textContent === "") {
      grid.target.style.color = "red";
      grid.target.textContent = "x";
      gameBoard.gameState[i] = "x";
      gameBoard.mark = "o";
      gameBoard.remainingSquares -= 1;
      selectors.lefttext.textContent = "";
      selectors.righttext.textContent = "";

      if (ai === "on") {
        simpleAI();
        console.log(gameBoard.gameState);
      }
      //AI BUTTON EVLISTENR
      //simpleAI();
    } else if (gameBoard.mark === "o" && grid.target.textContent === "") {
      grid.target.style.color = "green";
      grid.target.textContent = "o";
      gameBoard.gameState[i] = "o";
      gameBoard.mark = "x";
      gameBoard.remainingSquares -= 1;
      selectors.lefttext.textContent = "";
      selectors.righttext.textContent = "";
    }
    if (gameBoard.remainingSquares === 0) {
      selectors.lefttext.textContent = "Its a tie!";
      selectors.righttext.textContent = "Its a tie!";
      gameBoard.wipeGrid();
    }
    yourTurn();
    checkWinner();
  };
  container.addEventListener("click", changeMark);
})();

//Checking if someone has won
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
      selectors.lefttext.textContent =
        "This round goes to " + playerOne.name + "!";
      playerOne.score += 1;
      selectors.leftscore.textContent = "Score: " + playerOne.score;
    } else if (playerTwo.winner === "yes") {
      selectors.righttext.textContent =
        "This round goes to " + playerTwo.name + "!";
      playerTwo.score += 1;
      selectors.rightscore.textContent = "Score: " + playerTwo.score;
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

//Random AI
const simpleAI = () => {
  rightname.textContent = "AI Player";
  righttext.textContent = `AI says: "What a strange game. 
                            The only winning move is not to play."`;
  if (gameBoard.mark === "o") {
    const grid = document.getElementsByClassName("grid");
    let i = Math.floor(Math.random() * gameBoard.gameState.length);
    if (gameBoard.remainingSquares === 0) {
      checkWinner();
    } else if (grid[i].textContent === "" && gameBoard.gameState[i] === "") {
      gameBoard.gameState[i] = "o";
      grid[i].textContent = "o";
      gameBoard.remainingSquares -= 1;
    } else {
      simpleAI();
    }
    gameBoard.mark = "x";
    return;
  } else {
    return;
  }
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
