# JavaScript Arrays

A complete guide to JavaScript Arrays, covering the most commonly used array methods, interview concepts, and coding implementations.

---

# Table of Contents

1. What is an Array?
2. map()
3. filter()
4. reduce()
5. find()
6. findIndex()
7. some()
8. every()
9. includes()
10. indexOf()
11. flat()
12. flatMap()
13. splice()
14. slice()
15. sort()
16. reverse()
17. forEach()
18. push()
19. pop()
20. shift()
21. unshift()
22. Interview Comparison Table
23. Coding: Implement map()
24. Coding: Implement filter()
25. Coding: Implement reduce()
26. Summary

---

# 1. What is an Array?

An array is an ordered collection of values that can store multiple items in a single variable.

```javascript
const fruits = ["Apple", "Banana", "Orange"];
```

Arrays can store any data type.

```javascript
const data = [
    10,
    "Hello",
    true,
    null,
    { name: "John" },
    [1, 2, 3]
];
```

---

# 2. map()

Creates a **new array** by transforming every element.

Returns:
- New Array
- Does NOT modify original array

Syntax

```javascript
array.map((item, index, array) => {})
```

Example

```javascript
const nums = [1, 2, 3];

const result = nums.map(num => num * 2);

console.log(result);
```

Output

```
[2,4,6]
```

---

# 3. filter()

Creates a new array containing only the elements that satisfy a condition.

Returns:
- New Array

Example

```javascript
const nums = [1,2,3,4,5];

const even = nums.filter(num => num % 2 === 0);

console.log(even);
```

Output

```
[2,4]
```

---

# 4. reduce()

Reduces an array to a single value.

Syntax

```javascript
array.reduce((accumulator, currentValue) => {}, initialValue)
```

Example

```javascript
const nums = [1,2,3,4];

const sum = nums.reduce((acc, curr) => acc + curr, 0);

console.log(sum);
```

Output

```
10
```

---

# 5. find()

Returns the **first matching element**.

```javascript
const nums = [10,20,30];

const value = nums.find(num => num > 15);

console.log(value);
```

Output

```
20
```

Returns `undefined` if no match is found.

---

# 6. findIndex()

Returns the index of the first matching element.

```javascript
const nums = [10,20,30];

console.log(
    nums.findIndex(num => num === 20)
);
```

Output

```
1
```

Returns `-1` if not found.

---

# 7. some()

Returns `true` if **at least one** element satisfies the condition.

```javascript
const nums = [1,3,5,8];

console.log(
    nums.some(num => num % 2 === 0)
);
```

Output

```
true
```

---

# 8. every()

Returns `true` only if **all** elements satisfy the condition.

```javascript
const nums = [2,4,6];

console.log(
    nums.every(num => num % 2 === 0)
);
```

Output

```
true
```

---

# 9. includes()

Checks whether a value exists.

```javascript
const fruits = ["Apple","Orange"];

console.log(
    fruits.includes("Apple")
);
```

Output

```
true
```

Case-sensitive.

---

# 10. indexOf()

Returns the index of the first occurrence.

```javascript
const fruits = ["Apple","Banana","Apple"];

console.log(
    fruits.indexOf("Apple")
);
```

Output

```
0
```

Returns `-1` if not found.

---

# 11. flat()

Flattens nested arrays.

```javascript
const arr = [1,[2,[3]]];

console.log(
    arr.flat()
);
```

Output

```
[1,2,[3]]
```

Flatten two levels:

```javascript
arr.flat(2);
```

Output

```
[1,2,3]
```

---

# 12. flatMap()

Performs `map()` followed by `flat(1)`.

```javascript
const nums = [1,2,3];

const result = nums.flatMap(num => [num, num * 2]);

console.log(result);
```

Output

```
[1,2,2,4,3,6]
```

---

# 13. splice()

Changes the original array.

- Add
- Remove
- Replace

```javascript
const arr = [1,2,3,4];

arr.splice(1,2);

console.log(arr);
```

Output

```
[1,4]
```

Insert

```javascript
const arr = [1,2,3];

arr.splice(1,0,100);

console.log(arr);
```

Output

```
[1,100,2,3]
```

---

# 14. slice()

Returns a shallow copy.

Does NOT modify original array.

```javascript
const arr = [1,2,3,4];

console.log(
    arr.slice(1,3)
);
```

Output

```
[2,3]
```

---

# 15. sort()

Sorts the original array.

```javascript
const arr = [5,2,8,1];

arr.sort();

console.log(arr);
```

Output

```
[1,2,5,8]
```

### Important

Without a compare function, values are sorted as strings.

Wrong:

```javascript
[10,2,5].sort()
```

Output

```
[10,2,5]
```

Correct

```javascript
[10,2,5].sort((a,b)=>a-b);
```

Output

```
[2,5,10]
```

Descending

```javascript
arr.sort((a,b)=>b-a);
```

---

# 16. reverse()

Reverses the original array.

```javascript
const arr = [1,2,3];

arr.reverse();

console.log(arr);
```

