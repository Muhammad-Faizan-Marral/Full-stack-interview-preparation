# JavaScript Promises ⭐⭐⭐⭐⭐

> **Promises are one of the most important JavaScript interview topics.**
>
> They are the foundation of **async/await**, API calls, and modern asynchronous programming.

---

# Table of Contents

1. What is a Promise?
2. Why Do We Need Promises?
3. Promise States
4. Creating a Promise
5. Consuming a Promise
6. Promise Chaining
7. Promise.all()
8. Promise.allSettled()
9. Promise.any()
10. Promise.race()
11. Promise.resolve()
12. Promise.reject()
13. Error Handling
14. Promise Execution Order
15. Coding: Build Your Own Promise
16. Common Interview Questions
17. Summary

---

# 1. What is a Promise?

A **Promise** is an object that represents the **eventual completion or failure** of an asynchronous operation.

Think of it as a placeholder for a value that will be available in the future.

Examples of asynchronous operations:

- API Requests
- Database Queries
- File Reading
- Timers
- Image Loading

---

# 2. Why Do We Need Promises?

Before Promises, callbacks were commonly used.

Example

```javascript
login(function () {
  getUser(function () {
    getOrders(function () {
      getPayment(function () {
        // ...
      });
    });
  });
});
```

This deeply nested structure is known as **Callback Hell** (or the "Pyramid of Doom").

Promises solve this by allowing cleaner, chainable asynchronous code.

---

# 3. Promise States

A Promise has **three states**.

```
             Promise
                │
      ┌─────────┴─────────┐
      │                   │
 Pending           Settled
                  /       \
          Fulfilled     Rejected
```

### Pending

Initial state.

```javascript
new Promise(() => {});
```

The Promise has neither resolved nor rejected.

---

### Fulfilled

The operation completed successfully.

```javascript
resolve("Success");
```

---

### Rejected

The operation failed.

```javascript
reject("Something went wrong");
```

Once a Promise is **fulfilled or rejected**, its state **cannot change**.

---

# 4. Creating a Promise

Syntax

```javascript
const promise = new Promise((resolve, reject) => {
  // async work
});
```

Example

```javascript
const promise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Data Loaded");
  } else {
    reject("Error");
  }
});
```

---

# 5. Consuming a Promise

Using `.then()` and `.catch()`.

```javascript
promise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
```

Output

```
Data Loaded
```

---

# 6. Promise Chaining

Each `.then()` returns a **new Promise**, allowing chaining.

```javascript
Promise.resolve(5)
  .then((num) => num * 2)
  .then((num) => num + 10)
  .then((num) => {
    console.log(num);
  });
```

Output

```
20
```

---

## Returning a Promise

```javascript
Promise.resolve(10)
  .then((num) => {
    return Promise.resolve(num * 2);
  })
  .then((num) => {
    console.log(num);
  });
```

Output

```
20
```

---

# 7. Promise.all()

Runs multiple Promises **in parallel**.

Returns:

- One Promise
- Resolves when **all** Promises resolve
- Rejects immediately if **any** Promise rejects

```javascript
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3])
  .then((result) => {
    console.log(result);
  });
```

Output

```
[1, 2, 3]
```

---

## Rejection Example

```javascript
Promise.all([
  Promise.resolve(1),
  Promise.reject("Error"),
  Promise.resolve(3),
])
.catch(console.log);
```

Output

```
Error
```

---

# 8. Promise.allSettled()

Waits for **all** Promises to finish, regardless of success or failure.

```javascript
Promise.allSettled([
  Promise.resolve("Success"),
  Promise.reject("Failed"),
])
.then(console.log);
```

Output

```javascript
[
  { status: "fulfilled", value: "Success" },
  { status: "rejected", reason: "Failed" }
]
```

Useful when you want every result.

---

# 9. Promise.any()

Returns the **first fulfilled** Promise.

Ignores rejected Promises unless **all** reject.

```javascript
Promise.any([
  Promise.reject("Error"),
  Promise.resolve("Success"),
  Promise.resolve("Another"),
])
.then(console.log);
```

Output

```
Success
```

If every Promise rejects, it rejects with an `AggregateError`.

---

# 10. Promise.race()

Settles with the **first Promise** to settle (fulfilled or rejected).

```javascript
const p1 = new Promise((resolve) =>
  setTimeout(() => resolve("First"), 1000)
);

const p2 = new Promise((resolve) =>
  setTimeout(() => resolve("Second"), 2000)
);

Promise.race([p1, p2])
  .then(console.log);
```

Output

```
First
```

If the fastest Promise rejects, `Promise.race()` rejects immediately.

---

# 11. Promise.resolve()

Creates an already fulfilled Promise.

```javascript
Promise.resolve("Hello")
  .then(console.log);
```

Output

```
Hello
```

Useful for normalizing values into Promises.

---

# 12. Promise.reject()

Creates an already rejected Promise.

