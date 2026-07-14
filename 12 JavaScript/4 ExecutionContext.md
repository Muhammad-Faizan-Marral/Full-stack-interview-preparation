# Execution Context

Execution Context is one of the most important concepts in JavaScript. It explains **how JavaScript executes code**, manages variables, handles functions, and keeps track of program execution.

Understanding Execution Context makes concepts like **hoisting, closures, scope chain, and the call stack** much easier to understand.

---

# Table of Contents

1. What is Execution Context?
2. What Happens When JavaScript Code Runs?
3. Global Execution Context (GEC)
4. Function Execution Context (FEC)
5. Call Stack
6. Memory Creation Phase
7. Execution Phase
8. Lexical Environment
9. Scope Chain

---

# 1. What is Execution Context?

An **Execution Context** is the environment in which JavaScript code is executed.

It contains everything JavaScript needs to execute code, including:

- Variables
- Functions
- The value of `this`
- Scope information
- Lexical environment

Think of it as a **box** that stores all the information needed while executing a piece of code.

Every time JavaScript starts executing code, it creates an execution context.

There are two main types:

- Global Execution Context (GEC)
- Function Execution Context (FEC)

---

# 2. What Happens When JavaScript Code Runs?

Whenever JavaScript executes a file, it follows these steps:

```
JavaScript File

       │
       ▼

Global Execution Context Created

       │
       ▼

Memory Creation Phase

       │
       ▼

Execution Phase

       │
       ▼

Function Call?

       │
      Yes
       │
       ▼

New Function Execution Context

       │
       ▼

Function Executes

       │
       ▼

Function Context Removed

       │
       ▼

Program Ends
```

---

## Example

```javascript
var x = 10;

function greet() {
    console.log("Hello");
}

greet();
```

Execution Flow:

1. Global Execution Context is created.
2. Memory is allocated.
3. Variables and functions are initialized.
4. Code executes line by line.
5. `greet()` is called.
6. A new Function Execution Context is created.
7. Function finishes.
8. Function context is removed.
9. Global context remains until the program ends.

---

# 3. Global Execution Context (GEC)

The **Global Execution Context** is the first execution context created when JavaScript starts.

Only **one Global Execution Context** exists for each JavaScript program.

It contains:

- Global variables
- Global functions
- Global object (`window` in browsers, `global` in Node.js)
- The global `this` value

Example:

```javascript
var message = "Hello";

function greet() {
    console.log(message);
}

greet();
```

The variable `message` and function `greet` are stored inside the Global Execution Context.

---

## Lifecycle of the Global Execution Context

```
Program Starts

↓

Global Execution Context Created

↓

Memory Creation Phase

↓

Execution Phase

↓

Program Ends

↓

Global Context Destroyed
```

---

# 4. Function Execution Context (FEC)

Every time a function is invoked, JavaScript creates a **new Function Execution Context**.

Each function call gets its own independent context.

Example:

```javascript
function add(a, b) {
    return a + b;
}

add(5, 3);
```

When `add()` is called:

- A new execution context is created.
- Parameters are stored.
- Local variables are created.
- Function executes.
- Context is destroyed after completion.

---

## Multiple Function Calls

```javascript
function one() {
    two();
}

function two() {
    three();
}

function three() {
    console.log("Done");
}

one();
```

Execution contexts are created in this order:

```
Global

↓

one()

↓

two()

↓

three()
```

After execution:

```
three() removed

↓

two() removed

↓

one() removed

↓

Global remains
```

---

# 5. Call Stack

The **Call Stack** is a data structure that keeps track of execution contexts.

It follows the **Last In, First Out (LIFO)** principle.

Example:

```javascript
function one() {
    two();
}

function two() {
    three();
}

function three() {
    console.log("Hello");
}

one();
```

### Stack During Execution

```
┌─────────────┐
│   three()   │
├─────────────┤
│    two()    │
├─────────────┤
│    one()    │
├─────────────┤
│   Global    │
└─────────────┘
```

After `three()` finishes:

```
┌─────────────┐
│    two()    │
├─────────────┤
│    one()    │
├─────────────┤
│   Global    │
└─────────────┘
```

