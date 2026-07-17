# JavaScript Callbacks ⭐⭐⭐⭐⭐

> **Callbacks are the foundation of asynchronous JavaScript.**
>
> Before Promises and Async/Await, callbacks were the primary way to handle asynchronous operations. Understanding callbacks is essential for interviews because many modern APIs are built on callback concepts.

---

# Table of Contents

1. What is a Callback?
2. Why Do We Need Callbacks?
3. Synchronous vs Asynchronous Callbacks
4. Callback Examples
5. Callback Hell
6. Pyramid of Doom
7. Inversion of Control
8. Callback vs Promise
9. Callback vs Async/Await
10. Common Callback APIs
11. Coding Examples
12. Common Interview Questions
13. Summary

---

# 1. What is a Callback?

A **callback** is a function passed as an argument to another function that is executed later.

In simple words:

> **A callback is a function that another function calls after completing its work.**

Example

```javascript
function greet(name, callback) {
  console.log("Hello", name);

  callback();
}

function sayBye() {
  console.log("Goodbye!");
}

greet("John", sayBye);
```

Output

```
Hello John
Goodbye!
```

---

# 2. Why Do We Need Callbacks?

Callbacks allow JavaScript to perform tasks **after another task finishes**, especially asynchronous operations.

Without Callback

```javascript
function fetchData() {
  return "Data";
}

const data = fetchData();

console.log(data);
```

Works because it is synchronous.

---

With Asynchronous Code

```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback("Data Loaded");
  }, 2000);
}

fetchData((data) => {
  console.log(data);
});
```

Output (after 2 seconds)

```
Data Loaded
```

The callback runs only after the asynchronous task completes.

---

# 3. Synchronous vs Asynchronous Callbacks

## Synchronous Callback

Executed immediately.

```javascript
const numbers = [1, 2, 3];

numbers.forEach((num) => {
  console.log(num);
});
```

Output

```
1
2
3
```

`forEach()` invokes the callback synchronously.

---

## Asynchronous Callback

Executed later.

```javascript
setTimeout(() => {
  console.log("Hello");
}, 1000);
```

Output (after 1 second)

```
Hello
```

---

# 4. Callback Examples

## Array Callback

```javascript
const nums = [1, 2, 3];

const doubled = nums.map((num) => num * 2);

console.log(doubled);
```

Output

```
[2, 4, 6]
```

---

## Timer Callback

```javascript
setTimeout(() => {
  console.log("Executed");
}, 1000);
```

---

## Event Callback

```javascript
button.addEventListener("click", () => {
  console.log("Clicked");
});
```

The callback executes whenever the button is clicked.

---

# 5. Callback Hell

Callback Hell occurs when multiple asynchronous callbacks are nested inside one another.

Example

```javascript
login(function (user) {

  getProfile(user, function (profile) {

    getOrders(profile, function (orders) {

      getPayment(orders, function (payment) {

        console.log(payment);

      });

    });

  });

});
```

Visualization

```
login()

└── getProfile()

    └── getOrders()

        └── getPayment()

            └── console.log()
```

Problems

- Difficult to read
- Difficult to debug
- Difficult to maintain
- Difficult error handling

---

# 6. Pyramid of Doom

Another name for Callback Hell because of its deeply nested shape.

```
doTask1(function () {

    doTask2(function () {

        doTask3(function () {

            doTask4(function () {

                doTask5(function () {

                });

            });

        });

    });

});
```

The indentation grows like a pyramid.

```
        Task1
          |
       Task2
          |
    Task3
          |
 Task4
          |
Task5
```

This is why it is called the **Pyramid of Doom**.

---

# 7. Inversion of Control

One of the biggest problems with callbacks.

When using callbacks, you give control of your function to another function or library.

Example

```javascript
function buyProduct(callback) {

  // Some internal logic...

  callback();

}
```

Usage

```javascript
buyProduct(() => {
  console.log("Payment Successful");
});
```

Here, you **trust** `buyProduct()` to call your callback:

- Exactly once
- At the correct time
- With the correct arguments

What if it:

- Never calls it?
- Calls it twice?
- Calls it with wrong data?
- Calls it after an error?

You lose control over your own code.

This problem is known as **Inversion of Control**.

Promises solve this by letting **you** decide how to handle success or failure using `.then()` and `.catch()`.

---

# 8. Callback vs Promise

