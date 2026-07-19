# JavaScript Interview Questions — Implement from Scratch

A collection of the most commonly asked "implement X from scratch" JavaScript interview questions, with full answers and the reasoning interviewers are usually testing for.

Includes all topics you listed, plus a few closely related ones that come up just as often in interviews.

## Table of Contents

**Promises & Async**
1. [Promise.all](#1-promiseall)
2. [Promise.race](#2-promiserace)
3. [Promise.allSettled](#3-promiseallsettled)
4. [Promise.any](#4-promiseany)
5. [Build a Promise from Scratch](#5-build-a-promise-from-scratch)
6. [Retry Function](#6-retry-function)
7. [Sleep Function](#7-sleep-function)
8. [Debounce](#8-debounce)
9. [Throttle](#9-throttle)

**Array Methods**
10. [Array.map](#10-arraymap)
11. [Array.filter](#11-arrayfilter)
12. [Array.reduce](#12-arrayreduce)
13. [Array.forEach](#13-arrayforeach)
14. [Array.find](#14-arrayfind)
15. [Flatten Array](#15-flatten-array)

**Function Context & Utilities**
16. [bind](#16-bind)
17. [call](#17-call)
18. [apply](#18-apply)
19. [compose](#19-compose)
20. [pipe](#20-pipe)
21. [once](#21-once)
22. [curry](#22-curry)
23. [memoize](#23-memoize)

**Objects & Type Utilities**
24. [Deep Clone](#24-deep-clone)
25. [Object.assign](#25-objectassign)
26. [Deep Equal (isEqual)](#26-deep-equal-isequal)
27. [Custom `new` Operator](#27-custom-new-operator)
28. [instanceof Operator](#28-instanceof-operator)

**Design Patterns & Data Structures**
29. [Event Emitter](#29-event-emitter)
30. [LRU Cache](#30-lru-cache)
31. [Singleton Pattern](#31-singleton-pattern)

---

## Promises & Async

### 1. Promise.all

**Q:** Implement `Promise.all` from scratch.
**Why it's asked:** Tests understanding of Promise resolution order, error propagation, and handling async collections.

```js
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('argument must be an array'));
    }
    const results = [];
    let completed = 0;
    if (promises.length === 0) return resolve(results);

    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then((value) => {
          results[i] = value;
          completed++;
          if (completed === promises.length) resolve(results);
        })
        .catch(reject);
    });
  });
}
```

**Key points:**
- Rejects immediately if *any* promise rejects.
- Preserves result order regardless of which promise resolves first.
- Must handle non-promise values (wrap with `Promise.resolve`).
- Empty array should resolve immediately with `[]`.

---

### 2. Promise.race

**Q:** Implement `Promise.race` from scratch.
**Why it's asked:** Checks if you understand that "race" means first settle wins — resolve or reject.

```js
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((p) => {
      Promise.resolve(p).then(resolve).catch(reject);
    });
  });
}
```

**Key points:**
- The first promise to *settle* (fulfilled or rejected) determines the outcome.
- An empty array never settles.

---

### 3. Promise.allSettled

**Q:** Implement `Promise.allSettled`.
**Why it's asked:** A common follow-up to `Promise.all` — tests whether you know it never short-circuits on rejection.

```js
function promiseAllSettled(promises) {
  return Promise.all(
    promises.map((p) =>
      Promise.resolve(p)
        .then((value) => ({ status: 'fulfilled', value }))
        .catch((reason) => ({ status: 'rejected', reason }))
    )
  );
}
```

**Key points:**
- Always resolves (never rejects) once every promise has settled.
- Each result carries a `status` field, plus `value` or `reason`.

---

### 4. Promise.any

**Q:** Implement `Promise.any`.
**Why it's asked:** Tests the inverse logic of `Promise.all` — resolves on first success, rejects only if *all* fail.

```js
function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    let rejectedCount = 0;
    const errors = [];

    if (promises.length === 0) {
      return reject(new AggregateError([], 'All promises were rejected'));
    }

    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(resolve)
        .catch((err) => {
          errors[i] = err;
          rejectedCount++;
          if (rejectedCount === promises.length) {
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        });
    });
  });
}
```

**Key points:**
- Resolves as soon as ANY promise fulfills.
- Rejects with an `AggregateError` only if every promise rejects.

---

### 5. Build a Promise from Scratch

**Q:** Implement the `Promise` class itself (states, `then`, `catch`).
**Why it's asked:** One of the most common "senior" JS questions — tests deep understanding of the microtask queue, chaining, and state machines.

```js
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.callbacks = [];

    const resolve = (value) => {
      if (this.state !== 'pending') return;
      this.state = 'fulfilled';
      this.value = value;
      this.callbacks.forEach((cb) => cb.onFulfilled(value));
    };

    const reject = (reason) => {
      if (this.state !== 'pending') return;
      this.state = 'rejected';
      this.value = reason;
      this.callbacks.forEach((cb) => cb.onRejected(reason));
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handleFulfilled = (value) => {
        try {
          resolve(typeof onFulfilled === 'function' ? onFulfilled(value) : value);
        } catch (err) {
          reject(err);
        }
      };
      const handleRejected = (reason) => {
        try {
          if (typeof onRejected === 'function') resolve(onRejected(reason));
          else reject(reason);
        } catch (err) {
          reject(err);
        }
      };

      if (this.state === 'fulfilled') {
        queueMicrotask(() => handleFulfilled(this.value));
      } else if (this.state === 'rejected') {
        queueMicrotask(() => handleRejected(this.value));
      } else {
        this.callbacks.push({ onFulfilled: handleFulfilled, onRejected: handleRejected });
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}
```

**Key points:**
- `.then()` must always return a *new* promise to support chaining.
- Callbacks must run asynchronously (microtask), even if already settled.
- Once settled, state can never change again.

---

### 6. Retry Function

**Q:** Write a function that retries a failing async operation N times.
**Why it's asked:** Common in real-world API-heavy roles — tests recursive async control flow.

```js
function retry(fn, retries = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    const attempt = (remaining) => {
      fn()
        .then(resolve)
        .catch((err) => {
          if (remaining === 0) return reject(err);
          setTimeout(() => attempt(remaining - 1), delay);
        });
    };
    attempt(retries);
  });
}
```

**Key points:**
- A stronger follow-up: add exponential backoff (`delay * 2 ** attemptNumber`).
- `fn` must return a promise each time it's called (don't reuse a settled one).

---

### 7. Sleep Function

**Q:** Implement a `sleep(ms)` you can `await`.
**Why it's asked:** Quick warm-up question, but also checks you know JS has no native blocking sleep.

```js
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// usage
async function demo() {
  console.log('start');
  await sleep(1000);
  console.log('after 1s');
}
```

---

### 8. Debounce

**Q:** Implement `debounce(fn, delay)`.
**Why it's asked:** Extremely common — tests closures and `setTimeout`/`clearTimeout` usage. Search boxes, resize handlers.

```js
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

**Key points:**
- Only the last call within the window actually executes.
- Follow-up: add a `leading` option to fire on the first call instead of the last.

---

### 9. Throttle

**Q:** Implement `throttle(fn, limit)`.
**Why it's asked:** Paired with debounce — tests whether you know the difference (rate-limiting vs. delay-until-quiet).

```js
function throttle(fn, limit) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
```

**Key points:**
- Guarantees execution at most once per `limit` ms.
- Follow-up: implement a version that also fires on the trailing edge.

---

## Array Methods

### 10. Array.map

**Q:** Polyfill `Array.prototype.map`.

```js
Array.prototype.myMap = function (callback, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result[i] = callback.call(thisArg, this[i], i, this);
    }
  }
  return result;
};
```

**Key points:** Must skip holes in sparse arrays (`i in this`), and must not mutate the original array.

---

### 11. Array.filter

**Q:** Polyfill `Array.prototype.filter`.

```js
Array.prototype.myFilter = function (callback, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};
```

---

### 12. Array.reduce

**Q:** Polyfill `Array.prototype.reduce`.
**Why it's asked:** One of the most-asked array questions — tests handling of the optional initial value.

```js
Array.prototype.myReduce = function (callback, initialValue) {
  let acc = initialValue;
  let startIndex = 0;

  if (acc === undefined) {
    if (this.length === 0) throw new TypeError('Reduce of empty array with no initial value');
    acc = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    if (i in this) acc = callback(acc, this[i], i, this);
  }
  return acc;
};
```

**Key points:** Without an initial value, the first element becomes the accumulator. Throws on empty array with no initial value.

---

### 13. Array.forEach

**Q:** Polyfill `Array.prototype.forEach`.

```js
Array.prototype.myForEach = function (callback, thisArg) {
  for (let i = 0; i < this.length; i++) {
    if (i in this) callback.call(thisArg, this[i], i, this);
  }
};
```

**Key points:** Unlike `map`, returns `undefined` — cannot be chained.

---

### 14. Array.find

**Q:** Polyfill `Array.prototype.find`.

```js
Array.prototype.myFind = function (callback, thisArg) {
  for (let i = 0; i < this.length; i++) {
    if (callback.call(thisArg, this[i], i, this)) return this[i];
  }
  return undefined;
};
```

**Key points:** Stops and returns on the first match, unlike `filter`.

---

### 15. Flatten Array

**Q:** Flatten a nested array to a given depth.

```js
function flatten(arr, depth = Infinity) {
  return depth > 0
    ? arr.reduce(
        (acc, item) => acc.concat(Array.isArray(item) ? flatten(item, depth - 1) : item),
        []
      )
    : arr.slice();
}
```

**Key points:** Default depth should be `Infinity` (fully flatten). Follow-up: implement it iteratively with a stack instead of recursion.

---

## Function Context & Utilities

### 16. bind

**Q:** Polyfill `Function.prototype.bind`.
**Why it's asked:** Tests understanding of `this` binding and partial application.

```js
Function.prototype.myBind = function (context, ...boundArgs) {
  const fn = this;
  return function (...args) {
    return fn.apply(context, [...boundArgs, ...args]);
  };
};
```

**Key points:** Follow-up — support the returned function being used as a constructor with `new`.

---

### 17. call

**Q:** Polyfill `Function.prototype.call`.

```js
Function.prototype.myCall = function (context = globalThis, ...args) {
  context = Object(context);
  const fnKey = Symbol('fn');
  context[fnKey] = this;
  const result = context[fnKey](...args);
  delete context[fnKey];
  return result;
};
```

---

### 18. apply

**Q:** Polyfill `Function.prototype.apply`.

```js
Function.prototype.myApply = function (context = globalThis, args = []) {
  context = Object(context);
  const fnKey = Symbol('fn');
  context[fnKey] = this;
  const result = context[fnKey](...args);
  delete context[fnKey];
  return result;
};
```

**Key points (call vs. apply):** `call` takes arguments individually, `apply` takes an array. Both invoke the function immediately (unlike `bind`).

---

### 19. compose

**Q:** Implement `compose(...fns)` — right-to-left function composition.

```js
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);
```

---

### 20. pipe

**Q:** Implement `pipe(...fns)` — left-to-right function composition.

```js
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);
```

**Key points:** `compose(f, g)(x) === pipe(g, f)(x)`. Common follow-up: make both support async functions.

---

### 21. once

**Q:** Implement `once(fn)` — a function that can only run one time.

```js
function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}
```

---

### 22. curry

**Q:** Implement `curry(fn)`.
**Why it's asked:** Common functional-programming question — tests recursion and closures.

```js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...next) => curried.apply(this, [...args, ...next]);
  };
}

// usage
const add3 = (a, b, c) => a + b + c;
const curried = curry(add3);
curried(1)(2)(3);   // 6
curried(1, 2)(3);   // 6
curried(1, 2, 3);   // 6
```

**Key points:** Relies on `fn.length` to know how many args are expected — doesn't work with rest params.

---

### 23. memoize

**Q:** Implement `memoize(fn)` to cache results by argument.

```js
function memoize(fn, resolver) {
  const cache = new Map();
  return function (...args) {
    const key = resolver ? resolver(...args) : JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

**Key points:** `JSON.stringify` as a default key works for primitives/simple objects but breaks on functions or circular refs — mention a custom `resolver` as the fix.

---

## Objects & Type Utilities

### 24. Deep Clone

**Q:** Implement `deepClone(obj)` without `structuredClone`.
**Why it's asked:** Tests recursion, circular reference handling, and knowledge of special object types.

```js
function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== 'object') return value;
  if (seen.has(value)) return seen.get(value);

  if (value instanceof Date) return new Date(value);
  if (value instanceof RegExp) return new RegExp(value);

  const clone = Array.isArray(value) ? [] : {};
  seen.set(value, clone);

  for (const key of Object.keys(value)) {
    clone[key] = deepClone(value[key], seen);
  }
  return clone;
}
```

**Key points:** Use a `WeakMap` to handle circular references. Mention `structuredClone()` exists natively now but interviewers want the manual version.

---

### 25. Object.assign

**Q:** Polyfill `Object.assign`.

```js
function myAssign(target, ...sources) {
  sources.forEach((source) => {
    if (source == null) return;
    Object.keys(source).forEach((key) => {
      target[key] = source[key];
    });
  });
  return target;
}
```

**Key points:** Performs a **shallow** copy — nested objects are shared by reference, not cloned.

---

### 26. Deep Equal (isEqual)

**Q:** Implement `isEqual(a, b)` for deep comparison.
**Why it's asked:** Comes up constantly (lodash `isEqual`), tests recursive object traversal.

```js
function isEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) => Object.hasOwn(b, key) && isEqual(a[key], b[key]));
}
```

---

### 27. Custom `new` Operator

**Q:** Implement what the `new` keyword does internally.
**Why it's asked:** Tests understanding of prototypes and constructor return values.

```js
function myNew(Constructor, ...args) {
  const obj = Object.create(Constructor.prototype);
  const result = Constructor.apply(obj, args);
  return typeof result === 'object' && result !== null ? result : obj;
}
```

**Key points:** If the constructor explicitly returns an object, `new` returns *that* object instead of the newly created one.

---

### 28. instanceof Operator

**Q:** Implement how `instanceof` works.

```js
function myInstanceOf(obj, Constructor) {
  if (typeof obj !== 'object' || obj === null) return false;
  let proto = Object.getPrototypeOf(obj);
  while (proto) {
    if (proto === Constructor.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
```

**Key points:** Walks the prototype chain looking for `Constructor.prototype`.

---

## Design Patterns & Data Structures

### 29. Event Emitter

**Q:** Implement a basic pub/sub `EventEmitter` (`on`, `off`, `emit`, `once`).
**Why it's asked:** Foundational to Node.js — checks understanding of pub/sub and listener management.

```js
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    (this.events[event] ??= []).push(listener);
    return this;
  }

  off(event, listener) {
    if (!this.events[event]) return this;
    this.events[event] = this.events[event].filter((l) => l !== listener);
    return this;
  }

  emit(event, ...args) {
    (this.events[event] || []).forEach((listener) => listener(...args));
    return this.events[event]?.length > 0;
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };
    return this.on(event, wrapper);
  }
}
```

---

### 30. LRU Cache

**Q:** Implement an `LRUCache` with `get(key)` and `put(key, value)` in O(1).
**Why it's asked:** A classic — tests use of `Map`'s insertion-order guarantee (or a doubly linked list for the "hard mode" version).

```js
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value); // move to most-recently-used
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value); // evict least-recently-used
    }
    this.cache.set(key, value);
  }
}
```

**Key points:** `Map` preserves insertion order, so the first key is always the least-recently-used. Follow-up: implement without `Map`, using a hash map + doubly linked list.

---

### 31. Singleton Pattern

**Q:** Implement a Singleton class in JavaScript.
**Why it's asked:** Common design-pattern question, tests understanding of private static fields/closures.

```js
class Singleton {
  static #instance;

  constructor() {
    if (Singleton.#instance) return Singleton.#instance;
    Singleton.#instance = this;
  }

  static getInstance() {
    if (!Singleton.#instance) Singleton.#instance = new Singleton();
    return Singleton.#instance;
  }
}

// usage
const a = Singleton.getInstance();
const b = Singleton.getInstance();
console.log(a === b); // true
```

---

## Prep Tips

- Practice writing these **without looking**, then compare with the native behavior (`Array.prototype.map` vs. your `myMap`) to catch edge cases you missed.
- For Promise-related questions, always mention microtask timing — a common "gotcha" interviewers probe for.
- For `bind`/`call`/`apply`, be ready to explain the difference between the three in one sentence each.
- For `curry`/`compose`/`pipe`, be ready to trace through an example by hand on the whiteboard.