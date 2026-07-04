# React Component Lifecycle

## Question
**What is the React Component Lifecycle?**

---

# What is the React Component Lifecycle?

The **React Component Lifecycle** describes the different stages a component goes through from the moment it is created until it is removed from the DOM.

Every React component passes through **three main phases**:

1. **Mounting**
2. **Updating**
3. **Unmounting**

---

# 1. Mounting

The **Mounting** phase occurs when a component is created and inserted into the DOM for the first time.

Common tasks performed during this phase:

- Fetch data from an API
- Initialize state
- Set up event listeners
- Start timers or subscriptions

### Example

```jsx
useEffect(() => {
  console.log("Component Mounted");
}, []);
```

The empty dependency array (`[]`) ensures the effect runs only once after the component is mounted.

---

# 2. Updating

The **Updating** phase occurs whenever a component re-renders because its **state** or **props** have changed.

React updates only the parts of the UI that have changed instead of re-rendering the entire page.

Common tasks during this phase:

- Fetch new data when a value changes
- Update the UI
- Synchronize data with external services

### Example

```jsx
useEffect(() => {
  console.log("Count Updated:", count);
}, [count]);
```

This effect runs every time the `count` state changes.

---

# 3. Unmounting

The **Unmounting** phase occurs when a component is removed from the DOM.

Before the component is destroyed, React allows you to clean up resources.

Common cleanup tasks:

- Remove event listeners
- Clear timers
- Cancel API requests
- Unsubscribe from WebSockets or subscriptions

### Example

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Running...");
  }, 1000);

  return () => {
    clearInterval(timer);
    console.log("Component Unmounted");
  };
}, []);
```

The function returned from `useEffect` is called the **cleanup function** and runs before the component unmounts.

---

# React Lifecycle with Hooks

In modern React, lifecycle methods are handled using the **`useEffect`** hook.

| Lifecycle Phase | useEffect |
|-----------------|-----------|
| Mounting | `useEffect(() => {}, [])` |
| Updating | `useEffect(() => {}, [dependency])` |
| Unmounting | `return () => {}` inside `useEffect` |

---

# Lifecycle Flow

```text
Component Created
        │
        ▼
    Mounting
        │
        ▼
     UI Rendered
        │
        ▼
 State/Props Change?
        │
       Yes
        ▼
     Updating
        │
        ▼
   Component Removed
        │
        ▼
    Unmounting
```

---

# Summary

- Every React component goes through **three lifecycle phases**:
  - **Mounting** – Component is created and added to the DOM.
  - **Updating** – Component re-renders when state or props change.
  - **Unmounting** – Component is removed from the DOM and cleanup is performed.
- In functional components, the **`useEffect`** hook is used to manage all lifecycle behaviors.
- Cleanup functions prevent memory leaks by removing timers, event listeners, and subscriptions.