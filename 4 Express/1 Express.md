# Express.js

## Question
**What is Express.js?**

---

# What is Express.js?

**Express.js** is a **fast, lightweight, and minimal web framework** built on top of **Node.js**.

It simplifies backend development by providing tools for:

- Creating web servers
- Building REST APIs
- Handling routes
- Processing HTTP requests and responses
- Managing middleware

Without Express.js, developers would have to write much more code using Node.js's built-in `http` module.

---

# Why Do We Need Express.js?

Node.js provides only the basic modules required to create a server.

For example, using the native `http` module, developers must manually:

- Create the server
- Handle routes
- Parse request data
- Send responses
- Manage middleware

Express.js provides these features with a simple and clean API, making backend development much faster and easier.

---

# How Express.js Works

```text
Client Request
      │
      ▼
 Express Server
      │
      ▼
 Middleware
      │
      ▼
 Route Handler
      │
      ▼
 Response
```

Every incoming request passes through middleware before reaching the appropriate route handler.

---

# Features of Express.js

- Lightweight and fast
- Simple routing system
- Middleware support
- Easy REST API development
- Template engine support
- Static file serving
- Error handling
- Scalable application structure

---

# Basic Express Server

```javascript
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

# Routing in Express

Routes determine how the server responds to different HTTP requests.

### GET Request

```javascript
app.get("/users", (req, res) => {
  res.send("All Users");
});
```

### POST Request

```javascript
app.post("/users", (req, res) => {
  res.send("User Created");
});
```

### PUT Request

```javascript
app.put("/users/:id", (req, res) => {
  res.send("User Updated");
});
```

### DELETE Request

```javascript
app.delete("/users/:id", (req, res) => {
  res.send("User Deleted");
});
```

---

# Middleware

Middleware is a function that executes **between the client request and the server response**.

It can:

- Validate requests
- Authenticate users
- Log requests
- Parse request bodies
- Handle errors

### Example

```javascript
app.use((req, res, next) => {
  console.log("Request Received");
  next();
});
```

The `next()` function passes control to the next middleware or route handler.

---

# Request and Response Objects

Every route receives two important objects:

### `req` (Request)

Contains information sent by the client.

Examples:

- URL parameters
- Query parameters
- Request body
- Headers

### `res` (Response)

Used to send data back to the client.

Examples:

```javascript
res.send("Hello");

res.json({ message: "Success" });

res.status(404).send("Not Found");
```

---

# Common HTTP Methods

| Method | Purpose |
|---------|----------|
| GET | Retrieve data |
| POST | Create new data |
| PUT | Update existing data |
| PATCH | Partially update data |
| DELETE | Remove data |

---

# Advantages of Express.js

- Simple and easy to learn
- Minimal and lightweight
- Excellent middleware support
- Easy REST API development
- Large community and ecosystem
- Highly scalable
- Works seamlessly with databases like MongoDB, MySQL, and PostgreSQL

---

# Express.js vs Node.js

| Node.js | Express.js |
|----------|------------|
| JavaScript Runtime Environment | Web Framework built on Node.js |
| Runs JavaScript outside the browser | Simplifies backend development |
| Provides low-level APIs | Provides high-level APIs |
| Requires more code for routing and server setup | Requires much less code |
| Includes the `http` module | Uses the `http` module internally |

---

# Real-World Use Cases

Express.js is commonly used for:

- REST APIs
- Authentication Systems
- E-commerce Backends
- Social Media Applications
- Chat Applications
- File Upload Services
- Admin Dashboards

---

# Summary

- **Express.js** is a **web framework** built on top of **Node.js**.
- It simplifies server-side development by providing **routing**, **middleware**, and **HTTP request handling**.
- Express.js is lightweight, fast, and ideal for building REST APIs and web applications.
- It significantly reduces the amount of code compared to using Node.js's native `http` module.