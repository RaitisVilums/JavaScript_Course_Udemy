// 'use strict';

// // // ARROW FUCNTIONS DOESN'T WORK  const Person = () => {} -----------------------

// // const Person = function (firstName, birthYear) {
// //   // Instance properties -----------------------
// //   this.firstName = firstName;
// //   this.birthYear = birthYear;
// //   //   // Never create a function of this. !! -----------------------
// //   //   this.calcAge = function () {
// //   //     console.log(2037 - this.birthYear);
// //   //   };
// // };

// // const raitis = new Person('Raitis', 1999);
// // console.log(raitis);

// // // How does a function work ----------------------- commentary
// // // 1. New {} is creadted -----------------------
// // // 2. function is called, this = {} ( empty object ) ----------------------- commentary
// // // 3. {} ( empty object ) is linked to prototype ----------------------- commentary
// // // 4. function automaticlly return {} ( empty object ) ----------------------- commentary

// // const sigita = new Person('Sigita', 2001);
// // const ernests = new Person('Ernests', 2009);
// // console.log(sigita, ernests);

// // // If(raitis is from Person) === true! ----------------------- commentary
// // console.log(raitis instanceof Person);

// // // Prototype ----------------------- commentary
// // console.log(Person.prototype);

// // // prototype helps to use every instance properties  ----------------------- commentary
// // // written in Person "Class"  ----------------------- commentary
// // Person.prototype.calcaAge = function () {
// //   console.log(2022 - this.birthYear);
// // };

// // raitis.calcaAge();
// // sigita.calcaAge();
// // ernests.calcaAge();

// // console.log(raitis.__proto__);
// // console.log(raitis.__proto__ === Person.prototype);

// // console.log(Person.prototype.isPrototypeOf(raitis)); // true ----------------------- commentary
// // console.log(Person.prototype.isPrototypeOf(sigita)); // true ----------------------- commentary
// // console.log(Person.prototype.isPrototypeOf(Person)); // false ----------------------- commentary

// // //  .prototypeOfLinkedObjects ----------------------- commentary

// // Person.prototype.species = 'Homo Sapiens';
// // console.log(raitis.species, sigita.species);

// // console.log(raitis.hasOwnProperty('firstName')); // true ----------------------- commentary
// // console.log(raitis.hasOwnProperty('species')); // false ----------------------- commentary

// // console.log(raitis.__proto__);
// // console.log(raitis.__proto__.__proto__);
// // console.log(raitis.__proto__.__proto__.__proto__);

// // console.log(Person.prototype.constructor);

// // const arr = [1, 2, 3, 4, 5, 6, 7]; // new Array === []  ----------------------- commentary
// // console.log(arr.__proto__);
// // console.log(arr.__proto__ === Array.prototype);

// // console.log(arr.__proto__.__proto__);

// // Array.prototype.unique = function () {
// //   return [...new Set(this)];
// // };

// // console.log(arr.unique());

// // const h1 = document.querySelector('h1');

// // // CODING CHALLENGE #1 ----------------------- commentary

// // const Car = function (carName, carSpeed) {
// //   this.carName = carName;
// //   this.carSpeed = carSpeed;
// // };

// // const bmw = new Car('BMW', 100);
// // const mercedes = new Car('Mercedes', 80);

// // console.log(bmw, mercedes);

// // Car.prototype.accelerate = function () {
// //   this.carSpeed += 10;
// //   console.log(`${this.carName} speed is ${this.carSpeed}`);
// // };
// // Car.prototype.brake = function () {
// //   this.carSpeed -= 5;
// //   console.log(`${this.carName} speed is ${this.carSpeed}`);
// // };

// // bmw.accelerate();
// // bmw.brake();
// // mercedes.accelerate();
// // mercedes.brake();

// // // Class expression ----------------------- commentary

// // const PersonCl= class {}

// // // Class decleration ----------------------- commentary

