"use strict";

let secretNum = Math.trunc(Math.random() * 20) + 1;
let playerScore = 100;
let highScore = 0;

document.querySelector(".check").addEventListener("click", function () {
  document.querySelector(".guess").value;
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess);

  // Player inputs a wrong number.

  if (playerScore > 0) {
    if (guess === secretNum) {
      // Player wins.
      document.querySelector(
        ".message"
      ).textContent = `Correct number ! Number was : ${secretNum}`;
      playerScore = playerScore + 100;
      if (playerScore > highScore) {
        highScore = playerScore;
        document.querySelector(".highscore").textContent = highScore;
      }

      document.querySelector(".message").style.lineHeight = "2";
      document.querySelector(".score").textContent = playerScore;
      document.querySelector("body").style.backgroundColor = "#60b347";
      document.querySelector(".number").style.width = "30rem";
      document.querySelector(".number").style.fontSize = "5rem";
      document.querySelector(".number").textContent = "Win";
    } else if (guess > secretNum) {
      // Too high.
      document.querySelector(".message").textContent =
        "Too high! You lost 10 points ! Try again...";
      playerScore = playerScore - 10;
      document.querySelector(".score").textContent = playerScore;
    } else if (guess < secretNum) {
      // Too low.
      document.querySelector(".message").textContent =
        "Too low! You lost 10 points ! Try again...";
      playerScore = playerScore - 10;
      document.querySelector(".score").textContent = playerScore;
    } else if (!guess) {
      document.querySelector(".message").textContent =
        "You forgot the number :(";
    } else if (guess === 0 || guess < 0 || guess > 20) {
      document.querySelector(".message").textContent =
        "Number must be from 1 to 20!";
    }

    // Player loses.
  } else if (playerScore === 0) {
    document.querySelector(
      ".message"
    ).textContent = `You lost the game! Number was : ${secretNum}`;
    document.querySelector(".message").style.lineHeight = "2";
    document.querySelector(".score").textContent = 0;
    document.querySelector("body").style.backgroundColor = "#d10000";
    document.querySelector(".number").style.width = "30rem";
    document.querySelector(".number").style.fontSize = "5rem";
    document.querySelector(".number").textContent = "Lose";
  }
});

document.querySelector(".again").addEventListener("click", function () {
  secretNum = Math.trunc(Math.random() * 20) + 1;

  playerScore = 100;

  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".guess").value = "";
  document.querySelector(".score").textContent = playerScore;
});
