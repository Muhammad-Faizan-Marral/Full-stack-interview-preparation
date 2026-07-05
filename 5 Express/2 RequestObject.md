# Difference Between `req.params`, `req.query`, `req.body`, and Other Important Request Objects

## Question
**What is the difference between `req.params`, `req.query`, `req.body`, and other commonly used request properties in Express.js?**

---

# What is `req`?

In Express.js, **`req` (Request Object)** contains all the information sent by the client to the server.

It provides access to:

- URL parameters
- Query parameters
- Request body
- Headers
- Cookies
- Authentication data
- Client information

---

# 1. `req.params`

`req.params` is used to access **Route Parameters** (also called URL Parameters).

These values are part of the URL path.

### Example Route

```javascript
app.get("/users/:id", (req, res) => {
  console.log(req.params);
});
```

### Request

```text
GET /users/25
```

### Output

```javascript
{ id: "25" }
```

### Common Use Cases

- User ID
- Product ID
- Order ID
- Blog ID

---

# 2. `req.query`

`req.query` is used to access **Query String Parameters**.

These appear **after the `?`** in the URL.

### Example Route

```javascript
app.get("/products", (req, res) => {
  console.log(req.query);
});
```

### Request

```text
GET /products?category=laptop&page=2&sort=price
```

### Output

```javascript
{
  category: "laptop",
  page: "2",
  sort: "price"
}
```

### Common Use Cases

- Search
- Filtering
- Pagination
- Sorting

---

# 3. `req.body`

`req.body` contains data sent by the client inside the **request body**.

It is commonly used with:

- POST
- PUT
- PATCH

To use `req.body`, you must enable the JSON middleware:

```javascript
app.use(express.json());
```

### Example

```javascript
app.post("/users", (req, res) => {
  console.log(req.body);
});
```

### Request Body

```json
{
  "name": "Faizan",
  "age": 22
}
```

### Output

```javascript
{
  name: "Faizan",
  age: 22
}
```

### Common Use Cases

- Registration forms
- Login forms
- Creating records
- Updating records

---

# Comparison

| Property | Data Comes From | Example |
|-----------|-----------------|----------|
| `req.params` | URL Path | `/users/10` |
| `req.query` | Query String | `?page=2` |
| `req.body` | Request Body | JSON/Form Data |

---

# Other Important `req` Properties

## 4. `req.headers`

Contains the HTTP request headers.

### Example

```javascript
console.log(req.headers);
```

Common headers:

- Authorization
- Content-Type
- User-Agent
- Accept

---

## 5. `req.method`

Returns the HTTP method used for the request.

### Example

```javascript
console.log(req.method);
```

Output

```text
GET
```

Possible values:

- GET
- POST
- PUT
- PATCH
- DELETE

---

## 6. `req.url`

Returns the requested URL.

### Example

```javascript
console.log(req.url);
```

Output

```text
/users/10
```

---

## 7. `req.path`

Returns only the URL path (without the query string).

### Example

```text
/products?page=2
```

Output

```text
/products
```

---

## 8. `req.hostname`

Returns the hostname.

Example:

```text
localhost
```

or

```text
api.example.com
```

---

## 9. `req.ip`

Returns the client's IP address.

```javascript
console.log(req.ip);
```

Useful for:

- Logging
- Security
- Rate Limiting

---

## 10. `req.cookies`

Contains cookies sent by the client.

Requires the `cookie-parser` middleware.

Example

```javascript
console.log(req.cookies);
```

---

## 11. `req.user`

This is **not a built-in Express property**.

It is commonly added by authentication middleware (such as JWT or Passport.js) after verifying the user.

Example

```javascript
console.log(req.user);
```

Commonly contains:

```javascript
{
  id: 12,
  name: "Faizan",
  role: "Admin"
}
```

---

# Quick Comparison Table

| Property | Purpose |
|-----------|---------|
| `req.params` | Read route parameters |
| `req.query` | Read query string parameters |
| `req.body` | Read JSON or form data |
| `req.headers` | Read HTTP headers |
| `req.method` | Get HTTP request method |
| `req.url` | Get complete request URL |
| `req.path` | Get URL path |
| `req.hostname` | Get hostname |
| `req.ip` | Get client IP address |
| `req.cookies` | Read cookies |
| `req.user` | Read authenticated user (added by middleware) |

---

# Interview Tip

A very common interview question is:

**URL**

```text
GET /users/15?sort=name
```

**Body**

```json
{
  "city": "Lahore"
}
```

What will each property contain?

```javascript
req.params
// { id: "15" }

req.query
// { sort: "name" }

req.body
// { city: "Lahore" }
```

Remember:

- **`req.params` → URL Path**
- **`req.query` → Query String**
- **`req.body` → Request Body**

---

# Summary

- `req.params` is used for **route parameters**.
- `req.query` is used for **query string values**.
- `req.body` is used for **JSON or form data** sent in the request body.
- Other useful request properties include `req.headers`, `req.method`, `req.url`, `req.path`, `req.ip`, `req.cookies`, and `req.user`.
- Understanding these properties is essential for building REST APIs with Express.js.