/* Cheat Sheet (Interview Revision)

| Situation                         | `this`                                             |
| --------------------------------- | -------------------------------------------------- |
| `obj.fn()`                        | `obj`                                              |
| `fn()` (strict)                   | `undefined`                                        |
| `fn()` (non-strict browser)       | `window`                                           |
| Arrow function                    | Parent lexical `this`                              |
| `call(obj)`                       | `obj`                                              |
| `apply(obj)`                      | `obj`                                              |
| `bind(obj)`                       | Returns new function with permanently bound `this` |
| `new User()`                      | Newly created object                               |
| Event listener (regular function) | DOM element                                        |
| Nested regular function           | `undefined` (strict) / `window` (non-strict)       |

*/


// Remove comments one by one and solve question cheetsheet are given on top

// Q1 What will be the output?
// const user = {
//   name: "Ali",

//   greet() {
//     console.log(this.name);
//   }
// };

// user.greet(); 


// Q2 Predict the output.
// const user = {
//   name: "Ali",
//   greet: function () {
//     return function () {
//       console.log(this.name);
//     };
//   },
// };

// user.greet()();

// Q4 Outpur ?

// const obj = {
//   name: "John",

//   show() {
//     console.log(this.name);
//   }
// };

// const fn = obj.show;

// fn();


// Q5 Output ?

// const person = {
//   firstName: "John",
// };

// function greet(city) {
//   console.log(this.firstName, city);
// }

// greet.call(person, "London");

// Q6 Predict the output.

// const person = {
//   name: "Ahmed",
// };

// function intro(age, city) {
//   console.log(this.name, age, city);
// }

// intro.apply(person, [22, "Lahore"]);

// Q7 : Output ?


// const person = {
//   name: "Ahmed",
// };

// function greet() {
//   console.log(this.name);
// }

// const newFn = greet.bind(person);

// newFn();


// Q8 Output?

// const obj = {
//   value: 10,

//   show() {
//     console.log(this.value);
//   },
// };

// setTimeout(obj.show, 100);

// Q9 Output?

// const obj = {
//   value: 10,

//   show() {
//     setTimeout(() => {
//       console.log(this.value);
//     }, 100);
//   },    
// };

// obj.show();

// Q10 Output?

// const obj = {
//   value: 10,

//   show() {
//     setTimeout(function () {
//       console.log(this.value);
//     }, 100);
//   },
// };

// obj.show();

// Q11 Output?
// const person1 = {
//   name: "Ali",
// };

// const person2 = {
//   name: "Ahmed",
// };

// function greet() {
//   console.log(this.name);
// }

// const fn = greet.bind(person1);
// console.log(fn)
// fn.call(person2);

// Q12 Output ?

// const person = {
//   name: "Ali",
// };

// function greet() {
//   console.log(this.name);
// }

// const bound = greet.bind(person);

// bound.bind({
//   name: "Ahmed",
// })();

// Q13 Output ?

// "use strict";

// const obj = {
//   name: "Ali",

//   show() {
//     function inner() {
//       console.log(this);
//     }

//     inner();
//   },
// };

// obj.show();

// Q15 output ?

// const obj = {
//   name: "Ali",
// temp : function () { let name = "df"},

//   show: () => {
//     console.log(this.name);
//   },
// };

// obj.show();


// Q16 Without modifying the function body, make this print "Ali".
// const obj = {
//   name: "Ali",
// };

// function greet() {
//   console.log(this.name);
// }

// greet(); 

// Q17 Without changing show(), make this print 10.

// const obj = {
//   value: 10,

//   show() {
//     console.log(this.value);
//   },
// };

// setTimeout(obj.show, 100);
// setTimeout(obj.show.bind(obj), 100);  ==> Answer

// 18 — Debugging Interview Question
//Why does this print undefined?
// const user = {
//   name: "Ali",

//   print() {
//     return function () {
//       console.log(this.name);
//     };
//   },
// };

// const fn = user.print();

// fn();


// "use strict";

// const user = {
//   name: "Ali",

//   show() {
//     console.log(this.name);

//     function inner() {
//       console.log(this);
//     }

//     const arrow = () => {
//       console.log(this.name);
//     };

//     inner();

//     arrow();
//   },
// };

// const fn = user.show;

// fn.call({
//   name: "Ahmed",
// });
