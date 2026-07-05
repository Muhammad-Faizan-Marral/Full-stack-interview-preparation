# MongoDB Replica Set

## Question
**What is a Replica Set in MongoDB, and how does it work?**

---

# What is a Replica Set?

A **Replica Set** is a group of MongoDB servers that maintain **multiple copies of the same data**.

Its main purpose is to provide:

- High Availability
- Fault Tolerance
- Data Redundancy
- Automatic Failover

If one server fails, another server automatically takes over, ensuring the application continues to run without downtime.

---

# Why Do We Need a Replica Set?

Imagine your application has only **one MongoDB server**.

```text
Application
      │
      ▼
 MongoDB Server
```

If this server crashes:

- ❌ Database becomes unavailable
- ❌ Users cannot access the application
- ❌ Risk of data loss if backups are outdated

To solve this problem, MongoDB uses a **Replica Set**.

---

# Replica Set Architecture

A typical Replica Set consists of:

- **1 Primary Node**
- **1 or more Secondary Nodes**

```text
                Clients
                   │
                   ▼
              Primary Node
             (Read & Write)
              /         \
             /           \
            ▼             ▼
   Secondary Node   Secondary Node
   (Replication)    (Replication)
```

All data written to the **Primary** is automatically copied to the **Secondary** nodes.

---

# Components of a Replica Set

## 1. Primary Node

The **Primary Node** is responsible for:

- Handling all write operations
- Handling read operations (by default)
- Replicating data to Secondary Nodes

Example:

```javascript
db.users.insertOne({
  name: "Faizan"
});
```

The write first goes to the Primary Node.

---

## 2. Secondary Nodes

Secondary Nodes:

- Receive replicated data from the Primary
- Keep an up-to-date copy of the database
- Can serve read operations if configured
- Automatically become Primary during failover

---

# How Replication Works

Suppose a user inserts a document.

### Step 1

Client sends a request.

```text
Insert User
```

---

### Step 2

The Primary Node stores the data.

```text
Primary
   │
   ▼
User Saved
```

---

### Step 3

MongoDB automatically copies the same data to every Secondary Node.

```text
Primary
   │
   ├────────► Secondary 1
   │
   └────────► Secondary 2
```

All nodes now contain identical data.

---

# What is Automatic Failover?

Suppose the Primary Node suddenly crashes.

```text
Primary ❌
```

MongoDB automatically starts an **Election Process**.

The Secondary Nodes vote to elect a new Primary.

Example:

```text
Old Primary ❌

Secondary 1
      │
      ▼
Becomes New Primary ✅

Secondary 2
```

The application continues running with little or no interruption.

This process is called **Automatic Failover**.

---

# Election Process

When the Primary becomes unavailable:

1. Secondary Nodes detect the failure.
2. They hold an election.
3. One Secondary becomes the new Primary.
4. Clients automatically connect to the new Primary.

No manual intervention is required.

---

# Read and Write Operations

| Node | Read | Write |
|------|------|--------|
| Primary | ✅ Yes | ✅ Yes |
| Secondary | ✅ Optional | ❌ No |

By default:

- Reads → Primary
- Writes → Primary

However, MongoDB can be configured to allow reads from Secondary Nodes using **Read Preferences**.

---

# Advantages of Replica Sets

- High Availability
- Automatic Failover
- Data Redundancy
- Improved Reliability
- Disaster Recovery
- Reduced Downtime

---

# Limitations

- Requires multiple servers
- More storage is needed because data is duplicated
- Slight replication delay may occur before Secondary Nodes receive updates
- More complex deployment and maintenance

---

# Replica Set vs Single MongoDB Server

| Single Server | Replica Set |
|---------------|-------------|
| One database server | Multiple database servers |
| Single point of failure | No single point of failure |
| No automatic recovery | Automatic failover |
| Lower availability | High availability |
| Less reliable | More reliable |

---

# Real-World Example

Imagine an **E-commerce Website**.

```text
Customer
    │
    ▼
MongoDB Replica Set

Primary
   │
   ├────────► Secondary 1
   │
   └────────► Secondary 2
```

If the Primary server crashes during an order:

- A Secondary is promoted to Primary.
- Orders continue without significant downtime.
- Customers are not affected.

---

# Summary

- A **Replica Set** is a group of MongoDB servers that maintain **multiple copies of the same data**.
- It consists of **one Primary Node** and **one or more Secondary Nodes**.
- All write operations go to the **Primary**, and data is automatically replicated to the **Secondary** nodes.
- If the Primary fails, MongoDB performs an **automatic election**, promoting a Secondary to become the new Primary.
- Replica Sets provide **high availability, fault tolerance, data redundancy, and automatic failover**, making them essential for production MongoDB deployments.