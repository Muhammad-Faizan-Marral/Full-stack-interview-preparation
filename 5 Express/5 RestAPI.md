# REST API

## Question
**What is a REST API?**

---

# What is an API?

An **API (Application Programming Interface)** is a bridge that allows two applications to communicate with each other.

For example:

- A React frontend requests user data.
- The Node.js backend processes the request.
- The backend retrieves data from the database.
- The backend sends the response back to the frontend.

```text
Frontend
    │
    ▼
REST API
    │
    ▼
Backend
    │
    ▼
Database
```

---

# What is a REST API?

A **REST API (Representational State Transfer API)** is an API that follows a set of architectural principles for communication between a **client** and a **server** using the HTTP protocol.

REST APIs use **resources** (such as users, products, or orders), where each resource is identified by a unique URL.

Example:

```text
/users
/products
/orders
```

---

# REST Principles

A REST API follows these key principles:

## 1. Client-Server Architecture

The client and server are independent.

- Client → Sends requests.
- Server → Processes requests and returns responses.

---

## 2. Stateless

REST APIs are **stateless**, meaning every request contains all the information needed to process it.

The server does **not** remember previous requests.

Authentication is usually handled using:

- JWT
- Session ID
- API Keys

---

## 3. Resource-Based URLs

Resources should be represented using nouns, not verbs.

✅ Good

```text
/users
/products
/orders
```

❌ Bad

```text
/getUsers
/createProduct
/deleteOrder
```

---

## 4. Standard HTTP Methods

REST APIs use HTTP methods to perform operations on resources.

| Method | Purpose |
|---------|----------|
| GET | Retrieve data |
| POST | Create new data |
| PUT | Update an entire resource |
| PATCH | Partially update a resource |
| DELETE | Remove data |

---

# HTTP Method Examples

## GET

Retrieve all users.

```http
GET /users
```

---

## POST

Create a new user.

```http
POST /users
```

Body

```json
{
  "name": "Faizan",
  "email": "faizan@example.com"
}
```

---

## PUT

Replace an existing user.

```http
PUT /users/1
```

---

## PATCH

Update only specific fields.

```http
PATCH /users/1
```

Body

```json
{
  "name": "Muhammad Faizan"
}
```

---

## DELETE

Delete a user.

```http
DELETE /users/1
```

---

# HTTP Status Codes

A REST API should return meaningful HTTP status codes.

| Status Code | Meaning |
|-------------|---------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

# Example Express REST API

```javascript
const express = require("express");

const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  res.status(201).json(req.body);
});

app.put("/users/:id", (req, res) => {
  res.send("User Updated");
});

app.delete("/users/:id", (req, res) => {
  res.send("User Deleted");
});
```

---

# REST API Request Flow

```text
Client
   │
   ▼
HTTP Request
(GET, POST, PUT, DELETE)
   │
   ▼
REST API
   │
   ▼
Database
   │
   ▼
HTTP Response
(JSON + Status Code)
   │
   ▼
Client
```

---

# Advantages of REST APIs

- Simple and easy to understand
- Stateless architecture
- Platform-independent
- Scalable
- Supports JSON, XML, and other formats
- Widely supported by web and mobile applications

---

# REST API Best Practices

- Use nouns in endpoint URLs.
- Return appropriate HTTP status codes.
- Keep APIs stateless.
- Validate request data.
- Handle errors gracefully.
- Secure APIs using authentication and authorization.
- Use versioning (e.g., `/api/v1/users`).

---

# REST API vs SOAP

| REST API | SOAP |
|-----------|------|
| Uses HTTP | Uses XML-based messaging protocol |
| Lightweight | Heavyweight |
| Usually uses JSON | Uses XML |
| Faster | Slower |
| Easy to develop | More complex |
| Widely used for modern web applications | Common in enterprise systems |

---

# Summary

- A **REST API** is an API that follows the **Representational State Transfer (REST)** architectural style.
- It enables communication between a **client** and a **server** using HTTP.
- REST APIs are **stateless**, **resource-based**, and use standard **HTTP methods** such as GET, POST, PUT, PATCH, and DELETE.
- They typically exchange data in **JSON** format and return appropriate **HTTP status codes**.
- REST APIs are the most commonly used approach for building modern web services.