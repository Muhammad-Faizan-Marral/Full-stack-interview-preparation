# JavaScript Browser Storage

> Complete Guide to Browser Storage, Cookies, LocalStorage, SessionStorage, and IndexedDB for Interviews & Real-World Development

---

# Table of Contents

1. What is Browser Storage?
2. Types of Browser Storage
3. Cookies
4. LocalStorage
5. SessionStorage
6. IndexedDB
7. Storage Comparison
8. Real-World Examples
9. Interview Questions
10. Best Practices
11. Summary

---

# What is Browser Storage?

Browser Storage allows web applications to store data on the user's browser.

It is commonly used for:

- User preferences
- Authentication tokens
- Shopping carts
- Offline data
- Caching
- Session management

Browser storage helps applications remember information even after page reloads.

---

# Types of Browser Storage

JavaScript provides several ways to store data:

- Cookies
- LocalStorage
- SessionStorage
- IndexedDB

```
Browser Storage
│
├── Cookies
├── LocalStorage
├── SessionStorage
└── IndexedDB
```

---

# Cookies

Cookies are small pieces of data stored by the browser and automatically sent with every HTTP request to the server.

Common Uses

- Authentication
- Session IDs
- User preferences
- Tracking

Example

```javascript
document.cookie = "username=Faizan";
```

Multiple Cookies

```javascript
document.cookie = "theme=dark";
document.cookie = "language=en";
```

Read Cookies

```javascript
console.log(document.cookie);
```

Output

```
username=Faizan; theme=dark; language=en
```

Delete Cookie

```javascript
document.cookie =
    "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
```

Set Expiration

```javascript
document.cookie =
    "theme=dark; expires=Fri, 31 Dec 2027 23:59:59 UTC";
```

Cookie Characteristics

- Small size (about 4 KB per cookie)
- Automatically sent with HTTP requests
- Can have expiration dates
- Accessible by both browser and server (unless marked `HttpOnly`)

---

# LocalStorage

`localStorage` stores data with **no expiration date**.

The data remains available even after:

- Refreshing the page
- Closing the browser
- Restarting the computer

Syntax

```javascript
localStorage.setItem(key, value);
```

Save Data

```javascript
localStorage.setItem("name", "Faizan");
```

Read Data

```javascript
const name = localStorage.getItem("name");

console.log(name);
```

Output

```
Faizan
```

Update Data

```javascript
localStorage.setItem("name", "Ali");
```

Remove Item

```javascript
localStorage.removeItem("name");
```

Clear All Data

```javascript
localStorage.clear();
```

---

# Storing Objects

`localStorage` only stores strings.

Store Object

```javascript
const user = {
    name: "Ali",
    age: 25
};

localStorage.setItem(
    "user",
    JSON.stringify(user)
);
```

Retrieve Object

```javascript
const user = JSON.parse(
    localStorage.getItem("user")
);

console.log(user.name);
```

Output

```
Ali
```

---

# SessionStorage

`sessionStorage` works like `localStorage`, but data is available only for the current browser tab.

The data is removed when:

- The tab is closed
- The browser tab is terminated

Example

```javascript
sessionStorage.setItem(
    "theme",
    "dark"
);
```

Read Data

```javascript
console.log(
    sessionStorage.getItem("theme")
);
```

Remove Item

```javascript
sessionStorage.removeItem("theme");
```

Clear All

```javascript
sessionStorage.clear();
```

---

# LocalStorage vs SessionStorage

| Feature | LocalStorage | SessionStorage |
|----------|--------------|----------------|
| Lifetime | Permanent until removed | Until tab closes |
| Shared Across Tabs | Yes (same origin) | No |
| Capacity | ~5–10 MB (browser dependent) | ~5–10 MB (browser dependent) |
| Data Type | Strings | Strings |

---

# IndexedDB

IndexedDB is a **browser-based NoSQL database** for storing large amounts of structured data.

It supports:

- Objects
- Files
- Images
- Large datasets
- Offline applications

Unlike `localStorage`, IndexedDB stores JavaScript objects directly without requiring `JSON.stringify()`.

