# JavaScript Event Loop ⭐⭐⭐⭐⭐

> **The Event Loop is one of the most frequently asked JavaScript interview topics.**
>
> If you understand the Event Loop, you understand **how JavaScript handles asynchronous code**.

---

# Table of Contents

1. What is the Event Loop?
2. Why Do We Need the Event Loop?
3. JavaScript Execution Model
4. Call Stack
5. Memory Heap
6. Web APIs
7. Callback Queue (Task Queue)
8. Microtask Queue (Promise Queue)
9. Macrotask Queue
10. Event Loop Working Process
11. setTimeout()
12. setInterval()
13. queueMicrotask()
14. MutationObserver
15. Execution Priority
16. Coding Prediction Questions
17. Common Interview Questions
18. Summary

---

# 1. What is the Event Loop?

JavaScript is a **single-threaded** language, meaning it can execute **only one piece of code at a time**.

So how can JavaScript perform tasks like:

- API requests
- Timers
- DOM events
- File reading

without freezing the application?

The answer is:

> **The Event Loop**

The Event Loop continuously checks whether the **Call Stack** is empty. If it is, it moves tasks from the appropriate queue into the Call Stack for execution.

---

# 2. Why Do We Need the Event Loop?

Imagine this code:

```javascript
console.log("Start");

// Simulating a long task
for (let i = 0; i < 1_000_000_000; i++) {}

console.log("End");
```

The browser becomes unresponsive while the loop runs because JavaScript executes code synchronously.

Now consider:

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Done");
}, 1000);

console.log("End");
```

Output

```
Start
End
Done
```

`setTimeout` doesn't block execution because the timer is handled outside the Call Stack.

---

# 3. JavaScript Execution Model

```
                JavaScript Engine
                      │
          ┌───────────┴───────────┐
          │                       │
     Memory Heap             Call Stack
                                   │
                                   ▼
                              Event Loop
                                   │
        ┌───────────────┬──────────┴──────────────┐
        ▼               ▼                         ▼
 Microtask Queue   Callback Queue          Web APIs
 (Promise Queue)   (Macrotasks)     (Timers, Fetch, DOM)
```

---

# 4. Call Stack

The Call Stack is where JavaScript keeps track of function execution.

It follows the **LIFO (Last In, First Out)** principle.

Example

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

Call Stack

```
one()

↓

two()

↓

three()

↓

console.log()
```

After execution:

```
Stack Empty
```

---

# 5. Memory Heap

The Memory Heap stores:

- Objects
- Arrays
- Functions
- Variables

Example

```javascript
const user = {
  name: "John",
};
```

The object is stored in the Memory Heap, while its reference is stored in the Call Stack during execution.

---

# 6. Web APIs

Web APIs are provided by the browser (or runtime environment), **not by JavaScript itself**.

Examples

- setTimeout
- setInterval
- fetch
- DOM events
- Geolocation
- WebSocket

Example

```javascript
setTimeout(() => {
  console.log("Hello");
}, 2000);
```

Process

```
Call Stack

↓

Web API starts timer

↓

Timer completes

↓

Callback Queue

↓

Event Loop

↓

Call Stack
```

---

# 7. Callback Queue (Task Queue)

The Callback Queue stores completed **macrotasks** waiting to be executed.

Examples

- setTimeout
- setInterval
- DOM Events
- MessageChannel

Example

```javascript
setTimeout(() => {
  console.log("Timer");
}, 0);
```

Even with `0ms`, the callback waits until:

- The timer expires
- The Call Stack becomes empty
- All microtasks have finished

---

# 8. Microtask Queue (Promise Queue)

The Microtask Queue has **higher priority** than the Callback Queue.

Contains:

- Promise.then()
- Promise.catch()
- Promise.finally()
- queueMicrotask()
- MutationObserver

Example

```javascript
console.log(1);

Promise.resolve().then(() => {
  console.log(2);
});

console.log(3);
```

Output

```
1
3
2
```

The Promise callback runs after synchronous code but before macrotasks.

---

# 9. Macrotask Queue

Macrotasks include:

- setTimeout
- setInterval
- DOM Events
- I/O
- MessageChannel

Example

```javascript
setTimeout(() => {
  console.log("Macrotask");
}, 0);
```

This callback waits until:

- Call Stack is empty
- All microtasks have completed

---

# 10. Event Loop Working Process

The Event Loop follows this order:

```
1. Execute synchronous code

↓

2. Empty Call Stack

↓

3. Execute ALL Microtasks

↓

4. Execute ONE Macrotask

↓

5. Execute any new Microtasks

↓

6. Repeat
```

Important Rule:

> **Before processing the next macrotask, JavaScript always empties the entire Microtask Queue.**

---

# 11. setTimeout()

Schedules a callback after at least the specified delay.

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timer");
}, 1000);

console.log("End");
```

Output

```
Start
End
Timer
```

### Important

`1000ms` means:

> **Run after at least 1000ms**, not exactly after 1000ms.

---

## setTimeout(..., 0)

```javascript
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");
```

Output

```
A
C
B
```

Even `0ms` timers are asynchronous.

---

# 12. setInterval()

Runs repeatedly at the specified interval.

```javascript
const id = setInterval(() => {
  console.log("Running");
}, 1000);

setTimeout(() => {
  clearInterval(id);
}, 5000);
```

Output

```
Running
Running
Running
Running
Running
```

---

# 13. queueMicrotask()

