# JavaScript OOP (Object-Oriented Programming) - Part 3

> Learn advanced ES6+ class features with practical examples and interview-focused explanations.

---

# Table of Contents

1. extends
2. super()
3. Static Methods
4. Static Properties
5. Private Fields (#)
6. Public Fields
7. Getters
8. Setters
9. Property Descriptors
10. Summary
11. Interview Questions

---

# extends

## What is `extends`?

The `extends` keyword is used to create a child class from an existing parent class.

It allows the child class to inherit:

- Properties
- Methods

This is known as **Inheritance**.

---

## Syntax

```javascript
class Parent {

}

class Child extends Parent {

}
```

---

## Example

```javascript
class Animal {
  eat() {
    console.log("Eating...");
  }
}

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

## Multi-Level Inheritance

```javascript
class Animal {
  eat() {
    console.log("Eating...");
  }
}

class Mammal extends Animal {
  walk() {
    console.log("Walking...");
  }
}

class Dog extends Mammal {
  bark() {
    console.log("Barking...");
  }
}

const dog = new Dog();

dog.eat();
dog.walk();
dog.bark();
```

Output

```
Eating...
Walking...
Barking...
```

---

# super()

## What is `super()`?

`super()` refers to the parent class.

It is mainly used to:

- Call the parent constructor
- Access parent methods

---

## Calling Parent Constructor

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
}

class Student extends Person {
  constructor(name, course) {
    super(name);
    this.course = course;
  }
}

const student = new Student("Faizan", "JavaScript");

console.log(student);
```

Output

```
Student {
  name: 'Faizan',
  course: 'JavaScript'
}
```

---

## Calling Parent Method

```javascript
class Animal {
  speak() {
    console.log("Animal Sound");
  }
}

class Dog extends Animal {
  speak() {
    super.speak();
    console.log("Dog Bark");
  }
}

const dog = new Dog();

dog.speak();
```

Output

```
Animal Sound
Dog Bark
```

---

## Important Rule

Inside a child constructor:

```javascript
class Child extends Parent {
  constructor() {
    super();

    // Now this can be used
    this.name = "Faizan";
  }
}
```

Using `this` before `super()` causes an error.

Wrong

```javascript
class Child extends Parent {
  constructor() {
    this.name = "Faizan";

    super();
  }
}
```

Output

```
ReferenceError:
Must call super constructor before using 'this'
```

---

# Static Methods

## What are Static Methods?

Static methods belong to the class itself, **not** to object instances.

Call them using:

```javascript
ClassName.method()
```

---

## Example

```javascript
class MathHelper {
  static add(a, b) {
    return a + b;
  }
}

console.log(MathHelper.add(5, 3));
```

Output

```
8
```

---

## Cannot Access from Object

```javascript
const math = new MathHelper();

math.add(5, 3);
```

Output

```
TypeError
```

---

## Real Example

```javascript
class User {
  static isValidAge(age) {
    return age >= 18;
  }
}

console.log(User.isValidAge(20));
```

Output

```
true
```

---

# Static Properties

## What are Static Properties?

Static properties belong to the class rather than individual objects.

---

## Example

```javascript
class User {
  static company = "OpenAI";
}

console.log(User.company);
```

Output

```
OpenAI
```

---

## Instance Cannot Access Static Property

```javascript
const user = new User();

console.log(user.company);
```

Output

```
undefined
```

---

## Counter Example

```javascript
class User {
  static totalUsers = 0;

  constructor() {
    User.totalUsers++;
  }
}

new User();
new User();
new User();

console.log(User.totalUsers);
```

Output

```
3
```

---

# Private Fields (#)

## What are Private Fields?

Private fields can only be accessed inside the class.

They start with:

```javascript
#
```

---

## Example

```javascript
class BankAccount {
  #balance = 0;

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();

account.deposit(500);

console.log(account.getBalance());
```

Output

```
500
```

---

## Cannot Access Directly

```javascript
console.log(account.#balance);
```

Output

```
SyntaxError
```

---

## Private Method

```javascript
class Car {
  start() {
    this.#engine();
  }

  #engine() {
    console.log("Engine Started");
  }
}

const car = new Car();

car.start();
```

Output

```
Engine Started
```

---

# Public Fields

## What are Public Fields?

Public fields are accessible from anywhere.

---

## Example

```javascript
class Student {
  name = "Faizan";
}

const student = new Student();

console.log(student.name);
```

Output

```
Faizan
```

---

## Public Fields with Constructor

```javascript
class Student {
  age = 23;

  constructor(name) {
    this.name = name;
  }
}

const student = new Student("Ali");

console.log(student.name);
console.log(student.age);
```

Output

```
Ali
23
```

---

# Getters

## What is a Getter?

A getter allows reading a property like a normal variable while executing a function behind the scenes.

Syntax

```javascript
get propertyName() {

}
```

---

## Example

```javascript
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.width * this.height;
  }
}

const rect = new Rectangle(10, 5);

console.log(rect.area);
```

Output

```
50
```

Notice:

No parentheses.

Correct

```javascript
rect.area
```

Wrong

```javascript
rect.area()
```

---

# Setters

## What is a Setter?

A setter controls how values are assigned.

It allows validation before updating data.

---

## Example

```javascript
class User {
  set age(value) {
    if (value < 0) {
      console.log("Invalid Age");
      return;
    }

    this._age = value;
  }

  get age() {
    return this._age;
  }
}

const user = new User();

user.age = 22;

console.log(user.age);
```

Output

```
22
```

---

## Validation Example

```javascript
const user = new User();

user.age = -10;
```

Output

```
Invalid Age
```

---

# Property Descriptors

## What are Property Descriptors?

Every object property has metadata that controls its behavior.

A property descriptor includes:

- value
- writable
- enumerable
- configurable

---

## Checking Descriptor

```javascript
const person = {
  name: "Faizan"
};

console.log(
  Object.getOwnPropertyDescriptor(person, "name")
);
```

Output

```javascript
{
  value: "Faizan",
  writable: true,
  enumerable: true,
  configurable: true
}
```

---

## writable

```javascript
const person = {};

Object.defineProperty(person, "name", {
  value: "Faizan",
  writable: false
});

person.name = "Ali";

console.log(person.name);
```

Output

```
Faizan
```

---

## enumerable

```javascript
const person = {};

Object.defineProperty(person, "name", {
  value: "Faizan",
  enumerable: false
});

console.log(Object.keys(person));
```

Output

```
[]
```

Property exists but doesn't appear during enumeration.

---

## configurable

```javascript
const person = {};

Object.defineProperty(person, "name", {
  value: "Faizan",
  configurable: false
});

delete person.name;

console.log(person.name);
```

Output

```
Faizan
```

---

## Complete Descriptor Example

```javascript
const person = {};

Object.defineProperty(person, "country", {
  value: "Pakistan",
  writable: false,
  enumerable: true,
  configurable: false
});

console.log(person.country);
```

Output

```
Pakistan
```

---

# Summary

| Concept | Description |
|----------|-------------|
| `extends` | Creates a child class from a parent class |
| `super()` | Calls parent constructor or methods |
| Static Methods | Belong to the class, not instances |
| Static Properties | Shared across all instances |
| Private Fields (`#`) | Accessible only inside the class |
| Public Fields | Accessible from anywhere |
| Getters | Read a computed property like a normal property |
| Setters | Control and validate property assignment |
| Property Descriptors | Define property behavior (`writable`, `enumerable`, `configurable`) |

---

# Interview Questions

### Q1. What is the difference between `extends` and `super()`?

- `extends` creates an inheritance relationship between classes.
- `super()` calls the parent class constructor or methods.

---

### Q2. Why use static methods?

Use static methods for utility functions or behavior that doesn't depend on a specific object instance.

---

### Q3. Can an instance access static methods?

No. Static methods must be called on the class itself.

```javascript
User.login();   // ✅
user.login();   // ❌
```

---

### Q4. What is the difference between private and public fields?

| Private Fields | Public Fields |
|---------------|---------------|
| Prefix with `#` | No prefix |
| Accessible only inside the class | Accessible from anywhere |
| Helps with encapsulation | Used for general data |

---

### Q5. Why use getters and setters?

They allow you to:

- Validate data
- Compute values dynamically
- Hide implementation details
- Maintain encapsulation

