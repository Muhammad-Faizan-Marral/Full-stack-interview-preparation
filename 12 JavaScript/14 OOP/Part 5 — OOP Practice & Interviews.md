# JavaScript — OOP Practice & Interviews

A complete, practical resource for mastering **Object-Oriented Programming in JavaScript** — from core concepts to real interview questions asked at top tech companies.

![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=black)
![OOP](https://img.shields.io/badge/Focus-OOP-blue)
![Level](https://img.shields.io/badge/Level-Beginner%20to%20FAANG-orange)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📖 Table of Contents

1. [25 Real Coding Examples](#1-25-real-coding-examples)
2. [30+ JavaScript OOP Interview Questions](#2-30-javascript-oop-interview-questions)
3. [FAANG-Level Interview Questions](#3-faang-level-interview-questions)
4. [Machine Coding Questions](#4-machine-coding-questions)
5. [Final OOP Cheat Sheet](#5-final-oop-cheat-sheet)
6. [Complete Summary](#6-complete-summary)

---

## About This Repository

JavaScript's OOP model is different from classical languages like Java or C++ — it's built on **prototypes**, but modern `class` syntax makes it look classical. This repo bridges both worlds: you'll practice real code, drill interview questions, and walk away with a cheat sheet you can review in five minutes before any interview.

**What you'll find here:**
- Hands-on code examples for every core OOP concept
- Conceptual interview questions with clear, concise answers
- Harder, scenario-based questions used in FAANG-style interviews
- Machine coding / design problems to build under time pressure
- A one-page cheat sheet for last-minute revision

---

## 1. 25 Real Coding Examples

Each example is self-contained and demonstrates one core OOP concept.

### 1. Basic Class & Constructor
```js
class Car {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }
  describe() {
    return `${this.brand} ${this.model}`;
  }
}
const car = new Car("Toyota", "Corolla");
console.log(car.describe()); // Toyota Corolla
```

### 2. Instance Methods
```js
class Circle {
  constructor(radius) {
    this.radius = radius;
  }
  area() {
    return Math.PI * this.radius ** 2;
  }
}
console.log(new Circle(5).area().toFixed(2)); // 78.54
```

### 3. Static Methods
```js
class MathUtils {
  static square(n) {
    return n * n;
  }
}
console.log(MathUtils.square(6)); // 36 (no instance needed)
```

### 4. Getters and Setters
```js
class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name.toUpperCase();
  }
  set name(value) {
    if (!value) throw new Error("Name cannot be empty");
    this._name = value;
  }
}
const p = new Person("alice");
console.log(p.name); // ALICE
```

### 5. Private Fields (`#`)
```js
class BankAccount {
  #balance = 0;
  deposit(amount) {
    this.#balance += amount;
  }
  getBalance() {
    return this.#balance;
  }
}
const acc = new BankAccount();
acc.deposit(500);
console.log(acc.getBalance()); // 500
// acc.#balance -> SyntaxError, truly private
```

### 6. Private Methods
```js
class Order {
  #items = [];
  #calculateTax(amount) {
    return amount * 0.1;
  }
  addItem(price) {
    this.#items.push(price);
  }
  total() {
    const subtotal = this.#items.reduce((a, b) => a + b, 0);
    return subtotal + this.#calculateTax(subtotal);
  }
}
```

### 7. Inheritance with `extends` / `super`
```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound.`;
  }
}
class Dog extends Animal {
  speak() {
    return `${this.name} barks.`;
  }
}
console.log(new Dog("Rex").speak()); // Rex barks.
```

### 8. Calling Parent Constructor with `super()`
```js
class Employee {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
}
class Manager extends Employee {
  constructor(name, id, team) {
    super(name, id);
    this.team = team;
  }
}
```

### 9. Method Overriding
```js
class Shape {
  area() { return 0; }
}
class Rectangle extends Shape {
  constructor(w, h) { super(); this.w = w; this.h = h; }
  area() { return this.w * this.h; } // overrides parent
}
```

### 10. Polymorphism
```js
class Shape { area() { return 0; } }
class Square extends Shape {
  constructor(s) { super(); this.s = s; }
  area() { return this.s ** 2; }
}
class Triangle extends Shape {
  constructor(b, h) { super(); this.b = b; this.h = h; }
  area() { return 0.5 * this.b * this.h; }
}
[new Square(4), new Triangle(4, 6)].forEach(s => console.log(s.area()));
```

### 11. Abstraction via Abstract-Like Base Class
```js
class PaymentMethod {
  pay(amount) {
    throw new Error("pay() must be implemented by subclass");
  }
}
class CreditCard extends PaymentMethod {
  pay(amount) { return `Paid $${amount} via Credit Card`; }
}
```

### 12. Encapsulation via Closures (Pre-ES2022 Style)
```js
function Counter() {
  let count = 0; // truly private via closure
  return {
    increment: () => ++count,
    getCount: () => count,
  };
}
const counter = Counter();
counter.increment();
console.log(counter.getCount()); // 1
```

### 13. `Object.create()` & Prototypes
```js
const animal = {
  speak() { return `${this.name} makes a sound.`; }
};
const dog = Object.create(animal);
dog.name = "Rex";
console.log(dog.speak()); // Rex makes a sound.
```

### 14. Inspecting the Prototype Chain
```js
class A {}
class B extends A {}
const b = new B();
console.log(Object.getPrototypeOf(b) === B.prototype); // true
console.log(b instanceof A); // true
```

### 15. `call()`, `apply()`, `bind()`
```js
function greet(greeting) {
  return `${greeting}, ${this.name}`;
}
const user = { name: "Sam" };
console.log(greet.call(user, "Hi"));      // Hi, Sam
console.log(greet.apply(user, ["Hey"]));  // Hey, Sam
const bound = greet.bind(user);
console.log(bound("Yo"));                 // Yo, Sam
```

### 16. Factory Pattern
```js
class VehicleFactory {
  static create(type) {
    if (type === "car") return { wheels: 4 };
    if (type === "bike") return { wheels: 2 };
    throw new Error("Unknown vehicle type");
  }
}
console.log(VehicleFactory.create("bike")); // { wheels: 2 }
```

### 17. Singleton Pattern
```js
class Config {
  static #instance;
  constructor() {
    if (Config.#instance) return Config.#instance;
    this.settings = {};
    Config.#instance = this;
  }
}
const a = new Config();
const b = new Config();
console.log(a === b); // true
```

### 18. Builder Pattern
```js
class Pizza {
  constructor() { this.toppings = []; }
  addTopping(t) { this.toppings.push(t); return this; } // returns `this`
  build() { return `Pizza with ${this.toppings.join(", ")}`; }
}
console.log(new Pizza().addTopping("cheese").addTopping("olives").build());
```

### 19. Observer Pattern (Event Emitter)
```js
class EventEmitter {
  #listeners = {};
  on(event, cb) {
    (this.#listeners[event] ??= []).push(cb);
  }
  emit(event, data) {
    (this.#listeners[event] || []).forEach(cb => cb(data));
  }
}
const emitter = new EventEmitter();
emitter.on("greet", name => console.log(`Hello, ${name}`));
emitter.emit("greet", "World"); // Hello, World
```

### 20. Mixins
```js
const CanFly = Base => class extends Base {
  fly() { return `${this.name} is flying`; }
};
class Bird { constructor(name) { this.name = name; } }
class FlyingBird extends CanFly(Bird) {}
console.log(new FlyingBird("Eagle").fly()); // Eagle is flying
```

### 21. Composition over Inheritance
```js
const canWalk = state => ({ walk: () => `${state.name} walks` });
const canSwim = state => ({ swim: () => `${state.name} swims` });
function createDuck(name) {
  const state = { name };
  return { ...canWalk(state), ...canSwim(state) };
}
const duck = createDuck("Donald");
console.log(duck.walk(), duck.swim());
```

### 22. `instanceof` and Type Checking
```js
class Animal {}
class Dog extends Animal {}
const d = new Dog();
console.log(d instanceof Dog);    // true
console.log(d instanceof Animal); // true
console.log(d instanceof Array);  // false
```

### 23. Method Chaining (Fluent Interface)
```js
class QueryBuilder {
  #query = "";
  select(fields) { this.#query += `SELECT ${fields} `; return this; }
  from(table) { this.#query += `FROM ${table} `; return this; }
  build() { return this.#query.trim(); }
}
console.log(new QueryBuilder().select("*").from("users").build());
```

### 24. Custom Iterator (`Symbol.iterator`)
```js
class Range {
  constructor(start, end) { this.start = start; this.end = end; }
  [Symbol.iterator]() {
    let current = this.start, end = this.end;
    return {
      next: () => current <= end
        ? { value: current++, done: false }
        : { value: undefined, done: true }
    };
  }
}
console.log([...new Range(1, 5)]); // [1, 2, 3, 4, 5]
```

### 25. Class-Based Stack Implementation
```js
class Stack {
  #items = [];
  push(item) { this.#items.push(item); }
  pop() { return this.#items.pop(); }
  peek() { return this.#items[this.#items.length - 1]; }
  isEmpty() { return this.#items.length === 0; }
}
const s = new Stack();
s.push(1); s.push(2);
console.log(s.pop()); // 2
```

---

## 2. 30+ JavaScript OOP Interview Questions

### Fundamentals

**1. What are the four pillars of OOP?**
Encapsulation, Abstraction, Inheritance, and Polymorphism.

**2. Is JavaScript truly object-oriented?**
It's prototype-based, not class-based internally. ES6 `class` syntax is syntactic sugar over prototypal inheritance.

**3. What is an object in JavaScript?**
A collection of key-value pairs (properties and methods) with an internal link to a prototype.

**4. What's the difference between a class and an object?**
A class is a blueprint/template; an object is an instance created from that blueprint.

**5. What is `this` in JavaScript?**
A reference to the object that is currently executing the function — its value depends on how the function is called, not where it's defined.

**6. How do arrow functions handle `this` differently?**
Arrow functions don't have their own `this`; they inherit it lexically from the enclosing scope.

### Classes, Constructors & `this`

**7. What does the `constructor` method do?**
It initializes a new instance's properties when `new ClassName()` is called.

**8. Can a class have multiple constructors?**
No — JavaScript classes support only one `constructor` method per class.

**9. What happens if you call a class without `new`?**
It throws a `TypeError: Class constructor cannot be invoked without 'new'`.

**10. What is a static method, and why use one?**
A method attached to the class itself, not instances — useful for utility/helper functions related to the class (e.g., `Array.isArray()`).

**11. Difference between static and instance properties?**
Static properties belong to the class; instance properties belong to each created object separately.

**12. How do you bind `this` permanently to a method?**
Using `.bind()`, an arrow function class field, or binding in the constructor.

### Inheritance & Prototypes

**13. What is prototypal inheritance?**
Objects inherit properties/methods directly from other objects via an internal `[[Prototype]]` link.

**14. What does `extends` do under the hood?**
It sets up the prototype chain so the subclass's prototype links to the superclass's prototype.

**15. What is `super` used for?**
To call the parent class's constructor or access parent methods from a subclass.

**16. Can you have multiple inheritance in JS?**
Not directly — JS supports single inheritance via `extends`, but mixins simulate multiple inheritance.

**17. What's the difference between `__proto__` and `prototype`?**
`prototype` is a property on constructor functions/classes; `__proto__` is the actual link an instance uses to access its prototype.

**18. How does method lookup work in the prototype chain?**
JS searches the object itself first, then walks up `__proto__` links until it finds the property or reaches `null`.

### Encapsulation & Abstraction

**19. How do you achieve true privacy in JS classes?**
Using private class fields/methods with the `#` syntax (or closures pre-ES2022).

**20. What's the difference between encapsulation and abstraction?**
Encapsulation hides *data* (implementation details); abstraction hides *complexity* (exposes only relevant behavior).

**21. Why use getters/setters instead of public properties?**
They let you validate, compute, or control access to a property without changing the external API.

**22. Can private fields be accessed outside the class?**
No — accessing `#field` outside the defining class throws a `SyntaxError`.

**23. What is a WeakMap-based privacy pattern?**
An older technique storing private data in a `WeakMap` keyed by instance, before `#` syntax existed.

**24. How does abstraction simplify APIs?**
By exposing simple public methods while hiding internal logic — the caller doesn't need to know *how* it works, just *what* it does.

### Polymorphism & Design

**25. What is method overriding?**
When a subclass provides its own implementation of a method already defined in its parent class.

**26. Does JavaScript support method overloading?**
Not natively — you simulate it by checking argument types/counts inside a single method.

**27. What is duck typing?**
"If it walks like a duck and quacks like a duck…" — JS often cares about an object's shape/behavior rather than its actual type.

**28. What's the difference between composition and inheritance?**
Inheritance models an "is-a" relationship; composition models a "has-a" relationship by combining smaller objects/behaviors.

**29. Why is "favor composition over inheritance" common advice?**
Deep inheritance chains become rigid and fragile; composition is more flexible and avoids tight coupling.

**30. What is the Liskov Substitution Principle, and does JS enforce it?**
Subtypes should be replaceable with their base type without breaking behavior. JS doesn't enforce this — it's a design discipline developers must follow.

### Tricky / Advanced

**31. Why can't arrow functions be used as class methods needing dynamic `this`?**
Because arrow functions lock `this` to the surrounding lexical scope at definition time, not the calling object.

**32. What happens when you `console.log` a class instance?**
It shows the object's own enumerable properties, prefixed with the class name (not inherited prototype methods).

**33. Are class fields added before or after the constructor runs?**
Instance fields are initialized before the constructor body executes (but after `super()` in subclasses).

**34. What is the difference between `Object.freeze()` and private fields?**
`Object.freeze()` prevents changes to an object's own properties but doesn't hide them; private fields hide them from outside access entirely.

---

## 3. FAANG-Level Interview Questions

These go beyond definitions — they test design thinking and how you apply OOP under real constraints.

**1. Design a class hierarchy for a ride-sharing app (Driver, Rider, Vehicle, Trip).**
*Look for:* sensible "is-a" vs "has-a" decisions, avoiding god classes, and using composition for `Vehicle` inside `Driver` rather than inheritance.

**2. How would you make an object immutable in JavaScript while still using classes?**
*Approach:* combine `Object.freeze()` in the constructor with private fields and no setters, or return frozen copies from methods.

**3. Implement a caching layer as a class without exposing its internal storage.**
```js
class Cache {
  #store = new Map();
  #maxSize;
  constructor(maxSize = 100) { this.#maxSize = maxSize; }
  set(key, value) {
    if (this.#store.size >= this.#maxSize) {
      this.#store.delete(this.#store.keys().next().value); // evict oldest
    }
    this.#store.set(key, value);
  }
  get(key) { return this.#store.get(key); }
}
```

**4. How would you design a plugin system using OOP principles?**
*Look for:* an abstract base `Plugin` class/interface pattern, a registry, and loose coupling so plugins can be added without modifying core code (Open/Closed Principle).

**5. Explain how you'd refactor a 500-line class into something maintainable.**
*Look for:* Single Responsibility Principle — splitting by responsibility, extracting composed helper classes, and reducing constructor complexity.

**6. Design a notification system supporting Email, SMS, and Push — extensible for future channels.**
*Approach:* Strategy pattern — a common `Notifier` interface, each channel implements `send()`, and a `NotificationService` depends on the abstraction, not concrete classes.

**7. What's the risk of deep inheritance chains in a large codebase, and how do you avoid it?**
*Look for:* fragile base class problem, tight coupling, difficulty testing — mitigated with composition and smaller, focused interfaces.

**8. How would you implement thread-safe-like state management in JS given it's single-threaded?**
*Look for:* understanding the event loop — race conditions still occur with async code; discuss queuing/locks via Promises.

**9. Design a rate limiter as a reusable class.**
*Look for:* encapsulated state (timestamps/tokens), a clean public API (`allow()`), and configurability (window size, max requests).

**10. How would you test a class that has private fields?**
*Look for:* testing through the public API only — private state should never need direct test access; if it does, it may signal a design smell.

**11. Compare the Strategy pattern and Template Method pattern with real examples.**
*Look for:* Strategy swaps a whole algorithm via composition; Template Method defines a fixed skeleton in a base class with steps overridden by subclasses.

**12. How would you design a class to be both extensible and closed for modification (Open/Closed Principle)?**
*Look for:* abstract base classes/interfaces, dependency injection, and avoiding `switch`/`if` chains on type in favor of polymorphism.

---

## 4. Machine Coding Questions

Timed, hands-on problems — design and implement a working solution, not just talk theory.

**1. Parking Lot System**
Design classes for `ParkingLot`, `ParkingSpot`, and `Vehicle` (car/bike/truck). Support spot allocation, availability checks, and billing on exit.

**2. Library Management System**
Model `Book`, `Member`, and `Library` classes. Support borrowing, returning, due dates, and fine calculation.

**3. Build an Event Emitter from Scratch**
Implement `on`, `off`, `emit`, and `once` without using Node's built-in `EventEmitter`.

**4. LRU Cache**
Implement a Least Recently Used cache class with O(1) `get`/`put` using a Map or a doubly linked list + hash map.

**5. Tic-Tac-Toe Game Engine**
Design `Board`, `Player`, and `Game` classes. Support win detection, draw detection, and turn management.

**6. Shopping Cart System**
Model `Product`, `CartItem`, and `Cart` classes. Support adding/removing items, quantity updates, discounts, and total calculation.

**7. ATM Machine Simulation**
Design `Account`, `Card`, and `ATM` classes. Support PIN validation, withdrawal limits, and balance checks.

**8. Debounce and Throttle as Reusable Classes**
Implement both as classes with a `.run(fn)` method, encapsulating timers internally.

**9. Elevator System**
Design `Elevator` and `ElevatorController` classes. Support request queuing and direction-based scheduling (basic SCAN algorithm).

**10. Pub/Sub (Publish-Subscribe) System**
Build a `PubSub` class supporting multiple topics, multiple subscribers per topic, and unsubscribe functionality.

> 💡 **Tip:** For machine coding rounds, prioritize a working solution with clean class boundaries over premature optimization. Interviewers care about your OOP design decisions as much as correctness.

---

## 5. Final OOP Cheat Sheet

### The Four Pillars
| Pillar | Meaning | JS Example |
|---|---|---|
| **Encapsulation** | Bundle data + behavior, hide internals | `#privateField` |
| **Abstraction** | Expose only what's necessary | Public methods calling hidden private ones |
| **Inheritance** | Reuse behavior from another class | `class Dog extends Animal` |
| **Polymorphism** | Same interface, different behavior | Overridden `speak()` per subclass |

### Class Syntax Quick Reference
```js
class MyClass extends ParentClass {
  static staticProp = "shared across all instances";
  #privateField = "hidden from outside";
  publicField = "visible from outside";

  constructor(...args) {
    super(...args);      // must call before using `this` in a subclass
    this.field = args[0];
  }

  get computed() { return this.#privateField.toUpperCase(); }
  set computed(v) { this.#privateField = v; }

  #privateMethod() { /* internal use only */ }

  publicMethod() {
    return this.#privateMethod();
  }

  static staticMethod() { /* called on the class, not instances */ }
}
```

### Key Concepts at a Glance
- **`this`** → depends on *how* a function is called (implicit binding), except arrow functions (lexical `this`).
- **`super()`** → must be called before accessing `this` in a subclass constructor.
- **Prototype chain** → property lookup walks up `__proto__` links until found or `null`.
- **`instanceof`** → checks if a prototype exists anywhere in an object's chain.
- **`#field`** → true private state, enforced by the language, not convention.
- **Static members** → belong to the class, shared across all instances, accessed via `ClassName.member`.
- **Composition > Inheritance** → prefer combining small objects/behaviors over deep class hierarchies.

### Common Design Patterns Cheat Table
| Pattern | Use Case |
|---|---|
| Factory | Create objects without exposing instantiation logic |
| Singleton | Ensure only one instance exists globally |
| Builder | Construct complex objects step-by-step |
| Observer | React to events (pub/sub, event emitters) |
| Strategy | Swap algorithms/behaviors at runtime |
| Mixin | Share reusable behavior across unrelated classes |

---

## 6. Complete Summary

This repository takes you from **fundamentals to FAANG-level readiness** in JavaScript OOP:

- Practiced **25 real coding examples** covering every core concept — classes, inheritance, encapsulation, polymorphism, and common design patterns.
- Reviewed **30+ interview questions** with concise, interview-ready answers.
- Tackled **FAANG-level design questions** that test judgment, not just definitions.
- Solved **machine coding problems** that mirror real timed interview rounds.
- Condensed everything into a **one-page cheat sheet** for fast revision.

**How to use this repo effectively:**
1. Work through the 25 coding examples hands-on — type them out, don't just read.
2. Self-test with the interview questions before checking the answers.
3. Attempt the FAANG-level and machine coding questions under a timer (30–45 min each).
4. Review the cheat sheet the night before an interview.

**Golden rule:** In JavaScript, OOP is a *tool*, not a religion — classes and prototypes exist to organize code clearly. The best interview answers show you know *when* to use inheritance, *when* to use composition, and *why*.

---

### 🤝 Contributing
Pull requests are welcome — add new examples, questions, or corrections via a PR.

### 📄 License
MIT — free to use, share, and adapt.