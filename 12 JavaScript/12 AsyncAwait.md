# JavaScript Async/Await ⭐⭐⭐⭐⭐

> **Async/Await** is syntactic sugar over **Promises** that makes asynchronous code look synchronous, improving readability and maintainability.

---

# Table of Contents

1. What is Async/Await?
2. Why Async/Await?
3. How `async` Works
4. How `await` Works
5. Error Handling
6. Sequential Execution
7. Parallel Execution
8. Async/Await vs Promise
9. Common Mistakes
10. Coding Examples
11. Common Interview Questions
12. Summary

---

# 1. What is Async/Await?

Async/Await is a modern JavaScript feature (introduced in **ES2017**) for working with asynchronous code.

It is built on top of **Promises**.

Instead of writing:

```javascript
fetchData()
  .then((data) => processData(data))
  .then((result) => console.log(result))
  .catch((err) => console.error(err));
```

You can write:

```javascript
async function getData() {
  try {
    const data = await fetchData();
    const result = processData(data);

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
```

---

# 2. Why Async/Await?

Without Async/Await:

```javascript
login()
  .then(getUser)
  .then(getOrders)
  .then(getPayment)
  .then(console.log)
  .catch(console.error);
```

With Async/Await:

```javascript
async function run() {
  try {
    const user = await login();
    const profile = await getUser(user);
    const orders = await getOrders(profile);
    const payment = await getPayment(orders);

    console.log(payment);
  } catch (error) {
    console.error(error);
  }
}
```

Benefits:

- Cleaner syntax
- Easier debugging
- Better readability
- Easier error handling

---

# 3. How `async` Works

The `async` keyword makes a function return a Promise.

```javascript
async function greet() {
  return "Hello";
}
```

Equivalent to:

```javascript
function greet() {
  return Promise.resolve("Hello");
}
```

Example

```javascript
async function greet() {
  return "Hello";
}

greet().then(console.log);
```

Output

```
Hello
```

---

## Returning Values

```javascript
async function add() {
  return 10;
}

add().then(console.log);
```

Output

```
10
```

Even though `10` is returned, JavaScript wraps it in:

```javascript
Promise.resolve(10)
```

---

# 4. How `await` Works

The `await` keyword pauses execution until the Promise settles.

Syntax

```javascript
const result = await promise;
```

Example

```javascript
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data Loaded");
    }, 2000);
  });
}

async function load() {
  const data = await fetchData();

  console.log(data);
}

load();
```

Output (after 2 seconds)

```
Data Loaded
```

---

## `await` Only Works Inside an `async` Function

❌ Incorrect

```javascript
const data = await fetchData();
```

✔ Correct

```javascript
async function load() {
  const data = await fetchData();
}
```

---

# 5. Error Handling

Use `try...catch` with Async/Await.

```javascript
async function load() {
  try {
    const data = await Promise.reject("Network Error");

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

load();
```

Output

```
Network Error
```

---

## Multiple Awaits

```javascript
async function getData() {
  try {
    const user = await fetchUser();

    const orders = await fetchOrders(user.id);

    console.log(orders);
  } catch (error) {
    console.error(error);
  }
}
```

Any rejected Promise jumps directly to the `catch` block.

---

# 6. Sequential Execution

Tasks run **one after another**.

```javascript
async function run() {
  const user = await fetchUser();

  const orders = await fetchOrders(user.id);

  const payment = await fetchPayment();

  console.log(payment);
}
```

Execution

```
fetchUser()

↓

fetchOrders()

↓

fetchPayment()
```

Total Time

```
2s + 3s + 2s = 7s
```

Use sequential execution only when each task depends on the previous result.

---

# 7. Parallel Execution

Independent tasks should run together.

Instead of:

```javascript
const user = await fetchUser();

const posts = await fetchPosts();

const comments = await fetchComments();
```

Use:

```javascript
const [user, posts, comments] =
  await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments(),
  ]);
```

Execution

```
fetchUser()

fetchPosts()

fetchComments()

↓

Wait for all

↓

Continue
```

If each request takes 2 seconds:

Sequential

```
2 + 2 + 2 = 6 seconds
```

Parallel

```
2 seconds
```

Much faster.

---

# Parallel Example

