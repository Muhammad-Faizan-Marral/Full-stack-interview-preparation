# JavaScript Modules

> Complete Guide to JavaScript Modules, CommonJS, ES Modules, import, export, and Dynamic Import for Interviews & Real-World Development

---

# Table of Contents

1. What are Modules?
2. Why Use Modules?
3. CommonJS Modules
4. ES Modules (ESM)
5. export
6. import
7. Default Export
8. Named Export
9. Dynamic Import
10. CommonJS vs ES Modules
11. Best Practices
12. Interview Questions
13. Summary

---

# What are Modules?

A **module** is a JavaScript file that contains reusable code.

Instead of writing all your code in a single file, modules allow you to split your application into smaller, manageable files.

Example

```
project/

│── math.js
│── user.js
│── app.js
```

Each file is a separate module.

---

# Why Use Modules?

Modules help you:

- Organize code
- Reuse code
- Improve maintainability
- Avoid global variables
- Make large applications easier to manage

Without Modules

```javascript
// everything inside one file

function add() {}

function login() {}

function logout() {}

function payment() {}
```

With Modules

```
math.js

auth.js

payment.js

app.js
```

---

# Module Scope

Variables inside a module are **private** by default.

math.js

```javascript
const PI = 3.14;

function square(x) {
    return x * x;
}
```

Other files cannot access `PI` or `square()` unless they are exported.

---

# CommonJS

CommonJS is the module system used primarily in **Node.js** (before ES Modules became standard).

Exports

```javascript
// math.js

function add(a, b) {
    return a + b;
}

module.exports = add;
```

Import

```javascript
// app.js

const add = require("./math");

console.log(add(2, 3));
```

Output

```
5
```

---

# Exporting Multiple Values (CommonJS)

```javascript
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

module.exports = {
    add,
    subtract
};
```

Import

```javascript
const math = require("./math");

console.log(math.add(10, 5));
console.log(math.subtract(10, 5));
```

---

# ES Modules (ESM)

ES Modules are the **official JavaScript module system** introduced in ES6 (ECMAScript 2015).

Supported in:

- Modern Browsers
- Modern Node.js
- React
- Angular
- Vue
- Next.js

---

# export

The `export` keyword makes variables, functions, or classes available to other modules.

Example

```javascript
// math.js

export const PI = 3.14;

export function add(a, b) {
    return a + b;
}
```

---

# Named Export

You can export multiple values.

```javascript
export const name = "Faizan";

export function greet() {
    console.log("Hello");
}
```

Import

```javascript
import { name, greet } from "./user.js";

console.log(name);

greet();
```

Output

```
Faizan

Hello
```

---

# Export at Bottom

Instead of exporting immediately, you can export later.

```javascript
const PI = 3.14;

function square(x) {
    return x * x;
}

export {
    PI,
    square
};
```

---

# import

The `import` keyword is used to access exported members from another module.

Example

```javascript
import { add } from "./math.js";

console.log(add(5, 7));
```

Output

```
12
```

---

# Default Export

Each module can have **only one default export**.

math.js

```javascript
export default function multiply(a, b) {
    return a * b;
}
```

Import

```javascript
import multiply from "./math.js";

console.log(multiply(4, 5));
```

Output

```
20
```

Notice:

Default imports **do not use curly braces**.

---

# Named vs Default Export

Named Export

```javascript
export function add() {}
```

Import

```javascript
import { add } from "./math.js";
```

Default Export

```javascript
export default function add() {}
```

Import

```javascript
import add from "./math.js";
```

---

# Import Everything

```javascript
import * as math from "./math.js";

console.log(math.PI);

console.log(math.add(5, 3));
```

Output

```
3.14

8
```

---

# Aliasing Imports

Rename imported variables.

```javascript
import {
    add as sum
} from "./math.js";

console.log(sum(5, 6));
```

---

# Dynamic Import

Dynamic Import loads modules **only when needed**.

Syntax

```javascript
import("./math.js");
```

Example

```javascript
button.addEventListener("click", async () => {

    const math = await import("./math.js");

    console.log(math.add(5, 7));

});
```

Output

```
12
```

---

# Why Use Dynamic Import?

Benefits

- Faster initial page load
- Lazy loading
- Smaller bundles
- Better performance

Common Use Cases

- Loading charts
- Loading editors
- Loading large libraries
- Route-based code splitting

---

# CommonJS vs ES Modules

| Feature | CommonJS | ES Modules |
|----------|-----------|------------|
| Import | require() | import |
| Export | module.exports | export |
| Loading | Synchronous | Static (supports async loading) |
| Browser Support | No | Yes |
| Node.js Support | Yes | Yes |
| Tree Shaking | No | Yes |

---

# Module Loading

```
app.js

↓

imports

↓

math.js

↓

user.js

↓

browser executes modules
```

---

# Real-World Example

math.js

```javascript
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}
```

app.js

```javascript
import {
    add,
    subtract
} from "./math.js";

console.log(add(10, 5));

console.log(subtract(10, 5));
```

Output

```
15

5
```

---

# Interview Questions

### What is a JavaScript Module?

A JavaScript file with its own scope that exports reusable code.

---

### Why use Modules?

- Better organization
- Code reuse
- Maintainability
- Avoid global variables

---

### What is CommonJS?

A module system mainly used in Node.js that uses `require()` and `module.exports`.

---

### What are ES Modules?

The standard JavaScript module system introduced in ES6 using `import` and `export`.

---

### Difference between CommonJS and ES Modules?

CommonJS uses `require()` and `module.exports`, while ES Modules use `import` and `export`. ES Modules also support tree shaking and are the modern standard.

---

### Difference between Named Export and Default Export?

Named Export:

- Multiple exports allowed.
- Imported with curly braces.

Default Export:

- Only one per module.
- Imported without curly braces.

---

### What is Dynamic Import?

A feature that loads modules only when they are needed using `import()`.

---

### Why use Dynamic Import?

To reduce the initial bundle size and improve application performance through lazy loading.

---

# Best Practices

- Prefer **ES Modules** for modern projects.
- Use **named exports** for utilities and helper functions.
- Use **default exports** for a module's primary functionality.
- Use **dynamic imports** for large or optional features.
- Keep modules focused on a single responsibility.

---

# Summary

| Concept | Description |
|----------|-------------|
| Module | Reusable JavaScript file |
| CommonJS | Node.js module system using `require()` |
| ES Modules | Standard JavaScript module system |
| export | Makes values available to other modules |
| import | Imports exported values |
| Named Export | Multiple exports per module |
| Default Export | One primary export per module |
| Dynamic Import | Loads modules on demand |

---

# Quick Revision

- Modules divide code into reusable files.
- Each module has its own scope.
- CommonJS uses `require()` and `module.exports`.
- ES Modules use `import` and `export`.
- Named exports require `{}` during import.
- Default exports do not use `{}`.
- `import()` enables lazy loading with dynamic imports.
- Modern JavaScript projects prefer **ES Modules**.

---

