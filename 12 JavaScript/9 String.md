# JavaScript Strings

A complete guide to JavaScript Strings, covering the most commonly used string methods, interview concepts, and practical examples.

---

# Table of Contents

1. What is a String?
2. String Immutability
3. slice()
4. substring()
5. substr() (Deprecated)
6. split()
7. replace()
8. replaceAll()
9. trim()
10. startsWith()
11. endsWith()
12. includes()
13. Interview Comparison Table
14. Common Interview Questions
15. Summary

---

# 1. What is a String?

A string is a sequence of characters used to represent text.

```javascript
const name = "John";
```

Strings can be created using:

```javascript
const str1 = "Hello";
const str2 = 'Hello';
const str3 = `Hello`;
```

Template literals (backticks) support interpolation:

```javascript
const name = "John";

console.log(`Hello ${name}`);
```

Output

```
Hello John
```

---

# 2. String Immutability

Strings are **immutable**.

This means once a string is created, it **cannot be changed**.

```javascript
let str = "Hello";

str[0] = "Y";

console.log(str);
```

Output

```
Hello
```

To change a string, JavaScript creates a **new string**.

```javascript
str = "Yello";
```

---

# 3. slice()

Extracts part of a string.

Returns a **new string**.

Does NOT modify the original string.

Syntax

```javascript
string.slice(start, end)
```

Example

```javascript
const text = "JavaScript";

console.log(
    text.slice(0, 4)
);
```

Output

```
Java
```

---

## Negative Index

```javascript
const text = "JavaScript";

console.log(
    text.slice(-6)
);
```

Output

```
Script
```

`slice()` supports negative indexes.

---

# 4. substring()

Extracts part of a string.

```javascript
const text = "JavaScript";

console.log(
    text.substring(0, 4)
);
```

Output

```
Java
```

---

## Important

Negative indexes become `0`.

```javascript
const text = "JavaScript";

console.log(
    text.substring(-4)
);
```

Output

```
JavaScript
```

Unlike `slice()`, `substring()` **does not support negative indexes**.

---

# 5. substr() (Deprecated)

> ⚠️ `substr()` is deprecated and should be avoided in modern JavaScript.

Syntax

```javascript
string.substr(start, length)
```

Example

```javascript
const text = "JavaScript";

console.log(
    text.substr(4, 6)
);
```

Output

```
Script
```

Use `slice()` instead in new code.

---

# 6. split()

Splits a string into an array.

Syntax

```javascript
string.split(separator)
```

Example

```javascript
const text = "Apple,Banana,Orange";

console.log(
    text.split(",")
);
```

Output

```
["Apple", "Banana", "Orange"]
```

---

## Split by Space

```javascript
const sentence = "JavaScript is awesome";

console.log(
    sentence.split(" ")
);
```

Output

```
["JavaScript","is","awesome"]
```

---

## Split into Characters

```javascript
const word = "Hello";

console.log(
    word.split("")
);
```

Output

```
["H","e","l","l","o"]
```

---

# 7. replace()

Replaces the **first occurrence** of a value.

Syntax

```javascript
string.replace(search, replacement)
```

Example

```javascript
const text = "I like Java. Java is fun.";

console.log(
    text.replace("Java", "JavaScript")
);
```

Output

```
I like JavaScript. Java is fun.
```

Only the **first** occurrence is replaced.

---

## Using Regular Expression

```javascript
const text = "cat CAT Cat";

console.log(
    text.replace(/cat/gi, "dog")
);
```

Output

```
dog dog dog
```

Flags:

- `g` → Global
- `i` → Case-insensitive

---

# 8. replaceAll()

Replaces **all occurrences** of a value.

```javascript
const text = "apple apple apple";

console.log(
    text.replaceAll("apple", "orange")
);
```

Output

```
orange orange orange
```

Unlike `replace()`, it replaces every matching occurrence.

---

# 9. trim()

Removes whitespace from both ends of a string.

```javascript
const text = "   Hello World   ";

console.log(
    text.trim()
);
```

Output

```
Hello World
```

---

## Related Methods

```javascript
trimStart()

trimEnd()
```

Example

```javascript
const text = "   Hello   ";

console.log(text.trimStart());

console.log(text.trimEnd());
```

