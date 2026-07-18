# README Part 18 — JSON (JavaScript Object Notation)

> Complete Guide to JSON, Parsing, Stringifying, Serialization, and Circular References for Interviews & Real-World Development

---

# Table of Contents

1. What is JSON?
2. JSON Syntax
3. JavaScript Object vs JSON
4. JSON.parse()
5. JSON.stringify()
6. Serialization
7. Deserialization
8. Circular References
9. Interview Questions
10. Best Practices
11. Summary

---

# What is JSON?

JSON stands for **JavaScript Object Notation**.

It is a lightweight data-interchange format used for exchanging data between:

- Client ↔ Server
- APIs
- Databases
- Configuration files

Although inspired by JavaScript object syntax, JSON is a language-independent format.

Example

```json
{
    "name": "Faizan",
    "age": 22,
    "isStudent": true
}
```

---

# JSON Syntax

Rules

- Data is stored as key-value pairs.
- Keys must be enclosed in **double quotes**.
- String values must use **double quotes**.
- No comments are allowed.
- No functions or `undefined`.

Valid JSON

```json
{
    "name": "Ali",
    "age": 25,
    "city": "Lahore"
}
```

Invalid JSON

```javascript
{
    name: "Ali",      // ❌ Keys are not quoted
    age: undefined,   // ❌ undefined is not allowed
    greet() {}        // ❌ Functions are not allowed
}
```

---

# JavaScript Object vs JSON

JavaScript Object

```javascript
const user = {
    name: "Ali",
    age: 25,
    greet() {
        console.log("Hello");
    }
};
```

JSON

```json
{
    "name": "Ali",
    "age": 25
}
```

### Differences

| JavaScript Object | JSON |
|-------------------|------|
| Keys may be unquoted | Keys must use double quotes |
| Can contain functions | Cannot contain functions |
| Can contain `undefined` | `undefined` is not valid |
| Used inside JavaScript | Used for data exchange |

---

# JSON.parse()

`JSON.parse()` converts a JSON string into a JavaScript object.

Syntax

```javascript
JSON.parse(jsonString);
```

Example

```javascript
const json = '{"name":"Ali","age":25}';

const user = JSON.parse(json);

console.log(user.name);
```

Output

```
Ali
```

---

# Parsing Arrays

```javascript
const json = '["Apple", "Banana", "Orange"]';

const fruits = JSON.parse(json);

console.log(fruits);
```

Output

```
["Apple", "Banana", "Orange"]
```

---

# Invalid JSON

```javascript
const json = "{name:'Ali'}";

JSON.parse(json);
```

Output

```
SyntaxError
```

Always use `try...catch` when parsing external data.

```javascript
try {
    const user = JSON.parse(json);
} catch (error) {
    console.log("Invalid JSON");
}
```

---

# JSON.stringify()

`JSON.stringify()` converts a JavaScript object into a JSON string.

Syntax

```javascript
JSON.stringify(object);
```

Example

```javascript
const user = {
    name: "Ali",
    age: 25
};

const json = JSON.stringify(user);

console.log(json);
```

Output

```json
{"name":"Ali","age":25}
```

---

# Stringifying Arrays

```javascript
const colors = ["Red", "Blue", "Green"];

const json = JSON.stringify(colors);

console.log(json);
```

Output

```json
["Red","Blue","Green"]
```

---

# Pretty Printing JSON

Third argument controls indentation.

```javascript
const user = {
    name: "Ali",
    age: 25
};

console.log(JSON.stringify(user, null, 4));
```

Output

```json
{
    "name": "Ali",
    "age": 25
}
```

---

# Unsupported Values

`JSON.stringify()` ignores or converts unsupported values.

Example

```javascript
const user = {
    name: "Ali",
    age: undefined,
    greet() {},
    id: Symbol("1")
};

console.log(JSON.stringify(user));
```

Output

```json
{"name":"Ali"}
```

---

# Serialization

Serialization is the process of converting a JavaScript object into a format that can be stored or transmitted.

JavaScript Object

↓

JSON String

Example

