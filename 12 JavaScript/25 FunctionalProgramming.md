#  JavaScript Functional Programming

> Functional Programming (FP) is a programming paradigm where programs are built by composing pure functions, avoiding shared state and mutable data.

---

# Table of Contents

1. Functional Programming
2. Immutability
3. Pure Functions
4. Side Effects
5. Composition
6. Currying
7. Partial Application
8. Higher Order Functions
9. Functional Programming Cheat Sheet
10. Interview Questions

---

# 1. Functional Programming

Functional Programming (FP) focuses on writing predictable, reusable, and testable code using functions.

### Core Principles

- Pure Functions
- Immutability
- Function Composition
- Higher Order Functions
- Declarative Programming
- Avoid Shared State
- Avoid Side Effects

### Imperative vs Functional

### Imperative

```javascript
let numbers = [1, 2, 3];
let doubled = [];

for (let num of numbers) {
    doubled.push(num * 2);
}

console.log(doubled);
```

### Functional

```javascript
const numbers = [1, 2, 3];

const doubled = numbers.map(num => num * 2);

console.log(doubled);
```

### Benefits

- Cleaner code
- Easier testing
- Reusable functions
- Better readability
- Predictable behavior
- Easier debugging

---

# 2. Immutability

Immutability means data should not be modified after it is created.

Instead of changing existing data, create new data.

### Mutable Example

```javascript
const user = {
    name: "John"
};

user.name = "Alice";

console.log(user);
```

Output

```text
{ name: "Alice" }
```

---

### Immutable Example

```javascript
const user = {
    name: "John"
};

const updatedUser = {
    ...user,
    name: "Alice"
};

console.log(user);
console.log(updatedUser);
```

Output

```text
{ name: "John" }
{ name: "Alice" }
```

### Array Example

```javascript
const numbers = [1,2,3];

const updated = [...numbers,4];

console.log(numbers);
console.log(updated);
```

---

# 3. Pure Functions

A Pure Function:

- Same input → Same output
- No side effects
- Doesn't modify external data

### Pure Function

```javascript
function add(a, b) {
    return a + b;
}

console.log(add(2,3));
```

Always returns:

```text
5
```

---

### Not Pure

```javascript
let total = 0;

function add(price){
    total += price;
}
```

Reason:

- Changes external variable
- Output depends on external state

---

### Another Pure Example

```javascript
function square(num){
    return num * num;
}
```

---

# 4. Side Effects

A Side Effect means a function changes something outside itself.

Examples:

- Changing global variables
- API calls
- DOM manipulation
- Writing files
- Database updates
- Console logging

Example

```javascript
let count = 0;

function increment(){
    count++;
}
```

Console Example

```javascript
function greet(name){
    console.log(name);
}
```

Network Example

```javascript
fetch("/users");
```

Pure functions avoid side effects whenever possible.

---

# 5. Composition

Composition means combining small functions to build larger functionality.

Instead of:

```javascript
function process(data){
    // huge function
}
```

Use:

```javascript
const trim = str => str.trim();

const lower = str => str.toLowerCase();

const removeSpaces = str => str.replace(/\s+/g,"");

const result = removeSpaces(lower(trim(" Hello World ")));

console.log(result);
```

Output

```text
helloworld
```

---

### Compose Function

```javascript
const compose = (f, g) => value => f(g(value));

const double = x => x * 2;

const square = x => x * x;

const doubleAfterSquare = compose(double, square);

console.log(doubleAfterSquare(5));
```

Output

```text
50
```

---

# 6. Currying

Currying converts a function with multiple arguments into multiple functions that each take one argument.

Instead of

```javascript
add(a,b)
```

Use

```javascript
add(a)(b)
```

Example

```javascript
function add(a){
    return function(b){
        return a + b;
    };
}

console.log(add(5)(10));
```

Output

```text
15
```

Arrow Version

```javascript
const multiply = a => b => a * b;

console.log(multiply(5)(4));
```

