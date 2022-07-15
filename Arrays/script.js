'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Raitis Vilums',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Sigita Visnevska',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Alona Viluma',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Ernests Vilums',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const printMov = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = ` 
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.username
  ) {
    console.log(`Transfer valid`);
    // Transfers the money to the account
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    // Update AI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  // parbaudam akkaunta balansu vai tas ir lielaks par 10% no kopeja
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10)) {
    // Pievienojam MOVMENTS
    currentAccount.movements.push(amount);

    // Updeitojam UI
    updateUI(currentAccount);
    inputLoanAmount.value = '';
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // console.log(index);
    // Izdzesam lietotaju no massiva
    accounts.splice(index, 1);

    // Paslepjam accounta page
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  // Veiksim visu IN n OUT sortu, mainas starp augosu un dilstosu.
  // RADIS TIKAI LIELAKAS VERTIBAS PIRMAS
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
  // sorted = false, kad izsaucam funkciju, tas paliks par true, pec fucntion to parliekam uz true un otradi :)
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// // Challange - 3

// const calcAverageHumanAge = ages =>
//   ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);

// // Challange - 2

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAges.filter(age => age >= 18);
//   console.log(humanAges);
//   console.log(adults);

//   // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;

//   const average = adults.reduce(
//     (acc, age, i, arr) => acc + age / arr.length,
//     0
//   );

//   // 2 3. (2+3)/2 = 2.5 === 2/2+3/2 = 2.5

//   return average;
// };
// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);

// //Challenge - 1

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0, 1);
//   dogsJuliaCorrected.splice(-2);
//   // dogsJulia.slice(1, 3);
//   const dogs = dogsJuliaCorrected.concat(dogsKate);
//   console.log(dogs);

//   dogs.forEach(function (dog, i) {
//     if (dog >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy 🐶`);
//     }
//   });
// };
// // checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];

// // SLICE
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// console.log(arr.slice());
// console.log([...arr]);

// //  SPLICE
// // console.log(arr.splice(2));
// arr.splice(-1);
// console.log(arr);
// arr.splice(1, 2);
// console.log(arr);

// // REVERSE
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// console.log(arr2);

// // CONCAT
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// // JOIN
// console.log(letters.join(' - '));

// const arr = [23, 11, 64];
// // console.log(arr[0]);
// console.log(arr.at(0));

// // getting last array element
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-2));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const [i, movement] of movements.entries()) {
//   if (movement > 0)
//     console.log(`Movement ${i + 1} : You deposited ${movement}`);
//   else console.log(`Movement ${i + 1} : You withdrew ${Math.abs(movement)}`);
// }

// // // SAME AS FOR(CONST MOVENMENT OF MOVEMENTS!!!!!!!!)
// console.log(`-------FOREACH-------`);
// movements.forEach(function (movement, index, array) {
//   if (movement > 0)
//     console.log(`Movement ${index + 1} : You deposited ${movement}`);
//   else
//     console.log(`Movement ${index + 1} : You withdrew ${Math.abs(movement)}`);
// });
// // 0: funtction(200)
// // 1: funtction(450)
// // 2: funtction(400)
// // ... till end

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// // SET
// const curreciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(curreciesUnique);
// curreciesUnique.forEach(function (value, _, map) {
//   console.log(`${value}: ${value}`);
// });

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUsd = 1.1;

// // const movementsUSD = movements.map(function (mov) {
// //   return mov * eurToUsd;
// // });

// const movementsUSD = movements.map(mov => mov * eurToUsd);

// console.log(movements);
// console.log(movementsUSD);

// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// console.log(movementsUSDfor);

// const movementsDescriptions = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1} : You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );
// console.log(movementsDescriptions);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const deposits = movements.filter(mov => mov > 0);

// console.log(deposits);

// const deposistsFor = [];
// for (const mov of movements) if (mov > 0) deposistsFor.push(mov);
// console.log(deposistsFor);

// const withdrawal = movements.filter(mov => mov < 0);
// console.log(withdrawal);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // accumulator -> SNOWBALL
// const balance = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balance);

// let balance2 = 0;
// for (const mov of movements) balance2 += mov;
// console.log(balance2);

// // Maximum value of the movements

// const maxValue = movements.reduce(
//   (acc, mov) => (acc > mov ? acc : mov),
//   movements[0]
// );
// console.log(maxValue);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUSD = 1.1;

// // Pipe Line
// const totalDepositsUSD = movements
//   .filter(mov => mov < 0)
//   .map((mov, i, arr) => {
//     // console.log(arr);
//     return mov * eurToUSD;
//   })
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositsUSD);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // Ar find metodi var atrast pirmo sakritibu massiva
// // Map metode palidz saglabat elementus jauna masiva

