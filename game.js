const gameBoard = (() => {
  let gameState = ["", "", "", "", "", "", "", "", ""];

  return { gameState };
})();

const playerFactory = (name) => {
  const sayHello = function () {
    console.log("Hello" + this.name);
  };
  let score = 0;

  return { name, score, sayHello };
};

const playerOne = playerFactory("playerOne");
const playerTwo = playerFactory("playerTwo");

const gameGrid = (() => {
  let grid;
  const container = document.getElementById("container");
  for (i = 0; i < 9; i++) {
    grid = document.createElement("div");
    grid.className = "grid";
    grid.id = i;
    container.appendChild(grid);
    grid.textContent = gameBoard.gameState[i];
  }
})();

const gameFlow = (() => {
  let mark = "x";
  const changeMark = function (grid) {
    if (mark === "x" && grid.target.textContent === "") {
      grid.target.textContent = "x";
      mark = "o";
    } else if (mark === "o" && grid.target.textContent === "") {
      grid.target.textContent = "o";
      mark = "x";
    }
  };
  container.addEventListener("click", changeMark);
})();
