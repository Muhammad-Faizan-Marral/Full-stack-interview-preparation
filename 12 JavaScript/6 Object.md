# Objects

Objects are one of the most fundamental data types in JavaScript. They allow you to store collections of related data and functionality using **key-value pairs**.

Almost everything in JavaScript (arrays, functions, dates, etc.) is an object or behaves like one.

---

# Table of Contents

1. What are Objects?
2. Creating Objects
3. `Object.create()`
4. `Object.assign()`
5. `Object.freeze()`
6. `Object.seal()`
7. `Object.entries()`
8. `Object.keys()`
9. `Object.values()`
10. Property Descriptors
11. Shallow Copy
12. Deep Copy
13. Optional Chaining (`?.`)
14. Nullish Coalescing (`??`)

---

# 1. What are Objects?

An object is a collection of **key-value pairs**, where:

- Keys are strings (or Symbols)
- Values can be any data type, including other objects and functions

### Syntax

```javascript
const person = {
    name: "John",
    age: 25,
    city: "Karachi"
};

console.log(person);
```

Output

```
{
  name: "John",
  age: 25,
  city: "Karachi"
}
```

### Accessing Properties

Using dot notation:

```javascript
console.log(person.name);
```

Output

```
John
```

Using bracket notation:

```javascript
console.log(person["age"]);
```

Output

```
25
```

---

# 2. Creating Objects

There are multiple ways to create objects in JavaScript.

## Object Literal (Most Common)

```javascript
const car = {
    brand: "Toyota",
    model: "Corolla"
};
```

---

## Using the `new Object()` Constructor

```javascript
const person = new Object();

person.name = "Ali";
person.age = 22;
```

---

## Using a Constructor Function

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

const user = new Person("Sara", 20);
```

---

## Using ES6 Classes

```javascript
class Person {
    constructor(name) {
        this.name = name;
    }
}

const user = new Person("John");
```

---

# 3. `Object.create()`

`Object.create()` creates a new object using another object as its prototype.

### Syntax

```javascript
Object.create(prototype);
```

### Example

```javascript
const person = {
    greet() {
        console.log("Hello");
    }
};

const student = Object.create(person);

student.greet();
```

Output

```
Hello
```

---

## Creating an Object with Properties

```javascript
const user = Object.create({}, {
    name: {
        value: "John",
        writable: true
    }
});

console.log(user.name);
```

Output

```
John
```

---

# 4. `Object.assign()`

`Object.assign()` copies properties from one or more source objects to a target object.

### Syntax

```javascript
Object.assign(target, source);
```

### Example

```javascript
const user = {
    name: "John"
};

const details = {
    age: 25
};

const result = Object.assign({}, user, details);

console.log(result);
```

Output

```
{
  name: "John",
  age: 25
}
```

---

## Cloning an Object

```javascript
const person = {
    name: "Ali"
};

const copy = Object.assign({}, person);
```

---

# 5. `Object.freeze()`

`Object.freeze()` makes an object completely immutable.

After freezing:

- Cannot add properties
- Cannot delete properties
- Cannot modify properties

### Example

```javascript
const user = {
    name: "John"
};

Object.freeze(user);

user.name = "Mike";

console.log(user.name);
```

Output

```
John
```

---

# 6. `Object.seal()`

`Object.seal()` prevents adding or removing properties, but existing properties can still be modified.

### Example

```javascript
const user = {
    name: "John"
};

Object.seal(user);

user.name = "Mike";

console.log(user.name);
```

Output

```
Mike
```

Adding a property:

```javascript
user.age = 20;
```

Nothing happens (or throws in strict mode).

---

# 7. `Object.entries()`

Returns an array of an object's key-value pairs.

### Example

```javascript
const person = {
    name: "John",
    age: 25
};

console.log(Object.entries(person));
```

Output

```javascript
[
  ["name", "John"],
  ["age", 25]
]
```

Useful for looping:

```javascript
for (const [key, value] of Object.entries(person)) {
    console.log(key, value);
}
```

---

# 8. `Object.keys()`

Returns an array containing an object's property names.

### Example

```javascript
const person = {
    name: "John",
    age: 25
};

console.log(Object.keys(person));
```

Output

```javascript
["name", "age"]
```

---

# 9. `Object.values()`

Returns an array containing an object's values.

### Example

```javascript
const person = {
    name: "John",
    age: 25
};

console.log(Object.values(person));
```

Output

```javascript
["John", 25]
```

---

# 10. Property Descriptors

Every property has a **descriptor** that defines how it behaves.

A descriptor contains:

- `value`
- `writable`
- `enumerable`
- `configurable`

### Getting a Descriptor

```javascript
const person = {
    name: "John"
};

console.log(
    Object.getOwnPropertyDescriptor(person, "name")
);
```

Output

```javascript
{
  value: "John",
  writable: true,
  enumerable: true,
  configurable: true
}
```

---

## Defining a Property

```javascript
const user = {};

Object.defineProperty(user, "id", {
    value: 101,
    writable: false,
    enumerable: true
});

