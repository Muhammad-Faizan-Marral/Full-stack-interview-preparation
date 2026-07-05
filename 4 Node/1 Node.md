# Node.js

## Question
**What is Node.js?**

---

# What is Node.js?

**Node.js** is **not** a programming language, framework, or library.

It is a **JavaScript Runtime Environment** that allows developers to run JavaScript outside the browser.

Using Node.js, you can build:

- Web servers
- REST APIs
- Real-time applications
- Command-line tools (CLI)
- Microservices
- Desktop applications (with Electron)

---

# History of Node.js

Initially, JavaScript could only run inside web browsers.

Google developed the **V8 JavaScript Engine** for Chrome to execute JavaScript much faster.

Later, **Ryan Dahl** built **Node.js** by combining the **V8 Engine** with **C++** libraries, enabling JavaScript to run outside the browser.

As a result, developers could:

- Build backend applications
- Create APIs
- Connect to databases
- Read and write files
- Build scalable server-side applications

---

# Single-Threaded Architecture

One of the most important features of Node.js is that it is **Single-Threaded**.

### What is a Thread?

A **thread** is the path of execution where program instructions run.

Many backend technologies such as **Java** and **PHP** use multiple threads, where each request may be handled by a separate thread.

Node.js uses **one main thread** to receive and manage incoming requests.

---

# Why Isn't Node.js Slow?

A common interview question is:

> **If Node.js is single-threaded, why is it so fast?**

The answer is:

- **Asynchronous Programming**
- **Non-Blocking I/O**
- **Event Loop**

Instead of waiting for one operation to finish before starting another, Node.js delegates time-consuming tasks to the system and continues processing other requests.

---

# What is Non-Blocking I/O?

In a **Non-Blocking I/O** model, Node.js does not wait for slow operations to complete.

Examples of slow operations include:

- Database queries
- API requests
- Reading files
- Writing files

While these operations are running in the background, Node.js continues handling new incoming requests.

This makes Node.js highly efficient for I/O-intensive applications.

---

# What is the Event Loop?

The **Event Loop** is the core mechanism that allows Node.js to perform asynchronous operations efficiently.

### How It Works

```text
Client Request
      │
      ▼
 Main Thread
      │
      ▼
Is it a heavy I/O task?
      │
   Yes │ No
      │
      ▼
Background Worker
      │
      ▼
Task Completed
      │
      ▼
Event Loop
      │
      ▼
Send Response
```

The Event Loop continuously checks whether background tasks have completed and moves their callbacks to the main thread for execution.

---

# CPU-Intensive Tasks

Node.js performs exceptionally well for **I/O-bound** applications but is **not ideal for CPU-intensive tasks**.

Examples of CPU-heavy operations:

- Image processing
- Video encoding
- Machine learning
- Complex mathematical calculations
- Large data processing

If a CPU-intensive task occupies the main thread, it blocks other requests until it finishes.

For such workloads, developers often use:

- Worker Threads
- Child Processes
- Microservices

---

# Common Use Cases of Node.js

Node.js is widely used for:

- REST APIs
- Real-time Chat Applications
- Video Streaming Platforms
- Live Notifications
- Online Gaming Servers
- Collaboration Tools
- Microservices

---

# Important Node.js Concepts

## NPM (Node Package Manager)

**NPM** is the default package manager for Node.js.

It allows developers to install, update, and manage third-party packages.

Example:

```bash
npm install express
```

---

## Streams

Streams process data in **small chunks** instead of loading the entire file into memory.

For example, instead of loading a **4 GB** file at once, Node.js processes it chunk by chunk.

Benefits:

- Lower memory usage
- Faster processing
- Better performance

---

## require() vs import

| require() | import |
|------------|---------|
| CommonJS Module System | ES Modules (ESM) |
| Older syntax | Modern JavaScript syntax |
| Loaded at runtime | Loaded before execution (static) |
| Uses `module.exports` | Uses `export` / `export default` |

### CommonJS

```javascript
const express = require("express");
```

### ES Modules

```javascript
import express from "express";
```

---

# Advantages of Node.js

- Fast execution using the V8 Engine
- Asynchronous and Non-Blocking I/O
- Lightweight and efficient
- Large NPM ecosystem
- JavaScript on both frontend and backend
- Excellent for real-time applications

---

# Limitations of Node.js

- Not ideal for CPU-intensive tasks
- Single-threaded execution can become blocked by heavy computations
- Callback-based code can become difficult to manage without Promises or Async/Await

---

# Summary

- **Node.js** is a JavaScript Runtime Environment.
- It allows JavaScript to run outside the browser.
- It uses Google's **V8 Engine** for fast execution.
- Node.js follows a **Single-Threaded, Event-Driven** architecture.
- It achieves high performance through **Asynchronous Programming**, **Non-Blocking I/O**, and the **Event Loop**.
- Node.js is best suited for **I/O-intensive** applications such as APIs, chat applications, and streaming services.