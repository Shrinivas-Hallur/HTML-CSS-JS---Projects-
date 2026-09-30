const boxes = document.querySelectorAll(".box");
const resetbtn = document.querySelector("#reset-btn");
const msgcont = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

const bgMusic = document.querySelector("#bgMusic");
const winnerMusic = document.querySelector("#winnerMusic");

const themeBtn = document.querySelector("#theme-btn");
const musicBtn = document.querySelector("#music-btn");

musicBtn.innerText = "🔇";


// Toggle between light and dark mode

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeBtn.innerText = "☀️";
  } else {
    themeBtn.innerText = "🌙";
  }
});


// Game variables

let musicEnabled = false;

let turnO = true;

let musicStarted = false;


// All possible winning combinations

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [3, 4, 5],
  [2, 5, 8],
  [6, 7, 8],
];


// Turn background and winner music on/off

musicBtn.addEventListener("click", () => {
  musicEnabled = !musicEnabled;

  if (musicEnabled) {
    musicBtn.innerText = "🔊";

    bgMusic.play();
  } else {
    musicBtn.innerText = "🔇";

    bgMusic.pause();
    winnerMusic.pause();
  }
});


// Handle clicks on the game boxes

boxes.forEach((box) => {
  box.addEventListener("click", () => {

    if (turnO) {
      box.classList.add("boxOcolor");
      box.innerText = "O";
      turnO = false;
    } else {
      box.classList.add("boxXcolor");
      box.innerText = "X";
      turnO = true;
    }

    box.disabled = true;

    checkWinner();
  });
});


// Disable all boxes after the game ends

const disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};


// Clear the board for a new game

const enabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";

    box.classList.remove("boxOcolor");
    box.classList.remove("boxXcolor");

    msgcont.classList.add("hide");

    bgMusic.pause();
  }
};


// Show draw message

const showDraw = () => {
  msg.innerText = "Game Draw!";

  msgcont.classList.remove("hide");

  disabledBoxes();
};


// Show winner message and play winner sound

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;

  msgcont.classList.remove("hide");

  disabledBoxes();

  bgMusic.pause();

  if (musicEnabled) {
    winnerMusic.currentTime = 0;
    winnerMusic.play();
  }
};


// Check all winning combinations

const checkWinner = () => {

  for (let pattern of winPatterns) {

    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != "") {

      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos1val);
      }
    }
  }


  // Check if all boxes are filled

  let isDraw = true;

  for (let box of boxes) {

    if (box.innerText === "") {
      isDraw = false;
      break;
    }
  }

  if (isDraw) {
    showDraw();
  }
};


// Reset everything for a new game

const resetGame = () => {

  turnO = true;

  winnerMusic.pause();
  winnerMusic.currentTime = 0;

  bgMusic.pause();
  bgMusic.currentTime = 0;

  musicEnabled = false;
  musicBtn.innerText = "🔇";

  enabledBoxes();
};


// Reset button

resetbtn.addEventListener("click", resetGame);