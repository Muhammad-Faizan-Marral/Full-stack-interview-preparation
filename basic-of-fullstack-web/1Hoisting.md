# JavaScript Hoisting

## Question
### What do you mean by Hoisting in JavaScript?

## Answer
**Hoisting** in JavaScript is a behavior where variable and function declarations are conceptually moved (or "hoisted") to the top of their containing scope during the compilation phase, before the code is executed. 

> **Note:** Only the declarations are hoisted, not the initializations.

---

## Detailed Explanation

In simple terms, hoisting allows us to use variables and functions before they are actually declared in the code. It is important to understand that JavaScript only hoists the **declaration** (the creation of the variable/function), while the **initialization** (assigning a value) remains in its original place.

Hoisting behaves differently across three main categories:
1. **Variable Hoisting (`var`)**
2. **`let` and `const` Hoisting (Temporal Dead Zone)**
3. **Function Hoisting**

---

## Examples & Deep Dive

### 1. Variable Hoisting (`var`)

When you use `var`, JavaScript registers the variable in memory and automatically assigns it a default value of `undefined`.

```javascript
console.log(a); // Output: undefined (Does not throw an error)
var a = 10;
console.log(a); // Output: 10