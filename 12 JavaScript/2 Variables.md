# Variables

Variables are containers used to store data in JavaScript. JavaScript provides three ways to declare variables:

- `var`
- `let`
- `const`

Understanding the differences between them is essential for writing modern and bug-free JavaScript code.

---

# Table of Contents

1. Variable Declaration
2. `var`
3. `let`
4. `const`
5. `var` vs `let` vs `const`
6. Temporal Dead Zone (TDZ)
7. Hoisting
8. Variable Shadowing
9. Illegal Shadowing
10. Global Scope
11. Block Scope
12. Function Scope

---

# 1. Variable Declaration

Variables are declared using one of the following keywords:

```javascript
var name = "John";

let age = 25;

const country = "Pakistan";
```

---

# 2. `var`

`var` was the original way to declare variables before ES6 (ECMAScript 2015).

## Characteristics

- Function scoped
- Can be redeclared
- Can be reassigned
- Hoisted and initialized with `undefined`
- Avoid using it in modern JavaScript

### Example

```javascript
var city = "Karachi";

city = "Lahore";

console.log(city);
```

Output

```
Lahore
```

Redeclaration is allowed:

```javascript
var x = 10;
var x = 20;

console.log(x);
```

Output

```
20
```

---

# 3. `let`

Introduced in ES6.

## Characteristics

- Block scoped
- Cannot be redeclared in the same scope
- Can be reassigned
- Hoisted but not initialized
- Subject to the Temporal Dead Zone (TDZ)

### Example

```javascript
let age = 20;

age = 21;

console.log(age);
```

Output

```
21
```

Redeclaration is not allowed:

```javascript
let age = 20;

// Error
let age = 25;
```

---

# 4. `const`

Introduced in ES6.

## Characteristics

- Block scoped
- Cannot be redeclared
- Cannot be reassigned
- Must be initialized during declaration
- Subject to the Temporal Dead Zone (TDZ)

### Example

```javascript
const PI = 3.14159;

console.log(PI);
```

Trying to reassign:

```javascript
const PI = 3.14;

PI = 3.14159;
```

Output

```
TypeError
```

---

## Objects with `const`

`const` prevents reassignment of the variable, **not mutation of the object**.

```javascript
const person = {
    name: "John"
};

person.name = "Mike";

console.log(person.name);
```

Output

```
Mike
```

This is allowed because the object itself is not being reassigned.

---

# 5. `var` vs `let` vs `const`

| Feature | var | let | const |
|----------|-----|-----|-------|
| Scope | Function | Block | Block |
| Redeclaration | ✅ Yes | ❌ No | ❌ No |
| Reassignment | ✅ Yes | ✅ Yes | ❌ No |
| Hoisted | ✅ Yes | ✅ Yes | ✅ Yes |
| Initialized During Hoisting | ✅ Yes (`undefined`) | ❌ No | ❌ No |
| Temporal Dead Zone | ❌ No | ✅ Yes | ✅ Yes |
| Must Initialize | ❌ No | ❌ No | ✅ Yes |

### Recommendation

- Use **`const`** by default.
- Use **`let`** when the value needs to change.
- Avoid **`var`** in modern JavaScript.

---

# 6. Temporal Dead Zone (TDZ)

The **Temporal Dead Zone (TDZ)** is the period between entering a scope and the point where a `let` or `const` variable is declared.

During this time, accessing the variable throws a `ReferenceError`.

Example:

```javascript
console.log(age);

let age = 20;
```

Output

```
ReferenceError
```

Correct:

```javascript
let age = 20;

console.log(age);
```

Output

```
20
```

---

# 7. Hoisting

Hoisting is JavaScript's behavior of moving variable and function declarations to the top of their scope **before execution**.

## `var` Hoisting

```javascript
console.log(a);

var a = 10;
```

Internally, JavaScript treats it like:

```javascript
var a;

console.log(a);

a = 10;
```

Output

```
undefined
```

---

## `let` Hoisting

```javascript
console.log(b);

let b = 20;
```

Output

```
ReferenceError
```

The variable is hoisted but remains in the Temporal Dead Zone until its declaration.

---

## `const` Hoisting

```javascript
console.log(c);

const c = 30;
```

Output

```
ReferenceError
```

---

# 8. Variable Shadowing

Variable shadowing occurs when an inner scope declares a variable with the same name as one in an outer scope.

The inner variable "shadows" (hides) the outer variable.

Example:

```javascript
let name = "John";

{
    let name = "Mike";

    console.log(name);
}

console.log(name);
```

Output

```
Mike
John
```

---

## Function Shadowing

```javascript
let message = "Hello";

function greet() {
    let message = "Hi";

    console.log(message);
}

greet();

console.log(message);
```

Output

```
Hi
Hello
```

---

# 9. Illegal Shadowing

Illegal shadowing happens when a variable declaration violates JavaScript's scoping rules.

Example:

```javascript
let a = 10;

{
    var a = 20;
}
```

Output

```
SyntaxError
```

Why?

- `let` is block scoped.
- `var` is function scoped.
- The `var` declaration attempts to redeclare the outer `let` within the same function scope.

---

## Legal Shadowing

```javascript
var a = 10;

{
    let a = 20;
}

console.log(a);
```

Output

```
10
```

This is valid because the block-scoped `let` does not conflict with the function-scoped `var`.

---

# 10. Global Scope

Variables declared outside any function or block are in the **global scope**.

They can be accessed from anywhere in the program.

Example:

```javascript
const appName = "My App";

function showName() {
    console.log(appName);
}

showName();

console.log(appName);
```

Output

```
My App
My App
```

> **Note:** In browsers, global variables declared with `var` become properties of the global `window` object, while `let` and `const` do not.

Example:

```javascript
var x = 10;
let y = 20;

console.log(window.x); // 10
console.log(window.y); // undefined
```

---

# 11. Block Scope

A block is any code enclosed within `{}`.

Variables declared with `let` and `const` exist only inside that block.

Example:

```javascript
{
    let score = 100;
    const level = 2;

    console.log(score);
    console.log(level);
}
```

Output

```
100
2
```

Trying to access them outside the block:

```javascript
console.log(score);
```

Output

```
ReferenceError
```

---

# 12. Function Scope

Variables declared with `var` are scoped to the function in which they are declared.

Example:

```javascript
function test() {
    var username = "John";

    console.log(username);
}

test();

console.log(username);
```

Output

```
John
ReferenceError
```

Even if `var` is declared inside a block, it is still accessible throughout the function.

```javascript
function demo() {
    if (true) {
        var number = 100;
    }

    console.log(number);
}

demo();
```

Output

```
100
```

---

# Best Practices

- ✅ Prefer `const` for values that won't be reassigned.
- ✅ Use `let` when reassignment is required.
- ✅ Avoid `var` in modern JavaScript.
- ✅ Declare variables before using them.
- ✅ Keep variables in the smallest scope possible.
- ✅ Use meaningful variable names.

---

# Summary

After reading this guide, you should understand:

- ✅ Variable declaration in JavaScript
- ✅ `var`, `let`, and `const`
- ✅ Differences between `var`, `let`, and `const`
- ✅ Temporal Dead Zone (TDZ)
- ✅ Hoisting
- ✅ Variable shadowing
- ✅ Illegal shadowing
- ✅ Global scope
- ✅ Block scope
- ✅ Function scope

These concepts form the foundation of JavaScript's variable and scope system and are essential for writing clean, predictable, and maintainable code.