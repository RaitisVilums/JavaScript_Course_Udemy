"use strict";

// Elements that are used many times in the code - selection of elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const currentScore0El = document.getElementById("current--0");
const currentScore1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Player switching function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
// Reseting fucntion New Game

const newGame = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  document.querySelector(`.player--0`).classList.add("player--active");
  document.querySelector(`.player--1`).classList.remove("player--active");
  document.querySelector(`.player--0`).classList.remove("player--winner");
  document.querySelector(`.player--1`).classList.remove("player--winner");
};
// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
// Rolling functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a new roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the Dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 3. Check if rolled dice === 1; if true, switch to the next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Active players score hold
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // 2. Checking the score if it's >=100;
    if (score[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    }
    // 3.Switch player
    switchPlayer();
  }
});
btnNew.addEventListener("click", function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  newGame();
});

// KONSPEKTS !

// 'use strict';
// /*  ---------------------------------------------------
// function calcAge(birthYear) {
//   const age = 2022 - birthYear;
//   function printAge() {
//     const output = `You are ${age}, born in ${birthYear}`;
//     console.log(output);
//     const firstName = 'Sigita';
//     if (birthYear >= 1981 && birthYear <= 1996) {
//       const str = `Oh, you are a millenial , ${firstName}`;
//       console.log(str);
//     } else {
//       var millenial = false;
//       const str = `Oh, you are not a millenial, ${firstName}`;
//       console.log(str);

//       function add(a, b) {
//         return a + b;
//       }
//       console.log(add(2, 3));
//     }
//     console.log(millenial);
//   }
//   printAge();
//   return age;
// }

// const firstName = 'Raitis';
// calcAge(2001);
// */

// /*  ---------------------------------------------------  */

// console.log(me);
// console.log(job);
// console.log(year);

// var me = 'Raitis';
// let job = 'student';
// const year = 1999;

// function addDecl(a, b) {
//   return a + b;
// }

// const addExpr = function (a, b) {
//   return a + b;
// };
// const addArrow = (a, b) => a + b;
// /*  ---------------------------------------------------  */
// /*  ---------------------------------------------------  */
// /*  ---------------------------------------------------  */
// /*  ---------------------------------------------------  */
// /*  ---------------------------------------------------  */
// /*  ---------------------------------------------------  */
// /*  ---------------------------------------------------  */
// /*  ---------------------------------------------------  */
// /*  ---------------------------------------------------  */
