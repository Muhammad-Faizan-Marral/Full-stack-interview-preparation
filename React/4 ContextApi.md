# Context API in React

## Question
**What is the Context API, and how does it differ from Props?**

---

# What is the Context API?

The **Context API** is a built-in React feature used to share data between multiple components **without passing props manually through every level of the component tree**.

It helps eliminate **prop drilling** and makes state sharing easier in medium-sized applications.

The Context API is commonly used for data that many components need, such as:

- Authentication (logged-in user)
- Theme (Dark / Light)
- Language settings
- User preferences

---

# Why Do We Need the Context API?

React follows a **one-way data flow**, where data is passed from **Parent → Child** using props.

This works well for small applications.

However, in large applications, passing the same data through multiple intermediate components becomes difficult.

This problem is known as **Prop Drilling**.

### Example

```text
App
 │
 ▼
Navbar
 │
 ▼
Layout
 │
 ▼
Sidebar
 │
 ▼
Profile
```

If only the **Profile** component needs the user data, the `App` component still has to pass it through **Navbar**, **Layout**, and **Sidebar**, even though they don't use it.

With the **Context API**, the `Profile` component can access the data directly without receiving it as props from every intermediate component.

---

# How Does the Context API Work?

The Context API mainly uses three functions:

## 1. createContext()

Creates a new context.

```jsx
const UserContext = createContext();
```

---

## 2. Provider

The `Provider` supplies data to all components inside its tree.

```jsx
<UserContext.Provider value={user}>
  <App />
</UserContext.Provider>
```

---

## 3. useContext()

Allows any child component to access the shared data.

```jsx
const user = useContext(UserContext);
```

---

# Context API vs Props

| Props | Context API |
|--------|-------------|
| Passes data from Parent → Child | Shares data across multiple components |
| Requires manual passing through every level | No manual prop passing required |
| Best for component-specific data | Best for globally shared data |
| Can lead to Prop Drilling | Eliminates Prop Drilling |
| Simple for small applications | Better for medium-sized applications |

---

# When Should You Use Props?

Use **Props** when:

- Data is needed by only a few components.
- Parent-child communication is simple.
- The component hierarchy is small.

Examples:

- Passing a button title
- Passing a user name to a child component
- Passing product information

---

# When Should You Use the Context API?

Use the **Context API** when:

- Many components need the same data.
- You want to avoid prop drilling.
- The data is global across the application.

Examples:

- User authentication
- Theme (Dark / Light)
- Language selection
- Logged-in user information

---

# Summary

- **Props** are used to pass data from a parent component to its direct child.
- **Context API** allows multiple components to access shared data without passing props through every intermediate component.
- The Context API solves the **Prop Drilling** problem.
- The Context API uses **`createContext()`**, **`Provider`**, and **`useContext()`**.
- Use **Props** for simple parent-child communication and **Context API** for globally shared state.