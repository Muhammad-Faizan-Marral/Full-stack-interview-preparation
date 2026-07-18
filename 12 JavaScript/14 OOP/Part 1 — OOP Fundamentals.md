# JavaScript OOP (Object-Oriented Programming) - Part 1

> Learn Object-Oriented Programming in JavaScript from basics to advanced with practical examples.

---

# Table of Contents

1. What is OOP?
2. Why OOP?
3. Objects
4. Classes
5. ES6 Classes
6. Constructor
7. this Keyword
8. new Keyword
9. Creating Objects
10. Object Literals
11. Coding Examples
12. Summary

---

# What is OOP?

**Object-Oriented Programming (OOP)** is a programming paradigm where data and behavior are organized into **objects**.

An object contains:

- Properties (Data)
- Methods (Functions)

Instead of writing everything separately, OOP groups related data and functions together.

### Real World Example

Think about a **Car**.

A car has:

Properties

- Brand
- Color
- Speed

Methods

- Start()
- Stop()
- Accelerate()

JavaScript object looks exactly like this.

```javascript
const car = {
  brand: "Toyota",
  color: "Black",

  start() {
    console.log("Car Started");
  }
};

car.start();
```

Output

```
Car Started
```

---

# Why OOP?

Without OOP

- Duplicate code
- Difficult to maintain
- Hard to reuse
- Hard to scale

With OOP

✅ Reusable Code

✅ Organized Code

✅ Easier Maintenance

✅ Better Readability

✅ Real-world Modeling

Imagine creating 100 users.

Without OOP

```javascript
const user1 = {
  name: "Ali"
};

const user2 = {
  name: "Ahmed"
};

const user3 = {
  name: "John"
};
```

Lots of repeated code.

With OOP

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
}

const u1 = new User("Ali");
const u2 = new User("Ahmed");
const u3 = new User("John");
```

Cleaner and reusable.

---

# Objects

An object is a collection of key-value pairs.

Example

```javascript
const person = {
  name: "Faizan",
  age: 23,
  city: "Lahore"
};
```

Property Access

Dot Notation

```javascript
console.log(person.name);
```

Output

```
Faizan
```

Bracket Notation

```javascript
console.log(person["age"]);
```

Output

```
23
```

Updating Property

```javascript
person.city = "Islamabad";
```

Adding Property

```javascript
person.country = "Pakistan";
```

Deleting Property

```javascript
delete person.age;
```

---

# Classes

A class is a blueprint for creating objects.

Think of it like a template.

Real World

Class → Car Blueprint

Objects

- BMW
- Audi
- Honda

All cars are created from the same blueprint.

Syntax

```javascript
class Person {

}
```

Creating Object

```javascript
class Person {}

const p1 = new Person();

console.log(p1);
```

---

# ES6 Classes

Before ES6, constructor functions were used.

ES6 introduced the class keyword.

Example

```javascript
class Student {
  constructor(name) {
    this.name = name;
  }

  study() {
    console.log(this.name + " is studying");
  }
}

const s1 = new Student("Faizan");

s1.study();
```

Output

```
Faizan is studying
```

Advantages

- Cleaner syntax
- Easier inheritance
- Better readability
- Similar to Java/C#

---

# Constructor

A constructor is a special method that runs automatically whenever a new object is created.

Syntax

```javascript
class Person {

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

}
```

Creating Object

```javascript
const p1 = new Person("Ali", 22);

console.log(p1);
```

Output

```
Person {
  name: 'Ali',
  age: 22
}
```

Constructor Rules

- Only one constructor per class
- Automatically called
- Used for initialization

Wrong

```javascript
class Person {

  constructor(){}

  constructor(){}
}
```

This throws an error.

---

# this Keyword

`this` refers to the current object.

Example

```javascript
class Car {

  constructor(brand) {
    this.brand = brand;
  }

  showBrand() {
    console.log(this.brand);
  }

}

const c1 = new Car("BMW");

c1.showBrand();
```

Output

```
BMW
```

Without `this`

```javascript
class Car {

  constructor(brand) {
    brand = brand;
  }

}
```

Nothing gets stored inside the object.

Correct

```javascript
this.brand = brand;
```

---

# new Keyword

The `new` keyword creates an object from a class.

Example

```javascript
class User {

  constructor(name) {
    this.name = name;
  }

}

const user = new User("Faizan");
```

What happens internally?

```text
new User()

↓

1. Empty object created

{}

↓

2. this points to that object

↓

3. constructor executes

↓

4. Properties assigned

↓

5. Object returned
```

Without `new`

```javascript
const user = User("Ali");
```

Error

```
Class constructor User cannot be invoked without 'new'
```

---

# Creating Objects

## Method 1

Object Literal

```javascript
const person = {
  name: "Ali",
  age: 20
};
```

---

## Method 2

Using new Object()

```javascript
const person = new Object();

person.name = "Ali";
person.age = 20;
```

---

## Method 3

Using Class

```javascript
class Person {

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

}

const person = new Person("Ali", 20);
```

---

## Method 4

Constructor Function (Old JavaScript)

```javascript
function Person(name, age) {

  this.name = name;
  this.age = age;

}

const person = new Person("Ali", 20);
```

---

# Object Literals

The easiest way to create objects.

Example

```javascript
const laptop = {

  brand: "HP",

  ram: "16GB",

  start() {
    console.log("Laptop Started");
  }

};

laptop.start();
```

Output

```
Laptop Started
```

Advantages

- Simple
- Easy
- Fast
- Best for small objects

Limitations

- Code duplication
- Not reusable
- Hard for large applications

---

# Coding Examples

## Example 1

Student

```javascript
class Student {

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    console.log(`Hi, I am ${this.name}`);
  }

}

const s1 = new Student("Faizan", 23);

s1.introduce();
```

Output

```
Hi, I am Faizan
```

---

## Example 2

Bank Account

```javascript
class BankAccount {

  constructor(owner, balance) {
    this.owner = owner;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
  }

}

const account = new BankAccount("Ali", 1000);

account.deposit(500);

console.log(account.balance);
```

Output

```
1500
```

---

## Example 3

Mobile

```javascript
class Mobile {

  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }

  details() {
    console.log(`${this.brand} ${this.model}`);
  }

}

const phone = new Mobile("Samsung", "S25");

phone.details();
```

Output

```
Samsung S25
```

---

## Example 4

Employee

```javascript
class Employee {

  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }

  showSalary() {
    console.log(`${this.name} earns ${this.salary}`);
  }

}

const emp = new Employee("Ahmed", 70000);

emp.showSalary();
```

Output

```
Ahmed earns 70000
```

---

# Summary

| Topic | Description |
|--------|-------------|
| OOP | Programming using objects |
| Object | Collection of properties and methods |
| Class | Blueprint for creating objects |
| ES6 Class | Modern syntax for classes |
| Constructor | Initializes object properties |
| this | Refers to the current object |
| new | Creates a new object instance |
| Object Literal | Simplest way to create objects |
| Creating Objects | Multiple ways including classes, constructor functions, and object literals |
