# JavaScript OOP (Object-Oriented Programming) - Part 2

> Master the four pillars of Object-Oriented Programming in JavaScript with practical examples and interview-focused explanations.

---

# Table of Contents

1. Encapsulation
2. Abstraction
3. Inheritance
4. Polymorphism
5. Method Overriding
6. Method Overloading
7. Composition vs Inheritance
8. Summary

---

# Encapsulation

## What is Encapsulation?

**Encapsulation** means **bundling data (properties) and methods (functions) together into a single unit (object or class)** while restricting direct access to internal data.

In simple words:

> **Hide the internal implementation and expose only what is necessary.**

Encapsulation helps prevent accidental modification of object data.

---

## Why Encapsulation?

Benefits:

- Protects object data
- Improves security
- Makes code easier to maintain
- Reduces complexity
- Prevents invalid updates

---

## Without Encapsulation

```javascript
const bankAccount = {
  owner: "Faizan",
  balance: 5000
};

bankAccount.balance = -100000;

console.log(bankAccount.balance);
```

Output

```
-100000
```

Anyone can modify the balance directly.

---

## With Encapsulation (Private Fields)

ES2022 introduced **private fields** using `#`.

```javascript
class BankAccount {
  #balance;

  constructor(owner, balance) {
    this.owner = owner;
    this.#balance = balance;
  }

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount("Faizan", 5000);

account.deposit(1000);

console.log(account.getBalance());
```

Output

```
6000
```

Trying to access a private field directly:

```javascript
console.log(account.#balance);
```

Output

```
SyntaxError
```

---

# Abstraction

## What is Abstraction?

Abstraction means:

> **Hide unnecessary implementation details and expose only essential functionality.**

Users should know **what** something does, not **how** it works internally.

---

## Real Life Example

ATM Machine

You only know:

- Insert Card
- Enter PIN
- Withdraw Money

You don't know:

- Database Queries
- Banking Server
- Encryption
- Security Checks

That hidden complexity is **Abstraction**.

---

## Example

```javascript
class CoffeeMachine {
  makeCoffee() {
    this.#boilWater();
    this.#brewCoffee();
    console.log("Coffee Ready");
  }

  #boilWater() {
    console.log("Boiling Water...");
  }

  #brewCoffee() {
    console.log("Brewing Coffee...");
  }
}

const machine = new CoffeeMachine();

machine.makeCoffee();
```

Output

```
Boiling Water...
Brewing Coffee...
Coffee Ready
```

Users only call:

```javascript
machine.makeCoffee();
```

Internal implementation stays hidden.

---

# Inheritance

## What is Inheritance?

Inheritance allows one class to acquire properties and methods of another class.

It promotes:

- Code Reusability
- Better Organization
- Less Duplication

---

## Parent Class

```javascript
class Animal {
  eat() {
    console.log("Eating...");
  }
}
```

---

## Child Class

```javascript
class Dog extends Animal {
  bark() {
    console.log("Barking...");
  }
}

const dog = new Dog();

dog.eat();
dog.bark();
```

Output

```
Eating...
Barking...
```

---

## Using super()

`super()` calls the parent class constructor.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
}

const dog = new Dog("Tommy", "Labrador");

console.log(dog);
```

Output

```javascript
Dog {
  name: 'Tommy',
  breed: 'Labrador'
}
```

---

# Polymorphism

## What is Polymorphism?

**Poly** = Many

**Morph** = Forms

One method behaves differently depending on the object.

---

## Example

```javascript
class Animal {
  speak() {
    console.log("Animal makes sound");
  }
}

class Dog extends Animal {
  speak() {
    console.log("Dog barks");
  }
}

class Cat extends Animal {
  speak() {
    console.log("Cat meows");
  }
}

const animals = [
  new Dog(),
  new Cat(),
  new Animal()
];

animals.forEach(animal => animal.speak());
```

Output

```
Dog barks
Cat meows
Animal makes sound
```

Same method:

```javascript
speak()
```

Different behavior.

---

# Method Overriding

## What is Method Overriding?

Method overriding happens when a child class provides its own implementation of a method already defined in the parent class.

---

## Example

```javascript
class Vehicle {
  start() {
    console.log("Vehicle Started");
  }
}

