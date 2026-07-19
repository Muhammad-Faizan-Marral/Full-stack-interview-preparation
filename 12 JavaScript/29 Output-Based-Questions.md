# 📘 JavaScript Output-Based Questions

> Output-based questions are among the most common in JavaScript interviews. They test your understanding of how JavaScript actually works, not just your ability to memorize concepts.

---

# Table of Contents

1. Hoisting
2. Closures
3. Scope
4. Event Loop
5. Promises
6. Async/Await
7. this Keyword
8. Prototype
9. Classes
10. Arrow Functions
11. setTimeout
12. Microtasks
13. Objects
14. Arrays
15. Tips to Solve Output Questions
16. Interview Questions

---

# 1. Hoisting

### Question 1

```javascript
console.log(a);

var a = 10;
```

Output

```text
undefined
```

Explanation

- `var` declarations are hoisted.
- Initialization remains in place.

---

### Question 2

```javascript
console.log(a);

let a = 10;
```

Output

```text
ReferenceError
```

Reason

`let` is hoisted but remains in the Temporal Dead Zone (TDZ).

---

### Question 3

```javascript
foo();

function foo() {
    console.log("Hello");
}
```

Output

```text
Hello
```

---

### Question 4

```javascript
foo();

var foo = function () {
    console.log("Hello");
};
```

Output

```text
TypeError
```

---

# 2. Closures

### Question 1

```javascript
function outer() {
    let count = 0;

    return function () {
        count++;
        console.log(count);
    };
}

const fn = outer();

fn();
fn();
fn();
```

Output

```text
1
2
3
```

---

### Question 2

```javascript
for (var i = 1; i <= 3; i++) {
    setTimeout(() => {
        console.log(i);
    }, 100);
}
```

Output

```text
4
4
4
```

---

### Question 3

```javascript
for (let i = 1; i <= 3; i++) {
    setTimeout(() => {
        console.log(i);
    }, 100);
}
```

Output

```text
1
2
3
```

---

# 3. Scope

### Question

```javascript
let x = 10;

function test() {
    let x = 20;
    console.log(x);
}

test();

console.log(x);
```

Output

```text
20
10
```

---

# 4. Event Loop

### Question

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise");
});

console.log("End");
```

Output

```text
Start
End
Promise
Timeout
```

---

# 5. Promises

### Question

```javascript
Promise.resolve(10)
    .then(value => {
        console.log(value);
        return value * 2;
    })
    .then(value => {
        console.log(value);
    });
```

Output

```text
10
20
```

---

### Question

```javascript
Promise.reject("Error")
    .catch(err => console.log(err))
    .then(() => console.log("Done"));
```

Output

```text
Error
Done
```

---

# 6. Async/Await

### Question

```javascript
async function demo() {
    console.log(1);

    await Promise.resolve();

    console.log(2);
}

demo();

console.log(3);
```

Output

```text
1
3
2
```

---

# 7. this Keyword

### Question

```javascript
const user = {
    name: "John",

    greet() {
        console.log(this.name);
    }
};

user.greet();
```

Output

```text
John
```

---

### Question

```javascript
const user = {
    name: "John",

    greet: () => {
        console.log(this.name);
    }
};

user.greet();
```

Output

```text
undefined
```

Reason

Arrow functions don't have their own `this`.

---

# 8. Prototype

### Question

```javascript
function Person(name) {
    this.name = name;
}

Person.prototype.sayHi = function () {
    console.log("Hi");
};

const p = new Person("John");

p.sayHi();
```

Output

```text
Hi
```

---

# 9. Classes

### Question

```javascript
class Animal {
    speak() {
        console.log("Animal");
    }
}

class Dog extends Animal {}

const d = new Dog();

d.speak();
```

Output

```text
Animal
```

---

# 10. Arrow Functions

### Question

```javascript
const add = (a, b) => a + b;

console.log(add(2, 3));
```

Output

```text
5
```

---

### Question

```javascript
const obj = {
    age: 20,

    show() {
        setTimeout(() => {
            console.log(this.age);
        }, 100);
    }
};

obj.show();
```

Output

```text
20
```

---

# 11. setTimeout

### Question

```javascript
console.log(1);

setTimeout(() => {
    console.log(2);
}, 0);

console.log(3);
```

Output

```text
1
3
2
```

---

# 12. Microtasks

### Question

```javascript
console.log(1);

queueMicrotask(() => {
    console.log(2);
});

console.log(3);
```

Output

```text
1
3
2
```

---

### Question

```javascript
console.log(1);

Promise.resolve().then(() => {
    console.log(2);
});

queueMicrotask(() => {
    console.log(3);
});

console.log(4);
```

Output

```text
1
4
2
3
```

---

# 13. Objects

### Question

```javascript
const obj = {
    a: 1
};

const copy = obj;

copy.a = 10;

console.log(obj.a);
```

Output

```text
10
```

---

### Question

```javascript
const obj1 = {
    a: 1
};

const obj2 = {
    ...obj1
};

obj2.a = 100;

console.log(obj1.a);
console.log(obj2.a);
```

Output

```text
1
100
```

---

# 14. Arrays

### Question

```javascript
const arr = [1, 2, 3];

const copy = arr;

copy.push(4);

console.log(arr);
```

Output

```text
[1,2,3,4]
```

---

### Question

```javascript
const arr = [1, 2, 3];

const copy = [...arr];

copy.push(4);

console.log(arr);
console.log(copy);
```

Output

```text
[1,2,3]
[1,2,3,4]
```

---

# Tips to Solve Output Questions

- Read the code carefully before predicting the output.
- Understand execution context and call stack.
- Remember the difference between synchronous and asynchronous code.
- Identify whether callbacks are placed in the Microtask Queue or Macrotask Queue.
- Watch for variable scope (`var`, `let`, `const`).
- Pay attention to how `this` is determined.
- Be familiar with hoisting and the Temporal Dead Zone.
- Practice regularly—these questions rely heavily on pattern recognition.

---

# Interview Questions

## Frequently Asked Output Topics

- Hoisting
- Closures
- Scope
- Event Loop
- Promises
- Async/Await
- `this`
- Prototype
- Classes
- Arrow Functions
- `setTimeout`
- Microtasks
- Objects
- Arrays

---

# FAANG Interview Tip

Most product-based companies ask **output-based JavaScript questions** before moving to coding or machine-coding rounds. Strong performance in these questions demonstrates a deep understanding of JavaScript internals and execution behavior.

---

# Summary

- Hoisting moves declarations before execution.
- Closures preserve access to outer variables.
- Scope determines variable accessibility.
- The Event Loop executes synchronous code first, then microtasks, then macrotasks.
- Promises and `queueMicrotask()` use the Microtask Queue.
- `async/await` is built on top of Promises.
- Arrow functions inherit `this` from their lexical scope.
- Objects and arrays are assigned by reference.
- Spread syntax creates shallow copies.
- Practicing output-based questions is one of the most effective ways to prepare for JavaScript interviews.