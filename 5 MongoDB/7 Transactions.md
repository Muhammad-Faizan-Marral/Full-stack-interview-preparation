# MongoDB Transactions

## Question
**How do you handle transactions in MongoDB?**

---

# What is a Transaction?

A **transaction** is a sequence of one or more database operations that are treated as a **single unit of work**.

This means that **either all operations succeed or none of them are applied**.

Transactions follow the **ACID** properties to ensure data consistency and reliability.

---

# Why Do We Need Transactions?

Imagine a banking application where a user transfers **$500** from **Account A** to **Account B**.

Two operations are required:

1. Deduct $500 from Account A.
2. Add $500 to Account B.

If the first operation succeeds but the second fails, the money would disappear, resulting in inconsistent data.

A transaction ensures that **both operations succeed together or both are rolled back**.

---

# ACID Properties

MongoDB transactions follow the **ACID** principles:

| Property | Meaning |
|----------|---------|
| **Atomicity** | Either all operations succeed or none do. |
| **Consistency** | The database always remains in a valid state. |
| **Isolation** | Concurrent transactions do not interfere with each other. |
| **Durability** | Once committed, changes are permanently saved. |

---

# How Transactions Work

```text
Start Transaction
       │
       ▼
Operation 1
       │
       ▼
Operation 2
       │
       ▼
Operation 3
       │
       ▼
All Successful?
   │         │
 Yes         No
   │         │
   ▼         ▼
Commit    Rollback
```

---

# MongoDB Transaction Example

Suppose we want to transfer money between two accounts.

```javascript
const session = await mongoose.startSession();

try {
  session.startTransaction();

  await Account.updateOne(
    { _id: senderId },
    { $inc: { balance: -500 } },
    { session }
  );

  await Account.updateOne(
    { _id: receiverId },
    { $inc: { balance: 500 } },
    { session }
  );

  await session.commitTransaction();

  console.log("Transaction Successful");
} catch (error) {
  await session.abortTransaction();

  console.log("Transaction Failed");
} finally {
  session.endSession();
}
```

---

# Transaction Lifecycle

### Step 1

Start a session.

```javascript
const session = await mongoose.startSession();
```

---

### Step 2

Start the transaction.

```javascript
session.startTransaction();
```

---

### Step 3

Execute all database operations using the same `session`.

```javascript
{ session }
```

This ensures all operations belong to the same transaction.

---

### Step 4

If every operation succeeds:

```javascript
await session.commitTransaction();
```

MongoDB permanently saves all changes.

---

### Step 5

If any operation fails:

```javascript
await session.abortTransaction();
```

MongoDB rolls back every change made during the transaction.

---

### Step 6

Close the session.

```javascript
session.endSession();
```

---

# Where Should Transactions Be Used?

Transactions are useful when multiple operations must succeed together.

Examples:

- Bank transfers
- Payment processing
- Order creation
- Inventory management
- Booking systems
- Wallet applications

---

# Transactions vs Single Document Operations

MongoDB automatically guarantees **atomicity for single-document operations**.

Example:

```javascript
db.users.updateOne(
  { _id: 1 },
  {
    $set: {
      age: 25,
    },
  }
);
```

No transaction is required because updating one document is already atomic.

Transactions are mainly needed when **multiple documents or collections** must be updated together.

---

# Requirements for Transactions

Transactions are supported on:

- **Replica Sets**
- **Sharded Clusters** (MongoDB 4.2+)

They are **not supported** on standalone MongoDB servers.

---

# Best Practices

- Keep transactions **short** to reduce lock time and improve performance.
- Use transactions only when multiple operations must succeed together.
- Always handle errors using `try...catch`.
- Always call `commitTransaction()` on success and `abortTransaction()` on failure.
- Close the session using `endSession()`.

---

# Advantages

- Ensures data consistency
- Prevents partial updates
- Supports ACID properties
- Improves reliability
- Simplifies error recovery

---

# Disadvantages

- Slight performance overhead
- Higher resource usage
- Long-running transactions can reduce concurrency

For simple single-document updates, transactions are usually unnecessary.

---

# Summary

- A **transaction** groups multiple database operations into a single unit of work.
- MongoDB transactions follow the **ACID** principles: Atomicity, Consistency, Isolation, and Durability.
- If all operations succeed, MongoDB **commits** the transaction. If any operation fails, it **rolls back** all changes.
- Transactions are ideal for operations involving multiple documents or collections, such as bank transfers, payments, and inventory updates.
- Single-document operations are already **atomic**, so transactions are only needed when coordinating multiple related operations.