```javascript
function delay(name, time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(name);
    }, time);
  });
}

async function run() {
  const [a, b, c] = await Promise.all([
    delay("A", 1000),
    delay("B", 2000),
    delay("C", 3000),
  ]);

  console.log(a, b, c);
}

run();
```

Output (after 3 seconds)

```
A B C
```

---

# 8. Async/Await vs Promise

| Promise | Async/Await |
|----------|-------------|
| Uses `.then()` | Uses `await` |
| Chain-based | Looks synchronous |
| `.catch()` for errors | `try...catch` |
| More nesting possible | Easier to read |
| Better for simple chains | Better for complex flows |

---

# 9. Common Mistakes

## Mistake 1

Forgetting `await`

```javascript
async function run() {
  const data = fetchData();

  console.log(data);
}
```

Output

```
Promise { <pending> }
```

Correct

```javascript
const data = await fetchData();
```

---

## Mistake 2

Using `await` Outside an Async Function

```javascript
const user = await fetchUser();
```

Error

```
SyntaxError
```

Correct

```javascript
async function run() {
  const user = await fetchUser();
}
```

---

## Mistake 3

Using Sequential Execution for Independent Tasks

❌

```javascript
await fetchA();
await fetchB();
await fetchC();
```

✔

```javascript
await Promise.all([
  fetchA(),
  fetchB(),
  fetchC(),
]);
```

---

# 10. Coding Examples

## Example 1

```javascript
async function greet() {
  return "Hello";
}

greet().then(console.log);
```

Output

```
Hello
```

---

## Example 2

```javascript
console.log("Start");

async function run() {
  console.log(await Promise.resolve("Async"));
}

run();

console.log("End");
```

Output

```
Start
End
Async
```

Because `await` pauses the async function, and the continuation runs as a microtask.

---

## Example 3

```javascript
async function run() {
  try {
    await Promise.reject("Failed");
  } catch (error) {
    console.log(error);
  }
}

run();
```

Output

```
Failed
```

---

## Example 4

```javascript
async function run() {
  const one = await Promise.resolve(1);

  const two = await Promise.resolve(2);

  console.log(one + two);
}

run();
```

Output

```
3
```

---

## Example 5 (Parallel)

```javascript
async function run() {
  const [a, b] = await Promise.all([
    Promise.resolve(10),
    Promise.resolve(20),
  ]);

  console.log(a + b);
}

run();
```

Output

```
30
```

---

# 11. Common Interview Questions

## Q1. What does `async` do?

It makes a function always return a Promise.

---

## Q2. What does `await` do?

It pauses the execution of the async function until the Promise settles and returns its resolved value (or throws if rejected).

---

## Q3. Can `await` be used without `async`?

No.

`await` can only be used inside an `async` function (or at the top level in ES modules where supported).

---

## Q4. Difference between Async/Await and Promises?

Async/Await is built on top of Promises.

It provides cleaner syntax but still uses Promises under the hood.

---

## Q5. When should you use `Promise.all()` with Async/Await?

Use `Promise.all()` when multiple asynchronous operations are **independent** and can run at the same time.

---

## Q6. What happens if an awaited Promise rejects?

The rejection is thrown like an exception.

Handle it using `try...catch`.

---

# Async/Await Flow

```
Call async function

↓

Returns Promise

↓

await Promise

↓

Pause async function

↓

Promise resolves

↓

Resume execution

↓

Return Promise result
```

---

# Summary

After completing this topic, you should understand:

- ✅ What Async/Await is
- ✅ How `async` works
- ✅ How `await` works
- ✅ Async functions always return Promises
- ✅ Error handling with `try...catch`
- ✅ Sequential execution
- ✅ Parallel execution using `Promise.all()`
- ✅ Common mistakes
- ✅ Coding examples
- ✅ Common interview questions

---

## Interview Tip ⭐⭐⭐⭐⭐

A very common interview question is:

> **What is the difference between sequential and parallel execution in Async/Await?**

A strong answer is:

- **Sequential execution** uses multiple `await` statements one after another. Each operation waits for the previous one to finish, making it suitable when tasks depend on each other.
- **Parallel execution** starts multiple Promises together and waits for all of them using `Promise.all()`. This is faster when the tasks are independent because they execute concurrently.