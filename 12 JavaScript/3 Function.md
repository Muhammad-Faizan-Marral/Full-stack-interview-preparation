# Functions

Functions are reusable blocks of code that perform specific tasks. They are one of the most important concepts in JavaScript and are considered **first-class citizens**, meaning they can be stored in variables, passed as arguments, and returned from other functions.

---

# Table of Contents

1. What is a Function?
2. Function Declaration
3. Function Expression
4. Arrow Function
5. Anonymous Function
6. Named Function Expression
7. IIFE (Immediately Invoked Function Expression)
8. Higher-Order Function
9. Callback Function
10. Pure Function
11. First-Class Functions
12. Constructor Function
13. Generator Function
14. Async Function
15. Recursive Function
16. Currying
17. Partial Application
18. Memoization
19. Function Composition
20. Closures

---

# 1. What is a Function?

A function is a reusable block of code that performs a specific task. Functions help organize code, reduce repetition, and improve readability.

### Syntax

```javascript
function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet("John"));
```

Output

```
Hello, John!
```

---

# 2. Function Declaration

A function declaration defines a named function using the `function` keyword.

### Characteristics

- Hoisted completely
- Can be called before declaration
- Has its own scope

### Example

```javascript
greet();

function greet() {
    console.log("Hello");
}
```

Output

```
Hello
```

---

# 3. Function Expression

A function expression assigns a function to a variable.

### Characteristics

- Not fully hoisted
- Can be anonymous or named
- Executed only after assignment

### Example

```javascript
const greet = function () {
    console.log("Hello");
};

greet();
```

Output

```
Hello
```

Calling it before assignment:

```javascript
greet();

const greet = function () {};
```

Output

```
ReferenceError
```

---

# 4. Arrow Function

Arrow functions were introduced in ES6 to provide a shorter syntax for writing functions.

### Syntax

```javascript
const add = (a, b) => a + b;

console.log(add(5, 3));
```

Output

```
8
```

### Multi-line Arrow Function

```javascript
const multiply = (a, b) => {
    return a * b;
};
```

### Key Characteristics

- Shorter syntax
- Do not have their own `this`
- Cannot be used as constructor functions
- Do not have an `arguments` object

---

# 5. Anonymous Function

An anonymous function is a function without a name.

### Example

```javascript
setTimeout(function () {
    console.log("Executed!");
}, 1000);
```

Anonymous functions are commonly used as callbacks.

---

# 6. Named Function Expression

A named function expression is a function expression with its own name.

### Example

```javascript
const greet = function sayHello() {
    console.log("Hello");
};

greet();
```

Output

```
Hello
```

The function name is only accessible inside the function itself.

---

# 7. IIFE (Immediately Invoked Function Expression)

An IIFE is a function that runs immediately after it is defined.

### Syntax

```javascript
(function () {
    console.log("Executed immediately");
})();
```

Output

```
Executed immediately
```

### Arrow Function IIFE

```javascript
(() => {
    console.log("Arrow IIFE");
})();
```

### Common Uses

- Avoid polluting the global scope
- Create private variables
- Initialization code

---

# 8. Higher-Order Function

A higher-order function is a function that:

- Accepts another function as an argument, or
- Returns another function.

### Example

```javascript
function greet(name) {
    return `Hello ${name}`;
}

function processUser(callback) {
    console.log(callback("John"));
}

processUser(greet);
```

Output

```
Hello John
```

Examples of higher-order functions include:

- `map()`
- `filter()`
- `reduce()`
- `forEach()`

---

# 9. Callback Function

A callback function is a function passed to another function to be executed later.

### Example

```javascript
function greet(name, callback) {
    console.log(`Hello ${name}`);
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

# 10. Pure Function

A pure function:

- Always returns the same output for the same input.
- Has no side effects.

### Example

```javascript
function add(a, b) {
    return a + b;
}
```

This is pure because it depends only on its inputs.

### Impure Function

```javascript
let count = 0;

function increment() {
    count++;
}
```

This modifies external state, making it impure.

---

# 11. First-Class Functions

In JavaScript, functions are first-class citizens.

This means functions can:

- Be assigned to variables
- Be passed as arguments
- Be returned from functions
- Be stored in arrays or objects

### Example

```javascript
const greet = function () {
    return "Hello";
};

console.log(greet());
```

---

# 12. Constructor Function

Before ES6 classes, constructor functions were used to create objects.

### Example

```javascript
function Person(name) {
    this.name = name;
}

