# How Does MongoDB Handle Data Consistency?

## Question
**How does MongoDB handle data consistency?**

---

# What is Data Consistency?

**Data Consistency** means that every user sees **accurate, valid, and up-to-date data**.

When data is modified, the database ensures that all operations maintain the correctness and integrity of the data.

For example:

Suppose a bank account has **$1000**.

If a user transfers **$200**, the final balance should always be **$800**. It should never become inconsistent due to a system failure or concurrent operations.

---

# How MongoDB Maintains Data Consistency

MongoDB uses several mechanisms to ensure data consistency:

1. **Atomic Operations**
2. **ACID Transactions**
3. **Write Concern**
4. **Read Concern**
5. **Replica Sets**
6. **Journaling**

---

# 1. Atomic Operations

MongoDB guarantees that **every operation on a single document is atomic**.

This means the operation either:

- Completes successfully, or
- Fails completely.

There is no partial update.

### Example

```javascript
db.accounts.updateOne(
  { _id: 1 },
  {
    $inc: {
      balance: -200,
    },
  }
);
```

Either the balance is updated correctly, or nothing changes.

---

# 2. ACID Transactions

Earlier versions of MongoDB guaranteed atomicity only for a single document.

Modern MongoDB supports **multi-document ACID transactions**, allowing multiple operations to succeed or fail together.

**ACID** stands for:

- **A** – Atomicity
- **C** – Consistency
- **I** – Isolation
- **D** – Durability

### Example

Bank Transfer

```text
Account A → -$200
Account B → +$200
```

If one operation fails, MongoDB automatically rolls back both operations, ensuring the database remains consistent.

---

# 3. Write Concern

**Write Concern** determines **how safely MongoDB confirms a write operation**.

Example:

```javascript
db.users.insertOne(
  { name: "Faizan" },
  {
    writeConcern: {
      w: "majority",
    },
  }
);
```

`w: "majority"` means MongoDB acknowledges the write only after it has been replicated to the majority of replica set members.

Higher write concern improves data consistency but may slightly increase write latency.

---

# 4. Read Concern

**Read Concern** controls **which version of the data a client is allowed to read**.

Different read concerns provide different consistency guarantees.

Common options include:

- `local`
- `majority`
- `linearizable`

Using `majority` ensures the client reads data that has already been confirmed by the majority of replica set members.

---

# 5. Replica Sets

MongoDB Replica Sets maintain multiple copies of the same data.

```text
        Primary
       /       \
      ▼         ▼
Secondary   Secondary
```

When data is written:

1. The Primary stores the data.
2. The changes are replicated to Secondary Nodes.
3. If the Primary fails, a Secondary is elected as the new Primary.

This replication helps maintain consistency and availability.

---

# 6. Journaling

MongoDB uses **Journaling** to protect data from unexpected crashes.

Before writing changes permanently to disk, MongoDB records them in a **journal file**.

If the server crashes:

- MongoDB replays the journal during recovery.
- The database is restored to a consistent state.

---

# Eventual Consistency vs Strong Consistency

MongoDB can provide different consistency levels depending on the configuration.

### Eventual Consistency

A Secondary Node may briefly lag behind the Primary.

```text
Primary
   │
   ▼
Updated Data

Secondary
   │
   ▼
Receives Update Shortly After
```

Eventually, all nodes contain the same data.

---

### Strong Consistency

Using:

- `writeConcern: "majority"`
- `readConcern: "majority"`

ensures that clients read only data that has been safely replicated to the majority of nodes.

---

# Best Practices

- Use **transactions** for operations involving multiple documents.
- Use `writeConcern: "majority"` for critical data.
- Use `readConcern: "majority"` when reading important information.
- Deploy MongoDB with **Replica Sets** in production.
- Enable journaling (enabled by default).

---

# Summary

- **Data consistency** ensures that the database always remains accurate and reliable.
- MongoDB provides consistency through **Atomic Operations**, **ACID Transactions**, **Write Concern**, **Read Concern**, **Replica Sets**, and **Journaling**.
- Single-document operations are **atomic** by default.
- Multi-document consistency is achieved using **ACID transactions**.
- Production applications commonly use **Replica Sets** with **majority read and write concerns** to ensure reliable and consistent data.