// // class PersonCl {
// //   // constructor() MUST HAVE NAME !!!! ----------------------- commentary
// //   constructor(firstName, birthYear) {
// //     this.firstName = firstName;
// //     this.birthYear = birthYear;
// //   }
// //   // Methods will be added to .prototype property ----------------------- commentary
// //   calcAge() {
// //     console.log(2022 - this.birthYear);
// //   }

// //   greet() {
// //     console.log(`Hello ${this.firstName}`);
// //   }

// //   get age() {
// //     return 2022 - this.birthYear;
// //   }
// // }

// // //  don't forget the NEW keyword to call a function ----------------------- commentary
// // const raitis = new PersonCl('Raitis', 1999);

// // console.log(raitis);
// // raitis.calcAge();
// // console.log(raitis.age);

// // console.log(raitis.__proto__ === PersonCl.prototype);

// // raitis.greet();

// // // 1. Classes are not hoisted ----------------------- commentary
// // // 2. Classes are first-class citizens ----------------------- commentary
// // // We can pass them in functions ----------------------- commentary
// // // 3. Classes are executed in strict mode ----------------------- commentary

// // const account = {
// //   owner: 'Raitis',
// //   movements: [200, 530, 120, 300],

// //   get latest() {
// //     return this.movements.slice(-1).pop();
// //   },

// //   set latest(mov) {
// //     this.movements.push(mov);
// //   },
// // };

// // console.log(account.latest);

// // account.latest = 50;
// // console.log(account.movements);

// // const PersonProto = {
// //   calcAge() {
// //     console.log(2022 - this.birthYear);
// //   },
// //   init(firstName, birthYear) {
// //     this.firstName = firstName;
// //     this.birthYear = birthYear;
// //   },
// // };

// // const raitis = Object.create(PersonProto);

// // console.log(raitis);
// // raitis.name = 'Raitis';
// // raitis.birthYear = 1999;
// // raitis.calcAge();

// // console.log(raitis.__proto__ === PersonProto);

// // const sigita = Object.create(PersonProto);
// // sigita.init('Sigita', 2001);
// // sigita.calcAge();

// // // CODING CHALLENGE #2 ----------------------- commentary

// // class Car {
// //   constructor(carName, carSpeed) {
// //     this.carName = carName;
// //     this.carSpeed = carSpeed;
// //   }
// //   accelarete() {
// //     this.carSpeed += 10;
// //     console.log(`This is the ${this.carName} speed in km/h = ${this.carSpeed}`);
// //   }
// //   brake() {
// //     this.carSpeed -= 5;
// //     console.log(
// //       `This is the ${this.carName} speed in km/h = ${this.carSpeed} brake`
// //     );
// //   }

// //   get speedUs() {
// //     return this.carSpeed / 1.6;
// //   }
// //   set speedUs(carSpeed) {
// //     this.carSpeed = carSpeed;
// //   }
// // }

// // const bmw = new Car('bmw', 100);
// // bmw.accelarete();
// // bmw.brake();
// // console.log(bmw.speedUs);
// // bmw.speedUs = 50;
// // console.log(bmw.speedUs);

// // // Inheritance between Classes ----------------------- commentary

// // const Person = function (firstName, birthYear) {
// //   this.firstName = firstName;
// //   this.birthYear = birthYear;
// // };

// // Person.prototype.caclAge = function () {
// //   console.log(2022 - this.birthYear);
// // };

// // const Student = function (firstName, birthYear, course) {
// //   Person.call(this, firstName, birthYear);
// //   this.course = course;
// // };
// // // if u write it after the introduce(), it will overwrite it ----------------------- commentary
// // Student.prototype = Object.create(Person.prototype);

// // Student.prototype.itroduce = function () {
// //   console.log(
// //     `My name is ${this.firstName} I was born in ${this.birthYear} and I study ${this.course}`
// //   );
// // };

