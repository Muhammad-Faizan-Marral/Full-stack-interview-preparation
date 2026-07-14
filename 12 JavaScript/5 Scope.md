# Scope

Scope determines **where variables and functions can be accessed** in a JavaScript program.

Understanding scope is essential because it controls variable visibility, prevents naming conflicts, and forms the foundation of **closures**, **lexical environments**, and the **scope chain**.

---

# Table of Contents

1. What is Scope?
2. Lexical Scope
3. Block Scope
4. Function Scope
5. Global Scope
6. Scope Chain
7. Closures
8. Private Variables

---

# 1. What is Scope?

**Scope** is the region of a program where a variable or function is accessible.

If a variable is outside its scope, JavaScript throws a `ReferenceError`.

Example:

```javascript
let name = "John";

console.log(name);
```

Output

```
John
```

Example:

```javascript
{
    let age = 20;
}

console.log(age);
```

Output

```
ReferenceError
```

---

## Types of Scope

JavaScript has four main types of scope:

- Global Scope
- Function Scope
- Block Scope
- Lexical Scope

---

# 2. Lexical Scope

JavaScript uses **Lexical Scope**, which means the accessibility of variables is determined by **where functions are written**, not where they are called.

A function has access to:

- Its own variables
- Variables in its parent scope
- Variables in the global scope

Example:

```javascript
let language = "JavaScript";

function learn() {
    console.log(language);
}

learn();
```

Output

```
JavaScript
```

Although `language` is outside the function, it is accessible because `learn()` was defined in the global lexical environment.

---

## Nested Lexical Scope

```javascript
function outer() {
    let message = "Hello";

    function inner() {
        console.log(message);
    }

    inner();
}

outer();
```

Output

```
Hello
```

The `inner()` function remembers the variables from `outer()` because of lexical scoping.

---

# 3. Block Scope

A **block** is any code enclosed in curly braces `{}`.

Variables declared with `let` and `const` are block scoped.

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

Outside the block:

```javascript
console.log(score);
```

Output

```
ReferenceError
```

---

## `var` is NOT Block Scoped

```javascript
{
    var city = "Karachi";
}

console.log(city);
```

Output

```
Karachi
```

Because `var` ignores block scope.

---

# 4. Function Scope

Variables declared with `var` are scoped to the function in which they are declared.

Example:

```javascript
function greet() {
    var message = "Hello";

    console.log(message);
}

greet();

console.log(message);
```

Output

```
Hello
ReferenceError
```

The variable exists only inside the function.

---

## `var` Inside a Block

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

Although declared inside an `if` block, `number` is available throughout the function because `var` is function scoped.

---

# 5. Global Scope

Variables declared outside all functions and blocks belong to the **global scope**.

They can be accessed anywhere in the program.

Example:

```javascript
const country = "Pakistan";

function showCountry() {
    console.log(country);
}

showCountry();

console.log(country);
```

Output

```
Pakistan
Pakistan
```

---

## Global Variables

```javascript
let appName = "My App";

function openApp() {
    console.log(appName);
}

openApp();
```

Output

```
My App
```

---

## Global Object

In browsers:

- `var` becomes a property of `window`
- `let` and `const` do not

Example:

```javascript
var a = 10;
let b = 20;

console.log(window.a);
console.log(window.b);
```

Output

```
10
undefined
```

---

# 6. Scope Chain

When JavaScript cannot find a variable in the current scope, it searches parent scopes until it reaches the global scope.

This lookup process is called the **Scope Chain**.

Search order:

```
Current Scope

↓

Parent Scope

↓

Grandparent Scope

↓

Global Scope
```

---

## Example

```javascript
let a = 1;

function first() {
    let b = 2;

    function second() {
        let c = 3;

        console.log(a);
        console.log(b);
        console.log(c);
    }

    second();
}

first();
```

Output

```
1
2
3
```

Variable lookup:

```
second()

↓

first()

↓

Global
```

---

## Variable Not Found

```javascript
function test() {
    console.log(age);
}

test();
```

Output

```
ReferenceError
```

JavaScript searches every scope in the chain before throwing the error.

---

# 7. Closures

A **closure** is created when an inner function remembers variables from its outer function, even after the outer function has finished executing.

Closures are possible because of **lexical scope**.

Example:

```javascript
function counter() {
    let count = 0;

    return function () {
        count++;
        return count;
    };
}

const increment = counter();

console.log(increment());
console.log(increment());
console.log(increment());
```

Output

```
1
2
3
```

Even though `counter()` has finished, the inner function still remembers `count`.

---

## Another Example

```javascript
function greet(name) {
    return function () {
        console.log(`Hello ${name}`);
    };
}

const sayHello = greet("John");

sayHello();
```

Output

```
Hello John
```

The returned function retains access to `name`.

---

## Common Uses of Closures

- Data hiding
- Private variables
- Event handlers
- Factory functions
- Memoization
- Module pattern

---

# 8. Private Variables

JavaScript does not have true private variables in regular functions, but **closures** can be used to simulate privacy.

Example:

```javascript
function createBankAccount() {
    let balance = 1000;

    return {
        deposit(amount) {
            balance += amount;
        },

        withdraw(amount) {
            balance -= amount;
        },

        getBalance() {
            return balance;
        }
    };
}

const account = createBankAccount();

account.deposit(500);

console.log(account.getBalance());
```

Output

```
1500
```

Trying to access the variable directly:

```javascript
console.log(account.balance);
```

Output

```
undefined
```

The `balance` variable is private because only the returned methods can access it.

---

## Why Use Private Variables?

Benefits:

- Protect data from accidental modification
- Hide implementation details
- Improve encapsulation
- Prevent global variable pollution

---

# Scope Comparison

| Scope Type | Accessible From |
|------------|-----------------|
| Global Scope | Everywhere |
| Function Scope | Inside the function |
| Block Scope | Inside the block `{}` |
| Lexical Scope | Based on where code is defined |

---

# Scope Chain Example

```javascript
const company = "ABC";

function department() {
    const team = "Development";

    function employee() {
        const name = "Ali";

        console.log(company);
        console.log(team);
        console.log(name);
    }

    employee();
}

department();
```

Variable lookup:

```
employee()

↓

department()

↓

Global
```

Output

```
ABC
Development
Ali
```

---

# Best Practices

- ✅ Use `const` by default.
- ✅ Use `let` when reassignment is needed.
- ✅ Avoid `var` in modern JavaScript.
- ✅ Keep variables in the smallest possible scope.
- ✅ Use closures to encapsulate private data.
- ✅ Minimize the use of global variables to avoid naming conflicts.

---

# Summary

After reading this guide, you should understand:

- ✅ What Scope is
- ✅ Lexical Scope
- ✅ Block Scope
- ✅ Function Scope
- ✅ Global Scope
- ✅ Scope Chain
- ✅ Closures
- ✅ Private Variables

These concepts are fundamental to JavaScript's execution model and are essential for mastering advanced topics such as **closures, modules, asynchronous programming, event handling, and object-oriented JavaScript**.