```javascript
const user = {
    name: "Faizan"
};

const json = JSON.stringify(user);
```

Common Uses

- Sending API requests
- Saving to `localStorage`
- Writing files
- Network communication

---

# Deserialization

Deserialization is the reverse process.

JSON String

↓

JavaScript Object

Example

```javascript
const json = '{"name":"Faizan"}';

const user = JSON.parse(json);
```

---

# Real-World Example

Saving data

```javascript
const user = {
    name: "Ali",
    age: 25
};

localStorage.setItem("user", JSON.stringify(user));
```

Reading data

```javascript
const user = JSON.parse(localStorage.getItem("user"));

console.log(user.name);
```

---

# Circular References

A circular reference occurs when an object directly or indirectly refers to itself.

Example

```javascript
const user = {};

user.self = user;
```

Visualization

```
user
 │
 └──────────► self
      ▲
      └──────────────
```

Trying to stringify it

```javascript
JSON.stringify(user);
```

Output

```
TypeError:
Converting circular structure to JSON
```

---

# Why Circular References Fail

`JSON.stringify()` recursively visits object properties.

For a circular object, the recursion never ends, so JavaScript throws an error instead of producing invalid JSON.

---

# Handling Circular References

### Option 1: Remove the Circular Property

```javascript
delete user.self;

JSON.stringify(user);
```

---

### Option 2: Use a Replacer Function

```javascript
const seen = new WeakSet();

const json = JSON.stringify(user, (key, value) => {
    if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
            return;
        }

        seen.add(value);
    }

    return value;
});
```

---

# JSON.stringify() Replacer

Second parameter allows filtering properties.

```javascript
const user = {
    name: "Ali",
    age: 25
};

console.log(
    JSON.stringify(user, ["name"])
);
```

Output

```json
{"name":"Ali"}
```

---

# JSON.parse() Reviver

The second parameter transforms parsed values.

```javascript
const json = '{"age":"25"}';

const user = JSON.parse(json, (key, value) => {
    if (key === "age") {
        return Number(value);
    }

    return value;
});

console.log(typeof user.age);
```

Output

```
number
```

---

# Interview Questions

### What is JSON?

A lightweight text format used for storing and exchanging structured data.

---

### Difference between JSON and JavaScript Object?

JSON is a text format with strict syntax rules, while JavaScript objects are runtime data structures that can contain functions, `undefined`, and other JavaScript-specific values.

---

### What does JSON.parse() do?

Converts a JSON string into a JavaScript object.

---

### What does JSON.stringify() do?

Converts a JavaScript object into a JSON string.

---

### What is Serialization?

Converting an object into a format (such as JSON) that can be stored or transmitted.

---

### What is Deserialization?

Converting serialized data (such as JSON) back into a JavaScript object.

---

### What is a Circular Reference?

When an object directly or indirectly references itself.

---

### Why does JSON.stringify() fail on Circular References?

Because it would require infinite recursion, so JavaScript throws a `TypeError`.

---

# Best Practices

- Always validate JSON before parsing.
- Use `try...catch` when parsing external data.
- Use `JSON.stringify()` before storing objects in `localStorage`.
- Avoid circular references in data intended for JSON.
- Use pretty printing (`JSON.stringify(obj, null, 2)`) for debugging.

---

# Summary

| Concept | Description |
|---------|-------------|
| JSON | Lightweight data-interchange format |
| JSON.parse() | JSON string → JavaScript object |
| JSON.stringify() | JavaScript object → JSON string |
| Serialization | Object → Storable/transmittable format |
| Deserialization | JSON → JavaScript object |
| Circular Reference | Object references itself |

---

# Quick Revision

- JSON is a **text format**, not a JavaScript object.
- JSON keys and string values use **double quotes**.
- `JSON.parse()` converts JSON → Object.
- `JSON.stringify()` converts Object → JSON.
- Serialization prepares data for storage or transmission.
- Deserialization reconstructs JavaScript objects.
- `JSON.stringify()` throws a `TypeError` for circular references.
- Use `try...catch` when parsing external JSON.

---