// const firstWithDrawal = movements.find(move => move < 0);
// console.log(firstWithDrawal);

// const account = accounts.find(acc => acc.owner === 'Raitis Vilums');
// console.log(account);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// console.log(movements);
// // includes izvada booleanu ar TRUE OR FALSE, vai massiva ir noraditais elements
// console.log(movements.includes(-130));

// // Condition

// // Tas pats, kas include
// console.log(movements.some(mov => mov === -130));
// const deposits = movements.some(mov => mov > 1500);
// console.log(deposits);

// // EVERY metode

// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

// // Atddalits callbacks

// const deposit2 = mov => mov > 0;
// console.log(movements.some(deposit2));

// // Paradijas 2019 gada, nestrada uz veciem brauzeriem, apvieno masiva elementus viena rindu masiiva
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());

// // FLAT parvieto elementus par 1 iekavam, tas nozime, ka [[]] strada kaa [], bet [[[]]] kaa [[]]
// const arrDeep = [[[1, 2, 3], 4, 5], 6, 7, 8];
// console.log(arrDeep.flat());

// // Pievienojam visus pieejamos masivus mape
// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// // Apvienojam iegutos masivus vienaa liela izmantojot flat
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// // Aprekinam visu balansu kopejo summu ar REDUCE
// const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(`Total balance of all BANK ACCS: ${overalBalance}`);

// // Saisinats veids, izmantoju NESTING
// const overalBalance2 = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(`Total balance of all BANK ACCS: ${overalBalance2}`);

// // FLATMAPS iet ieksa tikai 1 limeni zemak
// const overalBALANCE = accounts
//   .flatMap(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(overalBALANCE);

// // Masivu sorting izmantojot ieprogrammeto JSa funkciju
// // Sort ar Stringiem
// const owners = ['Raitis', 'Sigia', 'Ernests', 'Gunars'];
// console.log(owners.sort());
// // Sort ar skaiitliem
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);
// console.log(movements.sort());
// // SORT parveido visus elementus STRING var, tad sorto vinus pec alfabeta
// // Tapec tam nav nekadas logikas ar INT

// // Pareizais INT var sorts
// // retun < 0, a, b
// // return > 0, b, a
// // Piemera 1.if ir keep order un 2. ir switch order
// // Augosa seciba aizkomenteta
// movements.sort((a, b) => {
//   // if (a > b) return 1;
//   if (a < b) return 1;
//   // if (b > a) return -1;
//   if (b < a) return -1;
// });
// console.log(movements);

// // Isakas koda linijas sorta principam, INT
// // augosa
// movements.sort((a, b) => a - b);
// console.log(movements);
// // dilstosa
// movements.sort((a, b) => b - a);
// console.log(movements);

const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

const x = new Array(7);
console.log(x);

// FILL METODE piepildis masivu x ar 7tiniem 5
x.fill(5, 3, 5);
// Fill 5 skaitlis, 3 ir indeks no kura sakt fillot, pedejais 5 ir tos, kurus neaiztikt
// tatad, ja ir 5 , 3 , 5, tad bus 0 , 0 , 0 , 5 , 5 , 0 , 0
console.log(x);

// Ar Fill var aizvietot skaitlus, kuri ir massiva

arr.fill(23, 2, 5);
console.log(arr);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

// Izveido massivu no 1 - 10, jo index i ir 0 + 1 katru LOOP
// (_ , i) _ nozime nonozimigu mainigo, tas nav vajadzigs
const z = Array.from({ length: 10 }, (_, i) => i + 1);
console.log(z);

// RANDOM ARRAYS, katru reizi dazadi  skaitli
const random = Array.from(
  { length: 10 },
  (_, i) => (i = Math.floor(Math.random() * 10))
);
console.log(random);
