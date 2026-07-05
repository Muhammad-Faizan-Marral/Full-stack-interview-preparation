# MongoDB vs Relational Database

## Question
**What is MongoDB, and how is it different from a Relational Database?**

---

# What is a Database?

A **database** is a system used to store, organize, manage, and retrieve data efficiently.

There are two major types of databases:

1. **Relational Databases (SQL)**
2. **Non-Relational Databases (NoSQL)**

---

# What is a Relational Database?

A **Relational Database (SQL Database)** stores data in the form of **tables** consisting of rows and columns.

Each table represents a specific entity, and relationships between tables are established using **Primary Keys** and **Foreign Keys**.

Popular Relational Databases:

- MySQL
- PostgreSQL
- Oracle Database
- Microsoft SQL Server

### Example

### Users Table

| id | name | email |
|----|------|--------|
| 1  | Faizan | faizan@gmail.com |
| 2  | Ali | ali@gmail.com |
### Orders Table

| id | user_id | product |
|----|---------|----------|
| 1 | 1 | Laptop |
| 2 | 2 | Phone |

Here, `user_id` is a **Foreign Key** that creates a relationship between the **Users** and **Orders** tables.

---

# Features of Relational Databases

- Table-based structure
- Fixed schema
- SQL (Structured Query Language)
- Strong relationships using keys
- ACID-compliant transactions
- Ideal for structured data

---

# What is MongoDB?

**MongoDB** is a **NoSQL (Non-Relational)** database.

Instead of storing data in tables, MongoDB stores data in **collections** containing **documents**.

Each document is stored in **BSON (Binary JSON)** format.

### Example Document

```json
{
  "_id": "1",
  "name": "Faizan",
  "email": "faizan@gmail.com",
  "skills": ["React", "Node.js", "MongoDB"],
  "address": {
    "city": "Faisalabad",
    "country": "Pakistan"
  }
}
```

Unlike SQL databases, MongoDB documents do **not** need to have the same structure.

---

# MongoDB Structure

```text
Database
   │
   ▼
Collection
   │
   ▼
Documents
```

Equivalent SQL terminology:

| MongoDB | SQL |
|----------|-----|
| Database | Database |
| Collection | Table |
| Document | Row |
| Field | Column |

---

# Features of MongoDB

- Document-based database
- Flexible schema
- Stores data in BSON format
- Easy horizontal scaling
- High performance for many web applications
- Supports nested objects and arrays

---

# MongoDB vs Relational Database

| MongoDB (NoSQL) | Relational Database (SQL) |
|-----------------|---------------------------|
| Stores data in documents | Stores data in tables |
| Uses collections | Uses tables |
| Flexible schema | Fixed schema |
| BSON (Binary JSON) format | Rows and columns |
| Relationships are usually embedded or referenced | Relationships use Primary and Foreign Keys |
| Scales horizontally | Commonly scales vertically |
| Query language: MongoDB Query Language (MQL) | Query language: SQL |

---

# Example

## SQL

### Users Table

| id | name |
|----|------|
| 1 | Faizan |

### Orders Table

| id | user_id | product |
|----|---------|----------|
| 1 | 1 | Laptop |

To retrieve a user's orders, SQL typically uses a **JOIN**.

```sql
SELECT *
FROM Users
JOIN Orders
ON Users.id = Orders.user_id;
```

---

## MongoDB

The same data can often be stored in a single document.

```json
{
  "name": "Faizan",
  "orders": [
    {
      "product": "Laptop"
    }
  ]
}
```

No JOIN is required in this simple example because related data is embedded in the document.

---

# When Should You Use MongoDB?

MongoDB is a good choice for:

- Social Media Applications
- Chat Applications
- Content Management Systems (CMS)
- Real-Time Applications
- E-commerce Platforms
- Applications with rapidly changing data models

---

# When Should You Use a Relational Database?

Relational databases are a good choice for:

- Banking Systems
- Payment Gateways
- Hospital Management Systems
- Airline Reservation Systems
- ERP Systems
- Applications requiring complex transactions and strong data consistency

---

# Advantages of MongoDB

- Flexible schema
- Easy to scale horizontally
- Fast development
- Stores complex nested data naturally
- Well suited for JSON-based applications

---

# Advantages of Relational Databases

- Strong data consistency
- ACID transactions
- Excellent support for complex relationships
- Powerful SQL queries
- Mature ecosystem

---

# Summary

- A **Relational Database (SQL)** stores data in **tables** with predefined schemas and relationships using **Primary Keys** and **Foreign Keys**.
- **MongoDB** is a **NoSQL** database that stores data in **collections** of **BSON documents**.
- MongoDB offers a flexible schema and is well suited for applications with evolving data structures.
- Relational databases are ideal for applications requiring complex relationships, transactions, and strong consistency.