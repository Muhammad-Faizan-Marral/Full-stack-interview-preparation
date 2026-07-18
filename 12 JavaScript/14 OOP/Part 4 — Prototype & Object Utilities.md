# JavaScript OOP - Part 4 (Prototype & Object Utilities)

## Table of Contents

1. Prototype
2. Prototype Chain
3. prototype Property
4. __proto__
5. Prototype vs Class
6. instanceof
7. hasOwnProperty()
8. Object.freeze()
9. Object.seal()
10. Object.preventExtensions()
11. Object.isFrozen()
12. Object.isSealed()
13. Object.isExtensible()
14. Practical Examples
15. Common Interview Mistakes
16. Summary

---

# 1. Prototype

Every JavaScript object has a **prototype** from which it inherits properties and methods.

```javascript
const person = {
  name: "Faizan"
};

console.log(person.toString());
```

`toString()` comes from the object's prototype.

---

# 2. Prototype Chain

When a property isn't found on an object, JavaScript looks up its prototype chain until it finds it or reaches `null`.

```javascript
const obj = {};

console.log(obj.toString());
```

---

# 3. prototype Property

Functions have a `prototype` property used when creating objects with `new`.

```javascript
function Person() {}

Person.prototype.sayHi = function () {
  console.log("Hi");
};

const p = new Person();

p.sayHi();
```

---

# 4. __proto__

`__proto__` points to an object's prototype.

```javascript
const obj = {};

console.log(obj.__proto__);
```

> Prefer `Object.getPrototypeOf()` over `__proto__`.

---

# 5. Prototype vs Class

| Prototype | Class |
|-----------|-------|
| Old syntax | Modern ES6 syntax |
| Uses functions | Uses `class` keyword |
| Same prototype system internally | Cleaner syntax |

Example:

```javascript
class User {}

function UserOld() {}
```

---

# 6. instanceof

Checks whether an object belongs to a class.

```javascript
class User {}

const user = new User();

console.log(user instanceof User);
```

Output

```
true
```

---

# 7. hasOwnProperty()

Checks if a property belongs directly to the object.

```javascript
const obj = {
  name: "Faizan"
};

console.log(obj.hasOwnProperty("name"));
```

Output

```
true
```

---

# 8. Object.freeze()

Makes an object completely immutable.

```javascript
const user = {
  name: "Ali"
};

Object.freeze(user);

user.name = "Ahmed";

console.log(user.name);
```

Output

```
Ali
```

---

# 9. Object.seal()

Allows updating existing properties but prevents adding or deleting properties.

```javascript
const user = {
  name: "Ali"
};

Object.seal(user);

user.name = "Ahmed";

console.log(user);
```

Output

```
{ name: "Ahmed" }
```

---

# 10. Object.preventExtensions()

Prevents adding new properties.

```javascript
const user = {
  name: "Ali"
};

Object.preventExtensions(user);

user.age = 20;

console.log(user);
```

Output

```
{ name: "Ali" }
```

---

# 11. Object.isFrozen()

Checks if an object is frozen.

```javascript
const obj = {};

Object.freeze(obj);

console.log(Object.isFrozen(obj));
```

Output

```
true
```

---

# 12. Object.isSealed()

Checks if an object is sealed.

```javascript
const obj = {};

Object.seal(obj);

console.log(Object.isSealed(obj));
```

Output

```
true
```

---

# 13. Object.isExtensible()

Checks whether new properties can be added.

```javascript
const obj = {};

console.log(Object.isExtensible(obj));
```

Output

```
true
```

---

# 14. Practical Examples

### Freeze Configuration

```javascript
const config = {
  API_URL: "https://api.example.com"
};

Object.freeze(config);
```

### Seal User

```javascript
const user = {
  name: "Faizan"
};

Object.seal(user);
```

### instanceof

```javascript
console.log([] instanceof Array);
```

Output

```
true
```

---

# 15. Common Interview Mistakes

❌ Confusing `prototype` with `__proto__`

❌ Using `__proto__` in production

❌ Thinking `freeze()` is deep (it's shallow)

❌ Forgetting `hasOwnProperty()` only checks own properties

❌ Assuming JavaScript classes don't use prototypes

---

# 16. Summary

| Concept | Purpose |
|---------|---------|
| Prototype | Inheritance mechanism |
| Prototype Chain | Lookup chain for properties |
| prototype | Property of constructor functions |
| __proto__ | Reference to prototype |
| instanceof | Checks object type |
| hasOwnProperty() | Checks own property |
| Object.freeze() | Makes object immutable |
| Object.seal() | Prevents add/delete |
| Object.preventExtensions() | Prevents adding properties |
| Object.isFrozen() | Checks frozen state |
| Object.isSealed() | Checks sealed state |
| Object.isExtensible() | Checks extensibility |

---

## Interview Tip

Remember the difference:

- **freeze()** → ❌ Add ❌ Delete ❌ Update
- **seal()** → ❌ Add ❌ Delete ✅ Update
- **preventExtensions()** → ❌ Add ✅ Update ✅ Delete