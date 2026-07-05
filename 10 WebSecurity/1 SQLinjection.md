# SQL Injection

## Q. What is SQL Injection and how do you prevent it?

### What is SQL Injection?

SQL Injection is a security vulnerability where an attacker injects malicious SQL code through user input. This usually happens when an application builds SQL queries by directly concatenating user input into the query string.

As a result, an attacker may be able to:

- Bypass authentication
- Read sensitive data
- Modify or delete records
- Drop database tables
- Execute unauthorized database operations

### ❌ Vulnerable Approach

Never build SQL queries using string interpolation or string concatenation.

```javascript
const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
```

For example, if an attacker enters the following as the email:

```text
' OR 1=1 --
```

The resulting query becomes:

```sql
SELECT * FROM users
WHERE email = '' OR 1=1 --'
AND password = 'password'
```

Since `1=1` is always true, the attacker can bypass authentication. In poorly secured applications, SQL Injection can even be used to execute destructive queries such as `DROP TABLE users`.

---

## How do I prevent SQL Injection?

### 1. Use Parameterized (Prepared) Statements ✅

Always use parameterized queries instead of inserting user input directly into SQL strings.

```javascript
const query =
  "SELECT * FROM users WHERE email = $1 AND password = $2";

db.query(query, [email, hashedPassword]);
```

The database treats user input as **data**, not as executable SQL code.

---

### 2. Use an ORM (e.g., Prisma)

ORMs such as **Prisma** automatically parameterize queries, making SQL Injection much harder when using their query APIs.

```javascript
const user = await prisma.user.findMany({
  where: {
    email,
  },
});
```

> **Note:** You should still avoid executing raw SQL unless absolutely necessary.

---

### 3. Validate User Input

Validate and sanitize incoming data before processing it.

Common validation libraries include:

- Zod
- Joi
- Express Validator

Validation helps ensure that user input has the expected format before reaching your business logic or database.

---

### 4. Follow the Principle of Least Privilege

Your application's database user should have **only the permissions it actually needs**.

For example:

- ✅ SELECT
- ✅ INSERT
- ✅ UPDATE
- ✅ DELETE (if required)

Avoid giving unnecessary permissions such as:

- ❌ DROP TABLE
- ❌ ALTER TABLE
- ❌ CREATE DATABASE

Even if an SQL Injection vulnerability exists, limited database permissions can significantly reduce its impact.

---

## Interview Answer (Short)

> SQL Injection is a vulnerability where an attacker injects malicious SQL through user input by exploiting queries built with string concatenation. This can allow attackers to bypass authentication, access sensitive data, modify records, or even delete database tables. To prevent SQL Injection, I always use parameterized queries or prepared statements, prefer ORMs like Prisma, validate user input using libraries such as Zod or Joi, and follow the principle of least privilege by granting the database user only the required permissions.