const boxes = document.querySelectorAll(".boxes");
const resetbtn = document.querySelector(".resetbtn");
const newgamebtn = document.querySelector(".newgamebtn");
const msgcontainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const err = document.querySelector(".err");
const turnIndicator = document.querySelector(".turn-indicator");
const input1 = document.querySelector("#userInput");
const input2 = document.querySelector("#userInput1");
const changeBtn = document.querySelector("#changeSymbolsBtn");
const themeToggle = document.querySelector("#themeToggle");

let turn0 = true;
let count = 0;
let symbolsLocked = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const disableBoxes = () => boxes.forEach((b) => (b.disabled = true));
const enableBoxes = () => {
  boxes.forEach((b) => {
    b.disabled = false;
    b.innerText = "";
    b.classList.remove("winner");
  });
  count = 0;
};

const checkInputs = () => {
  if (
    input1.value === "" ||
    input2.value === "" ||
    input1.value === input2.value
  ) {
    err.classList.remove("hide");
    disableBoxes();
    turnIndicator.classList.add("hide");
  } else {
    err.classList.add("hide");
    enableBoxes();
    turnIndicator.classList.remove("hide");
    turnIndicator.innerText = "Player 1’s Turn";
  }
};

input1.addEventListener("input", checkInputs);
input2.addEventListener("input", checkInputs);

changeBtn.addEventListener("click", () => {
  if (symbolsLocked) {
    input1.disabled = false;
    input2.disabled = false;
    changeBtn.innerText = "Save Symbols";
    symbolsLocked = false;
    disableBoxes();
  } else {
    checkInputs();
    if (err.classList.contains("hide")) {
      input1.disabled = true;
      input2.disabled = true;
      changeBtn.innerText = "Change Symbols";
      symbolsLocked = true;
    }
  }
});

const showWinner = (winner, pattern) => {
  pattern.forEach((i) => boxes[i].classList.add("winner"));
  msg.innerText = `🎉 Winner: ${
    winner === input1.value ? "Player 1" : "Player 2"
  } 🎉`;
  msgcontainer.classList.remove("hide");
  disableBoxes();
};

const showDraw = () => {
  msg.innerText = "🤝 Match Draw!";
  msgcontainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let val1 = boxes[a].innerText;
    let val2 = boxes[b].innerText;
    let val3 = boxes[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      showWinner(val1, pattern);
      return true;
    }
  }
  if (count === 9) showDraw();
  return false;
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.innerText = turn0 ? input1.value : input2.value;
    box.disabled = true;
    count++;

    if (!checkWinner()) {
      turn0 = !turn0;
      turnIndicator.innerText = turn0 ? "Player 1’s Turn" : "Player 2’s Turn";
    }
  });
});

const resetGame = () => {
  turn0 = true;
  enableBoxes();
  msgcontainer.classList.add("hide");
  turnIndicator.innerText = "Player 1’s Turn";
};

resetbtn.addEventListener("click", resetGame);
newgamebtn.addEventListener("click", resetGame);

/* ---- Theme Toggle ---- */
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});
