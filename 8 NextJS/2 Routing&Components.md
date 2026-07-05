# Next.js Routing & Components

---

# App Router

## What is App Router?

The **App Router** is the modern routing system introduced in **Next.js 13+**. It uses the **app/** directory and supports advanced features like **Server Components**, **Nested Layouts**, **Streaming**, and **React Server Components**.

### Folder Structure

```
app/
│── layout.tsx
│── page.tsx
│── loading.tsx
│── error.tsx
│── not-found.tsx
│── about/
│     └── page.tsx
│── dashboard/
│     ├── layout.tsx
│     └── page.tsx
```

### Example

```
app/page.tsx
```

```tsx
export default function Home() {
  return <h1>Home Page</h1>;
}
```

URL

```
/
```

---

## Features

- File-based Routing
- Nested Layouts
- Server Components by default
- Streaming
- Route Groups
- Loading UI
- Error UI
- API Route Handlers
- Better Performance

---

## Advantages

- Better SEO
- Smaller JavaScript bundle
- Faster loading
- Built-in layouts
- Improved data fetching

---

# Pages Router

## What is Pages Router?

The **Pages Router** is the older routing system used before Next.js 13. It uses the **pages/** directory.

### Folder Structure

```
pages/
│── index.tsx
│── about.tsx
│── contact.tsx
│── api/
│     └── users.ts
```

### Example

```
pages/index.tsx
```

```tsx
export default function Home() {
  return <h1>Home</h1>;
}
```

URL

```
/
```

---

## Data Fetching

### getServerSideProps

```tsx
export async function getServerSideProps() {
  return {
    props: {}
  };
}
```

---

### getStaticProps

```tsx
export async function getStaticProps() {
  return {
    props: {}
  };
}
```

---

### getStaticPaths

```tsx
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: false
  };
}
```

---

## Features

- File-based Routing
- API Routes
- SSR
- SSG
- CSR

---

# App Router vs Pages Router

| App Router | Pages Router |
|------------|--------------|
| Uses `app/` folder | Uses `pages/` folder |
| Introduced in Next.js 13 | Older routing system |
| Server Components by default | Client Components by default |
| Supports Layouts | No nested layouts |
| Supports Loading UI | Manual loading state |
| Supports Error UI | Manual error handling |
| Better performance | Good performance |
| Recommended for new projects | Mainly used in older projects |

---

# Server Components

## What are Server Components?

**Server Components** run only on the server. They are the default component type in the App Router.

### Example

```tsx
export default async function Users() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  const users = await res.json();

  return (
    <ul>
      {users.map((user: any) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## Advantages

- Better SEO
- Faster page load
- Smaller JavaScript bundle
- Direct database access
- Better security
- Faster rendering

---

## Limitations

Cannot use:

- useState
- useEffect
- useReducer
- Event handlers
- Browser APIs
- window
- document
- localStorage

---

## When to Use

- Fetching database data
- Fetching API data
- Dashboards
- Blog pages
- Product pages
- SEO pages

---

# Client Components

## What are Client Components?

Client Components run in the browser and support interactivity.

To create one, add:

```tsx
"use client";
```

at the top of the file.

---

### Example

```tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => setCount(count + 1)}
    >
      {count}
    </button>
  );
}
```

---

## Advantages

- Interactive UI
- Event handling
- State management
- Browser API support

---

## Can Use

- useState
- useEffect
- useReducer
- Event handlers
- Context API
- Browser APIs
- localStorage
- window
- document

---

## When to Use

- Forms
- Search bars
- Modals
- Dropdowns
- Theme switchers
- Shopping carts
- Chat applications

---

# Server Components vs Client Components

| Server Components | Client Components |
|-------------------|-------------------|
| Run on server | Run in browser |
| Default in App Router | Require `"use client"` |
| Better SEO | Good for interactive UI |
| Smaller JavaScript bundle | Larger bundle |
| Faster initial load | More JavaScript sent to browser |
| Can fetch data directly | Usually calls APIs |
| Cannot use hooks like `useState` | Can use all React hooks |
| Cannot access browser APIs | Can access browser APIs |
| Cannot handle click events | Supports event handlers |

---

# Best Practices

- Use **Server Components** by default.
- Convert to **Client Components** only when interactivity is required.
- Fetch data on the server whenever possible.
- Keep `"use client"` as low as possible in the component tree.
- Avoid making an entire page a Client Component unless necessary.
- Store sensitive logic and database access in Server Components.

---

# Interview Questions

## App Router

- What is the App Router?
- Why was the App Router introduced?
- What are the benefits of the App Router?
- What special files are available in the App Router (`layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`)?

## Pages Router

- What is the Pages Router?
- How does the Pages Router perform data fetching?
- What are `getServerSideProps`, `getStaticProps`, and `getStaticPaths`?

## Server Components

- What are Server Components?
- Why are Server Components better for SEO?
- Why can't Server Components use `useState` or `useEffect`?
- When should you use a Server Component?

## Client Components

- What is a Client Component?
- Why is `"use client"` required?
- When should you use a Client Component?
- What React hooks can be used inside a Client Component?

## Comparison

- What is the difference between App Router and Pages Router?
- What is the difference between Server Components and Client Components?
- How do Server Components improve performance?
- How do you decide whether a component should be a Server Component or a Client Component?