Output

```
[3,2,1]
```

---

# 17. forEach()

Executes a function for every element.

Returns:

```
undefined
```

```javascript
const nums = [1,2,3];

nums.forEach(num=>{
    console.log(num);
});
```

Use `forEach()` when you need side effects (logging, DOM updates), not when creating a new array.

---

# 18. push()

Adds element(s) to the end.

```javascript
const arr = [1,2];

arr.push(3);

console.log(arr);
```

Output

```
[1,2,3]
```

Returns the new array length.

---

# 19. pop()

Removes the last element.

```javascript
const arr = [1,2,3];

const last = arr.pop();

console.log(last);
```

Output

```
3
```

---

# 20. shift()

Removes the first element.

```javascript
const arr = [1,2,3];

arr.shift();

console.log(arr);
```

Output

```
[2,3]
```

---

# 21. unshift()

Adds element(s) to the beginning.

```javascript
const arr = [2,3];

arr.unshift(1);

console.log(arr);
```

Output

```
[1,2,3]
```

---

# 22. Interview Comparison Table

| Method | Returns | Mutates Original? |
|----------|----------|------------------|
| map | New Array | ❌ |
| filter | New Array | ❌ |
| reduce | Single Value | ❌ |
| find | Element | ❌ |
| findIndex | Index | ❌ |
| some | Boolean | ❌ |
| every | Boolean | ❌ |
| includes | Boolean | ❌ |
| indexOf | Index | ❌ |
| flat | New Array | ❌ |
| flatMap | New Array | ❌ |
| slice | New Array | ❌ |
| splice | Removed Elements | ✅ |
| sort | Sorted Array | ✅ |
| reverse | Reversed Array | ✅ |
| forEach | undefined | ❌ |
| push | New Length | ✅ |
| pop | Removed Element | ✅ |
| shift | Removed Element | ✅ |
| unshift | New Length | ✅ |

---

# 23. Coding: Implement map()

```javascript
Array.prototype.myMap = function(callback) {
    const result = [];

    for (let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
    }

    return result;
};
```

Example

```javascript
const nums = [1,2,3];

const doubled = nums.myMap(num => num * 2);

console.log(doubled);
```

Output

```
[2,4,6]
```

---

# 24. Coding: Implement filter()

```javascript
Array.prototype.myFilter = function(callback) {
    const result = [];

    for (let i = 0; i < this.length; i++) {

        if (callback(this[i], i, this)) {
            result.push(this[i]);
        }

    }

    return result;
};
```

Example

```javascript
const nums = [1,2,3,4];

const even = nums.myFilter(num => num % 2 === 0);

console.log(even);
```

Output

```
[2,4]
```

---

# 25. Coding: Implement reduce()

```javascript
Array.prototype.myReduce = function(callback, initialValue) {

    let accumulator = initialValue;
    let startIndex = 0;

    if (initialValue === undefined) {
        accumulator = this[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }

    return accumulator;
};
```

Example

```javascript
const nums = [1,2,3,4];

const sum = nums.myReduce((acc, curr) => acc + curr, 0);

console.log(sum);
```

Output

```
10
```

---

# Common Interview Questions

### Q1. Difference between `map()` and `forEach()`?

| map() | forEach() |
|--------|-----------|
| Returns a new array | Returns `undefined` |
| Used for transforming data | Used for side effects |
| Chainable | Not chainable |

---

### Q2. Difference between `slice()` and `splice()`?

| slice() | splice() |
|----------|-----------|
| Doesn't modify original array | Modifies original array |
| Returns copied portion | Returns removed elements |
| Used for copying | Used for insertion/deletion/replacement |

---

### Q3. Difference between `find()` and `filter()`?

| find() | filter() |
|----------|-----------|
| Returns first matching element | Returns all matching elements |
| Returns element or `undefined` | Returns an array |
| Stops after first match | Checks every element |

---

### Q4. Difference between `some()` and `every()`?

| some() | every() |
|----------|-----------|
| `true` if at least one element matches | `true` only if all elements match |
| Stops on first `true` | Stops on first `false` |

---

# Summary

After completing this topic, you should understand:

- ✅ Array fundamentals
- ✅ Transformation methods (`map`, `flatMap`)
- ✅ Filtering methods (`filter`, `find`, `findIndex`)
- ✅ Aggregation with `reduce`
- ✅ Checking methods (`some`, `every`, `includes`, `indexOf`)
- ✅ Array manipulation (`push`, `pop`, `shift`, `unshift`, `splice`, `slice`)
- ✅ Sorting and reversing
- ✅ Custom implementations of `map()`, `filter()`, and `reduce()`
- ✅ Common interview questions and differences between similar methods

---

## Interview Tip

One of the most frequently asked JavaScript interview questions is:

> **Can you implement `map()`, `filter()`, and `reduce()` without using the built-in methods?**

Being able to write these implementations from scratch demonstrates a strong understanding of array iteration, callbacks, accumulators, and JavaScript fundamentals.