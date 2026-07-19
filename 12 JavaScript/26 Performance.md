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

# Interview Questions

## Beginner

1. What is JavaScript performance optimization?
2. What is Lazy Loading?
3. What is Code Splitting?
4. What is Tree Shaking?
5. What is Event Delegation?
6. What is Memoization?
7. What is `requestAnimationFrame()`?
8. What is Reflow?
9. What is Repaint?
10. Difference between Reflow and Repaint?

---

## Intermediate

11. Why is Lazy Loading important?
12. Explain dynamic imports.
13. Why does Tree Shaking require ES Modules?
14. How does Event Delegation improve performance?
15. When should Memoization be avoided?
16. Why is `requestAnimationFrame()` preferred for animations?
17. Which DOM operations trigger Reflow?
18. How can Reflows be minimized?
19. What causes Repaint?
20. How do browser rendering phases affect performance?

---

## Advanced (FAANG Level)

21. Implement a generic memoize function.
22. Explain browser rendering pipeline.
23. Compare `setTimeout`, `setInterval`, and `requestAnimationFrame()`.
24. Explain code splitting strategies in modern frameworks.
25. How does Tree Shaking work internally?
26. Optimize a page with thousands of DOM elements.
27. Explain layout thrashing and how to prevent it.
28. How would you profile performance using Chrome DevTools?
29. Explain virtual scrolling and windowing.
30. What are Core Web Vitals, and how do they relate to JavaScript performance?

---

# Summary

- Performance optimization improves application speed, responsiveness, and user experience.
- Lazy Loading and Code Splitting reduce initial load time.
- Tree Shaking eliminates unused code from production bundles.
- Event Delegation reduces memory usage by minimizing event listeners.
- Memoization caches expensive function results.
- `requestAnimationFrame()` provides smooth, browser-optimized animations.
- Reflow recalculates layout and is more expensive than Repaint.
- Repaint redraws visual changes without affecting layout.