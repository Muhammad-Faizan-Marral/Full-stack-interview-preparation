# PostgreSQL Query Optimization

Efficient database queries improve application performance, reduce server load, and provide a better user experience. PostgreSQL offers several tools and techniques to analyze and optimize queries.

---

# EXPLAIN

The **EXPLAIN** command shows how PostgreSQL plans to execute a query without actually running it.

### Purpose

- Understand query execution.
- Check whether indexes are used.
- Identify expensive operations.

### Syntax

```sql
EXPLAIN
SELECT * FROM users WHERE email = 'faizan@gmail.com';
```

### Example Output

```text
Index Scan using users_email_idx on users
```

### Interview Points

- Does **not** execute the query.
- Shows the execution plan.
- Helps identify performance issues.

---

# EXPLAIN ANALYZE

**EXPLAIN ANALYZE** executes the query and shows the actual execution statistics.

### Purpose

- Measure real execution time.
- Compare estimated vs actual rows.
- Detect slow queries.

### Syntax

```sql
EXPLAIN ANALYZE
SELECT * FROM users WHERE email = 'faizan@gmail.com';
```

### Example Output

```text
Index Scan using users_email_idx
Execution Time: 0.25 ms
```

### Interview Points

- Executes the query.
- Displays actual execution time.
- More accurate than EXPLAIN for performance analysis.

---

# N+1 Query Problem

The **N+1 Query Problem** occurs when one query retrieves a list of records, and then an additional query is executed for each record.

### Bad Example

```javascript
const users = await prisma.user.findMany();

for (const user of users) {
  await prisma.post.findMany({
    where: {
      userId: user.id
    }
  });
}
```

If there are **100 users**, this executes:

- 1 query to fetch users.
- 100 additional queries to fetch posts.

**Total = 101 Queries**

### Better Solution

```javascript
const users = await prisma.user.findMany({
  include: {
    posts: true
  }
});
```

### Interview Points

- Causes unnecessary database requests.
- Increases latency.
- Solve using JOINs or eager loading (`include`).

---

# Connection Pool

A **Connection Pool** is a collection of reusable database connections.

Instead of creating a new connection for every request, the application reuses existing connections.

### Benefits

- Faster database access.
- Reduced connection overhead.
- Better scalability.
- Efficient resource utilization.

### Example (Prisma)

```javascript
const prisma = new PrismaClient();
```

Prisma internally manages database connections.

### Interview Points

- Avoids opening new connections repeatedly.
- Improves application performance.
- Essential for high-traffic applications.

---

# Prisma Optimization

Prisma provides several techniques to improve query performance.

## 1. Select Only Required Fields

❌ Bad

```javascript
const users = await prisma.user.findMany();
```

✅ Better

```javascript
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true
  }
});
```

---

## 2. Use Include When Needed

```javascript
const users = await prisma.user.findMany({
  include: {
    posts: true
  }
});
```

---

## 3. Filter Data in the Database

```javascript
const users = await prisma.user.findMany({
  where: {
    age: {
      gt: 18
    }
  }
});
```

---

## 4. Pagination

```javascript
const users = await prisma.user.findMany({
  skip: 10,
  take: 5
});
```

---

## 5. Add Database Indexes

Frequently searched columns should have indexes.

```sql
CREATE INDEX idx_email
ON users(email);
```

### Interview Points

- Use `select` instead of fetching all columns.
- Prevent N+1 queries using `include`.
- Apply filtering and pagination in the database.
- Index frequently queried columns.

---

# Transactions

A **Transaction** is a group of SQL operations executed as a single unit.

If one operation fails, the entire transaction is rolled back.

### ACID Properties

- **A** — Atomicity
- **C** — Consistency
- **I** — Isolation
- **D** — Durability

### SQL Example

```sql
BEGIN;

UPDATE accounts
SET balance = balance - 100
WHERE id = 1;

UPDATE accounts
SET balance = balance + 100
WHERE id = 2;

COMMIT;
```

### Rollback Example

```sql
ROLLBACK;
```

### Prisma Example

```javascript
await prisma.$transaction([
  prisma.user.create({
    data: {
      name: "Faizan"
    }
  }),
  prisma.profile.create({
    data: {
      bio: "Software Engineer"
    }
  })
]);
```

### Interview Points

- Ensures data consistency.
- All operations succeed or all fail.
- Commonly used in banking and payment systems.

---

# Query Optimization

Query Optimization is the process of making SQL queries execute faster and consume fewer resources.

## Best Practices

### 1. Create Indexes

```sql
CREATE INDEX idx_name
ON users(name);
```

---

### 2. Select Only Required Columns

❌ Bad

```sql
SELECT *
FROM users;
```

✅ Better

```sql
SELECT id, name
FROM users;
```

---

### 3. Filter Data

```sql
SELECT *
FROM users
WHERE age > 18;
```

---

### 4. Use LIMIT

```sql
SELECT *
FROM users
LIMIT 10;
```

---

### 5. Avoid Unnecessary Joins

Join only the tables required for the query.

---

### 6. Use EXPLAIN ANALYZE

```sql
EXPLAIN ANALYZE
SELECT *
FROM users
WHERE email = 'faizan@gmail.com';
```

---

### 7. Index Frequently Used Columns

Good candidates include:

- Primary Keys
- Foreign Keys
- Email
- Username
- Search columns

### Interview Points

- Use indexes wisely.
- Avoid `SELECT *`.
- Filter data early.
- Use pagination.
- Analyze slow queries with `EXPLAIN ANALYZE`.

---

# Interview Questions

### EXPLAIN
- What does EXPLAIN do?
- Does EXPLAIN execute the query?

### EXPLAIN ANALYZE
- How is EXPLAIN ANALYZE different from EXPLAIN?
- When would you use EXPLAIN ANALYZE?

### N+1 Query
- What is the N+1 Query Problem?
- How can you prevent it in Prisma?

### Connection Pool
- What is a connection pool?
- Why is connection pooling important?

### Prisma Optimization
- How do you optimize Prisma queries?
- What is the benefit of `select` and `include`?

### Transactions
- What is a transaction?
- What are the ACID properties?
- When should you use transactions?

### Query Optimization
- How do you optimize slow SQL queries?
- Why are indexes important?
- Why should you avoid `SELECT *`?


