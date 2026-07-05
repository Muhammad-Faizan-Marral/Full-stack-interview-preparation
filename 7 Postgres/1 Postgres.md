# PostgreSQL

## What is PostgreSQL?

**PostgreSQL** is a powerful, open-source Relational Database Management System (RDBMS). It is used to store, manage, retrieve, and manipulate structured data efficiently. PostgreSQL supports SQL, transactions, indexing, views, stored procedures, and many advanced database features.

### Key Features
- Open-source and free
- ACID compliant (ensures reliable transactions)
- Supports complex queries
- High performance
- Highly secure
- Supports JSON, indexing, and full-text search

---

# Primary Key

A **Primary Key** is a column (or combination of columns) that uniquely identifies each row in a table.

### Rules
- Must contain unique values.
- Cannot contain NULL values.
- Only one Primary Key is allowed per table.

### Example

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);
```

---

# Foreign Key

A **Foreign Key** is a column that creates a relationship between two tables.

### Purpose
- Maintains data integrity.
- Prevents invalid references.

### Example

```sql
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

# Unique

The **UNIQUE** constraint ensures that all values in a column are different.

### Example

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE
);
```

---

# Check

The **CHECK** constraint validates data before inserting or updating it.

### Example

```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    age INT CHECK (age >= 18)
);
```

---

# Default

The **DEFAULT** constraint assigns a default value if no value is provided.

### Example

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    country VARCHAR(50) DEFAULT 'Pakistan'
);
```

---

# Constraints

Constraints are rules applied to table columns to ensure data accuracy and integrity.

### Common Constraints

- PRIMARY KEY
- FOREIGN KEY
- UNIQUE
- NOT NULL
- CHECK
- DEFAULT

---

# SELECT

The **SELECT** statement retrieves data from a table.

### Syntax

```sql
SELECT column_name
FROM table_name;
```

### Example

```sql
SELECT * FROM users;
```

---

# INSERT

The **INSERT** statement adds new records into a table.

### Syntax

```sql
INSERT INTO table_name (column1, column2)
VALUES (value1, value2);
```

### Example

```sql
INSERT INTO users (name, email)
VALUES ('Faizan', 'faizan@gmail.com');
```

---

# UPDATE

The **UPDATE** statement modifies existing records.

### Syntax

```sql
UPDATE table_name
SET column = value
WHERE condition;
```

### Example

```sql
UPDATE users
SET name = 'Ali'
WHERE id = 1;
```

---

# DELETE

The **DELETE** statement removes records from a table.

### Syntax

```sql
DELETE FROM table_name
WHERE condition;
```

### Example

```sql
DELETE FROM users
WHERE id = 2;
```

---

# WHERE

The **WHERE** clause filters records based on a condition.

### Example

```sql
SELECT *
FROM users
WHERE age > 18;
```

---

# ORDER BY

The **ORDER BY** clause sorts the result.

### Ascending Order

```sql
SELECT *
FROM users
ORDER BY age ASC;
```

### Descending Order

```sql
SELECT *
FROM users
ORDER BY age DESC;
```

---

# LIMIT

The **LIMIT** clause restricts the number of rows returned.

### Example

```sql
SELECT *
FROM users
LIMIT 5;
```

---

# OFFSET

The **OFFSET** clause skips a specified number of rows before returning results.

### Example

```sql
SELECT *
FROM users
LIMIT 5 OFFSET 10;
```

This skips the first **10** rows and returns the next **5** rows.

---

# Interview Questions

### PostgreSQL
- What is PostgreSQL?
- Why is PostgreSQL popular?
- What is the difference between PostgreSQL and MySQL?

### Primary Key
- Can a table have multiple Primary Keys?
- Can a Primary Key contain NULL values?

### Foreign Key
- What is a Foreign Key?
- Why do we use Foreign Keys?

### Unique
- What is the difference between UNIQUE and PRIMARY KEY?

### Check
- Why do we use the CHECK constraint?

### Default
- What is the purpose of the DEFAULT constraint?

### Constraints
- Name the different types of constraints in PostgreSQL.

### SQL Queries
- Difference between DELETE, TRUNCATE, and DROP?
- Difference between WHERE and HAVING?
- Difference between LIMIT and OFFSET?
- What is the execution order of a SELECT query?