Adds a task directly to the Microtask Queue.

```javascript
console.log("A");

queueMicrotask(() => {
  console.log("Microtask");
});

console.log("B");
```

Output

```
A
B
Microtask
```

Equivalent priority to Promise callbacks.

---

# 14. MutationObserver

`MutationObserver` watches for changes in the DOM.

Its callback is placed in the **Microtask Queue**.

Example

```javascript
const observer = new MutationObserver(() => {
  console.log("DOM changed");
});

observer.observe(document.body, {
  childList: true,
});

document.body.append("Hello");
```

Output

```
DOM changed
```

Commonly used by frameworks and libraries to react to DOM updates.

---

# 15. Execution Priority

Execution order:

```
Synchronous Code

↓

Microtasks
    • Promise.then()
    • Promise.catch()
    • Promise.finally()
    • queueMicrotask()
    • MutationObserver

↓

Macrotasks
    • setTimeout()
    • setInterval()
    • DOM Events
    • I/O
```

Priority Table

| Priority | Task |
|----------|------|
| 1 | Synchronous Code |
| 2 | Microtasks |
| 3 | Macrotasks |

---

# 16. Coding Prediction Questions

## Example 1

```javascript
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

console.log("D");
```

Output

```
A
D
C
B
```

Explanation:

- Sync: `A`, `D`
- Microtask: `C`
- Macrotask: `B`

---

## Example 2

```javascript
console.log(1);

setTimeout(() => console.log(2), 0);

Promise.resolve().then(() => console.log(3));

console.log(4);
```

Output

```
1
4
3
2
```

---

## Example 3

```javascript
console.log("Start");

queueMicrotask(() => {
  console.log("Microtask");
});

setTimeout(() => {
  console.log("Timer");
}, 0);

console.log("End");
```

Output

```
Start
End
Microtask
Timer
```

---

## Example 4

```javascript
console.log(1);

Promise.resolve().then(() => {
  console.log(2);

  Promise.resolve().then(() => {
    console.log(3);
  });
});

console.log(4);
```

Output

```
1
4
2
3
```

New microtasks added while processing microtasks are executed before moving to macrotasks.

---

## Example 5

```javascript
console.log("A");

setTimeout(() => {
  console.log("B");

  Promise.resolve().then(() => {
    console.log("C");
  });
}, 0);

Promise.resolve().then(() => {
  console.log("D");
});

console.log("E");
```

Output

```
A
E
D
B
C
```

Explanation:

1. Sync → `A`, `E`
2. Microtask → `D`
3. Macrotask → `B`
4. New Microtask → `C`

---

## Example 6

```javascript
console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

queueMicrotask(() => console.log("Microtask"));

Promise.resolve().then(() => console.log("Promise"));

console.log("End");
```

Output

```
Start
End
Microtask
Promise
Timeout
```

`queueMicrotask()` and Promise callbacks are both microtasks and run before timers. They execute in the order they were queued.

---

# 17. Common Interview Questions

## Q1. Is JavaScript single-threaded?

Yes.

JavaScript has one Call Stack and executes one task at a time. Asynchronous behavior is enabled by the runtime environment and the Event Loop.

---

## Q2. What is the Event Loop?

The Event Loop continuously checks whether the Call Stack is empty and moves ready tasks from the Microtask Queue or Macrotask Queue into the Call Stack.

---

## Q3. Which has higher priority: Promise or setTimeout?

Promises.

The Microtask Queue is always emptied before the next macrotask is processed.

---

## Q4. Does `setTimeout(fn, 0)` execute immediately?

No.

The callback is queued as a macrotask and runs only after:

- The Call Stack is empty
- All pending microtasks have finished

---

## Q5. Difference between Microtask Queue and Callback Queue?

| Microtask Queue | Callback (Macrotask) Queue |
|-----------------|----------------------------|
| Higher priority | Lower priority |
| Promise callbacks | `setTimeout`, `setInterval` |
| `queueMicrotask()` | DOM events |
| `MutationObserver` | I/O callbacks |

---

## Q6. What happens if a microtask schedules another microtask?

The new microtask is added to the end of the Microtask Queue, and JavaScript continues processing microtasks until the queue is completely empty before handling the next macrotask.

---

# 18. Summary

After completing this topic, you should understand:

- ✅ What the Event Loop is
- ✅ Why JavaScript needs the Event Loop
- ✅ Call Stack
- ✅ Memory Heap
- ✅ Web APIs
- ✅ Callback Queue (Task Queue)
- ✅ Microtask Queue (Promise Queue)
- ✅ Macrotask Queue
- ✅ `setTimeout()`
- ✅ `setInterval()`
- ✅ `queueMicrotask()`
- ✅ `MutationObserver`
- ✅ Execution priority
- ✅ Event Loop execution cycle
- ✅ Coding prediction questions commonly asked in interviews

---

## Interview Tip ⭐⭐⭐⭐⭐

A common interview question is:

> **What is the execution order in JavaScript?**

A strong answer is:

1. **Run all synchronous code.**
2. **When the Call Stack is empty, execute all pending microtasks (Promises, `queueMicrotask()`, `MutationObserver`).**
3. **Execute one macrotask (`setTimeout`, `setInterval`, DOM events, etc.).**
4. **After that macrotask, execute any newly added microtasks.**
5. **Repeat the process.**

**Golden Rule:**  
> **Synchronous Code → All Microtasks → One Macrotask → Repeat**