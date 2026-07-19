# JavaScript Error Handling

> Complete Guide to JavaScript Error Handling, `try...catch`, `finally`, `throw`, and Custom Errors for Interviews & Real-World Development

---

# Table of Contents

1. What is Error Handling?
2. Types of JavaScript Errors
3. try...catch
4. finally
5. throw
6. Built-in Error Object
7. Custom Errors
8. Error Handling Best Practices
9. Interview Questions
10. Summary

---

# What is Error Handling?

Error Handling is the process of detecting, handling, and recovering from errors without crashing the application.

Without error handling, an unexpected error can stop the execution of your program.

Example

```javascript
console.log("Start");

console.log(user.name);

console.log("End");
```

Output

```
Start

ReferenceError: user is not defined
```

The last line never executes because the program stops when the error occurs.

---

# Why Error Handling?

Benefits

- Prevent application crashes
- Handle unexpected situations gracefully
- Improve debugging
- Provide better user experience
- Log errors for monitoring

---

# Types of JavaScript Errors

JavaScript provides several built-in error types.

| Error Type | Description |
|------------|-------------|
| Error | Base error class |
| SyntaxError | Invalid JavaScript syntax |
| ReferenceError | Variable does not exist |
| TypeError | Invalid operation on a value |
| RangeError | Value outside allowed range |
| URIError | Invalid URI functions |
| EvalError | Related to `eval()` (rarely used today) |

Example

```javascript
let num = null;

num.toUpperCase();
```

Output

```
TypeError
```

---

# try...catch

The `try...catch` statement allows you to handle runtime errors.

Syntax

```javascript
try {
    // Code that may throw an error
} catch (error) {
    // Handle the error
}
```

Example

```javascript
try {
    console.log(user.name);
} catch (error) {
    console.log("Something went wrong.");
}
```

Output

```
Something went wrong.
```

The application continues running instead of crashing.

---

# Accessing the Error Object

The `catch` block receives an `Error` object.

```javascript
try {
    console.log(user.name);
} catch (error) {
    console.log(error.name);
    console.log(error.message);
}
```

Output

```
ReferenceError

user is not defined
```

Useful properties

- `name`
- `message`
- `stack`

---

# finally

The `finally` block always executes whether an error occurs or not.

Syntax

```javascript
try {

} catch (error) {

} finally {

}
```

Example

```javascript
try {
    console.log("Inside try");
} finally {
    console.log("Always executed");
}
```

Output

```
Inside try

Always executed
```

Example with an error

```javascript
try {
    console.log(user.name);
} catch (error) {
    console.log("Error handled");
} finally {
    console.log("Cleanup completed");
}
```

Output

```
Error handled

Cleanup completed
```

Common Uses

- Closing database connections
- Releasing resources
- Hiding loading indicators
- Cleaning up timers

---

# throw

The `throw` keyword is used to create and throw your own errors.

Syntax

```javascript
throw value;
```

You can throw:

- Strings
- Numbers
- Objects
- Error objects (recommended)

Example

```javascript
function divide(a, b) {
    if (b === 0) {
        throw new Error("Division by zero");
    }

    return a / b;
}
```

Using it

```javascript
try {
    console.log(divide(10, 0));
} catch (error) {
    console.log(error.message);
}
```

Output

```
Division by zero
```

---

# Built-in Error Object

The `Error` constructor creates an error object.

```javascript
const error = new Error("Something went wrong");

console.log(error.name);
console.log(error.message);
```

Output

```
Error

Something went wrong
```

---

# Throwing Different Error Types

```javascript
throw new TypeError("Expected a string");
```

```javascript
throw new RangeError("Invalid age");
```

```javascript
throw new ReferenceError("User not found");
```

---

# Custom Errors

You can create your own error classes by extending the built-in `Error` class.

Example

```javascript
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}
```

Using the custom error

```javascript
function registerUser(age) {
    if (age < 18) {
        throw new ValidationError(
            "User must be at least 18 years old."
        );
    }

    return "Registration successful";
}

try {
    registerUser(16);
} catch (error) {
    console.log(error.name);
    console.log(error.message);
}
```

Output

```
ValidationError

User must be at least 18 years old.
```

---

# Nested try...catch

```javascript
try {
    try {
        throw new Error("Inner Error");
    } catch (error) {
        console.log(error.message);
    }
} catch (error) {
    console.log("Outer Catch");
}
```

Output

```
Inner Error
```

---

# Re-throwing Errors

Sometimes you want to handle an error partially and let another part of the application handle it further.

```javascript
try {
    throw new Error("Database Error");
} catch (error) {
    console.log("Logging error...");

    throw error;
}
```

---

# Error Handling with JSON

```javascript
const json = "{name:'Ali'}";

try {
    const user = JSON.parse(json);
} catch (error) {
    console.log("Invalid JSON");
}
```

---

# Error Handling with Async Code

Using `async/await`

```javascript
async function getUsers() {
    try {
        const response = await fetch("/users");

        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
}
```

---

# Interview Questions

### What is Error Handling?

The process of detecting and managing runtime errors so that an application can continue running safely.

---

### What is `try...catch`?

A statement used to execute code that may throw an error and handle that error gracefully.

---

### What is the purpose of `finally`?

It always executes after `try` and `catch`, whether an error occurs or not.

---

### What is `throw`?

A keyword used to create and throw custom errors.

---

### Why should you throw `Error` objects instead of strings?

`Error` objects include useful information such as the error name, message, and stack trace, making debugging much easier.

---

### What is a Custom Error?

A user-defined error class created by extending the built-in `Error` class.

---

### Difference between `throw` and `catch`?

- `throw` creates an error.
- `catch` receives and handles the error.

---

# Best Practices

- Use `try...catch` only around code that can fail.
- Throw `Error` objects instead of strings.
- Create custom error classes for application-specific errors.
- Use `finally` for cleanup tasks.
- Log errors for debugging, but avoid exposing sensitive details to users.
- Don't silently ignore errors unless there's a valid reason.

---

# Summary

| Concept | Description |
|---------|-------------|
| Error Handling | Detecting and managing runtime errors |
| try | Executes code that may fail |
| catch | Handles thrown errors |
| finally | Always executes for cleanup |
| throw | Creates and throws an error |
| Error | Base JavaScript error object |
| Custom Error | User-defined error class extending `Error` |

---

# Quick Revision

- Error handling prevents application crashes.
- `try` contains code that might throw an error.
- `catch` handles the error.
- `finally` always executes.
- Use `throw new Error()` to create errors.
- Extend `Error` to create custom error classes.
- Prefer throwing `Error` objects over primitive values.
- Use `try...catch` with asynchronous code when using `async/await`.

---

