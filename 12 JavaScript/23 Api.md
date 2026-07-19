#  JavaScript Fetch API

> Complete Guide to Fetch API, `fetch()`, Request, Response, Headers, and AbortController for Interviews & Real-World Development

---

# Table of Contents

1. What is Fetch API?
2. How Fetch Works
3. fetch()
4. Request Object
5. Response Object
6. Headers
7. HTTP Methods
8. Sending Data
9. Handling Errors
10. AbortController
11. Real-World Examples
12. Interview Questions
13. Best Practices
14. Summary

---

# What is Fetch API?

The **Fetch API** is a modern JavaScript API used to make HTTP requests.

It allows applications to communicate with servers to:

- Get data
- Send data
- Update data
- Delete data

It is Promise-based and replaces the older `XMLHttpRequest (XHR)` in most modern applications.

---

# How Fetch Works

```
Browser

↓

fetch()

↓

HTTP Request

↓

Server

↓

HTTP Response

↓

Promise

↓

JavaScript
```

---

# fetch()

`fetch()` sends an HTTP request and returns a **Promise** that resolves to a `Response` object.

Syntax

```javascript
fetch(url, options);
```

Example

```javascript
fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => console.log(data));
```

---

# Using Async/Await

```javascript
async function getUsers() {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
    );

    const users = await response.json();

    console.log(users);
}

getUsers();
```

---

# Request Object

A `Request` object represents an HTTP request.

Instead of passing a URL directly, you can create a request manually.

Example

```javascript
const request = new Request(
    "https://jsonplaceholder.typicode.com/users"
);

fetch(request)
    .then(response => response.json())
    .then(data => console.log(data));
```

---

# Request Options

```javascript
fetch(url, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
});
```

Common Options

| Option | Description |
|---------|-------------|
| method | HTTP method |
| headers | HTTP headers |
| body | Request body |
| signal | Abort signal |
| credentials | Cookies/authentication |

---

# Response Object

The Promise returned by `fetch()` resolves to a `Response` object.

Example

```javascript
const response = await fetch(url);

console.log(response);
```

Useful Properties

```javascript
response.status

response.ok

response.headers

response.url

response.statusText
```

Example

```javascript
const response = await fetch(url);

console.log(response.status);

console.log(response.ok);
```

Output

```
200

true
```

---

# Reading Response Body

### JSON

```javascript
const data = await response.json();
```

---

### Text

```javascript
const text = await response.text();
```

---

### Blob

```javascript
const image = await response.blob();
```

---

### ArrayBuffer

```javascript
const buffer =
    await response.arrayBuffer();
```

---

# Headers

Headers provide additional information about the request or response.

Example

```javascript
fetch(url, {
    headers: {
        Authorization: "Bearer TOKEN",
        "Content-Type": "application/json"
    }
});
```

Create Headers Object

```javascript
const headers = new Headers();

headers.append(
    "Content-Type",
    "application/json"
);
```

Use

```javascript
fetch(url, {
    headers
});
```

---

# HTTP Methods

| Method | Purpose |
|----------|----------|
| GET | Read data |
| POST | Create data |
| PUT | Replace data |
| PATCH | Update data |
| DELETE | Remove data |

---

# GET Request

```javascript
const response = await fetch(url);

const data = await response.json();
```

---

# POST Request

```javascript
const user = {
    name: "Ali",
    age: 25
};

await fetch(url, {
    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify(user)
});
```

---

# PUT Request

```javascript
await fetch(url, {
    method: "PUT",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        name: "Ahmed"
    })
});
```

---

# DELETE Request

```javascript
await fetch(url, {
    method: "DELETE"
});
```

---

# Handling Errors

`fetch()` rejects only for **network errors**, not for HTTP error status codes like **404** or **500**.

Incorrect

```javascript
const response = await fetch(url);

const data = await response.json();
```

Correct

```javascript
try {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Request Failed");
    }

    const data =
        await response.json();

    console.log(data);

} catch (error) {

    console.log(error.message);

}
```

---

# AbortController

`AbortController` allows you to cancel an ongoing fetch request.

Create Controller

```javascript
const controller =
    new AbortController();
```

Pass Signal

```javascript
fetch(url, {
    signal: controller.signal
});
```

Cancel Request

```javascript
controller.abort();
```

Complete Example

```javascript
const controller =
    new AbortController();

fetch(url, {
    signal: controller.signal
});

setTimeout(() => {
    controller.abort();
}, 2000);
```

---

# Handling Abort Error

```javascript
try {

    await fetch(url, {
        signal: controller.signal
    });

} catch (error) {

    if (error.name === "AbortError") {

        console.log("Request Cancelled");

    }

}
```

---

# Real-World Example

Search Suggestions

```javascript
let controller;

async function search(query) {

    if (controller) {

        controller.abort();

    }

    controller =
        new AbortController();

    try {

        const response =
            await fetch(
                `/search?q=${query}`,
                {
                    signal:
                        controller.signal
                }
            );

        const data =
            await response.json();

        console.log(data);

    } catch (error) {

        if (
            error.name !==
            "AbortError"
        ) {

            console.log(error);

        }

    }
}
```

Each new search cancels the previous request.

---

# Fetch Lifecycle

```
fetch()

↓

Request

↓

Server

↓

Response

↓

Read Body

↓

Use Data
```

---

# Interview Questions

### What is Fetch API?

A modern Promise-based API for making HTTP requests.

---

### What does `fetch()` return?

A Promise that resolves to a `Response` object.

---

### What is the Request object?

An object representing an HTTP request, including the URL, method, headers, and body.

---

### What is the Response object?

An object representing the server's HTTP response.

---

### What is `response.ok`?

A boolean indicating whether the HTTP status code is in the range **200–299**.

---

### How do you send JSON using Fetch?

```javascript
fetch(url, {
    method: "POST",

    headers: {
        "Content-Type":
            "application/json"
    },

    body: JSON.stringify(data)
});
```

---

### Does Fetch reject for a 404 response?

No.

It only rejects for network failures or when the request is aborted. You should check `response.ok` or `response.status` yourself.

---

### What is AbortController?

An API that allows cancellation of asynchronous operations like `fetch()` requests.

---

# Best Practices

- Always use `try...catch` with `async/await`.
- Check `response.ok` before reading the response body.
- Use `JSON.stringify()` when sending JSON.
- Set the correct `Content-Type` header.
- Cancel unnecessary requests with `AbortController`.
- Handle network and HTTP errors separately.

---

# Summary

| Concept | Description |
|----------|-------------|
| Fetch API | Modern API for HTTP requests |
| fetch() | Sends an HTTP request |
| Request | Represents the outgoing request |
| Response | Represents the incoming response |
| Headers | Metadata for requests and responses |
| AbortController | Cancels fetch requests |

---

# Quick Revision

- `fetch()` returns a **Promise**.
- The Promise resolves to a **Response** object.
- Use `response.json()` to parse JSON responses.
- Check `response.ok` before using the data.
- Use `Headers` to send metadata.
- `AbortController` cancels ongoing requests.
- `fetch()` rejects only for network errors or aborted requests.
- Use `try...catch` with `async/await`.

---