| Callback | Promise |
|----------|---------|
| Function passed as argument | Object representing future result |
| Can lead to Callback Hell | Supports chaining |
| Manual error handling | Built-in `.catch()` |
| Inversion of Control | More predictable control flow |
| Harder to read | Easier to read |

Example

Callback

```javascript
fetchData(function (data) {
  console.log(data);
});
```

Promise

```javascript
fetchData()
  .then((data) => {
    console.log(data);
  });
```

---

# 9. Callback vs Async/Await

Callback

```javascript
login(function (user) {
  getProfile(user, function (profile) {
    console.log(profile);
  });
});
```

Async/Await

```javascript
async function run() {
  const user = await login();

  const profile = await getProfile(user);

  console.log(profile);
}
```

Async/Await is easier to read and maintain.

---

# 10. Common Callback APIs

JavaScript uses callbacks in many built-in APIs.

### Timers

```javascript
setTimeout(callback, 1000);

setInterval(callback, 1000);
```

---

### Array Methods

```javascript
map()

filter()

reduce()

forEach()

find()

some()

every()
```

All accept callback functions.

---

### DOM Events

```javascript
button.addEventListener("click", callback);
```

---

### Node.js

```javascript
fs.readFile("file.txt", callback);
```

---

# 11. Coding Examples

## Example 1

```javascript
function calculate(a, b, callback) {
  callback(a, b);
}

calculate(10, 20, (x, y) => {
  console.log(x + y);
});
```

Output

```
30
```

---

## Example 2

```javascript
setTimeout(() => {
  console.log("Hello");
}, 1000);

console.log("World");
```

Output

```
World
Hello
```

---

## Example 3 (Callback Hell)

```javascript
step1(function () {

  step2(function () {

    step3(function () {

      console.log("Done");

    });

  });

});
```

---

## Example 4 (Promise Alternative)

Instead of:

```javascript
login(function () {

  getUser(function () {

    getOrders(function () {

      console.log("Done");

    });

  });

});
```

Use:

```javascript
login()
  .then(getUser)
  .then(getOrders)
  .then(() => {
    console.log("Done");
  });
```

---

## Example 5 (Async/Await Alternative)

```javascript
async function run() {
  const user = await login();

  const orders = await getOrders(user);

  console.log(orders);
}
```

Much cleaner than nested callbacks.

---

# 12. Common Interview Questions

## Q1. What is a callback?

A callback is a function passed to another function and executed later after a task is completed.

---

## Q2. What is Callback Hell?

Callback Hell is a situation where multiple asynchronous callbacks are nested inside each other, making the code difficult to read and maintain.

---

## Q3. Why is it called the Pyramid of Doom?

Because nested callbacks create a pyramid-shaped indentation structure.

---

## Q4. What is Inversion of Control?

In callbacks, you hand over control of your callback function to another piece of code and must trust it to invoke the callback correctly. This loss of control is called Inversion of Control.

---

## Q5. How do Promises solve Callback Hell?

Promises provide:

- Chaining with `.then()`
- Centralized error handling with `.catch()`
- Better readability
- More predictable control flow
- Reduced nesting

---

## Q6. Does Callback Hell happen because callbacks are bad?

No.

Callbacks themselves are useful and widely used.

The problem is **deeply nested asynchronous callbacks**, not callbacks in general.

---

# Callback Evolution

```
Callbacks

↓

Callback Hell

↓

Promises

↓

Async/Await
```

---

# Summary

After completing this topic, you should understand:

- ✅ What a callback is
- ✅ Why callbacks are used
- ✅ Synchronous and asynchronous callbacks
- ✅ Callback Hell
- ✅ Pyramid of Doom
- ✅ Inversion of Control
- ✅ Callback vs Promise
- ✅ Callback vs Async/Await
- ✅ Common callback APIs
- ✅ Coding examples
- ✅ Common interview questions

---

## Interview Tip ⭐⭐⭐⭐⭐

A very common interview question is:

> **What is Inversion of Control, and how do Promises solve it?**

A strong answer is:

- **Inversion of Control** occurs when you pass a callback to another function or library and rely on it to execute your callback correctly. You lose direct control over when, how often, or even if the callback is called.
- **Promises** solve this by returning a Promise object that represents the asynchronous result. Instead of giving away control, you attach handlers using `.then()`, `.catch()`, or `await`, making the asynchronous flow more predictable, readable, and easier to maintain.