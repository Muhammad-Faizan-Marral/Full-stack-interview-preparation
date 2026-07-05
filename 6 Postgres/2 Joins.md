# SQL Joins

SQL **JOIN** is used to combine rows from two or more tables based on a related column between them.

### Example Tables

### Customers

| customer_id | name |
|-------------|------|
| 1 | Faizan |
| 2 | Ali |
| 3 | Ahmed |

### Orders

| order_id | customer_id | product |
|----------|-------------|---------|
| 101 | 1 | Laptop |
| 102 | 2 | Mobile |
| 103 | 4 | Tablet |

---

# INNER JOIN

An **INNER JOIN** returns only the rows that have matching values in both tables.

### Syntax

```sql
SELECT columns
FROM table1
INNER JOIN table2
ON table1.column = table2.column;
```

### Example

```sql
SELECT customers.name, orders.product
FROM customers
INNER JOIN orders
ON customers.customer_id = orders.customer_id;
```

### Output

| name | product |
|------|---------|
| Faizan | Laptop |
| Ali | Mobile |

### Interview Points

- Returns only matching records.
- Most commonly used JOIN.

---

# LEFT JOIN

A **LEFT JOIN** returns all rows from the left table and matching rows from the right table. If no match exists, NULL is returned.

### Syntax

```sql
SELECT columns
FROM table1
LEFT JOIN table2
ON table1.column = table2.column;
```

### Example

```sql
SELECT customers.name, orders.product
FROM customers
LEFT JOIN orders
ON customers.customer_id = orders.customer_id;
```

### Output

| name | product |
|------|---------|
| Faizan | Laptop |
| Ali | Mobile |
| Ahmed | NULL |

### Interview Points

- Returns all records from the left table.
- Non-matching right-side values become NULL.

---

# RIGHT JOIN

A **RIGHT JOIN** returns all rows from the right table and matching rows from the left table. If no match exists, NULL is returned.

### Syntax

```sql
SELECT columns
FROM table1
RIGHT JOIN table2
ON table1.column = table2.column;
```

### Example

```sql
SELECT customers.name, orders.product
FROM customers
RIGHT JOIN orders
ON customers.customer_id = orders.customer_id;
```

### Output

| name | product |
|------|---------|
| Faizan | Laptop |
| Ali | Mobile |
| NULL | Tablet |

### Interview Points

- Returns all records from the right table.
- Non-matching left-side values become NULL.

---

# FULL JOIN

A **FULL JOIN** (or FULL OUTER JOIN) returns all rows from both tables. If there is no match, NULL values are returned.

### Syntax

```sql
SELECT columns
FROM table1
FULL OUTER JOIN table2
ON table1.column = table2.column;
```

### Example

```sql
SELECT customers.name, orders.product
FROM customers
FULL OUTER JOIN orders
ON customers.customer_id = orders.customer_id;
```

### Output

| name | product |
|------|---------|
| Faizan | Laptop |
| Ali | Mobile |
| Ahmed | NULL |
| NULL | Tablet |

### Interview Points

- Returns all matching and non-matching rows.
- Combines LEFT JOIN and RIGHT JOIN results.

---

# CROSS JOIN

A **CROSS JOIN** returns the Cartesian Product of both tables. Every row from the first table is combined with every row from the second table.

### Syntax

```sql
SELECT columns
FROM table1
CROSS JOIN table2;
```

### Example

```sql
SELECT customers.name, orders.product
FROM customers
CROSS JOIN orders;
```

### Result

If Customers has **3 rows** and Orders has **3 rows**, the result will contain **9 rows**.

### Interview Points

- No ON condition is required.
- Produces every possible combination.
- Can generate a very large result set.

---

# SELF JOIN

A **SELF JOIN** joins a table with itself. It is useful when rows in the same table are related.

### Example Table

| employee_id | name | manager_id |
|-------------|------|------------|
| 1 | John | NULL |
| 2 | Alice | 1 |
| 3 | Bob | 1 |

### Syntax

```sql
SELECT e.name AS Employee,
       m.name AS Manager
FROM employees e
LEFT JOIN employees m
ON e.manager_id = m.employee_id;
```

### Output

| Employee | Manager |
|----------|---------|
| John | NULL |
| Alice | John |
| Bob | John |

### Interview Points

- Joins a table to itself.
- Uses aliases to differentiate the two instances.
- Commonly used for employee-manager relationships.

---

# Difference Between SQL Joins

| Join Type | Returns |
|-----------|---------|
| INNER JOIN | Only matching rows |
| LEFT JOIN | All rows from left table + matching rows from right |
| RIGHT JOIN | All rows from right table + matching rows from left |
| FULL JOIN | All rows from both tables |
| CROSS JOIN | Every possible combination of rows |
| SELF JOIN | Joins a table with itself |

---

# Interview Questions

### SQL Joins

- What is a JOIN in SQL?
- What is the difference between INNER JOIN and LEFT JOIN?
- What is the difference between LEFT JOIN and RIGHT JOIN?
- What is FULL OUTER JOIN?
- What is a CROSS JOIN?
- What is a Cartesian Product?
- When should you use a SELF JOIN?
- Which JOIN is used the most in real-world applications?
- What happens if there is no matching record in a LEFT JOIN?
- Can you use multiple JOINs in a single SQL query?



