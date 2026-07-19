# Advanced JavaScript ⭐⭐⭐⭐⭐

> Complete Guide to Advanced JavaScript Concepts for Interviews, Machine Coding, and Real-World Development

---

# Table of Contents

1. Debounce
2. Throttle
3. Polyfills
4. Memoization
5. Event Delegation
6. Shallow Clone
7. Deep Clone
8. Map
9. Set
10. WeakMap
11. WeakSet
12. Symbols
13. Proxy
14. Reflect API
15. Iterators
16. Generators
17. Async Generators
18. Interview Questions
19. Best Practices
20. Summary

---

# Debounce

Debouncing delays function execution until a specified time has passed since the last event.

It is useful when events fire frequently.

Examples

- Search box
- Window resize
- Auto save
- Form validation

Example

```javascript
function debounce(fn, delay) {
    let timer;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}
```

Usage

```javascript
const search = debounce(() => {
    console.log("Searching...");
}, 500);
```

---

# Throttle

Throttle limits how often a function can execute.

Useful for

- Scroll
- Mouse move
- Resize
- Infinite scrolling

Example

```javascript
function throttle(fn, delay) {
    let waiting = false;

    return function (...args) {
        if (waiting) return;

        fn.apply(this, args);

        waiting = true;

        setTimeout(() => {
            waiting = false;
        }, delay);
    };
}
```

---

# Debounce vs Throttle

| Debounce | Throttle |
|-----------|----------|
| Executes after delay | Executes at fixed intervals |
| Search Input | Scroll Events |
| Reduces unnecessary calls | Limits execution rate |

---

# Polyfills

A polyfill is code that implements a modern JavaScript feature in older environments that do not support it.

Example

```javascript
if (!Array.prototype.myForEach) {
    Array.prototype.myForEach = function (callback) {
        for (let i = 0; i < this.length; i++) {
            callback(this[i], i, this);
        }
    };
}
```

Usage

```javascript
[1, 2, 3].myForEach(console.log);
```

---

# Memoization

Memoization caches function results to avoid repeated calculations.

Example

```javascript
function memoize(fn) {
    const cache = {};

    return function (n) {
        if (cache[n]) return cache[n];

        const result = fn(n);

        cache[n] = result;

        return result;
    };
}
```

Usage

```javascript
const square = memoize(n => n * n);

square(5);

square(5);
```

The second call returns the cached value.

---

# Event Delegation

Instead of attaching event listeners to many child elements, attach one listener to the parent.

Example

```javascript
document
    .getElementById("list")
    .addEventListener("click", event => {
        console.log(event.target.textContent);
    });
```

Benefits

- Better performance
- Less memory usage
- Works for dynamically added elements

---

# Shallow Clone

Creates a new object but copies nested object references.

Example

```javascript
const user = {
    name: "Ali",
    address: {
        city: "Lahore"
    }
};

const copy = { ...user };
```

Nested objects are shared.

---

# Deep Clone

Creates completely independent copies of nested objects.

Modern Method

```javascript
const clone = structuredClone(user);
```

Older Method

```javascript
const clone = JSON.parse(
    JSON.stringify(user)
);
```

Limitations of JSON method

- Removes functions
- Removes Symbols
- Doesn't support circular references

---

# Map

A Map stores key-value pairs.

Keys can be any data type.

Example

```javascript
const map = new Map();

map.set("name", "Ali");

map.set(1, "Number");

console.log(map.get("name"));
```

Output

```
Ali
```

Useful Methods

```javascript
map.set()

map.get()

map.has()

map.delete()

map.clear()
```

---

# Set

A Set stores unique values.

Example

```javascript
const numbers = new Set();

numbers.add(1);

numbers.add(1);

numbers.add(2);

console.log(numbers);
```

Output

```
Set(2) {1,2}
```

Useful Methods

```javascript
add()

has()

delete()

clear()
```

---

