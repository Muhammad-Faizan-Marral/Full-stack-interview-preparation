# `this` Keyword in JavaScript

## Question

# What is the `this` keyword in JavaScript?

---

## What is `this`?

The **`this`** keyword is a special keyword in JavaScript that refers to **the object that is currently executing the function**.

The value of `this` **depends on how the function is called**, not where it is defined.

> **`this` is determined at runtime based on the function invocation.**

---

# 1. `this` in the Global Scope

In a browser, `this` in the global scope refers to the **`window`** object.

```javascript
console.log(this);
```

Output (Browser):

```javascript
Window
```

In **Node.js**, the value is different.

```javascript
console.log(this);
```

Output:

```javascript
{}
```

---

# 2. `this` Inside an Object Method

When a function is called as a method of an object, `this` refers to **that object**.

```javascript
const user = {
  name: "Faizan",

  greet() {
    console.log(this.name);
  },
};

user.greet();
```

Output:

```
Faizan
```

Here:

```
this === user
```

---

# 3. `this` Inside a Regular Function

In a regular function:

- **Browser (non-strict mode):** `this` refers to the global object (`window`).
- **Strict mode:** `this` is `undefined`.

```javascript
function show() {
  console.log(this);
}

show();
```

Browser (non-strict):

```
Window
```

Strict mode:

```javascript
"use strict";

function show() {
  console.log(this);
}

show();
```

Output:

```
undefined
```

---

# 4. `this` Inside an Arrow Function

Arrow functions **do not have their own `this`**.

They inherit `this` from their surrounding (lexical) scope.

```javascript
const user = {
  name: "Faizan",

  greet() {
    const print = () => {
      console.log(this.name);
    };

    print();
  },
};

user.greet();
```

Output:

```
Faizan
```

The arrow function inherits `this` from `greet()`.

---

# 5. `this` in Event Listeners

Inside an event listener using a **regular function**, `this` refers to the element that triggered the event.

```html
<button id="btn">Click Me</button>
```

```javascript
const button = document.getElementById("btn");

button.addEventListener("click", function () {
  console.log(this);
});
```

Output:

```html
<button>Click Me</button>
```

Using an arrow function:

```javascript
button.addEventListener("click", () => {
  console.log(this);
});
```

Here, `this` is inherited from the surrounding scope, **not** the button element.

---

# 6. `call()`, `apply()`, and `bind()`

JavaScript provides methods to explicitly set the value of `this`.

## `call()`

Calls a function immediately with a specified `this`.

```javascript
function greet() {
  console.log(this.name);
}

const user = {
  name: "Faizan",
};

greet.call(user);
```

Output:

```
Faizan
```

---

## `apply()`

Works like `call()`, but accepts arguments as an array.

```javascript
function greet(city) {
  console.log(this.name, city);
}

const user = {
  name: "Faizan",
};

greet.apply(user, ["Faisalabad"]);
```

Output:

```
Faizan Faisalabad
```

---

## `bind()`

Returns a **new function** with `this` permanently bound.

```javascript
function greet() {
  console.log(this.name);
}

const user = {
  name: "Faizan",
};

const sayHello = greet.bind(user);

sayHello();
```

Output:

```
Faizan
```

---

# Summary of `this`

| Situation | Value of `this` |
|-----------|-----------------|
| Global scope (Browser) | `window` |
| Global scope (Node.js module) | `{}` (`module.exports`) |
| Object method | The object that called the method |
| Regular function (non-strict mode) | Global object (`window` in browsers) |
| Regular function (strict mode) | `undefined` |
| Arrow function | Inherits `this` from the surrounding scope |
| Event listener (regular function) | The element that triggered the event |
| `call()`, `apply()`, `bind()` | Explicitly specified object |

---

# Common Mistakes

### Incorrect

```javascript
const user = {
  name: "Faizan",

  greet: () => {
    console.log(this.name);
  },
};

user.greet();
```

Output:

```
undefined
```

Arrow functions should generally **not** be used as object methods when you need access to the object through `this`.

### Correct

```javascript
const user = {
  name: "Faizan",

  greet() {
    console.log(this.name);
  },
};

user.greet();
```

Output:

```
Faizan
```

---

# Interview Tips

- `this` refers to the object executing the current function.
- The value of `this` is determined by **how the function is called**, not where it is written.
- Arrow functions do **not** have their own `this`; they inherit it from the surrounding scope.
- `call()`, `apply()`, and `bind()` allow you to explicitly control the value of `this`.
- Avoid using arrow functions as object methods when you need to access the object via `this`.

---

# Interview Summary

- **`this`** is a special JavaScript keyword that refers to the execution context of a function.
- Its value changes depending on how the function is invoked.
- Understanding `this` is essential for working with objects, classes, event handlers, and function methods like `call()`, `apply()`, and `bind()`.