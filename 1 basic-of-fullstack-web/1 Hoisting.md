# Hoisting

## Question

### What is Hoisting in JavaScript?

## Answer

Hoisting is a JavaScript behavior where variable and function declarations are moved to the top of their scope during the compilation phase, before the code is executed.

> **Note:** Only declarations are hoisted, **not initializations**.

---

# Explanation

Hoisting means that JavaScript processes declarations before executing the code. This allows variables and functions to be referenced before they appear in the source code.

There are three types of hoisting:

1. Variable Hoisting (`var`)
2. `let` & `const` Hoisting
3. Function Hoisting

---

# Example

```javascript
var declared;
var initialized = 2;
```

Here:

- `declared` is only declared.
- `initialized` is declared and initialized.

---

# 1. Variable Hoisting (`var`)

```javascript
console.log(a); // undefined

var a = 10;

console.log(a); // 10
```

Instead of throwing an error, JavaScript prints `undefined` because the variable declaration is hoisted.

### How JavaScript Interprets It

```javascript
var a; // Declaration is hoisted (default value: undefined)

console.log(a); // undefined

a = 10; // Initialization stays in its original place

console.log(a); // 10
```

---

# 2. `let` & `const` Hoisting

Many people think `let` and `const` are **not hoisted**, but that is incorrect.

They are also hoisted, but unlike `var`, they are **not initialized with `undefined`**.

Before the execution reaches their declaration, they remain inside the **Temporal Dead Zone (TDZ)**. Accessing them during this period results in a `ReferenceError`.

```javascript
console.log(b);
// ReferenceError: Cannot access 'b' before initialization

let b = 10;
```

---

# What is the Temporal Dead Zone (TDZ)?

The **Temporal Dead Zone (TDZ)** is the period between entering a scope and the point where a `let` or `const` variable is declared.

During this period, the variable exists in memory but cannot be accessed.

---

# 3. Function Hoisting

Function declarations are completely hoisted.

```javascript
sayHello();

function sayHello() {
  console.log("Hello Developer");
}
```

**Output**

```
Hello Developer
```

Since the entire function declaration is hoisted, it can be called before it appears in the code.

---

## Function Expression Hoisting

When a function is assigned to a variable, the hoisting behavior depends on the variable.

```javascript
sayHi();

// TypeError: sayHi is not a function

var sayHi = function () {
  console.log("Hello Developer");
};
```

### Why?

Internally, JavaScript treats it like this:

```javascript
var sayHi;

sayHi(); // TypeError

sayHi = function () {
  console.log("Hello Developer");
};
```

Only the variable declaration is hoisted, **not the function assignment**. Therefore, `sayHi` is `undefined` when it is called, resulting in a `TypeError`.

---

# Summary

| Type | Hoisted | Initial Value | Access Before Declaration |
|-------|----------|---------------|---------------------------|
| `var` | ✅ Yes | `undefined` | ✅ Returns `undefined` |
| `let` | ✅ Yes | Not initialized | ❌ ReferenceError (TDZ) |
| `const` | ✅ Yes | Not initialized | ❌ ReferenceError (TDZ) |
| Function Declaration | ✅ Yes | Complete function | ✅ Works normally |
| Function Expression (`var`) | Variable only | `undefined` | ❌ TypeError |