// // const raitis = new Student('Raitis', 1999, 'Computer Science');
// // console.log(raitis);

// // raitis.itroduce();
// // raitis.caclAge();

// // console.log(raitis.__proto__);

// // CODING CHALLENGE #3 ----------------------- commentary

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };

// // Link the prototypes ----------------------- commentary
// EV.prototype = Object.create(Car.prototype);

// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
// };

// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge--;
//   console.log(
//     `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}`
//   );
// };

// const tesla = new EV('Tesla', 120, 23);
// tesla.chargeBattery(90);
// console.log(tesla);
// tesla.brake();
// tesla.accelerate();

// const PersonProto = {
//   caclAge() {
//     console.log(2022 - this.birtYear);
//   },
//   init(firstName, birtYear) {
//     this.firstName = firstName;
//     this.birtYear = birtYear;
//   },
// };

// const steven = Object.create(PersonProto);

// const StudentProto = Object.create(PersonProto);
// StudentProto.init = function (firstName, birthYear, course) {
//   PersonProto.init.call(this, firstName, birthYear);
//   this.course = course;
// };

// StudentProto.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// };

// const raitis = Object.create(StudentProto);
// raitis.init('Raitis', 1999, 'Computer Science');

// raitis.introduce();
// raitis.caclAge();

// // Public fields ----------------------- commentary
// // Private fields ----------------------- commentary
// // Public methods ----------------------- commentary
// // Private methods ----------------------- commentary
//  // ( also there are Static varsion ) ----------------------- commentary

// class Account {
//   // 1) Public fields ( instances ) ----------------------- commentary
//   locale = navigator.language;

//   // 2) Private fields ( instances ) ----------------------- commentary
//   // Private fields start with # ( hashtag )
//   #movements = [];
//   #pinCode;

//   constructor(ownerName, deffinedCurrency, pinCode) {
//     this.ownerName = ownerName;
//     this.deffinedCurrency = deffinedCurrency;
//     // Protected property _movements ----------------------- commentary
//     this.#pinCode = pinCode;
//     // this._movements = []; // it's the same as Public fiels ( instances ) ----------------------- commentary
//     // this.locale = navigator.language;

//     console.log(`Thanks for opening an account ${ownerName}!!`);
//   }
//   // 3) Public methods ----------------------- commentary
//   // Public interface objects ----------------------- commentary

//   getMovements() {
//     return this.#movements;
//   }

//   deposit(val) {
//     this.#movements.push(val);
//     return this;
//   }
//   withdraw(val) {
//     this.deposit(-val);
//     return this;
//   }
//   _aproveLoan(val) {
//     return true;
//   }
//   requestLoan(val) {
//     if (this._aproveLoan(val)) {
//       this.deposit(val);
//       console.log(`Loan approved`);
//       return this;
//     }
//   }
//   // 5) Static method ----------------------- commentary
//   static helper() {
//     console.log(`Helper`);
//   }

//   // 4) Private methods ----------------------- commentary
//   // P.S. Private methods do not exist right now 2022 May ! ----------------------- commentary
//   // #aproveLoan(val) { ----------------------- commentary
//   //   return true; ----------------------- commentary
//   // } ----------------------- commentary
// }

// const acc1 = new Account('Raitis', 'EUR', 1111);
// console.log(acc1);

// // acc1.movements.push(250);
// // acc1.movements.push(-150);
// acc1.deposit(250);
// acc1.withdraw(140);
// acc1.requestLoan(1000);
// acc1._aproveLoan(1000);
// console.log(acc1.getMovements());

// console.log(acc1);

// // Chaining ----------------------- commentary

// acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
// console.log(acc1.getMovements());

// CODING CHALLENGE #4 ----------------------- commentary
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const rivian = new EVCl("Rivian", 120, 23);
console.log(rivian);
// console.log(rivian.#charge);
rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();

console.log(rivian.speedUS);
