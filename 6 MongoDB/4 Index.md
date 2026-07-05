# Indexes in MongoDB

## Question
**What are Indexes in MongoDB, and why are they important?**

---

# What are Indexes?

An **Index** is a special data structure that stores the values of one or more fields in a sorted order.

Instead of scanning every document in a collection, MongoDB uses an index to quickly locate the required data.

Think of an index like the **index page of a book**.

Without an index, you would have to read every page to find a topic.

With an index, you simply look up the topic in the index page and jump directly to the correct page.

MongoDB indexes work in the same way.

---

# Why Are Indexes Important?

Without an index, MongoDB performs a **Collection Scan (COLLSCAN)**.

This means it checks **every document** in the collection until it finds the matching data.

Example:

Suppose you have **1 million users**.

```text
Users Collection

1
2
3
4
5
...
1000000
```

Searching for:

```javascript
{ email: "faizan@gmail.com" }
```

Without an index, MongoDB may scan almost every document.

This is slower and consumes more CPU and memory.

---

# With an Index

If the `email` field has an index:

```javascript
db.users.createIndex({ email: 1 });
```

MongoDB directly jumps to the matching document.

```text
Index

a@gmail.com
b@gmail.com
c@gmail.com
faizan@gmail.com  ✅
z@gmail.com
```

This makes searches significantly faster.

---

# How to Create an Index

### Ascending Index

```javascript
db.users.createIndex({ email: 1 });
```

`1` means **Ascending Order**.

---

### Descending Index

```javascript
db.users.createIndex({ age: -1 });
```

`-1` means **Descending Order**.

---

# Types of Indexes

## 1. Single Field Index

Indexes one field.

```javascript
db.users.createIndex({
  email: 1,
});
```

Best for searching by email.

---

## 2. Compound Index

Indexes multiple fields.

```javascript
db.users.createIndex({
  name: 1,
  age: -1,
});
```

Useful when queries frequently filter by both fields.

---

## 3. Unique Index

Ensures duplicate values cannot be inserted.

```javascript
db.users.createIndex(
  {
    email: 1,
  },
  {
    unique: true,
  }
);
```

Now two users cannot have the same email address.

---

## 4. Text Index

Used for full-text search.

```javascript
db.posts.createIndex({
  title: "text",
});
```

Example:

```javascript
db.posts.find({
  $text: {
    $search: "React",
  },
});
```

---

## 5. TTL (Time-To-Live) Index

Automatically deletes documents after a specified time.

Example:

```javascript
db.sessions.createIndex(
  {
    createdAt: 1,
  },
  {
    expireAfterSeconds: 3600,
  }
);
```

Documents expire after **1 hour**.

Common use cases:

- OTPs
- Sessions
- Cache
- Temporary tokens

---

# Default Index

MongoDB automatically creates an index on the `_id` field.

Example:

```javascript
{
   "_id": ObjectId(...)
}
```

This index ensures every document has a unique identifier and enables fast lookups by `_id`.

---

# Advantages of Indexes

- Faster searching
- Faster sorting
- Faster filtering
- Improves query performance
- Reduces database response time

---

# Disadvantages of Indexes

Indexes are not free.

They also have some costs:

- Require additional storage space
- Slightly slow down **Insert**, **Update**, and **Delete** operations because the index must also be updated
- Too many indexes can reduce overall performance

Therefore, create indexes only on fields that are frequently queried.

---

# Example Without Index

```javascript
db.users.find({
  email: "faizan@gmail.com",
});
```

MongoDB performs:

```text
COLLSCAN
```

Meaning every document is scanned.

---

# Example With Index

```javascript
db.users.createIndex({
  email: 1,
});
```

Now MongoDB performs:

```text
IXSCAN
```

Meaning it searches the index instead of scanning the entire collection.

---

# When Should You Create an Index?

Create indexes on fields that are frequently used for:

- Searching
- Filtering
- Sorting
- Joining (`$lookup`)
- Unique values (e.g., email, username)

Avoid indexing fields that are:

- Rarely queried
- Frequently updated without being searched

---

# Summary

- An **Index** is a special data structure that helps MongoDB locate data quickly.
- Without indexes, MongoDB performs a **Collection Scan (COLLSCAN)**.
- With indexes, MongoDB performs an **Index Scan (IXSCAN)**, significantly improving query performance.
- Common index types include **Single Field**, **Compound**, **Unique**, **Text**, and **TTL** indexes.
- While indexes improve read performance, they consume storage and slightly reduce write performance, so they should be created strategically.