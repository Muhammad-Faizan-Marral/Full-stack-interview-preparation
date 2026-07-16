# JavaScript `this` Keyword

A complete guide to understanding the **`this` keyword** in JavaScript with examples, interview questions, and real-world scenarios.

---

# Table of Contents

1. What is `this`?
2. Global `this`
3. Function `this`
4. Method `this`
5. Arrow Function `this`
6. Constructor `this`
7. Event Listener `this`
8. `call()`
9. `apply()`
10. `bind()`
11. Every Scenario Where `this` Changes (Interview Favorite)
12. Summary

---

# 1. What is `this`?

`this` is a special keyword that refers to an object.

**The value of `this` is NOT fixed.** It depends on **how a function is called**, not where it is written.

Think of it like this:

> "`this` points to the object that is currently executing the function."

Example:

```javascript
const person = {
  name: "John",
  greet() {
    console.log(this.name);
  },
};

person.greet();
```

Output:

```
John
```

Here, `this` refers to the `person` object.

---

# 2. Global `this`

The value of `this` in the global scope depends on the environment.

## Browser

```javascript
console.log(this);
```

Output:

```
window
```

In browsers, the global object is `window`.

---

## Node.js

```javascript
console.log(this);
```

Output:

```
{}
```

At the top level of a CommonJS module, `this` refers to `module.exports`, not the global object.

---

## Global Object

Modern JavaScript provides:

```javascript
globalThis
```

Works everywhere:

- Browser
- Node.js
- Web Workers

Example:

```javascript
console.log(globalThis);
```

---

# 3. Function `this`

Inside a regular function, `this` depends on **how the function is invoked**.

## Non-Strict Mode

```javascript
function show() {
  console.log(this);
}

show();
```

Browser Output:

```
window
```

---

## Strict Mode

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

Strict mode prevents JavaScript from automatically binding `this` to the global object.

---

# 4. Method `this`

When a function is called as an object method, `this` refers to that object.

```javascript
const person = {
  name: "Alice",

  greet() {
    console.log(this.name);
  },
};

person.greet();
```

Output:

```
Alice
```

Here:

```
person.greet()
```

The object before the dot (`person`) becomes `this`.

---

## Nested Object Example

```javascript
const user = {
  name: "John",

  address: {
    city: "London",

    show() {
      console.log(this.city);
    },
  },
};

user.address.show();
```

Output:

```
London
```

`this` refers to `address`, not `user`.

---

# 5. Arrow Function `this`

Arrow functions **do not have their own `this`**.

Instead, they inherit `this` from the surrounding (lexical) scope.

## Example

```javascript
const person = {
  name: "John",

  greet: () => {
    console.log(this.name);
  },
};

person.greet();
```

Output (Browser):

```
undefined
```

Because the arrow function uses the outer/global `this`, not `person`.

---

## Correct Example

```javascript
const person = {
  name: "John",

  greet() {
    const arrow = () => {
      console.log(this.name);
    };

    arrow();
  },
};

person.greet();
```

Output:

```
John
```

The arrow function inherits `this` from `greet()`.

---

# 6. Constructor `this`

When using the `new` keyword, `this` refers to the newly created object.

```javascript
function Person(name) {
  this.name = name;
}

const user = new Person("John");

console.log(user.name);
```

Output:

```
John
```

Without `new`, `this` behaves differently (and in strict mode it will be `undefined`).

---

# 7. Event Listener `this`

Inside a regular event handler, `this` refers to the element that triggered the event.

```javascript
button.addEventListener("click", function () {
  console.log(this);
});
```

Output:

```
<button>
```

---

## Arrow Function

```javascript
button.addEventListener("click", () => {
  console.log(this);
});
```

`this` is inherited from the surrounding scope, **not** the button element.

If you need the clicked element inside an arrow function, use:

```javascript
button.addEventListener("click", (event) => {
  console.log(event.currentTarget);
});
```

---

# 8. call()

`call()` invokes a function immediately with a specified `this` value.

Syntax:

```javascript
function.call(thisArg, arg1, arg2);
```

Example:

```javascript
const person = {
  name: "John",
};

function greet(city) {
  console.log(this.name, city);
}

greet.call(person, "London");
```

Output:

```
John London
```

---

# 9. apply()

`apply()` works like `call()`, but arguments are passed as an array.

Syntax:

```javascript
function.apply(thisArg, [args]);
```

Example:

```javascript
const person = {
  name: "John",
};

function greet(city, country) {
  console.log(this.name, city, country);
}

greet.apply(person, ["London", "UK"]);
```

Output:

```
John London UK
```

---

# 10. bind()

`bind()` does **not** call the function immediately.

It returns a new function with `this` permanently bound.

```javascript
const person = {
  name: "John",
};

function greet() {
  console.log(this.name);
}

const fn = greet.bind(person);

fn();
```

Output:

```
John
```

---

## Difference

| Method | Executes Immediately | Returns New Function |
|----------|---------------------|----------------------|
| call() | ✅ Yes | ❌ No |
| apply() | ✅ Yes | ❌ No |
| bind() | ❌ No | ✅ Yes |

---

# 11. Every Scenario Where `this` Changes (Interview Favorite)

Understanding **how a function is called** is the key to knowing what `this` will be.

| Scenario | Value of `this` |
|----------|-----------------|
| Global scope (Browser) | `window` |
| Global scope (Node.js module) | `module.exports` (`{}`) |
| Regular function (non-strict, browser) | `window` |
| Regular function (strict mode) | `undefined` |
| Object method | The object before the `.` |
| Nested object method | The nested object that owns the method |
| Arrow function | Inherits `this` from the surrounding lexical scope |
| Constructor (`new`) | Newly created object |
| Event listener (regular function) | The element that fired the event |
| Event listener (arrow function) | Inherits outer `this` |
| `call()` | Explicitly set to the first argument |
| `apply()` | Explicitly set to the first argument |
| `bind()` | Permanently bound to the first argument |

---

# Common Interview Traps

## Trap 1: Function Reference

```javascript
const person = {
  name: "John",
  greet() {
    console.log(this.name);
  },
};

const fn = person.greet;

fn();
```

Output (strict mode):

```
undefined
```

Because the function is no longer called as `person.greet()`.

---

## Trap 2: Method Inside `setTimeout`

```javascript
const person = {
  name: "John",

  greet() {
    setTimeout(function () {
      console.log(this.name);
    }, 1000);
  },
};

person.greet();
```

Output (browser):

```
undefined
```

The callback is a regular function, so `this` is not `person`.

### Fix with Arrow Function

```javascript
const person = {
  name: "John",

  greet() {
    setTimeout(() => {
      console.log(this.name);
    }, 1000);
  },
};

person.greet();
```

Output:

```
John
```

---

## Trap 3: Losing `this` When Passing a Method

```javascript
const person = {
  name: "John",

  greet() {
    console.log(this.name);
  },
};

setTimeout(person.greet, 1000);
```

Output:

```
undefined
```

Fix:

```javascript
setTimeout(person.greet.bind(person), 1000);
```

Output:

```
John
```

---

# 12. Summary

After completing this topic, you should understand:

- ✅ What the `this` keyword is
- ✅ Global `this`
- ✅ Function `this`
- ✅ Method `this`
- ✅ Arrow function `this`
- ✅ Constructor `this`
- ✅ Event listener `this`
- ✅ `call()`, `apply()`, and `bind()`
- ✅ Every situation where `this` changes
- ✅ Common interview pitfalls involving `this`

---

## Interview Tip

A common interview question is:

> **How do you determine the value of `this` in JavaScript?**

A strong answer is:

> **"`this` is determined by how a function is called, not where it is defined. Regular functions get `this` based on the calling object or invocation pattern, arrow functions inherit `this` from their surrounding lexical scope, constructors bind `this` to the new instance, and `call()`, `apply()`, and `bind()` allow explicit control over `this`."**