Eventually only the Global Execution Context remains.

---

# 6. Memory Creation Phase

Before executing code, JavaScript performs a **Memory Creation Phase** (also called the Creation Phase).

During this phase:

- Memory is allocated for variables.
- Function declarations are stored completely.
- `var` variables are initialized with `undefined`.
- `let` and `const` are hoisted but remain in the Temporal Dead Zone (TDZ).

Example:

```javascript
var x = 10;

let y = 20;

function greet() {
    console.log("Hello");
}
```

Memory before execution:

| Identifier | Value |
|------------|-------|
| x | `undefined` |
| y | TDZ |
| greet | Function Definition |

---

# 7. Execution Phase

After memory allocation, JavaScript starts executing the code line by line.

Example:

```javascript
var x = 10;

function greet() {
    console.log("Hello");
}

greet();
```

Execution:

1. `x` becomes `10`.
2. Function `greet` already exists.
3. `greet()` is called.
4. New Function Execution Context is created.
5. `"Hello"` is printed.

Output

```
Hello
```

---

## Memory Phase vs Execution Phase

| Memory Creation Phase | Execution Phase |
|------------------------|-----------------|
| Allocates memory | Executes code |
| Functions stored | Functions called |
| `var` = `undefined` | Variables receive values |
| `let` & `const` in TDZ | TDZ ends after declaration |

---

# 8. Lexical Environment

A **Lexical Environment** is the structure that stores:

- Variables
- Functions
- References to outer scopes

It is determined by **where the code is written**, not where it is called.

Example:

```javascript
let name = "John";

function greet() {
    console.log(name);
}

greet();
```

`greet()` can access `name` because it was defined in the global lexical environment.

---

## Nested Lexical Environment

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

`inner()` remembers the lexical environment of `outer()`.

---

# 9. Scope Chain

The **Scope Chain** is the mechanism JavaScript uses to resolve variable names.

When a variable is accessed, JavaScript searches in this order:

1. Local scope
2. Parent scope
3. Grandparent scope
4. Global scope

If not found, it throws a `ReferenceError`.

---

## Example

```javascript
let a = 10;

function outer() {
    let b = 20;

    function inner() {
        let c = 30;

        console.log(a);
        console.log(b);
        console.log(c);
    }

    inner();
}

outer();
```

Output

```
10
20
30
```

Search order for `a`:

```
inner()

↓

outer()

↓

Global
```

---

## Scope Chain Example

```javascript
const country = "Pakistan";

function one() {
    const city = "Karachi";

    function two() {
        const area = "Clifton";

        console.log(country);
        console.log(city);
        console.log(area);
    }

    two();
}

one();
```

Output

```
Pakistan
Karachi
Clifton
```

Variable lookup:

```
two()

↓

one()

↓

Global
```

---

# Execution Context Lifecycle

```
JavaScript Starts

↓

Global Execution Context Created

↓

Memory Creation Phase

↓

Execution Phase

↓

Function Called

↓

Function Execution Context Created

↓

Memory Creation Phase

↓

Execution Phase

↓

Function Returns

↓

Function Context Removed

↓

Program Ends
```

---

# Best Practices

- ✅ Understand that every function call creates a new execution context.
- ✅ Remember that the Call Stack follows the **LIFO (Last In, First Out)** principle.
- ✅ Use `let` and `const` to avoid issues caused by `var` hoisting.
- ✅ Keep functions small to make the execution flow easier to understand.
- ✅ Be aware of lexical scoping when working with closures.

---

# Summary

After reading this guide, you should understand:

- ✅ What an Execution Context is
- ✅ What happens when JavaScript code runs
- ✅ Global Execution Context (GEC)
- ✅ Function Execution Context (FEC)
- ✅ Call Stack
- ✅ Memory Creation Phase
- ✅ Execution Phase
- ✅ Lexical Environment
- ✅ Scope Chain

These concepts form the foundation of JavaScript's execution model and are essential for mastering advanced topics such as **closures, asynchronous programming, promises, event loop, and JavaScript engines**.