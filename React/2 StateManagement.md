# State Management in React

## Question
**What is State Management in React?**

---

# What is State?

A **state** is a JavaScript object that stores the current data of a component.

Examples of state:

- Counter value
- User input
- Data fetched from an API or database
- Form values
- Toggle (true/false) status

Whenever the state changes, React automatically re-renders the component to display the latest data on the UI.

---

# What is State Management?

**State Management** is the process of:

- Storing application data
- Reading data
- Updating data
- Sharing data across different components

It ensures that the UI always stays synchronized with the application's current state.

---

# Why Do We Need State Management?

React follows a **one-way (unidirectional) data flow**, meaning data is passed from **Parent → Child** through props.

In small applications, this works well.

However, in large applications, passing data through many intermediate components becomes difficult.

This leads to problems such as:

- **Prop Drilling** – Passing props through multiple component levels even when intermediate components don't need them.
- **Sibling Component Communication** – Sharing data between components that have the same parent becomes more complex.

State management provides a centralized and efficient way to manage and share data across the application.

---

# Three Main Levels of State Management

## 1. Local State (Component Level)

Used when the data is only needed inside a single component.

**Tools:**

- `useState`
- `useReducer`

**Examples:**

- Counter
- Modal open/close
- Input fields
- Toggle button

---

## 2. Global State (Application Level)

Used when multiple components need access to the same data.

React provides the **Context API** for built-in global state management.

**Tools:**

- `createContext`
- `useContext`

**Examples:**

- Theme (Dark/Light)
- Logged-in user
- Language settings
- Authentication status

---

## 3. Third-Party State Management Libraries

For medium to large applications where state becomes more complex, dedicated libraries are commonly used.

### Zustand

- Lightweight and simple
- Hook-based API
- Minimal boilerplate
- Easy to learn

### Redux Toolkit (RTK)

- Industry-standard solution
- Best for large-scale applications
- Predictable state management
- Reduces Redux boilerplate

### Recoil / Jotai

- Atomic state management
- Simple and flexible
- Good for applications requiring fine-grained state updates

---

# Summary

- **State** stores the current data of a component.
- React re-renders the UI whenever the state changes.
- **State Management** is used to store, update, read, and share data throughout the application.
- Small applications can use **useState** or **useReducer**.
- Medium applications often use the **Context API**.
- Large applications commonly use **Redux Toolkit**, **Zustand**, or **Recoil/Jotai**.