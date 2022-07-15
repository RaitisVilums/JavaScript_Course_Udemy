"use strict";
// const bookings = [];
// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   //  ES5
//   //  numPassengers = numPassengers || 1;
//   //  price = price || 199;

//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };
// createBooking('LH123');
// createBooking('LH123', 2, 800);
// createBooking('LH123', 2);
// createBooking('LH123', 5);

// createBooking('LH123', undefined, 1000);

// const flight = 'LH234';
// const raitis = {
//   name: 'Raitis Vilums',
//   passport: 26406100,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999';
//   passenger.name = 'Mr. ' + passenger.name;

//   if (passenger.passport === 26406100) {
//     alert('Check in');
//   } else {
//     alert('Wrong passport!');
//   }
// };

// checkIn(flight, raitis);
// console.log(flight);
// console.log(raitis);

// // Is the same as doing...
// const flightNum = flight;
// const passenger = raitis;

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 100000);
// };
// newPassport(raitis);
// checkIn(flight, raitis);

// const oneWord = str => str.replace(/ /g, '').toLowerCase();

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };
// // high order funciton
// const trasnformer = function (str, fn) {
//   console.log(`Original string : ${str}`);
//   console.log(`Transformed string: ${fn(str)}`);

//   console.log(`Transformed string: ${fn.name}`);
// };

// trasnformer('JavaScript is the best', upperFirstWord);
// trasnformer('JavaScript is the best', oneWord);

// // JS uses callbacks all the time
// const high5 = () => console.log('HI');

// document.body.addEventListener('click', high5);
// ['Jonas', 'Martha', 'Adam'].forEach(high5);

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} Mr.${name} !`);
//   };
// };

// const greeterHey = greet(`Hello`);
// greeterHey(`Raitis`);
// greeterHey(`Janis`);

// greet(`Cau`)('Raitis');

// // Challenge

// const greetArr = greeting => name => console.log(`${greeting} Mr.${name} !`);

// greetArr(`Sveiki`)(`Raitis`);

// const lufthansa = {
//   ariline: `Lufthansa`,
//   iataCode: `LH`,
//   booking: [],
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.ariline} flight: ${this.iataCode}${flightNum}`
//     );
//     this.booking.push({ flight: `${this.ariline} ${flightNum}`, name });
//   },
// };

// lufthansa.book(239, `Raitis Vilums`);
// lufthansa.book(529, `Janis Vilums`);

// const eurowings = {
//   ariline: `Eurowings`,
//   iataCode: `EW`,
//   booking: [],
// };

// const book = lufthansa.book;
// // does not work
// // book(23, `Sigita Visnevska`);
// // Call method
// book.call(eurowings, 23, `Sigita Visnevska`);
// console.log(eurowings);

// book.call(lufthansa, 255, `Mary Poppins`);
// console.log(lufthansa);

// const swiss = {
//   ariline: `Swiss Air Lines`,
//   iataCode: `LX`,
//   booking: [],
// };
// book.call(swiss, 654, `Many Kuper`);

// // Apply method

// const flightData = [583, `George Cooper`];
// // book.apply(swiss, flightData); apply vieta izmanto call(x, ...y)
// console.log(swiss);

// book.call(swiss, ...flightData);

// // Bind method

// const bookeEW = book.bind(eurowings);
// const bookLX = book.bind(swiss);
// const bookLH = book.bind(lufthansa);
// bookeEW(23, `Steven Williams`);
// bookLX(590, `Raitis Arbidans`);

// const bookEW23 = book.bind(eurowings, 23);
// bookEW23(`Juris KARAVANS`);

// // With Event Listeners

// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);
//   this.planes++;
//   console.log(this.planes);
// };

// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// // Partial application

// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23);

// console.log(addVAT(100));
// console.log(addVAT(124));

// const addVat = function (rate) {
//   return function (value) {
//     console.log(value + value * rate);
//   };
// };
// const vat = addVat(0.23);
// vat(100);

// // Challange - 1
// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section 😃
//   answers: new Array(4).fill(0),
//   registerNewAnswer() {
//     // Get answer
//     const answer = Number(
//       prompt(
//         `${this.question}\n${this.options.join('\n')}\n(Write option number)`
//       )
//     );
//     console.log(answer);

//     // Register answer
//     typeof answer === 'number' &&
//       answer < this.answers.length &&
//       this.answers[answer]++;

//     this.displayResults();
//     this.displayResults('string');
//   },

//   displayResults(type = 'array') {
//     if (type === 'array') {
//       console.log(this.answers);
//     } else if (type === 'string') {
//       // Poll results are 13, 2, 4, 1
//       console.log(`Poll results are ${this.answers.join(', ')}`);
//     }
//   },
// };

// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

// const arr = [5, 2, 3];
// const arr2 = [1, 5, 3, 9, 6, 1];
// poll.displayResults.call({ answers: arr }, 'string');
// poll.displayResults.call({ answers: arr2 }, 'string');

// const runOnce = function () {
//   console.log(`This will never run again`);
// };
// runOnce();

// // IIFE
// (function () {
//   console.log(`This will never run`);
// })();

// (() => console.log(`This will never run`))();

// CLOSURES

// const secureBooking = function () {
//   let passengerCount = 0;

//   return function () {
//     passengerCount++;
//     console.log(`${passengerCount} passengers`);
//   };
// };

// const booker = secureBooking();
// booker();
// booker();
// booker();

// console.dir(booker);

// // Example 1
// let f;

// const g = function () {
//   const a = 23;
//   f = function () {
//     console.log(a * 2);
//   };
// };

// const h = function () {
//   const b = 777;
//   f = function () {
//     console.log(b * 2);
//   };
// };

// g();
// f();
// console.dir(f);

// // Re-assinging f function
// h();
// f();
// console.dir(f);

// // Example 2
// const boardPassengers = function (n, waitTime) {
//   const perGroup = n / 3;

//   setTimeout(function () {
//     console.log(`We are now boarding all ${n} passengers`);
//     console.log(`There are 3 groups, each with ${perGroup} passengers`);
//   }, waitTime * 1000);

//   console.log(`Will start boarding in ${waitTime} seconds`);
// };

// const perGroup = 1000;
// boardPassengers(180, 3);

// Coding challange - 2
(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";

  document.querySelector("body").addEventListener("click", function () {
    header.style.color = "blue";
  });
})();
