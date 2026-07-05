# CORS (Cross-Origin Resource Sharing)

## Question
**What is CORS, and how do you handle it in your application?**

---

# What is CORS?

**CORS (Cross-Origin Resource Sharing)** is a browser security mechanism that controls whether a web application can access resources from another origin.

An **origin** is defined by three parts:

- Protocol (HTTP / HTTPS)
- Domain (example.com)
- Port (3000, 5000, etc.)

If any one of these is different, it is considered a **different origin**.

---

# Example of Different Origins

| Frontend | Backend | Same Origin? |
|-----------|----------|--------------|
| `http://localhost:3000` | `http://localhost:3000` | ✅ Yes |
| `http://localhost:3000` | `http://localhost:5000` | ❌ No (Different Port) |
| `http://example.com` | `https://example.com` | ❌ No (Different Protocol) |
| `https://app.example.com` | `https://api.example.com` | ❌ No (Different Subdomain) |

---

# Why Do We Need CORS?

Browsers follow the **Same-Origin Policy (SOP)** for security.

By default, a website **cannot make requests to another origin** because it could expose sensitive user data.

Without this restriction, a malicious website could make requests on behalf of a user to another website where they are already logged in.

CORS allows the server to specify **which origins are allowed** to access its resources.

---

# Example

Suppose your application has:

**Frontend**

```text
http://localhost:5173
```

**Backend**

```text
http://localhost:5000
```

When the frontend sends a request:

```javascript
fetch("http://localhost:5000/api/users");
```

The browser blocks the request because the frontend and backend have **different origins**.

You may see an error like:

```text
Access to fetch at 'http://localhost:5000'
has been blocked by CORS policy.
```

---

# How Does CORS Work?

1. The browser sends a request to the server.
2. The server responds with CORS headers.
3. The browser checks these headers.
4. If the origin is allowed, the request succeeds.
5. Otherwise, the browser blocks the response.

---

# Handling CORS in Express.js

The easiest way is to use the **`cors`** middleware.

## Step 1: Install CORS

```bash
npm install cors
```

---

## Step 2: Import the Package

```javascript
const cors = require("cors");
```

---

## Step 3: Enable CORS

Allow all origins:

```javascript
app.use(cors());
```

---

# Allow Only Specific Origins (Recommended)

```javascript
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
```

Only requests from `http://localhost:5173` will be allowed.

---

# Allow Multiple Origins

```javascript
const allowedOrigins = [
  "http://localhost:5173",
  "https://myapp.com",
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);
```

---

# Common CORS Options

```javascript
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
```

### Explanation

| Option | Purpose |
|---------|----------|
| `origin` | Allowed frontend domain |
| `methods` | Allowed HTTP methods |
| `credentials` | Allows cookies and authentication headers |
| `allowedHeaders` | Allowed request headers |

---

# What is a Preflight Request?

For certain requests (such as `PUT`, `DELETE`, or requests with custom headers), the browser first sends an **OPTIONS** request.

This is called a **Preflight Request**.

Its purpose is to check whether the server allows the actual request.

If the server responds with the appropriate CORS headers, the browser sends the original request.

---

# Common Interview Questions

## Why does CORS exist?

To protect users by enforcing the **Same-Origin Policy** and preventing unauthorized cross-origin requests.

---

## Does CORS Protect the Backend?

**No.**

CORS is enforced by the **browser**, not the server.

Tools like **Postman**, **cURL**, or backend services can still make requests directly because they do not enforce CORS.

---

## Can We Fix CORS from the Frontend?

**No.**

CORS must be configured on the **server** because the browser checks the response headers sent by the server.

---

# Summary

- **CORS (Cross-Origin Resource Sharing)** is a browser security feature that controls cross-origin requests.
- An origin consists of **protocol + domain + port**.
- Browsers enforce the **Same-Origin Policy** by default.
- The server must explicitly allow trusted origins using CORS headers.
- In Express.js, CORS is commonly handled using the **`cors`** middleware.
- Production applications should **allow only trusted origins**, rather than enabling CORS for all origins.