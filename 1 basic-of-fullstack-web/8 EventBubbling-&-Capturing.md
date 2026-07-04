# Event Bubbling vs Event Capturing in JavaScript

## Question

# What is the difference between Event Bubbling and Event Capturing in JavaScript?

---

## What are DOM Events?

When a user interacts with a web page, events are triggered.

Examples:

- Click
- Submit
- Keydown
- Mouseover
- Scroll

JavaScript allows us to listen to and handle these events using event listeners.

```javascript
button.addEventListener("click", () => {
  console.log("Button clicked");
});
```

---

# Event Propagation

When an event occurs on an element, it does not only affect that element.

The event travels through the DOM tree in a process called **Event Propagation**.

Event propagation has three phases:

1. Capturing Phase
2. Target Phase
3. Bubbling Phase

```
Document
  ↓
HTML
  ↓
BODY
  ↓
DIV
  ↓
BUTTON (Target)
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

# 1. Event Capturing

Event Capturing (also called **Trickling**) starts from the root element and moves down toward the target element.

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
```

The event travels from parent to child.

---

## Example

### HTML

```html
<div id="parent">
  <button id="child">Click Me</button>
</div>
```

### JavaScript

```javascript
document
  .getElementById("parent")
  .addEventListener(
    "click",
    () => {
      console.log("Parent");
    },
    true
  );

document
  .getElementById("child")
  .addEventListener(
    "click",
    () => {
      console.log("Button");
    },
    true
  );
```

### Output

```
Parent
Button
```

Because capturing moves from parent to child.

---

# 2. Event Bubbling

Event Bubbling is the default behavior in JavaScript.

The event starts at the target element and moves upward through its ancestors.

```
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

The event travels from child to parent.

---

## Example

### HTML

```html
<div id="parent">
  <button id="child">Click Me</button>
</div>
```

### JavaScript

```javascript
document
  .getElementById("parent")
  .addEventListener("click", () => {
    console.log("Parent");
  });

document
  .getElementById("child")
  .addEventListener("click", () => {
    console.log("Button");
  });
```

### Output

```
Button
Parent
```

Because bubbling moves from child to parent.

---

# Complete Flow

Consider this HTML:

```html
<div id="grandparent">
  <div id="parent">
    <button id="child">Click Me</button>
  </div>
</div>
```

When the button is clicked, the event flow is:

### Capturing Phase

```
Grandparent
↓
Parent
↓
Button
```

### Target Phase

```
Button
```

### Bubbling Phase

```
Button
↑
Parent
↑
Grandparent
```

---

# addEventListener Syntax

```javascript
element.addEventListener(
  "click",
  callback,
  useCapture
);
```

### Parameters

| Parameter | Description |
|------------|-------------|
| event | Event name |
| callback | Function to execute |
| useCapture | `true` = Capturing, `false` = Bubbling |

---

## Capturing

```javascript
element.addEventListener(
  "click",
  handler,
  true
);
```

---

## Bubbling (Default)

```javascript
element.addEventListener(
  "click",
  handler
);
```

or

```javascript
element.addEventListener(
  "click",
  handler,
  false
);
```

---

# stopPropagation()

Sometimes we want to prevent the event from continuing its propagation.

We can use:

```javascript
event.stopPropagation();
```

### Example

```javascript
button.addEventListener("click", (event) => {
  event.stopPropagation();
  console.log("Button clicked");
});
```

Now the event will not bubble up to parent elements.

---

# Real-World Example

### HTML

```html
<div id="card">
  <button id="btn">Delete</button>
</div>
```

### JavaScript

```javascript
document
  .getElementById("card")
  .addEventListener("click", () => {
    console.log("Card clicked");
  });

document
  .getElementById("btn")
  .addEventListener("click", (event) => {
    event.stopPropagation();
    console.log("Delete clicked");
  });
```

### Output

```
Delete clicked
```

Without `stopPropagation()`:

```
Delete clicked
Card clicked
```

---

# Event Delegation (Uses Bubbling)

A common interview topic related to bubbling is **Event Delegation**.

Instead of attaching event listeners to many child elements, we attach one listener to the parent.

### Example

```html
<ul id="list">
  <li>React</li>
  <li>Node.js</li>
  <li>Express</li>
</ul>
```

```javascript
document
  .getElementById("list")
  .addEventListener("click", (event) => {
    console.log(event.target.textContent);
  });
```

Output when clicking:

```
React
```

or

```
Node.js
```

or

```
Express
```

This works because of **Event Bubbling**.

---

# Event Bubbling vs Event Capturing

| Feature | Event Bubbling | Event Capturing |
|----------|---------------|----------------|
| Direction | Child → Parent | Parent → Child |
| Default Behavior | Yes | No |
| Execution Order | Target first | Parent first |
| addEventListener() | `false` (default) | `true` |
| Common Usage | Very common | Rarely used |

---

# Interview Tips

- Event propagation has three phases:
  1. Capturing
  2. Target
  3. Bubbling

- **Event Bubbling** moves from child to parent.
- **Event Capturing** moves from parent to child.
- Bubbling is the default behavior in JavaScript.
- `event.stopPropagation()` stops further propagation.
- Event Delegation relies on Event Bubbling and is frequently asked in interviews.

---

# Interview Summary

- **Event Bubbling** occurs when an event starts at the target element and propagates upward through its ancestors.
- **Event Capturing** occurs when an event starts at the root and travels down to the target element.
- The default behavior is **Event Bubbling**.
- JavaScript provides `event.stopPropagation()` to prevent propagation.
- Event Delegation is a practical use case of Event Bubbling and helps improve performance when handling many child elements.