Output

```text
20
```

Benefits

- Reusability
- Better composition
- Partial application

---

# 7. Partial Application

Partial Application fixes some arguments and returns a new function.

Example

```javascript
function multiply(a,b){
    return a*b;
}

const double = multiply.bind(null,2);

console.log(double(5));
```

Output

```text
10
```

Another Example

```javascript
const greet = (greeting, name) =>
    `${greeting} ${name}`;

const sayHello = greet.bind(null,"Hello");

console.log(sayHello("John"));
```

Output

```text
Hello John
```

---

### Currying vs Partial Application

| Currying | Partial Application |
|----------|---------------------|
| Converts multiple arguments into single arguments | Fixes some arguments |
| add(2)(3) | double(3) |
| Returns nested functions | Returns partially configured function |

---

# 8. Higher Order Functions (HOF)

A Higher Order Function is a function that:

- Accepts another function
- Returns another function
- Or both

### Example

```javascript
function greet(name){
    return `Hello ${name}`;
}

function process(fn,name){
    return fn(name);
}

console.log(process(greet,"John"));
```

Output

```text
Hello John
```

---

### Returning Function

```javascript
function multiplier(factor){
    return function(number){
        return number * factor;
    };
}

const double = multiplier(2);

console.log(double(8));
```

Output

```text
16
```

---

### Common Higher Order Functions

### map()

```javascript
const nums = [1,2,3];

const doubled = nums.map(n => n*2);

console.log(doubled);
```

---

### filter()

```javascript
const nums = [1,2,3,4,5];

const even = nums.filter(n => n%2===0);

console.log(even);
```

---

### reduce()

```javascript
const nums = [1,2,3,4];

const sum = nums.reduce((acc,num)=>acc+num,0);

console.log(sum);
```

---

### forEach()

```javascript
["A","B","C"].forEach(item=>{
    console.log(item);
});
```

---

### sort()

```javascript
const nums = [4,2,7,1];

nums.sort((a,b)=>a-b);

console.log(nums);
```

---

# Functional Programming Cheat Sheet

| Concept | Description |
|----------|-------------|
| Functional Programming | Build applications using functions |
| Pure Function | Same input → Same output |
| Side Effect | Changes external state |
| Immutability | Never modify existing data |
| Composition | Combine functions |
| Currying | One argument at a time |
| Partial Application | Fix some arguments |
| Higher Order Function | Takes or returns functions |

---

# Interview Questions

## Beginner

1. What is Functional Programming?
2. What is a Pure Function?
3. What is Immutability?
4. What are Side Effects?
5. Why are Pure Functions easier to test?
6. What is Function Composition?
7. What is a Higher Order Function?
8. What is Currying?
9. What is Partial Application?
10. Difference between Currying and Partial Application?

---

## Intermediate

11. Why is immutability important in React?
12. Explain map(), filter(), and reduce().
13. How does function composition improve maintainability?
14. Can a pure function call another pure function?
15. Why should side effects be isolated?
16. What are closures used for in currying?
17. Explain declarative programming.
18. What is referential transparency?
19. Can a Higher Order Function return another function?
20. Explain composition using real-world examples.

---

## Advanced (FAANG Level)

21. Implement compose().
22. Implement pipe().
23. Implement curry().
24. Implement memoize().
25. Explain functional programming in React.
26. Difference between FP and OOP.
27. Explain immutable updates in Redux.
28. Why does React encourage pure components?
29. Implement your own map().
30. Implement your own reduce().

---

# Summary

- Functional Programming focuses on functions instead of mutable state.
- Pure functions are predictable and easy to test.
- Immutability prevents accidental data changes.
- Side effects should be minimized and isolated.
- Composition builds complex behavior from small functions.
- Currying transforms functions into chained single-argument calls.
- Partial application pre-fills function arguments.
- Higher-order functions accept or return functions, enabling reusable and expressive code.