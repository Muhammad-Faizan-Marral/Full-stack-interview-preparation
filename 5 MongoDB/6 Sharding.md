# MongoDB Sharding

## Question
**What is Sharding, and how does Sharding work in MongoDB?**

---

# What is Sharding?

**Sharding** is a technique used to **distribute large amounts of data across multiple servers (called shards)**.

Instead of storing all data on a single MongoDB server, the data is divided into smaller pieces and distributed across several servers.

The main goal of sharding is to achieve:

- Horizontal Scaling
- Better Performance
- High Availability
- Increased Storage Capacity

---

# Why Do We Need Sharding?

Suppose your application has grown to **2 TB** of data.

A single MongoDB server may eventually face problems such as:

- Storage limitations
- High CPU usage
- Memory bottlenecks
- Slow query performance

```text
Application
      │
      ▼
Single MongoDB Server
      │
      ▼
2 TB Data ❌
```

Instead of upgrading to a larger server (Vertical Scaling), MongoDB allows you to add more servers and distribute the data.

This approach is called **Horizontal Scaling**, and MongoDB achieves it using **Sharding**.

---

# What is a Shard?

A **Shard** is an individual MongoDB server that stores **only a portion of the total data**.

Example:

```text
Users Collection

Shard 1
---------
Users 1 - 1,000,000

Shard 2
---------
Users 1,000,001 - 2,000,000

Shard 3
---------
Users 2,000,001 - 3,000,000
```

Each shard contains only part of the collection.

Together, all shards store the complete dataset.

---

# MongoDB Sharded Cluster Architecture

A MongoDB sharded cluster consists of **three main components**:

1. Shards
2. Config Servers
3. Query Router (`mongos`)

```text
                 Client
                    │
                    ▼
              mongos (Router)
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
     Shard 1     Shard 2     Shard 3
        │           │           │
        └────── Config Servers ──────┘
```

---

# Components of Sharding

## 1. Shards

Shards store the actual application data.

Each shard usually runs as a **Replica Set** to provide:

- High Availability
- Automatic Failover

---

## 2. Config Servers

Config Servers store metadata about the cluster, including:

- Which shard stores which data
- Cluster configuration
- Chunk distribution

They do **not** store application data.

---

## 3. `mongos` (Query Router)

`mongos` acts as the **entry point** for client applications.

Responsibilities:

- Receives client requests
- Determines which shard contains the required data
- Sends the query to the correct shard(s)
- Combines the results
- Returns the response to the client

Applications connect to **`mongos`**, not directly to the shards.

---

# How Sharding Works

### Step 1

The client sends a request.

```text
Find User
```

---

### Step 2

The request goes to **mongos**.

---

### Step 3

`mongos` checks the Config Servers to determine where the requested data is stored.

---

### Step 4

The request is forwarded to the appropriate shard.

---

### Step 5

The shard returns the requested data.

---

### Step 6

`mongos` sends the response back to the client.

```text
Client
   │
   ▼
mongos
   │
   ▼
Config Servers
   │
   ▼
Correct Shard
   │
   ▼
Response
```

---

# What is a Shard Key?

A **Shard Key** is the field MongoDB uses to decide **which shard should store a document**.

Example:

```javascript
{
   userId: 1001,
   name: "Faizan"
}
```

If `userId` is chosen as the shard key, MongoDB distributes documents based on the value of `userId`.

Choosing a good shard key is critical because it directly affects:

- Performance
- Data distribution
- Load balancing

---

# What are Chunks?

MongoDB divides data into **Chunks**.

A chunk is a small portion of the collection.

Example:

```text
Chunk 1 → Shard 1

Chunk 2 → Shard 2

Chunk 3 → Shard 3
```

As the collection grows, MongoDB automatically:

- Splits large chunks
- Moves chunks between shards

This process keeps the cluster balanced.

---

# Advantages of Sharding

- Horizontal Scaling
- Handles massive datasets
- Faster query performance
- Better load distribution
- Increased storage capacity
- Supports high traffic applications

---

# Challenges of Sharding

- More complex architecture
- Choosing the wrong shard key can lead to uneven data distribution
- More servers mean higher operational costs
- Cross-shard queries can be slower than queries targeting a single shard

---

# Sharding vs Replica Set

| Sharding | Replica Set |
|----------|-------------|
| Distributes data across multiple servers | Stores multiple copies of the same data |
| Used for horizontal scaling | Used for high availability |
| Increases storage capacity | Provides fault tolerance |
| Improves performance for large datasets | Protects against server failures |

> **Interview Tip:**  
> A **Replica Set** focuses on **availability and redundancy**, while **Sharding** focuses on **scalability and distributing data**. In production, **each shard is commonly configured as a Replica Set**, so MongoDB benefits from both scalability and high availability.

---

# Real-World Example

Imagine an **E-commerce Platform** with **500 million orders**.

Instead of storing all orders on one server:

```text
Shard 1 → Asia Orders

Shard 2 → Europe Orders

Shard 3 → America Orders
```

Each server stores only a portion of the data, allowing the application to handle millions of users efficiently.

---

# Summary

- **Sharding** is MongoDB's technique for **horizontal scaling** by distributing data across multiple servers called **shards**.
- A MongoDB sharded cluster consists of **Shards**, **Config Servers**, and a **`mongos` Query Router**.
- MongoDB uses a **Shard Key** to determine where each document is stored.
- Data is divided into **chunks**, which are automatically balanced across shards.
- Sharding improves **storage capacity, performance, and scalability**, making it ideal for very large, high-traffic applications.