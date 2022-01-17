const gameBoard = (() => {
  let gameState = ["x", "", "", "", "o", "", "x", "", "o"];

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

const gameFlow = (() => {})();

const gameGrid = (() => {
  const container = document.getElementById("container");
  for (i = 0; i < 9; i++) {
    grid = document.createElement("div");
    grid.className = "grid";
    grid.id = i;
    container.appendChild(grid);
    grid.textContent = gameBoard.gameState[i];
  }
})();