---

# 10. startsWith()

Checks whether a string starts with a specific value.

Returns:

```
true
```

or

```
false
```

Example

```javascript
const text = "JavaScript";

console.log(
    text.startsWith("Java")
);
```

Output

```
true
```

---

# 11. endsWith()

Checks whether a string ends with a value.

```javascript
const text = "JavaScript";

console.log(
    text.endsWith("Script")
);
```

Output

```
true
```

---

# 12. includes()

Checks whether a string contains another string.

```javascript
const text = "JavaScript";

console.log(
    text.includes("Script")
);
```

Output

```
true
```

Case-sensitive.

```javascript
"JavaScript".includes("script")
```

Output

```
false
```

---

# 13. Interview Comparison Table

| Method | Returns | Original String Modified? |
|----------|----------|--------------------------|
| slice() | New String | ❌ |
| substring() | New String | ❌ |
| substr() | New String | ❌ |
| split() | Array | ❌ |
| replace() | New String | ❌ |
| replaceAll() | New String | ❌ |
| trim() | New String | ❌ |
| startsWith() | Boolean | ❌ |
| endsWith() | Boolean | ❌ |
| includes() | Boolean | ❌ |

---

# slice() vs substring() vs substr()

| Feature | slice() | substring() | substr() |
|----------|----------|-------------|-----------|
| Second Parameter | End Index | End Index | Length |
| Supports Negative Index | ✅ Yes | ❌ No | ✅ Yes |
| Deprecated | ❌ No | ❌ No | ✅ Yes |

Example

```javascript
const str = "JavaScript";

console.log(str.slice(4, 10));
```

Output

```
Script
```

```javascript
console.log(str.substring(4, 10));
```

Output

```
Script
```

```javascript
console.log(str.substr(4, 6));
```

Output

```
Script
```

---

# replace() vs replaceAll()

| replace() | replaceAll() |
|------------|--------------|
| Replaces first match | Replaces all matches |
| Supports regex | Supports strings and global regex |
| Older method | Introduced in ES2021 |

Example

```javascript
const str = "JS JS JS";

console.log(str.replace("JS", "TS"));
```

Output

```
TS JS JS
```

```javascript
console.log(str.replaceAll("JS", "TS"));
```

Output

```
TS TS TS
```

---

# Common Interview Questions

## Q1. Are JavaScript strings mutable?

No.

Strings are **immutable**.

Every string operation returns a **new string**.

---

## Q2. Difference between `slice()` and `substring()`?

| slice() | substring() |
|-----------|-------------|
| Supports negative indexes | Doesn't support negative indexes |
| More flexible | Older API |
| Recommended | Less commonly preferred |

---

## Q3. Difference between `replace()` and `replaceAll()`?

- `replace()` replaces only the first occurrence (unless using a global regular expression).
- `replaceAll()` replaces every occurrence.

---

## Q4. Difference between `split()` and `slice()`?

| split() | slice() |
|-----------|-----------|
| Returns an array | Returns a string |
| Splits using a separator | Extracts part of a string |

---

## Q5. Is `includes()` case-sensitive?

Yes.

```javascript
"JavaScript".includes("script");
```

Output

```
false
```

Because `"script"` and `"Script"` are different.

---

# Summary

After completing this topic, you should understand:

- ✅ String fundamentals
- ✅ String immutability
- ✅ `slice()`
- ✅ `substring()`
- ✅ `substr()` (deprecated)
- ✅ `split()`
- ✅ `replace()`
- ✅ `replaceAll()`
- ✅ `trim()`
- ✅ `startsWith()`
- ✅ `endsWith()`
- ✅ `includes()`
- ✅ Differences between similar string methods
- ✅ Common interview questions

---

## Interview Tip

A very common JavaScript interview question is:

> **What is the difference between `slice()`, `substring()`, and `substr()`?**

A strong answer is:

- **`slice(start, end)`** extracts characters using start and end indexes and supports negative indexes.
- **`substring(start, end)`** also uses start and end indexes but treats negative values as `0`.
- **`substr(start, length)`** uses a start index and a length instead of an end index, but it is **deprecated** and should be avoided in modern JavaScript.