# WeakMap

WeakMap stores object keys only.

```javascript
const weakMap = new WeakMap();

const user = {};

weakMap.set(user, "Developer");
```

Characteristics

- Keys must be objects
- Not iterable
- Garbage collectible

---

# WeakSet

Stores unique object references.

```javascript
const weakSet = new WeakSet();

const obj = {};

weakSet.add(obj);
```

Characteristics

- Only objects
- Not iterable
- Automatically garbage collected

---

# Symbols

A Symbol creates a unique value.

Example

```javascript
const id = Symbol("id");

console.log(id);
```

Use as object property

```javascript
const user = {
    [id]: 101
};
```

Benefits

- Prevent property name collisions
- Hidden object properties

---

# Proxy

A Proxy intercepts operations performed on an object.

Example

```javascript
const user = {
    name: "Ali"
};

const proxy = new Proxy(user, {
    get(target, prop) {
        console.log("Reading");

        return target[prop];
    }
});

console.log(proxy.name);
```

Output

```
Reading

Ali
```

Common Uses

- Validation
- Logging
- Reactivity
- Access Control

---

# Reflect API

Reflect provides methods for object operations.

Example

```javascript
const user = {
    name: "Ali"
};

console.log(
    Reflect.get(user, "name")
);
```

Set

```javascript
Reflect.set(user, "age", 25);
```

Benefits

- Cleaner object operations
- Commonly used with Proxy

---

# Iterators

An iterator returns values one by one.

Example

```javascript
const arr = [1, 2, 3];

const iterator =
    arr[Symbol.iterator]();

console.log(iterator.next());

console.log(iterator.next());
```

Output

```javascript
{ value: 1, done: false }

{ value: 2, done: false }
```

---

# Generators

Generators pause and resume execution.

Declared using `function*`.

Example

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

```javascript
{ value: 1, done: false }

{ value: 2, done: false }
```

---

# Async Generators

Async generators work with asynchronous data.

Example

```javascript
async function* generator() {
    yield Promise.resolve(1);

    yield Promise.resolve(2);
}
```

Consume

```javascript
(async () => {
    for await (const value of generator()) {
        console.log(value);
    }
})();
```

Output

```
1

2
```

---

# Interview Questions

### What is Debounce?

Delays execution until events stop occurring for a specified period.

---

### What is Throttle?

Limits function execution to once per specified interval.

---

### Difference between Debounce and Throttle?

Debounce waits until the event stops, while Throttle executes at fixed intervals.

---

### What is Memoization?

Caching function results to improve performance.

---

### Difference between Map and Object?

- Map allows any type of key.
- Object keys are strings or Symbols.
- Map preserves insertion order and provides convenient methods.

---

### Difference between Set and Array?

Set stores only unique values, whereas Arrays allow duplicates and provide indexed access.

---

### What is WeakMap?

A collection where keys must be objects and can be garbage collected when no longer referenced.

---

### What is WeakSet?

A collection of unique object references that can be garbage collected.

---

### What is Proxy?

An object that intercepts operations such as reading, writing, and deleting properties.

---

### Why use Reflect?

To perform standard object operations in a consistent way, often inside Proxy handlers.

---

### What is a Generator?

A function that can pause and resume execution using the `yield` keyword.

---

### Difference between Iterator and Generator?

An Iterator follows the iterator protocol manually, while a Generator automatically creates an iterator.

---

### What is an Async Generator?

A generator that yields asynchronous values and is consumed using `for await...of`.

---

# Best Practices

- Use **Debounce** for search inputs.
- Use **Throttle** for scroll and resize events.
- Prefer **Map** over plain objects when keys are dynamic or non-string.
- Use **Set** to remove duplicate values.
- Use **WeakMap** for private metadata associated with objects.
- Prefer `structuredClone()` over `JSON.parse(JSON.stringify())` for deep cloning when supported.
- Use **Proxy** carefully because it can add runtime overhead.
- Use **Generators** for lazy evaluation and large data streams.

