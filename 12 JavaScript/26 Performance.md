# 📘 JavaScript Performance Optimization

> Performance optimization helps JavaScript applications load faster, execute efficiently, and provide a smoother user experience.

---

# Table of Contents

1. Performance
2. Lazy Loading
3. Code Splitting
4. Tree Shaking
5. Event Delegation
6. Memoization
7. requestAnimationFrame()
8. Reflow
9. Repaint
10. Performance Cheat Sheet
11. Interview Questions

---

# 1. Performance

Performance refers to how efficiently a JavaScript application loads, renders, and responds to user interactions.

### Goals

- Faster page load
- Smooth UI
- Less memory usage
- Better CPU utilization
- Improved Core Web Vitals

### Common Optimization Techniques

- Lazy Loading
- Code Splitting
- Tree Shaking
- Memoization
- Event Delegation
- Debouncing
- Throttling
- Virtualization
- Caching
- requestAnimationFrame()

---

# 2. Lazy Loading

Lazy Loading means loading resources only when they are needed instead of loading everything initially.

### Benefits

- Faster initial load
- Reduced bandwidth
- Better user experience

### Lazy Loading Images

```html
<img src="image.jpg" loading="lazy" alt="Nature">
```

### Dynamic Import

```javascript
button.addEventListener("click", async () => {
  const module = await import("./math.js");

  console.log(module.add(5, 3));
});
```

### React Example

```javascript
const Dashboard = React.lazy(() => import("./Dashboard"));
```

---

# 3. Code Splitting

Code Splitting divides a large JavaScript bundle into smaller chunks that load only when required.

Instead of:

```
main.js (3MB)
```

Use:

```
Home.js
Dashboard.js
Profile.js
Settings.js
```

### Dynamic Import

```javascript
import("./utils.js")
  .then(module => {
    module.sayHello();
  });
```

### Benefits

- Faster page load
- Smaller bundles
- Better caching

---

# 4. Tree Shaking

Tree Shaking removes unused code from the final production bundle.

Example

```javascript
// math.js

export function add() {}

export function subtract() {}

export function multiply() {}
```

```javascript
import { add } from "./math.js";
```

Final bundle contains only:

```javascript
add()
```

### Requirements

- ES Modules (`import` / `export`)
- Production build
- Bundlers like Webpack, Rollup, or Vite

### Benefits

- Smaller bundle size
- Faster loading
- Less memory usage

---

# 5. Event Delegation

Instead of attaching events to many child elements, attach one event to the parent.

### Without Delegation

```javascript
document.querySelectorAll("li").forEach(item => {
  item.addEventListener("click", () => {
    console.log(item.textContent);
  });
});
```

### With Delegation

```javascript
document.querySelector("ul").addEventListener("click", event => {
  if (event.target.tagName === "LI") {
    console.log(event.target.textContent);
  }
});
```

### Benefits

- Better performance
- Less memory
- Handles dynamically added elements

---

# 6. Memoization

Memoization stores previously computed results to avoid repeating expensive calculations.

### Without Memoization

```javascript
function square(n) {
  console.log("Calculating...");
  return n * n;
}

square(5);
square(5);
```

Output

```
Calculating...
Calculating...
```

### With Memoization

```javascript
function memoize(fn) {
  const cache = {};

  return function (value) {
    if (cache[value]) return cache[value];

    cache[value] = fn(value);
    return cache[value];
  };
}

const square = memoize(num => {
  console.log("Calculating...");
  return num * num;
});

square(5);
square(5);
```

Output

```
Calculating...
```

### Benefits

- Faster execution
- Avoids duplicate work
- Useful for expensive computations

---

# 7. requestAnimationFrame()

`requestAnimationFrame()` schedules animations before the browser repaints the screen.

### Syntax

```javascript
requestAnimationFrame(callback);
```

### Example

```javascript
let position = 0;

function animate() {
  position++;

  box.style.left = position + "px";

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

### Why Not setInterval?

```javascript
setInterval(animate, 16);
```

Problems

- May skip frames
- Wastes CPU
- Runs even when the tab is inactive

### Benefits

- Smooth animations
- Better battery life
- Browser optimized (~60 FPS)

---

# 8. Reflow

Reflow (Layout) occurs when the browser recalculates the size and position of elements.

### Triggers

- Changing width
- Changing height
- Adding/removing elements
- Changing font size
- Reading layout properties after writing styles

```javascript
box.style.width = "300px";
```

```javascript
parent.appendChild(child);
```

### Expensive Operations

```javascript
element.offsetHeight;
```

```javascript
element.getBoundingClientRect();
```

### Reduce Reflows

- Batch DOM updates
- Use CSS transforms
- Avoid frequent layout reads
- Use DocumentFragment
- Minimize DOM changes

---

# 9. Repaint

Repaint occurs when only the appearance of an element changes, without affecting its layout.

Examples

```javascript
box.style.background = "red";
```

```javascript
box.style.color = "white";
```

```javascript
box.style.visibility = "hidden";
```

### Difference

| Reflow | Repaint |
|---------|----------|
| Layout changes | Visual changes only |
| Expensive | Less expensive |
| Can trigger repaint | Does not trigger reflow |

---

# Performance Cheat Sheet

| Concept | Description |
|----------|-------------|
| Performance | Optimize speed and efficiency |
| Lazy Loading | Load resources only when needed |
| Code Splitting | Split bundles into smaller chunks |
| Tree Shaking | Remove unused code |
| Event Delegation | Attach one listener to a parent |
| Memoization | Cache expensive function results |
| requestAnimationFrame() | Browser-optimized animation scheduling |
| Reflow | Browser recalculates layout |
| Repaint | Browser redraws visuals without layout changes |

---
