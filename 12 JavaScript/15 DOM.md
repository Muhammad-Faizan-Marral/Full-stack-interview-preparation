# DOM (Document Object Model)

> Complete JavaScript DOM Guide for Interviews & Real Projects

---

# Table of Contents

1. What is DOM?
2. How DOM Works
3. DOM Tree
4. Virtual DOM
5. Selecting Elements
   - getElementById()
   - querySelector()
6. Event System
7. Event Bubbling
8. Event Capturing
9. Event Delegation
10. stopPropagation()
11. preventDefault()
12. Interview Questions
13. Best Practices
14. Summary

---

# What is DOM?

DOM stands for **Document Object Model**.

It is a programming interface provided by the browser that represents an HTML page as a tree of JavaScript objects.

JavaScript uses the DOM to:

- Read HTML
- Change HTML
- Change CSS
- Add new elements
- Remove elements
- Listen to user events

Example HTML

```html
<h1>Hello</h1>
```

JavaScript

```javascript
document.querySelector("h1").textContent = "Welcome";
```

Output

```
Welcome
```

---

# How DOM Works

Browser receives

```
HTML
```

↓

Parses HTML

↓

Creates

```
DOM Tree
```

↓

JavaScript manipulates this tree.

---

# DOM Tree

Example

```html
<html>
    <body>
        <h1>Hello</h1>
        <p>World</p>
    </body>
</html>
```

DOM Tree

```
Document
   |
 html
   |
 body
 /   \
h1    p
```

Every HTML tag becomes a JavaScript object called a **Node**.

Node types include:

- Document
- Element
- Text
- Comment

---

# Virtual DOM

Virtual DOM is a lightweight copy of the real DOM.

Instead of changing the real DOM immediately:

1. Create Virtual DOM
2. Compare old vs new Virtual DOM
3. Find differences (Diffing)
4. Update only changed elements

Real DOM

```
Browser DOM
```

Virtual DOM

```
JavaScript Object
```

Used by

- React
- Preact

Benefits

- Faster rendering
- Less DOM manipulation
- Better performance

---

# Selecting Elements

JavaScript must first select an element.

---

# getElementById()

Finds element using id.

HTML

```html
<h1 id="title">Hello</h1>
```

JavaScript

```javascript
const heading = document.getElementById("title");

console.log(heading);
```

Output

```
<h1 id="title">
```

Only works with IDs.

---

# querySelector()

Returns first matching CSS selector.

HTML

```html
<p class="text">One</p>
<p class="text">Two</p>
```

JavaScript

```javascript
const p = document.querySelector(".text");

console.log(p.textContent);
```

Output

```
One
```

Examples

```javascript
document.querySelector("#id");

document.querySelector(".class");

document.querySelector("button");
```

---

# querySelectorAll()

Returns all matching elements.

```javascript
const items = document.querySelectorAll(".item");
```

Returns

```
NodeList
```

Loop

```javascript
items.forEach(item => {
    console.log(item);
});
```

---

# Event System

Events are actions performed by the user.

Examples

- Click
- Hover
- Scroll
- Keyboard
- Submit
- Resize

Example

```javascript
button.addEventListener("click", () => {
    console.log("Clicked");
});
```

---

# Event Bubbling

Default behavior.

Event starts from child

↓

Moves upward

Example

```html
<div>
    <button>Click</button>
</div>
```

JavaScript

```javascript
div.addEventListener("click", () => {
    console.log("DIV");
});

button.addEventListener("click", () => {
    console.log("BUTTON");
});
```

Click button

Output

```
BUTTON

DIV
```

Order

```
Button

↓

Div

↓

Body

↓

Document
```

---

# Event Capturing

Opposite of bubbling.

Starts from

```
Document

↓

Body

↓

Div

↓

Button
```

Enable capturing

```javascript
div.addEventListener(
    "click",
    () => {
        console.log("DIV");
    },
    true
);
```

Output

```
DIV

BUTTON
```

---

# Event Delegation

Instead of adding event listeners to every child,

Add one listener to parent.

Example

```html
<ul id="list">
    <li>Apple</li>
    <li>Mango</li>
    <li>Orange</li>
</ul>
```

JavaScript

```javascript
const list = document.getElementById("list");

list.addEventListener("click", (e) => {
    console.log(e.target.textContent);
});
```

Click

```
Orange
```

Output

```
Orange
```

Benefits

- Better performance
- Less memory
- Handles dynamically added elements

Very common interview question.

---

# stopPropagation()

Stops event from moving upward.

Example

```javascript
button.addEventListener("click", (e) => {
    e.stopPropagation();

    console.log("Button");
});

div.addEventListener("click", () => {
    console.log("Div");
});
```

Output

```
Button
```

Div never executes.

---

# preventDefault()

Stops browser's default behavior.

Example

```html
<a href="https://google.com">Google</a>
```

```javascript
link.addEventListener("click", (e) => {
    e.preventDefault();

    console.log("Navigation stopped");
});
```

Browser will not open Google.

Common uses

- Form validation
- Custom routing
- AJAX forms

---

# Event Flow

```
Capturing

↓

Target

↓

Bubbling
```

Visual

```
Document

↓

HTML

↓

BODY

↓

DIV

↓

BUTTON

↑

DIV

↑

BODY

↑

HTML

↑

Document
```

---

# Interview Questions

### What is DOM?

Browser representation of HTML as objects.

---

### Difference between DOM and Virtual DOM?

DOM

- Browser object
- Slow updates

Virtual DOM

- JavaScript object
- Faster updates

---

### Difference between getElementById() and querySelector()?

getElementById

- Only IDs
- Faster

querySelector

- Any CSS selector
- More flexible

---

### What is Event Bubbling?

Event travels from child to parent.

---

### What is Event Capturing?

Event travels from parent to child.

---

### What is Event Delegation?

Single event listener on parent handles child events.

---

### Why use Event Delegation?

- Performance
- Less memory
- Dynamic elements

---

### Difference between stopPropagation() and preventDefault()?

stopPropagation()

Stops event movement.

preventDefault()

Stops browser default behavior.

---

# Best Practices

✅ Prefer `querySelector()` for flexibility

✅ Use Event Delegation for large lists

✅ Avoid unnecessary DOM updates

✅ Cache frequently used DOM elements

```javascript
const button = document.querySelector("button");
```

instead of

```javascript
document.querySelector("button");
document.querySelector("button");
document.querySelector("button");
```

---

# Summary

| Concept | Purpose |
|----------|---------|
| DOM | Browser representation of HTML |
| DOM Tree | Tree structure of HTML |
| Virtual DOM | Optimized DOM copy |
| getElementById | Select by ID |
| querySelector | Select using CSS selector |
| querySelectorAll | Select all matching elements |
| Event Bubbling | Child → Parent |
| Event Capturing | Parent → Child |
| Event Delegation | Parent handles child events |
| stopPropagation | Stops bubbling/capturing |
| preventDefault | Stops browser default action |

---

# Quick Revision

- DOM = HTML as JavaScript objects
- DOM Tree = Parent-child hierarchy
- Virtual DOM = Optimized copy of DOM
- getElementById() = ID selector
- querySelector() = CSS selector
- Bubbling = Bottom → Top
- Capturing = Top → Bottom
- Delegation = One parent listener for many children
- stopPropagation() = Stops event flow
- preventDefault() = Stops browser default behavior

---