```javascript
Promise.reject("Something went wrong")
  .catch(console.log);
```

Output

```
Something went wrong
```

---

# 13. Error Handling

Use `.catch()` to handle rejected Promises.

```javascript
Promise.reject("Network Error")
  .catch((error) => {
    console.log(error);
  });
```

Output

```
Network Error
```

---

## Throwing Errors

```javascript
Promise.resolve()
  .then(() => {
    throw new Error("Oops");
  })
  .catch((err) => {
    console.log(err.message);
  });
```

Output

```
Oops
```

---

## finally()

Runs regardless of success or failure.

```javascript
Promise.resolve("Done")
  .finally(() => {
    console.log("Cleanup");
  });
```

Output

```
Cleanup
```

---

# 14. Promise Execution Order

```javascript
console.log("Start");

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");
```

Output

```
Start
End
Promise
```

Why?

- `console.log()` runs synchronously.
- Promise callbacks are **microtasks**.
- Microtasks execute after synchronous code but before macrotasks.

---

# 15. Coding: Build Your Own Promise

> **Note:** JavaScript's native `Promise` implementation is complex and follows the Promises/A+ specification. The implementation below is a **simplified educational version** to demonstrate the core concepts.

```javascript
class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.handlers = [];

    const resolve = (value) => {
      if (this.state !== "pending") return;

      this.state = "fulfilled";
      this.value = value;

      this.handlers.forEach((handler) => handler(value));
    };

    const reject = (reason) => {
      if (this.state !== "pending") return;

      this.state = "rejected";
      this.value = reason;
    };

    executor(resolve, reject);
  }

  then(callback) {
    if (this.state === "fulfilled") {
      callback(this.value);
    } else {
      this.handlers.push(callback);
    }

    return this;
  }
}
```

Usage

```javascript
const promise = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve("Hello");
  }, 1000);
});

promise.then(console.log);
```

Output (after 1 second)

```
Hello
```

> **Limitations:** This simplified version does not support chaining, rejection handlers, asynchronous scheduling, or the full Promises/A+ behavior. It is intended for learning purposes only.

---

# Promise Methods Comparison

| Method | Resolves When | Rejects When |
|----------|---------------|--------------|
| Promise.all() | All Promises fulfill | Any Promise rejects |
| Promise.allSettled() | All Promises settle | Never rejects because of an individual Promise |
| Promise.any() | First Promise fulfills | All Promises reject |
| Promise.race() | First Promise settles | First settled Promise rejects |

---

# Common Interview Questions

## Q1. What is a Promise?

A Promise is an object representing the eventual completion or failure of an asynchronous operation.

---

## Q2. What are the three Promise states?

- Pending
- Fulfilled
- Rejected

---

## Q3. Difference between `Promise.all()` and `Promise.allSettled()`?

| Promise.all() | Promise.allSettled() |
|----------------|----------------------|
| Rejects on the first rejection | Waits for every Promise |
| Returns fulfilled values | Returns status objects for all Promises |
| Useful when every task must succeed | Useful when you need every outcome |

---

## Q4. Difference between `Promise.any()` and `Promise.race()`?

| Promise.any() | Promise.race() |
|----------------|----------------|
| First fulfilled Promise wins | First settled Promise wins |
| Ignores rejections until all reject | A rejection can finish the race |
| Rejects with `AggregateError` only if all reject | Rejects immediately if the first settled Promise rejects |

---

## Q5. Can a Promise change its state?

No.

A Promise is immutable once it has been fulfilled or rejected.

---

## Q6. Why are Promise callbacks executed before `setTimeout()` callbacks?

Because Promise callbacks are **microtasks**, and the Event Loop processes all microtasks before moving to the next macrotask.

---

# Summary

After completing this topic, you should understand:

- ✅ What a Promise is
- ✅ Why Promises are used
- ✅ Promise states
- ✅ Creating and consuming Promises
- ✅ Promise chaining
- ✅ `Promise.all()`
- ✅ `Promise.allSettled()`
- ✅ `Promise.any()`
- ✅ `Promise.race()`
- ✅ `Promise.resolve()`
- ✅ `Promise.reject()`
- ✅ Error handling with `.catch()` and `.finally()`
- ✅ Promise execution order
- ✅ A simplified custom Promise implementation
- ✅ Common interview questions

---

## Interview Tip ⭐⭐⭐⭐⭐

One of the most common JavaScript interview questions is:

> **What is the difference between `Promise.all()`, `Promise.allSettled()`, `Promise.any()`, and `Promise.race()`?**

A concise answer:

- **`Promise.all()`** → Waits for **all** Promises to fulfill; rejects immediately if any Promise rejects.
- **`Promise.allSettled()`** → Waits for **every** Promise to settle and returns each result's status.
- **`Promise.any()`** → Resolves with the **first fulfilled** Promise; rejects only if **all** Promises reject.
- **`Promise.race()`** → Settles as soon as the **first Promise settles**, whether it fulfills or rejects.