class Car extends Vehicle {
  start() {
    console.log("Car Started");
  }
}

const car = new Car();

car.start();
```

Output

```
Car Started
```

Parent method is replaced by the child method.

---

## Calling Parent Method

```javascript
class Vehicle {
  start() {
    console.log("Vehicle Started");
  }
}

class Car extends Vehicle {
  start() {
    super.start();
    console.log("Car Started");
  }
}

const car = new Car();

car.start();
```

Output

```
Vehicle Started
Car Started
```

---

# Method Overloading

## What is Method Overloading?

Method overloading means:

> Multiple methods with the same name but different parameters.

Languages like:

- Java
- C#
- C++

support method overloading.

JavaScript **does not** support true method overloading.

---

## Example (Does NOT Work)

```javascript
class Calculator {
  add(a, b) {
    return a + b;
  }

  add(a, b, c) {
    return a + b + c;
  }
}

const calc = new Calculator();

console.log(calc.add(2, 3));
```

Output

```
NaN
```

The second `add()` replaces the first one.

---

## JavaScript Alternative

Use default parameters or rest parameters.

```javascript
class Calculator {
  add(...numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
  }
}

const calc = new Calculator();

console.log(calc.add(2, 3));

console.log(calc.add(2, 3, 4));

console.log(calc.add(2, 3, 4, 5));
```

Output

```
5
9
14
```

---

# Composition vs Inheritance

## Inheritance

Relationship:

> **IS-A**

Example:

- Dog is an Animal
- Car is a Vehicle

```javascript
class Animal {
  eat() {
    console.log("Eating...");
  }
}

class Dog extends Animal {}

const dog = new Dog();

dog.eat();
```

---

## Composition

Relationship:

> **HAS-A**

Instead of inheriting, objects contain other objects.

---

## Example

```javascript
class Engine {
  start() {
    console.log("Engine Started");
  }
}

class Car {
  constructor() {
    this.engine = new Engine();
  }

  drive() {
    this.engine.start();
    console.log("Driving...");
  }
}

const car = new Car();

car.drive();
```

Output

```
Engine Started
Driving...
```

Car **has an** Engine.

---

# Composition vs Inheritance

| Inheritance | Composition |
|-------------|-------------|
| IS-A relationship | HAS-A relationship |
| Uses `extends` | Uses object instances |
| Tight coupling | Loose coupling |
| Less flexible | More flexible |
| Parent-child hierarchy | Object collaboration |
| Code reuse via inheritance | Code reuse via objects |

---

## When to Use Inheritance?

Use inheritance when:

- Strong parent-child relationship exists
- Shared behavior is stable
- IS-A relationship

Examples:

- Dog → Animal
- Student → Person
- Car → Vehicle

---

## When to Use Composition?

Use composition when:

- HAS-A relationship
- Better flexibility
- Easy testing
- Reusable independent components

Examples:

- Car has an Engine
- Computer has a CPU
- House has Rooms

> **Interview Tip:** Modern JavaScript favors **Composition over Inheritance** because it creates more flexible, loosely coupled, and maintainable applications.

---

# Summary

| Concept | Description |
|----------|-------------|
| Encapsulation | Hides and protects object data |
| Abstraction | Hides implementation details |
| Inheritance | Child class inherits parent class |
| Polymorphism | Same method, different behavior |
| Method Overriding | Child replaces parent implementation |
| Method Overloading | Not supported directly in JavaScript |
| Composition | Objects contain other objects (HAS-A) |
| Inheritance | Objects extend other objects (IS-A) |

---

# Interview Questions

### Q1. What are the four pillars of OOP?

- Encapsulation
- Abstraction
- Inheritance
- Polymorphism

---

### Q2. Does JavaScript support private properties?

Yes. Using **private class fields (`#`)** introduced in ES2022.

---

### Q3. Does JavaScript support method overloading?

No. JavaScript does not support true method overloading. Use **default parameters** or **rest parameters** to achieve similar behavior.

---

### Q4. What is the difference between Composition and Inheritance?

- **Inheritance** models an **IS-A** relationship.
- **Composition** models a **HAS-A** relationship.
- Composition is generally preferred in modern JavaScript because it is more flexible and promotes loose coupling.

---