console.log(user.id);
```

Output

```
101
```

Trying to modify:

```javascript
user.id = 200;
```

The value remains unchanged because `writable` is `false`.

---

# 11. Shallow Copy

A shallow copy copies only the top-level properties.

Nested objects are still shared by reference.

### Example

```javascript
const user = {
    name: "John",
    address: {
        city: "Karachi"
    }
};

const copy = { ...user };

copy.address.city = "Lahore";

console.log(user.address.city);
```

Output

```
Lahore
```

The nested object is shared between both objects.

### Ways to Create a Shallow Copy

Using the spread operator:

```javascript
const copy = { ...user };
```

Using `Object.assign()`:

```javascript
const copy = Object.assign({}, user);
```

---

# 12. Deep Copy

A deep copy duplicates both the object and all nested objects.

### Using `structuredClone()`

```javascript
const user = {
    name: "John",
    address: {
        city: "Karachi"
    }
};

const copy = structuredClone(user);

copy.address.city = "Lahore";

console.log(user.address.city);
```

Output

```
Karachi
```

---

## Using JSON (Limited)

```javascript
const copy = JSON.parse(JSON.stringify(user));
```

### Limitations

Does **not** preserve:

- Functions
- `Date`
- `Map`
- `Set`
- `undefined`
- `BigInt`
- Circular references

`structuredClone()` is the recommended modern approach for supported data types.

---

# 13. Optional Chaining (`?.`)

Optional chaining safely accesses nested properties without throwing an error if an intermediate value is `null` or `undefined`.

### Without Optional Chaining

```javascript
const user = {};

console.log(user.address.city);
```

Output

```
TypeError
```

---

### With Optional Chaining

```javascript
const user = {};

console.log(user.address?.city);
```

Output

```
undefined
```

---

## Nested Example

```javascript
const user = {
    profile: {
        name: "John"
    }
};

console.log(user.profile?.name);
console.log(user.contact?.phone);
```

Output

```
John
undefined
```

---

## Optional Chaining with Functions

```javascript
const user = {
    greet() {
        return "Hello";
    }
};

console.log(user.greet?.());
```

Output

```
Hello
```

---

# 14. Nullish Coalescing (`??`)

The nullish coalescing operator returns the right-hand value only if the left-hand value is **`null` or `undefined`**.

### Syntax

```javascript
value ?? defaultValue
```

### Example

```javascript
const username = null;

console.log(username ?? "Guest");
```

Output

```
Guest
```

---

## Difference Between `||` and `??`

Using `||`:

```javascript
console.log(0 || 100);
```

Output

```
100
```

Using `??`:

```javascript
console.log(0 ?? 100);
```

Output

```
0
```

### Why?

`||` treats all **falsy** values as false:

- `0`
- `""`
- `false`
- `NaN`
- `null`
- `undefined`

`??` only checks for:

- `null`
- `undefined`

---

## Another Example

```javascript
const settings = {
    theme: ""
};

console.log(settings.theme || "light");
```

Output

```
light
```

Using `??`:

```javascript
console.log(settings.theme ?? "light");
```

Output

```
""
```

The empty string is preserved because it is not `null` or `undefined`.

---

# `Object.freeze()` vs `Object.seal()`

| Feature | `Object.freeze()` | `Object.seal()` |
|----------|-------------------|-----------------|
| Add properties | ❌ No | ❌ No |
| Delete properties | ❌ No | ❌ No |
| Modify existing properties | ❌ No | ✅ Yes |
| Immutable | ✅ Yes | ❌ Partially |

---

# Shallow Copy vs Deep Copy

| Shallow Copy | Deep Copy |
|---------------|-----------|
| Copies top-level properties only | Copies all nested objects |
| Shares nested references | Creates independent copies |
| Faster | Slower but safer |
| Spread / `Object.assign()` | `structuredClone()` |

---

# Best Practices

- ✅ Prefer object literals (`{}`) for creating objects.
- ✅ Use `Object.assign()` or the spread operator for shallow copies.
- ✅ Use `structuredClone()` for deep copies when supported.
- ✅ Use `Object.freeze()` for immutable configuration objects.
- ✅ Use `Object.seal()` when properties should not be added or removed.
- ✅ Use optional chaining (`?.`) to safely access nested properties.
- ✅ Use nullish coalescing (`??`) instead of `||` when `0`, `false`, or `""` are valid values.

---

# Summary

After reading this guide, you should understand:

- ✅ Creating Objects
- ✅ `Object.create()`
- ✅ `Object.assign()`
- ✅ `Object.freeze()`
- ✅ `Object.seal()`
- ✅ `Object.entries()`
- ✅ `Object.keys()`
- ✅ `Object.values()`
- ✅ Property Descriptors
- ✅ Shallow Copy
- ✅ Deep Copy
- ✅ Optional Chaining (`?.`)
- ✅ Nullish Coalescing (`??`)

These concepts are essential for working with objects effectively and form the foundation for advanced topics such as **prototypes, classes, object-oriented programming, state management, and modern JavaScript development**.