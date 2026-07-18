# JavaScript Prototype ⭐⭐⭐⭐⭐

> **Prototypes are one of the most frequently asked JavaScript interview topics.**
>
> Understanding prototypes is essential because **JavaScript uses prototype-based inheritance**, not classical inheritance like Java or C++.

---

# Table of Contents

1. What is a Prototype?
2. Why Do We Need Prototypes?
3. Prototype Chain
4. `__proto__`
5. `prototype`
6. `constructor`
7. Prototype-based Inheritance
8. `Object.create()`
9. Prototype vs `__proto__`
10. Prototype vs Class
11. Coding Examples
12. Common Interview Questions
13. Summary

---

# 1. What is a Prototype?

Every JavaScript object has an internal link to another object called its **prototype**.

When you try to access a property or method that doesn't exist on an object, JavaScript automatically looks for it in the object's prototype.

Example

```javascript
const person = {
  name: "John",
};

console.log(person.toString());
```

Even though `toString()` is not defined on `person`, it works because it is inherited from `Object.prototype`.

---

## Visualization

```
person

↓

Object.prototype

↓

null
```

This lookup process is called the **Prototype Chain**.

---

# 2. Why Do We Need Prototypes?

Without prototypes, every object would need its own copy of every method.

Example (Bad)

```javascript
function User(name) {
  this.name = name;

  this.sayHello = function () {
    console.log("Hello");
  };
}

const user1 = new User("John");
const user2 = new User("Alice");
```

Here, each object gets a separate copy of `sayHello()`, wasting memory.

---

### Better Using Prototype

```javascript
function User(name) {
  this.name = name;
}

User.prototype.sayHello = function () {
  console.log("Hello");
};

const user1 = new User("John");
const user2 = new User("Alice");
```

Now all instances share the same method.

---

# 3. Prototype Chain

When accessing a property, JavaScript searches in this order:

1. The object itself.
2. Its prototype.
3. The prototype's prototype.
4. Continues until `null`.

Example

```javascript
const person = {
  name: "John",
};

console.log(person.hasOwnProperty("name"));
```

`hasOwnProperty()` is not defined on `person`.

JavaScript finds it in `Object.prototype`.

---

## Chain Visualization

```
person

↓

Object.prototype

↓

null
```

---

## Array Example

```javascript
const arr = [1, 2, 3];

arr.push(4);
```

Lookup

```
arr

↓

Array.prototype

↓

Object.prototype

↓

null
```

---

# 4. `__proto__`

`__proto__` is a property that references an object's prototype.

```javascript
const obj = {};

console.log(obj.__proto__);
```

Output

```
Object.prototype
```

Example

```javascript
const animal = {
  eat() {
    console.log("Eating");
  },
};

const dog = {
  bark() {
    console.log("Woof");
  },
};

dog.__proto__ = animal;

dog.eat();
```

Output

```
Eating
```

> ⚠️ `__proto__` is considered legacy. Prefer `Object.getPrototypeOf()` and `Object.setPrototypeOf()` in modern JavaScript.

---

# 5. `prototype`

`prototype` is **not** the same as `__proto__`.

Only **functions (including constructor functions and classes)** have a `prototype` property.

Example

```javascript
function Person() {}

console.log(Person.prototype);
```

Output

```
{}
```

When you create an object using `new`:

```javascript
const user = new Person();
```

JavaScript sets:

```
user.__proto__ === Person.prototype
```

Result

```
true
```

---

# 6. `constructor`

Every object created by a constructor function has a reference back to that constructor.

```javascript
function Person(name) {
  this.name = name;
}

const user = new Person("John");

console.log(user.constructor);
```

Output

```
Person
```

Check

```javascript
console.log(user.constructor === Person);
```

Output

```
true
```

---

# 7. Prototype-based Inheritance

Objects can inherit properties and methods from other objects through the prototype chain.

Example

```javascript
const animal = {
  eat() {
    console.log("Eating");
  },
};

const dog = Object.create(animal);

dog.bark = function () {
  console.log("Woof");
};

dog.eat();
dog.bark();
```

Output

```
Eating
Woof
```

Inheritance Chain

```
dog

↓

animal

↓

Object.prototype

↓

null
```

---

# 8. `Object.create()`

`Object.create()` creates a new object with the specified prototype.

Syntax

```javascript
Object.create(prototypeObject);
```

Example

```javascript
const person = {
  greet() {
    console.log("Hello");
  },
};

const user = Object.create(person);

user.greet();
```

