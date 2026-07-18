#  JavaScript Memory Management

> Complete Guide to JavaScript Memory Management for Interviews & Real-World Development

---

# Table of Contents

1. What is Memory Management?
2. Stack Memory
3. Heap Memory
4. Stack vs Heap
5. Garbage Collection
6. Memory Leaks
7. Common Causes of Memory Leaks
8. How to Prevent Memory Leaks
9. Interview Questions
10. Best Practices
11. Summary

---

# What is Memory Management?

Memory Management is the process of:

- Allocating memory when variables or objects are created.
- Using memory while the program is running.
- Releasing memory when it is no longer needed.

In JavaScript, memory management is **automatic**. The JavaScript engine (V8, SpiderMonkey, JavaScriptCore, etc.) allocates and frees memory for you.

Example

```javascript
let name = "Faizan";
let age = 22;
```

The engine automatically allocates memory for these variables.

---

# Types of Memory

JavaScript mainly uses two memory areas:

1. Stack Memory
2. Heap Memory

```
Memory
│
├── Stack
└── Heap
```

---

# Stack Memory

Stack Memory stores:

- Primitive values
- Function calls
- Local variables
- Execution Contexts

Primitive Types

- Number
- String
- Boolean
- null
- undefined
- BigInt
- Symbol

Example

```javascript
let x = 10;
let y = x;

y = 20;

console.log(x);
console.log(y);
```

Output

```
10
20
```

Explanation

```
Stack

x → 10
y → 20
```

Each variable has its own copy.

### Characteristics

- Fast
- Fixed size
- Automatically managed
- Stored in Last In, First Out (LIFO) order

---

# Heap Memory

Heap Memory stores:

- Objects
- Arrays
- Functions
- Maps
- Sets
- Dates

Example

```javascript
const user = {
    name: "Ali"
};
```

The object is stored in the Heap, while the variable stores a reference to it.

```
Stack              Heap

user ─────────► { name: "Ali" }
```

Example

```javascript
const obj1 = {
    name: "John"
};

const obj2 = obj1;

obj2.name = "Peter";

console.log(obj1.name);
```

Output

```
Peter
```

Both variables point to the same object in Heap Memory.

---

# Stack vs Heap

| Feature | Stack | Heap |
|---------|-------|------|
| Stores | Primitive values | Objects & Arrays |
| Speed | Faster | Slower |
| Size | Limited | Larger |
| Access | Direct | Reference |
| Memory | Automatically released | Managed by Garbage Collector |

---

# Memory Allocation

Primitive Example

```javascript
let age = 25;
```

```
Stack

age → 25
```

Object Example

```javascript
let person = {
    name: "Ahmed"
};
```

```
Stack

person ─────► Heap

              {
                  name: "Ahmed"
              }
```

---

# Function Memory

Every function call creates a new execution context on the Stack.

Example

```javascript
function greet() {
    let message = "Hello";
}

greet();
```

When `greet()` finishes, its stack frame is removed automatically.

```
Call Stack

greet()

↓

Removed
```

---

# Garbage Collection

Garbage Collection (GC) is the automatic process of freeing memory that is no longer reachable or used.

JavaScript developers do **not** manually free memory.

Example

```javascript
let user = {
    name: "Ali"
};

user = null;
```

After assigning `null`, the object has no remaining references and becomes eligible for garbage collection.

---

# How Garbage Collection Works

Modern JavaScript engines commonly use the **Mark-and-Sweep** algorithm.

Steps

1. Start from root objects (Global Object, Call Stack).
2. Mark all reachable objects.
3. Remove unmarked (unreachable) objects.
4. Reclaim their memory.

Visualization

```
Roots
 │
 ▼
Object A
 │
 ▼
Object B

Object C (No reference)

↓

Garbage Collector removes Object C
```

---

# Memory Leak

A Memory Leak happens when memory is no longer needed but cannot be released because references to it still exist.

Over time, memory usage grows and can slow down or crash the application.

---

# Common Causes of Memory Leaks

## 1. Global Variables

```javascript
data = [];
```

Without `let`, `const`, or `var`, a global variable is created (in non-strict mode), which may stay in memory longer than intended.

Correct

```javascript
const data = [];
```

---

## 2. Unused Event Listeners

```javascript
button.addEventListener("click", handleClick);
```

If the button is removed but the listener isn't cleaned up, it may keep related objects alive.

Correct

```javascript
button.removeEventListener("click", handleClick);
```

---

## 3. Timers

```javascript
const id = setInterval(() => {
    console.log("Running");
}, 1000);
```

If the interval is never cleared, it continues running.

Correct

```javascript
clearInterval(id);
```

---

## 4. Closures Holding References

```javascript
function createUser() {
    const bigArray = new Array(1000000).fill("data");

    return function () {
        console.log(bigArray.length);
    };
}
```

The returned function keeps `bigArray` alive as long as the closure exists.

---

## 5. Detached DOM Elements

```javascript
const div = document.getElementById("box");
```

If a DOM element is removed from the page but JavaScript still holds a reference to it, the memory cannot be reclaimed.

---

# Preventing Memory Leaks

- Use `const` and `let` instead of accidental globals.
- Remove unused event listeners.
- Clear timers (`clearTimeout`, `clearInterval`).
- Avoid keeping unnecessary object references.
- Release large objects by setting references to `null` when appropriate.
- Be careful with long-lived closures.

---

# Real-World Example

Bad

```javascript
setInterval(() => {
    console.log("Running...");
}, 1000);
```

Good

```javascript
const interval = setInterval(() => {
    console.log("Running...");
}, 1000);

clearInterval(interval);
```

---

# Interview Questions

### What is Memory Management?

The process of allocating, using, and releasing memory during program execution.

---

### What is Stack Memory?

Memory used for primitive values, function calls, local variables, and execution contexts.

---

### What is Heap Memory?

Memory used for storing objects, arrays, functions, and other reference types.

---

### Why are objects stored in Heap?

Objects can have dynamic sizes, so they are stored in the Heap and accessed through references.

---

### What is Garbage Collection?

An automatic process that removes unreachable objects and reclaims memory.

---

### What algorithm does JavaScript use for Garbage Collection?

Modern JavaScript engines primarily use the **Mark-and-Sweep** algorithm.

---

### What is a Memory Leak?

A situation where unused memory cannot be reclaimed because references to it still exist.

---

### Name common causes of Memory Leaks.

- Global variables
- Event listeners
- Timers
- Closures
- Detached DOM elements

---

# Best Practices

- Prefer `const` where possible.
- Avoid unnecessary global variables.
- Remove event listeners when no longer needed.
- Clear timers after use.
- Avoid retaining large objects unnecessarily.
- Profile memory usage using browser developer tools.

---

# Summary

| Concept | Description |
|---------|-------------|
| Memory Management | Allocation and release of memory |
| Stack Memory | Stores primitive values and function calls |
| Heap Memory | Stores objects, arrays, and functions |
| Garbage Collection | Automatically removes unreachable objects |
| Mark-and-Sweep | Common garbage collection algorithm |
| Memory Leak | Memory that cannot be released due to active references |

---

# Quick Revision

- Stack stores **primitive values** and **execution contexts**.
- Heap stores **objects**, **arrays**, and **functions**.
- Primitive values are copied by value.
- Objects are shared by reference.
- JavaScript performs automatic garbage collection.
- Modern engines primarily use **Mark-and-Sweep**.
- Memory leaks often occur because references remain active.
- Remove event listeners and clear timers to avoid leaks.

---
