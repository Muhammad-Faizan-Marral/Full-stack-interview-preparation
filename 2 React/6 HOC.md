# Higher-Order Component (HOC) in React

## Question
**What is a Higher-Order Component (HOC) in React?**

---

# What is a Higher-Order Component?

A **Higher-Order Component (HOC)** is an advanced React pattern used to **reuse component logic**.

A HOC is **a function that takes a component as an argument and returns a new enhanced component** with additional functionality.

It does **not modify the original component**. Instead, it wraps the component and adds extra behavior.

---

# Syntax

```jsx
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

---

# Why Do We Need HOCs?

Without HOCs, we may end up writing the same logic in multiple components.

A HOC allows us to:

- Reuse common logic
- Avoid code duplication
- Keep components clean and reusable
- Separate business logic from UI

---

# Example

### Higher-Order Component

```jsx
function withLogger(WrappedComponent) {
  return function EnhancedComponent(props) {
    console.log("Component Rendered");

    return <WrappedComponent {...props} />;
  };
}
```

### Normal Component

```jsx
function Home() {
  return <h1>Home Page</h1>;
}
```

### Enhanced Component

```jsx
const HomeWithLogger = withLogger(Home);
```

Now, every time `HomeWithLogger` renders, it first logs a message and then renders the `Home` component.

---

# Real-World Use Cases

HOCs are commonly used for:

- Authentication
- Authorization (Role-Based Access)
- Logging
- Analytics
- Error Handling
- Loading Spinners
- Permission Checks

---

# HOC Flow

```text
        Home Component
              │
              ▼
      withAuthentication()
              │
              ▼
  Enhanced Home Component
              │
              ▼
       Render to the UI
```

---

# Advantages

- Promotes code reuse
- Reduces duplicate logic
- Keeps components focused on UI
- Easy to apply the same functionality to multiple components
- Makes applications easier to maintain

---

# Disadvantages

- Can create deeply nested wrapper components ("Wrapper Hell")
- Makes debugging more difficult
- Component names become less readable in React DevTools
- In modern React, hooks often provide a simpler alternative

---

# HOC vs Custom Hooks

| Higher-Order Component (HOC) | Custom Hook |
|------------------------------|-------------|
| Wraps a component | Reuses logic through hooks |
| Returns a new component | Returns state and functions |
| Can create wrapper nesting | No extra wrapper components |
| Mostly used in older React codebases | Preferred approach in modern React |

---

# When Should You Use HOCs?

Use HOCs when:

- Working with legacy React projects.
- Using libraries that expose HOCs.
- You need to enhance multiple components with the same behavior.

For new React applications, **Custom Hooks** are generally the preferred solution for sharing logic.

---

# Summary

- A **Higher-Order Component (HOC)** is a function that **accepts a component and returns a new enhanced component**.
- HOCs are used to **reuse component logic**.
- They help avoid duplicate code and keep components reusable.
- Common use cases include **authentication, authorization, logging, analytics, and error handling**.
- In modern React, **Custom Hooks** are often preferred over HOCs for sharing logic.