Output

```
Hello
```

---

## Adding Properties

```javascript
const person = {
  country: "Pakistan",
};

const user = Object.create(person);

user.name = "Faizan";

console.log(user.name);
console.log(user.country);
```

Output

```
Faizan
Pakistan
```

---

# 9. `prototype` vs `__proto__`

| `prototype` | `__proto__` |
|-------------|-------------|
| Property of constructor functions | Property of objects |
| Used to define shared methods | Used to access an object's prototype |
| Exists on functions | Exists on objects |
| Used during object creation with `new` | Represents the object's internal prototype link |

Example

```javascript
function User() {}

const user = new User();

console.log(user.__proto__ === User.prototype);
```

Output

```
true
```

---

# 10. Prototype vs Class

ES6 classes are **syntactic sugar** over prototypes.

Class

```javascript
class Person {
  greet() {
    console.log("Hello");
  }
}
```

Equivalent Prototype Version

```javascript
function Person() {}

Person.prototype.greet = function () {
  console.log("Hello");
};
```

Both use the prototype chain internally.

---

# 11. Coding Examples

## Example 1

```javascript
function Car(model) {
  this.model = model;
}

Car.prototype.drive = function () {
  console.log(`${this.model} is driving`);
};

const car = new Car("Tesla");

car.drive();
```

Output

```
Tesla is driving
```

---

## Example 2

```javascript
const parent = {
  greet() {
    console.log("Hi");
  },
};

const child = Object.create(parent);

child.greet();
```

Output

```
Hi
```

---

## Example 3

```javascript
const obj = {};

console.log(
  Object.getPrototypeOf(obj) === Object.prototype
);
```

Output

```
true
```

---

## Example 4

```javascript
function User() {}

const user = new User();

console.log(user instanceof User);
```

Output

```
true
```

`instanceof` checks the prototype chain.

---

# Prototype Chain Diagram

```
const arr = [1, 2, 3];

        arr
         │
         ▼
Array.prototype
         │
         ▼
Object.prototype
         │
         ▼
        null
```

---

# Common Interview Questions

## Q1. What is a prototype?

A prototype is an object from which another object inherits properties and methods.

---

## Q2. What is the Prototype Chain?

The Prototype Chain is the sequence of prototype lookups JavaScript performs when searching for a property or method.

---

## Q3. Difference between `prototype` and `__proto__`?

| `prototype` | `__proto__` |
|-------------|-------------|
| Belongs to constructor functions | Belongs to object instances |
| Used to define shared members | References the object's prototype |

---

## Q4. What does the `new` keyword do?

When using `new`:

1. Creates a new object.
2. Sets the new object's internal prototype (`[[Prototype]]`) to the constructor's `prototype`.
3. Binds `this` to the new object.
4. Executes the constructor function.
5. Returns the new object (unless the constructor explicitly returns another object).

---

## Q5. What is `Object.create()`?

`Object.create()` creates a new object and sets its prototype to the specified object.

---

## Q6. How does JavaScript implement inheritance?

JavaScript implements inheritance through the **prototype chain**, where objects inherit properties and methods from other objects linked as their prototypes.

---

## Q7. Are ES6 classes different from prototypes?

No.

ES6 classes are syntactic sugar over JavaScript's existing prototype-based inheritance model.

---

# Summary

After completing this topic, you should understand:

- ✅ What a prototype is
- ✅ Why prototypes are used
- ✅ Prototype Chain
- ✅ `__proto__`
- ✅ `prototype`
- ✅ `constructor`
- ✅ Prototype-based inheritance
- ✅ `Object.create()`
- ✅ Difference between `prototype` and `__proto__`
- ✅ How classes use prototypes internally
- ✅ Common interview questions

---

## Interview Tip ⭐⭐⭐⭐⭐

One of the most common JavaScript interview questions is:

> **Explain the difference between `prototype`, `__proto__`, and the Prototype Chain.**

A strong answer is:

- **`prototype`** is a property of constructor functions and classes. It defines the properties and methods that instances created with `new` will inherit.
- **`__proto__`** (or the internal `[[Prototype]]`) is a property of an object instance that points to its prototype. Although `__proto__` exists in many environments, modern code should use `Object.getPrototypeOf()` and `Object.setPrototypeOf()` instead.
- The **Prototype Chain** is JavaScript's mechanism for property lookup: if a property isn't found on an object, JavaScript checks its prototype, then the prototype's prototype, and continues until it reaches `null`.