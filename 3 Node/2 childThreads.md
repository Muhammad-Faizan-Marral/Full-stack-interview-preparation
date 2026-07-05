# How Does Node.js Handle Child Threads?

## Question
**How does Node.js handle child threads?**

---

# Does Node.js Create Child Threads?

Yes. Although **Node.js is single-threaded**, it can use **child threads** (Worker Threads) and a **thread pool** internally to perform background tasks.

The **main thread** is responsible for running JavaScript and handling incoming requests, while heavy or asynchronous tasks can be delegated to background threads.

This is why Node.js remains responsive even when handling multiple requests.

---

# How Does It Work?

When a request arrives:

1. The **Main Thread** receives the request.
2. If the task is lightweight, it executes immediately.
3. If the task is an asynchronous or expensive operation, Node.js sends it to the background.
4. Once the task finishes, the **Event Loop** receives the result.
5. The callback or Promise is executed, and the response is sent to the client.

---

# Flow of Execution

```text
Client Request
      │
      ▼
 Main Thread
      │
      ▼
Is it a heavy task?
      │
  Yes │ No
      │
      ▼
Background Thread / Thread Pool
      │
      ▼
Task Completed
      │
      ▼
 Event Loop
      │
      ▼
Callback / Promise
      │
      ▼
Response Sent
```

---

# What Tasks Use Background Threads?

Node.js automatically uses background threads for many asynchronous operations, such as:

- File System (Read/Write)
- Database Queries (driver-dependent)
- DNS Lookup
- Cryptography (`crypto`)
- File Compression (`zlib`)
- Some HTTPS/TLS operations

These tasks are handled by **libuv's thread pool**, allowing the main thread to continue processing new requests.

---

# What Are Worker Threads?

**Worker Threads** are separate JavaScript threads introduced in Node.js for **CPU-intensive tasks**.

Unlike the libuv thread pool, worker threads can execute JavaScript code in parallel.

### Example Use Cases

- Image processing
- Video encoding
- Machine learning
- Large mathematical calculations
- Data processing

---

# Child Process vs Worker Thread

| Worker Threads | Child Process |
|----------------|---------------|
| Runs JavaScript in another thread | Starts a completely new Node.js process |
| Shares memory (with controlled mechanisms) | Has its own memory space |
| Lower overhead | Higher overhead |
| Best for CPU-intensive tasks | Best for running separate programs or isolated processes |

---

# Does Every Request Create a New Thread?

**No.**

This is a common interview question.

Node.js **does not create a new thread for every incoming request**.

Instead:

- One **main thread** handles JavaScript execution.
- Asynchronous operations are delegated to **libuv's thread pool**.
- CPU-intensive work can be offloaded to **Worker Threads** or separate processes.

This architecture makes Node.js lightweight and scalable.

---

# Summary

- Node.js is **single-threaded** for JavaScript execution.
- It uses **libuv's thread pool** to handle many asynchronous I/O operations.
- **Worker Threads** are available for CPU-intensive JavaScript tasks.
- The **Event Loop** coordinates completed background tasks and executes their callbacks.
- Node.js does **not** create a new thread for every client request, which helps it efficiently handle thousands of concurrent connections