---

# Summary

| Concept | Purpose |
|----------|---------|
| Debounce | Delay function execution |
| Throttle | Limit execution frequency |
| Polyfill | Add support for modern features |
| Memoization | Cache function results |
| Event Delegation | Parent handles child events |
| Shallow Clone | Copies first level only |
| Deep Clone | Copies nested objects |
| Map | Key-value collection |
| Set | Unique values |
| WeakMap | Object-key collection |
| WeakSet | Unique object collection |
| Symbol | Unique primitive value |
| Proxy | Intercept object operations |
| Reflect | Standard object operations |
| Iterator | Sequential value access |
| Generator | Pause and resume execution |
| Async Generator | Asynchronous iteration |

---

# Quick Revision

- **Debounce** → Search boxes.
- **Throttle** → Scroll events.
- **Polyfills** → Backward compatibility.
- **Memoization** → Performance optimization.
- **Map** → Flexible key-value storage.
- **Set** → Remove duplicates.
- **WeakMap/WeakSet** → Garbage-collection-friendly collections.
- **Symbol** → Unique property keys.
- **Proxy + Reflect** → Advanced object manipulation.
- **Iterator** → Manual iteration.
- **Generator** → `yield` values one at a time.
- **Async Generator** → Stream asynchronous values.

---
# README Part 24 — Advanced JavaScript ⭐⭐⭐⭐⭐

> Complete Guide to Advanced JavaScript Concepts for FAANG Interviews & Real-World Development

---

# Table of Contents

1. Debounce
2. Throttle
3. Polyfills
4. Memoization
5. Event Delegation
6. Shallow Clone
7. Deep Clone
8. Map
9. Set
10. WeakMap
11. WeakSet
12. Reflect API
13. Proxy
14. Symbols
15. Iterators
16. Generators
17. Async Generators
18. Interview Questions
19. Best Practices
20. Summary

---

# Debounce

Debouncing delays the execution of a function until the user stops triggering the event for a specified time.

## Why use Debounce?

- Search bars
- Auto-save
- Resize events
- Form validation

Example

```javascript
function debounce(fn, delay) {
    let timer;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

const search = debounce(() => {
    console.log("Searching...");
}, 500);

input.addEventListener("input", search);
```

---

# Throttle

Throttle limits how often a function can execute.

Example

```javascript
function throttle(fn, delay) {
    let waiting = false;

    return function (...args) {
        if (waiting) return;

        fn.apply(this, args);

        waiting = true;

        setTimeout(() => {
            waiting = false;
        }, delay);
    };
}
```

Use Cases

- Scroll events
- Mouse movement
- Window resize
- Infinite scrolling

---

# Debounce vs Throttle

| Debounce | Throttle |
|-----------|----------|
| Waits until events stop | Executes at fixed intervals |
| Search Input | Scroll Events |
| Auto-save | Dragging |

---

# Polyfills

A polyfill provides modern JavaScript functionality in older browsers.

Example

```javascript
if (!Array.prototype.myForEach) {
    Array.prototype.myForEach = function (callback) {
        for (let i = 0; i < this.length; i++) {
            callback(this[i], i, this);
        }
    };
}
```

Common Polyfills

- Promise
- fetch
- Array methods
- String methods

---

# Memoization

Memoization stores previous function results to avoid unnecessary calculations.

Example

```javascript
function memoize(fn) {
    const cache = new Map();

    return function (num) {
        if (cache.has(num)) {
            return cache.get(num);
        }

        const result = fn(num);

        cache.set(num, result);

        return result;
    };
}

const square = memoize(num => num * num);

console.log(square(5));

console.log(square(5));
```

Benefits

- Better performance
- Avoid repeated calculations

---

# Event Delegation

Instead of adding event listeners to every child element, attach one listener to the parent.

