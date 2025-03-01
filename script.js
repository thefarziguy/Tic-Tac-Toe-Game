const winnerMsg = document.getElementById("winner_msg");
const gameBox = document.querySelectorAll(".box");
const playNewGame = document.querySelector("#newGame");

let playGame = true;
let currentPlayer = "x";

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

gameBox.forEach((box) => {
  box.addEventListener("click", () => {
    if (playGame && !box.textContent) {
      box.textContent = currentPlayer;
      checkWinner();
      togglePlayer();
    }
  });
});


const togglePlayer = () => {
  currentPlayer = currentPlayer === "x" ? "o" : "x";
};


const checkWinner = () => {
  let winnerFound = false;

  for (let pattern of winPatterns) {
    const [index1, index2, index3] = pattern.map((i) => gameBox[i].textContent);
    if (index1 && index1 === index2 && index2 === index3) {
      winnerFound = true;
      pattern.forEach((index) => gameBox[index].classList.add("winner-box"));
      displayMessage(index1);
      gameOver();
      break;
    }
  }
  if (!winnerFound && Array.from(gameBox).every((box) => box.textContent)) {
    winnerMsg.innerText = `Game Over, Try Again!`;
    winnerMsg.style.color = "red";
  }
};

const gameOver = () => {
  gameBox.forEach((box) => {
    box.disabled = true;
  });
};


const displayMessage = (winner) => {
  winnerMsg.innerText = `The winner is '${winner}'`;
  winnerMsg.style.color = "rgb(5, 235, 28)";
};


playNewGame.addEventListener("click", () => {
  gameBox.forEach((box) => {
    box.textContent = "";
    box.classList.remove("winner-box");
  });
  playGame = true;
  currentPlayer = "x";
  winnerMsg.innerText = "";

  enableAllBoxes();
});

const enableAllBoxes = () => {
  gameBox.forEach((box) => {
    box.disabled = false;
  });
};