const user = new Person("John");

console.log(user.name);
```

Output

```
John
```

Without `new`, `this` will not refer to a new object.

---

# 13. Generator Function

A generator function can pause and resume execution using the `yield` keyword.

### Syntax

```javascript
function* numbers() {
    yield 1;
    yield 2;
    yield 3;
}

const gen = numbers();

console.log(gen.next());
console.log(gen.next());
```

Output

```
{ value: 1, done: false }

{ value: 2, done: false }
```

Generators are useful for:

- Lazy evaluation
- Iterators
- Processing large datasets

---

# 14. Async Function

An async function always returns a Promise and allows the use of `await`.

### Example

```javascript
async function fetchData() {
    return "Data";
}

fetchData().then(console.log);
```

Output

```
Data
```

Using `await`:

```javascript
async function demo() {
    const result = await Promise.resolve("Hello");
    console.log(result);
}

demo();
```

---

# 15. Recursive Function

A recursive function calls itself until a base condition is met.

### Example

```javascript
function factorial(n) {
    if (n === 1) {
        return 1;
    }

    return n * factorial(n - 1);
}

console.log(factorial(5));
```

Output

```
120
```

Always include a base case to prevent infinite recursion.

---

# 16. Currying

Currying transforms a function with multiple parameters into a sequence of functions, each taking one argument.

### Example

```javascript
function multiply(a) {
    return function (b) {
        return a * b;
    };
}

const double = multiply(2);

console.log(double(5));
```

Output

```
10
```

Arrow function version:

```javascript
const multiply = a => b => a * b;
```

---

# 17. Partial Application

Partial application creates a new function by fixing some arguments of an existing function.

### Example

```javascript
function multiply(a, b) {
    return a * b;
}

const double = multiply.bind(null, 2);

console.log(double(5));
```

Output

```
10
```

### Currying vs Partial Application

| Currying | Partial Application |
|----------|---------------------|
| One argument per function | Fixes one or more arguments |
| Returns nested functions | Returns a partially configured function |
| Function structure changes | Original function structure remains |

---

# 18. Memoization

Memoization is an optimization technique that stores the results of expensive function calls.

### Example

```javascript
function memoizedSquare() {
    const cache = {};

    return function (num) {
        if (cache[num]) {
            return cache[num];
        }

        cache[num] = num * num;

        return cache[num];
    };
}

const square = memoizedSquare();

console.log(square(5));
console.log(square(5));
```

The second call returns the cached result instead of recalculating.

### Benefits

- Improves performance
- Avoids repeated calculations
- Useful for recursive algorithms

---

# 19. Function Composition

Function composition combines multiple functions into a single function.

### Example

```javascript
const double = x => x * 2;
const square = x => x * x;

const composed = x => square(double(x));

console.log(composed(3));
```

Output

```
36
```

Flow:

```
3
↓

double()

↓

6
↓

square()

↓

36
```

---

# 20. Closures

A closure is created when an inner function remembers variables from its outer function, even after the outer function has finished executing.

### Example

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

The inner function still has access to `count` because of the closure.

### Common Uses

- Data privacy
- Private variables
- Event handlers
- Factory functions
- Memoization
- Module pattern

---

# Best Practices

- ✅ Use function declarations for reusable functions.
- ✅ Prefer arrow functions for short callbacks.
- ✅ Use async/await for asynchronous code.
- ✅ Keep functions small and focused on a single responsibility.
- ✅ Prefer pure functions whenever possible.
- ✅ Use closures carefully to avoid unnecessary memory usage.
- ✅ Use descriptive function names.

---

# Summary

After reading this guide, you should understand:

- ✅ Function Declaration
- ✅ Function Expression
- ✅ Arrow Function
- ✅ Anonymous Function
- ✅ Named Function Expression
- ✅ IIFE
- ✅ Higher-Order Function
- ✅ Callback Function
- ✅ Pure Function
- ✅ First-Class Functions
- ✅ Constructor Function
- ✅ Generator Function
- ✅ Async Function
- ✅ Recursive Function
- ✅ Currying
- ✅ Partial Application
- ✅ Memoization
- ✅ Function Composition
- ✅ Closures

These concepts form the foundation of functional programming in JavaScript and are essential for understanding advanced topics such as promises, asynchronous programming, React, Node.js, and modern JavaScript design patterns.