```javascript
document
    .getElementById("list")
    .addEventListener("click", (e) => {
        if (e.target.tagName === "LI") {
            console.log(e.target.textContent);
        }
    });
```

Benefits

- Better performance
- Handles dynamically added elements
- Less memory usage

---

# Shallow Clone

Copies only the first level.

Example

```javascript
const user = {
    name: "Ali",
    address: {
        city: "Lahore"
    }
};

const copy = { ...user };

copy.address.city = "Karachi";

console.log(user.address.city);
```

Output

```
Karachi
```

Nested objects are still shared.

---

# Deep Clone

Copies every nested object.

Modern Way

```javascript
const clone =
    structuredClone(user);
```

Older Method

```javascript
const clone =
    JSON.parse(
        JSON.stringify(user)
    );
```

Limitations of JSON Method

- Removes functions
- Removes `undefined`
- Doesn't support `Date`, `Map`, `Set`, etc.

---

# Map

`Map` stores key-value pairs.

Unlike objects, keys can be **any data type**.

```javascript
const map = new Map();

map.set("name", "Ali");

map.set(1, "One");

console.log(map.get("name"));
```

Methods

```javascript
map.set()

map.get()

map.has()

map.delete()

map.clear()
```

---

# Set

Stores unique values.

```javascript
const set = new Set();

set.add(10);

set.add(20);

set.add(10);

console.log(set);
```

Output

```
Set {10,20}
```

Useful for removing duplicates.

```javascript
const numbers =
    [...new Set([1,2,2,3,3])];
```

Output

```
[1,2,3]
```

---

# WeakMap

WeakMap stores key-value pairs where keys **must be objects**.

```javascript
const wm =
    new WeakMap();

const obj = {};

wm.set(obj, "Data");
```

Features

- Keys must be objects
- Not iterable
- Garbage collection friendly

Common Uses

- Private data
- Caching

---

# WeakSet

Stores only objects.

```javascript
const ws =
    new WeakSet();

const obj = {};

ws.add(obj);
```

Features

- Objects only
- Not iterable
- Automatically garbage collected

---

# Map vs Object

| Object | Map |
|----------|-----|
| String/Symbol keys | Any type of key |
| Not directly iterable | Iterable |
| Smaller feature set | Rich API |

---

# Reflect API

`Reflect` provides methods for object operations.

Example

```javascript
const user = {
    name: "Ali"
};

console.log(
    Reflect.get(user, "name")
);
```

Set Property

```javascript
Reflect.set(user, "age", 25);
```

Delete

```javascript
Reflect.deleteProperty(
    user,
    "name"
);
```

Common Methods

- Reflect.get()
- Reflect.set()
- Reflect.has()
- Reflect.deleteProperty()

---

# Proxy

Proxy intercepts operations on objects.

Example

```javascript
const user = {
    name: "Ali"
};

const proxy =
    new Proxy(user, {

        get(target, key) {

            console.log("Reading");

            return target[key];

        }

    });

console.log(proxy.name);
```

Output

```
Reading

Ali
```

Use Cases

- Validation
- Logging
- Security
- Reactive frameworks (Vue)

---

# Symbols

A Symbol is a unique primitive value.

```javascript
const id =
    Symbol("id");
```

Example

```javascript
const user = {
    [id]: 101
};
```

Every Symbol is unique.

```javascript
Symbol("id") === Symbol("id");
```

Output

```
false
```

---

# Iterators

An iterator produces one value at a time.

Example

```javascript
const numbers =
    [10,20,30];

const iterator =
    numbers[Symbol.iterator]();

console.log(
    iterator.next()
);

console.log(
    iterator.next()
);
```

Output

```javascript
{ value: 10, done: false }

{ value: 20, done: false }
```

---

# Generators

Generators create iterators automatically.

```javascript
function* numbers() {

    yield 1;

    yield 2;

    yield 3;

}

const gen =
    numbers();

console.log(gen.next());

console.log(gen.next());
```

