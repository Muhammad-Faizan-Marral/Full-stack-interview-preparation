# Session Management in Express.js

## Question
**How do you manage sessions in Express.js?**

---

# What is a Session?

A **session** is a way to store user-specific data on the **server** across multiple HTTP requests.

Since **HTTP is a stateless protocol**, the server does not remember previous requests from the same user.

A session allows the server to identify the same user throughout their interaction with the application.

---

# Why Do We Need Sessions?

Without sessions:

1. User logs in.
2. Server verifies the credentials.
3. User makes another request.
4. Server no longer knows who the user is.

With sessions:

1. User logs in.
2. Server creates a session.
3. A unique **Session ID** is generated.
4. The Session ID is stored in the browser as a cookie.
5. Future requests automatically include the Session ID.
6. The server retrieves the user's session data and recognizes the user.

---

# How Sessions Work

```text
User Login
     │
     ▼
Server Verifies Credentials
     │
     ▼
Create Session
     │
     ▼
Generate Session ID
     │
     ▼
Store Session on Server
     │
     ▼
Send Session ID Cookie
     │
     ▼
Browser Stores Cookie
     │
     ▼
Future Requests Include Session ID
     │
     ▼
Server Retrieves Session Data
```

---

# Managing Sessions with `express-session`

Express provides the **`express-session`** package for session management.

## Step 1: Install the Package

```bash
npm install express-session
```

---

## Step 2: Import the Package

```javascript
const session = require("express-session");
```

---

## Step 3: Configure Sessions

```javascript
app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);
```

### Configuration Options

| Option | Purpose |
|---------|---------|
| `secret` | Encrypts/signs the Session ID cookie |
| `resave` | Prevents saving unchanged sessions |
| `saveUninitialized` | Prevents storing empty sessions |
| `cookie.maxAge` | Session expiration time |

---

# Creating a Session

After successful login:

```javascript
app.post("/login", (req, res) => {
  req.session.user = {
    id: 1,
    name: "Faizan",
  };

  res.send("Login Successful");
});
```

---

# Accessing Session Data

```javascript
app.get("/profile", (req, res) => {
  console.log(req.session.user);

  res.send(req.session.user);
});
```

---

# Destroying a Session (Logout)

```javascript
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.send("Logged Out");
  });
});
```

---

# Where Is Session Data Stored?

By default, **express-session** stores session data in **server memory**.

⚠️ This is **not recommended for production** because:

- Memory is lost when the server restarts.
- It does not scale across multiple server instances.

For production, sessions are commonly stored in:

- Redis
- MongoDB
- MySQL
- PostgreSQL

---

# Cookie vs Session

| Cookie | Session |
|---------|----------|
| Stored in the browser | Stored on the server |
| Small amount of data | Can store larger user data |
| User can view or modify cookie contents (unless protected) | Client only stores the Session ID |
| Less secure for sensitive data | More secure because data stays on the server |

---

# Session vs JWT Authentication

| Session | JWT |
|----------|-----|
| Server stores session data | Server does not store user state (stateless) |
| Client stores only a Session ID | Client stores the JWT token |
| Easy to invalidate on logout | Requires token expiration or blacklisting |
| Good for traditional web applications | Common for REST APIs and mobile apps |

---

# Best Practices

- Use strong, unique `secret` values.
- Set `cookie.httpOnly = true` to prevent JavaScript access.
- Use `cookie.secure = true` in production (HTTPS).
- Store sessions in **Redis** or another external session store.
- Destroy the session when the user logs out.
- Set an appropriate session expiration time.

---

# Summary

- A **session** allows the server to remember a user across multiple HTTP requests.
- Express.js manages sessions using the **`express-session`** package.
- The server stores session data, while the browser stores only the **Session ID** in a cookie.
- For production applications, use an external session store such as **Redis** instead of the default memory store.
- Sessions are commonly used for user authentication and maintaining login state.