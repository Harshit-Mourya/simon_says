let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "blue"];

let started = false;
let level = 0;

let h3 = document.querySelector("h3");

// let startBtn = document.querySelector(".startbtn");
h3.addEventListener("click", function () {
  if (started == false) {
    console.log("Game Started!");
    started = true;

    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h3.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 3);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  //   console.log(randBtn);
  //   console.log(randColor);
  //   console.log(randIdx);

  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

function checkAns(idx) {
  //   let idx = level - 1;

  if (userSeq[idx] == gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 800);
    }
  } else {
    h3.innerHTML = `Game Over! Your score was <b>${
      level - 1
    }.</b><br>Click here to restart...`;

    document.querySelector("body").style.color = "red";

    setTimeout(function () {
      document.querySelector("body").style.color = "white";
    }, 2000);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

let prevLevel = 0;
function reset() {
  if (level >= prevLevel) {
    prevLevel = level;
  }
  let highScore = document.querySelector("#highscore");
  highScore.innerText = `Your High Score is : ${prevLevel - 1}`;

  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