Output

```javascript
{ value: 1, done: false }

{ value: 2, done: false }
```

---

# Async Generators

Async Generators work with asynchronous operations.

```javascript
async function* fetchData() {

    yield await Promise.resolve(1);

    yield await Promise.resolve(2);

}
```

Consume

```javascript
(async () => {

    for await (
        const value
        of fetchData()
    ) {

        console.log(value);

    }

})();
```

Output

```
1

2
```

---

# Interview Questions

### Difference between Debounce and Throttle?

Debounce waits until events stop.

Throttle executes at fixed intervals.

---

### Difference between Shallow Clone and Deep Clone?

Shallow clone copies only the first level.

Deep clone copies all nested objects.

---

### Why use Map instead of Object?

Map supports any key type, preserves insertion order, and has convenient methods.

---

### Difference between Map and WeakMap?

WeakMap:

- Object keys only
- Not iterable
- Keys can be garbage collected

---

### Difference between Set and WeakSet?

Set stores any value.

WeakSet stores only objects.

---

### What is a Proxy?

An object that intercepts operations such as property access, assignment, and deletion.

---

### What is Reflect?

A built-in object that provides methods for performing object operations.

---

### Why use Symbols?

To create unique property keys and avoid naming collisions.

---

### What is a Generator?

A special function that can pause (`yield`) and resume execution, producing values one at a time.

---

### What is Memoization?

A performance optimization technique that caches function results.

---

# Best Practices

- Use Debounce for search inputs.
- Use Throttle for scroll and resize events.
- Prefer `structuredClone()` for deep cloning when supported.
- Use `Map` instead of plain objects for dynamic key-value storage.
- Use `Set` to remove duplicate values.
- Use `WeakMap` for private metadata and caches.
- Use `Proxy` carefully, as it can add overhead.
- Use Generators for lazy evaluation and large datasets.

---

# Summary

| Concept | Purpose |
|----------|----------|
| Debounce | Delay execution until events stop |
| Throttle | Limit execution frequency |
| Polyfills | Add modern features to older environments |
| Memoization | Cache function results |
| Event Delegation | One listener for multiple child elements |
| Shallow Clone | Copy first level only |
| Deep Clone | Copy all nested objects |
| Map | Flexible key-value collection |
| Set | Collection of unique values |
| WeakMap | Object-keyed map with weak references |
| WeakSet | Weak collection of objects |
| Reflect | Standard object operation methods |
| Proxy | Intercept object operations |
| Symbol | Unique primitive value |
| Iterator | Sequential value producer |
| Generator | Function that yields values |
| Async Generator | Asynchronous iterator |

---

# Quick Revision

- **Debounce** → Search bars, auto-save.
- **Throttle** → Scroll, resize.
- **Polyfills** → Support older browsers.
- **Memoization** → Cache expensive computations.
- **Event Delegation** → Attach one listener to the parent.
- **Shallow Clone** → Copies first level only.
- **Deep Clone** → Copies nested objects.
- **Map** → Any type of keys.
- **Set** → Unique values only.
- **WeakMap** → Object keys with automatic garbage collection.
- **WeakSet** → Weak collection of objects.
- **Reflect** → Standard object manipulation API.
- **Proxy** → Intercepts object operations.
- **Symbol** → Unique identifiers.
- **Iterator** → Produces values sequentially.
- **Generator** → Uses `yield` to pause and resume execution.
- **Async Generator** → Produces asynchronous values with `for await...of`.

---

## 🎯 JavaScript Interview Level

After completing all previous parts and this Advanced JavaScript section, you should be comfortable with topics commonly asked in **SDE-1, SDE-2, Frontend, Full Stack, and FAANG-style JavaScript interviews**. This chapter covers many advanced language features and optimization techniques that interviewers frequently use to assess deeper JavaScript knowledge.