---

# Opening a Database

```javascript
const request = indexedDB.open("MyDatabase", 1);
```

Handle Success

```javascript
request.onsuccess = (event) => {
    const db = event.target.result;

    console.log("Database opened");
};
```

Handle Error

```javascript
request.onerror = () => {
    console.log("Database error");
};
```

---

# Creating an Object Store

```javascript
request.onupgradeneeded = (event) => {
    const db = event.target.result;

    db.createObjectStore("users", {
        keyPath: "id"
    });
};
```

---

# IndexedDB Features

- Large storage capacity
- Transaction support
- Indexing
- Asynchronous API
- Object storage
- Offline support

Common Uses

- Offline-first applications
- Progressive Web Apps (PWAs)
- Image storage
- Large datasets
- Client-side caching

---

# Storage Comparison

| Feature | Cookies | LocalStorage | SessionStorage | IndexedDB |
|----------|----------|--------------|----------------|-----------|
| Size | ~4 KB | ~5–10 MB | ~5–10 MB | Hundreds of MBs or more (browser dependent) |
| Lifetime | Configurable | Until removed | Until tab closes | Persistent |
| Sent to Server | Yes | No | No | No |
| Stores Objects Directly | No | No | No | Yes |
| API | Synchronous | Synchronous | Synchronous | Asynchronous |
| Best For | Authentication & sessions | User preferences | Temporary tab data | Large structured data |

---

# Which Storage Should You Use?

### Cookies

Use for

- Session IDs
- Authentication cookies
- Server communication

---

### LocalStorage

Use for

- Dark mode
- Language preference
- User settings
- Recently viewed items

---

### SessionStorage

Use for

- Multi-step forms
- Temporary tab state
- Shopping checkout progress
- Wizard pages

---

### IndexedDB

Use for

- Offline applications
- File storage
- Caching API responses
- Large datasets

---

# Real-World Example

Remember Dark Mode

```javascript
localStorage.setItem("theme", "dark");
```

On Page Load

```javascript
const theme =
    localStorage.getItem("theme");

if (theme === "dark") {
    document.body.classList.add("dark");
}
```

---

# Interview Questions

### What is Browser Storage?

A set of browser technologies used to store data on the client side.

---

### Difference between Cookies and LocalStorage?

Cookies are automatically sent with HTTP requests and have a much smaller size limit, while LocalStorage is used only on the client side and provides much more storage.

---

### Difference between LocalStorage and SessionStorage?

LocalStorage persists until removed, while SessionStorage is cleared when the browser tab is closed.

---

### What is IndexedDB?

A browser-based NoSQL database for storing large amounts of structured data.

---

### Can LocalStorage store objects?

Not directly.

Objects must be converted using `JSON.stringify()` before storing and `JSON.parse()` after retrieving.

---

### Which storage is best for authentication?

Authentication tokens are commonly stored in secure **HttpOnly cookies** because they are inaccessible to JavaScript and are automatically included with HTTP requests.

---

### Which storage supports the largest amount of data?

IndexedDB.

---

# Best Practices

- Avoid storing sensitive data in `localStorage` or `sessionStorage`.
- Use `JSON.stringify()` and `JSON.parse()` for objects in Web Storage.
- Prefer **HttpOnly** and **Secure** cookies for authentication.
- Use IndexedDB for large datasets and offline functionality.
- Remove unused data to avoid unnecessary storage consumption.

---

# Summary

| Storage | Best Use |
|----------|----------|
| Cookies | Authentication, sessions |
| LocalStorage | Persistent user preferences |
| SessionStorage | Temporary tab-specific data |
| IndexedDB | Large structured and offline data |

---

# Quick Revision

- Browser Storage stores data on the client side.
- Cookies are sent with every HTTP request.
- LocalStorage persists until manually removed.
- SessionStorage exists only for the current tab session.
- IndexedDB is an asynchronous NoSQL database.
- LocalStorage and SessionStorage store only strings.
- Use `JSON.stringify()` and `JSON.parse()` for objects.
- IndexedDB is ideal for offline and large-scale storage.

---
