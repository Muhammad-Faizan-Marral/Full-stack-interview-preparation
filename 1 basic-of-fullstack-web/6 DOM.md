# Document Object Model (DOM)

## Question

# What is the Document Object Model (DOM)?

---

## What is the DOM?

The **Document Object Model (DOM)** is a programming interface for HTML and XML documents.

When a web page loads, the browser converts the HTML document into a **tree-like structure** called the **DOM Tree**.

Using JavaScript, we can:
- Access HTML elements
- Modify content
- Change styles
- Add or remove elements
- Handle user events

In simple words:

> **The DOM allows JavaScript to interact with and manipulate a web page dynamically.**

---

# How the DOM Works

### HTML

```html
<!DOCTYPE html>
<html>
<head>
  <title>DOM Example</title>
</head>
<body>
  <h1>Hello World</h1>
  <button>Click Me</button>
</body>
</html>
```

After the browser loads this HTML, it creates the following DOM Tree:

```
Document
│
└── html
    ├── head
    │   └── title
    │       └── "DOM Example"
    │
    └── body
        ├── h1
        │   └── "Hello World"
        │
        └── button
            └── "Click Me"
```

Every HTML element becomes a **Node** in the DOM tree.

---

# Why Do We Need the DOM?

Without the DOM, JavaScript cannot interact with HTML.

The DOM allows JavaScript to:

- Read HTML elements
- Update content
- Change CSS styles
- Create new elements
- Delete existing elements
- Respond to user actions like clicks, typing, and scrolling

---

# Accessing Elements

## By ID

```html
<h1 id="title">Hello</h1>
```

```javascript
const heading = document.getElementById("title");
```

---

## By Class

```javascript
const items = document.getElementsByClassName("item");
```

---

## By Tag Name

```javascript
const paragraphs = document.getElementsByTagName("p");
```

---

## querySelector()

Returns the **first matching element**.

```javascript
const heading = document.querySelector(".title");
```

---

## querySelectorAll()

Returns **all matching elements**.

```javascript
const items = document.querySelectorAll(".item");
```

---

# Changing Content

```html
<h1 id="title">Hello</h1>
```

```javascript
const heading = document.getElementById("title");

heading.textContent = "Welcome!";
```

Output:

```
Welcome!
```

---

# Changing Styles

```javascript
const heading = document.getElementById("title");

heading.style.color = "blue";
heading.style.fontSize = "40px";
```

---

# Changing HTML

```javascript
document.getElementById("box").innerHTML =
  "<strong>Hello Faizan</strong>";
```

---

# Creating Elements

```javascript
const p = document.createElement("p");

p.textContent = "New Paragraph";

document.body.appendChild(p);
```

Output:

```html
<p>New Paragraph</p>
```

---

# Removing Elements

```javascript
const element = document.getElementById("title");

element.remove();
```

---

# Event Handling

JavaScript can listen for user actions.

```html
<button id="btn">Click Me</button>
```

```javascript
const button = document.getElementById("btn");

button.addEventListener("click", () => {
  alert("Button Clicked!");
});
```

---

# DOM Manipulation Example

### HTML

```html
<h1 id="title">Hello</h1>

<button onclick="changeText()">
  Change Text
</button>
```

### JavaScript

```javascript
function changeText() {
  document.getElementById("title").textContent =
    "Welcome to the DOM!";
}
```

---

# Common DOM Methods

| Method | Purpose |
|---------|---------|
| `getElementById()` | Select an element by ID |
| `getElementsByClassName()` | Select elements by class |
| `getElementsByTagName()` | Select elements by tag |
| `querySelector()` | Select the first matching element |
| `querySelectorAll()` | Select all matching elements |
| `createElement()` | Create a new element |
| `appendChild()` | Add an element to the DOM |
| `remove()` | Remove an element |
| `setAttribute()` | Add or update an attribute |
| `removeAttribute()` | Remove an attribute |

---

# DOM vs HTML

| HTML | DOM |
|------|-----|
| Static markup | Live object representation of the page |
| Written by the developer | Created by the browser |
| Cannot change itself | Can be modified using JavaScript |

---

# Interview Tips

- The **DOM (Document Object Model)** is a tree-like representation of an HTML document.
- Every HTML element becomes a **Node** in the DOM tree.
- JavaScript uses the DOM to access and manipulate web pages.
- Common DOM operations include selecting elements, changing content, updating styles, creating elements, removing elements, and handling events.
- The DOM is created by the browser whenever an HTML document is loaded.

---

# Interview Summary

- **DOM** stands for **Document Object Model**.
- It is a programming interface that represents an HTML document as a tree of objects (nodes).
- JavaScript interacts with the DOM to dynamically update the content, structure, and style of a web page without reloading it.