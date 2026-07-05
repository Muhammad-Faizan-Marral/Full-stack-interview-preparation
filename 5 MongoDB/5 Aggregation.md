# MongoDB Aggregation

## Question
**Explain the concept of Aggregation in MongoDB.**

---

# What is Aggregation?

**Aggregation** is a process used to **process, transform, filter, group, and analyze data** in MongoDB.

It allows you to perform operations such as:

- Filtering data
- Grouping documents
- Sorting results
- Calculating totals
- Finding averages
- Counting documents
- Joining collections
- Transforming data

Think of Aggregation as SQL's **GROUP BY**, **SUM**, **COUNT**, **AVG**, and **JOIN** operations combined into a powerful data processing pipeline.

---

# Why Do We Need Aggregation?

Suppose you have an **Orders** collection.

```json
[
  {
    "customer": "Faizan",
    "amount": 100
  },
  {
    "customer": "Ali",
    "amount": 200
  },
  {
    "customer": "Faizan",
    "amount": 300
  }
]
```

Questions like these cannot be answered efficiently using a simple `find()` query:

- What is the total sales?
- How many orders has each customer placed?
- What is the average order amount?
- Which customer spent the most?

Aggregation is designed to answer these types of questions.

---

# Aggregation Pipeline

MongoDB performs aggregation using an **Aggregation Pipeline**.

Each stage processes the output of the previous stage.

```text
Collection
     │
     ▼
$match
     │
     ▼
$group
     │
     ▼
$sort
     │
     ▼
$project
     │
     ▼
Final Result
```

Each stage transforms the data before passing it to the next stage.

---

# Basic Syntax

```javascript
db.orders.aggregate([
  {
    pipeline_stage
  }
]);
```

---

# Common Aggregation Stages

## 1. `$match`

Filters documents (similar to SQL `WHERE`).

Example

```javascript
db.orders.aggregate([
  {
    $match: {
      customer: "Faizan",
    },
  },
]);
```

Only documents where the customer is "Faizan" are processed further.

---

## 2. `$group`

Groups documents and performs calculations.

Example

```javascript
db.orders.aggregate([
  {
    $group: {
      _id: "$customer",
      totalAmount: {
        $sum: "$amount",
      },
    },
  },
]);
```

Output

```json
[
  {
    "_id": "Faizan",
    "totalAmount": 400
  },
  {
    "_id": "Ali",
    "totalAmount": 200
  }
]
```

---

## 3. `$sort`

Sorts the results.

Example

```javascript
db.orders.aggregate([
  {
    $sort: {
      amount: -1,
    },
  },
]);
```

`-1` = Descending

`1` = Ascending

---

## 4. `$project`

Selects or transforms fields.

Example

```javascript
db.users.aggregate([
  {
    $project: {
      name: 1,
      email: 1,
      _id: 0,
    },
  },
]);
```

Only `name` and `email` are returned.

---

## 5. `$limit`

Limits the number of returned documents.

```javascript
db.orders.aggregate([
  {
    $limit: 5,
  },
]);
```

---

## 6. `$skip`

Skips documents.

Useful for pagination.

```javascript
db.orders.aggregate([
  {
    $skip: 10,
  },
]);
```

---

## 7. `$lookup`

Performs a join between two collections.

Example

```javascript
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user",
    },
  },
]);
```

Similar to SQL `JOIN`.

---

## 8. `$unwind`

Breaks an array into separate documents.

Example

Input

```json
{
  "name": "Faizan",
  "skills": ["React", "Node.js"]
}
```

After `$unwind`

```json
{
  "name": "Faizan",
  "skill": "React"
}
```

```json
{
  "name": "Faizan",
  "skill": "Node.js"
}
```

---

# Common Aggregation Operators

| Operator | Purpose |
|----------|---------|
| `$sum` | Calculate total |
| `$avg` | Calculate average |
| `$min` | Minimum value |
| `$max` | Maximum value |
| `$count` | Count documents |
| `$first` | First document |
| `$last` | Last document |
| `$push` | Create an array |

---

# Real-World Example

Suppose an e-commerce company wants to calculate **total sales for each customer**.

Collection

```json
[
  {
    "customer": "Faizan",
    "amount": 100
  },
  {
    "customer": "Faizan",
    "amount": 250
  },
  {
    "customer": "Ali",
    "amount": 300
  }
]
```

Aggregation

```javascript
db.orders.aggregate([
  {
    $group: {
      _id: "$customer",
      totalSales: {
        $sum: "$amount",
      },
    },
  },
]);
```

Output

```json
[
  {
    "_id": "Faizan",
    "totalSales": 350
  },
  {
    "_id": "Ali",
    "totalSales": 300
  }
]
```

---

# Advantages of Aggregation

- Powerful data analysis
- Fast reporting
- Supports complex calculations
- Reduces application-side processing
- Processes large datasets efficiently
- Supports joins using `$lookup`

---

# Aggregation vs `find()`

| `find()` | Aggregation |
|-----------|-------------|
| Retrieves documents | Processes and transforms documents |
| Basic filtering | Advanced filtering and calculations |
| Cannot group data | Supports grouping with `$group` |
| No joins | Supports joins with `$lookup` |
| Simple queries | Complex data analysis |

---

# Summary

- **Aggregation** is MongoDB's framework for **processing and analyzing data**.
- It uses an **Aggregation Pipeline**, where each stage transforms the output of the previous stage.
- Common stages include **`$match`**, **`$group`**, **`$sort`**, **`$project`**, **`$lookup`**, **`$limit`**, and **`$skip`**.
- Aggregation is commonly used for **reporting, analytics, statistics, filtering, grouping, and joining collections**.
- It is one of MongoDB's most powerful features for handling complex queries efficiently.