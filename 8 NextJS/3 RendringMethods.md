# Next.js Rendering Methods

Next.js provides multiple rendering strategies to optimize **performance**, **SEO**, and **user experience**. The four main rendering methods are:

- Server-Side Rendering (SSR)
- Client-Side Rendering (CSR)
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)

---

# Server-Side Rendering (SSR)

## What is SSR?

**Server-Side Rendering (SSR)** generates the HTML **on the server for every incoming request**. The server fetches the latest data, renders the page, and sends the HTML to the browser.

### Flow

```
User Request
      │
      ▼
Server Fetches Data
      │
      ▼
Server Generates HTML
      │
      ▼
Browser Receives HTML
```

### App Router Example

```tsx
export default async function Users() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users",
    {
      cache: "no-store"
    }
  );

  const users = await res.json();

  return (
    <div>
      {users.map((user: any) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}
```

### Pages Router Example

```tsx
export async function getServerSideProps() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  const users = await res.json();

  return {
    props: {
      users
    }
  };
}
```

### Advantages

- Latest data on every request
- Excellent SEO
- Secure data fetching
- Good for dynamic applications

### Disadvantages

- Slower than SSG
- Server executes on every request
- Higher server load

### Best Use Cases

- Dashboards
- Admin Panels
- Stock Prices
- Weather Data
- Banking Applications

---

# Client-Side Rendering (CSR)

## What is CSR?

**Client-Side Rendering (CSR)** sends a minimal HTML page to the browser. JavaScript then fetches data and renders the UI in the browser.

### Flow

```
User Request
      │
      ▼
Browser Receives HTML
      │
      ▼
JavaScript Loads
      │
      ▼
Fetch Data
      │
      ▼
Render UI
```

### Example

```tsx
"use client";

import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <>
      {users.map((user: any) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </>
  );
}
```

### Advantages

- Highly interactive
- Less server work
- Great for SPAs
- Smooth user experience

### Disadvantages

- Poor SEO
- Slower first load
- Blank page until JavaScript loads

### Best Use Cases

- Dashboards
- Chat Applications
- Social Media Apps
- Internal Tools

---

# Static Site Generation (SSG)

## What is SSG?

**Static Site Generation (SSG)** generates the HTML **once during the build process**. The generated pages are served as static files.

### Flow

```
Build Project
      │
      ▼
Generate HTML
      │
      ▼
Store Static Files
      │
      ▼
Serve to Users
```

### App Router Example

```tsx
export default async function Blog() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const posts = await res.json();

  return (
    <div>
      {posts.map((post: any) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}
```

### Pages Router Example

```tsx
export async function getStaticProps() {
  return {
    props: {}
  };
}
```

### Advantages

- Extremely fast
- Excellent SEO
- Low server cost
- CDN-friendly

### Disadvantages

- Data becomes outdated after deployment
- Requires rebuilding to update content

### Best Use Cases

- Blogs
- Portfolio Websites
- Documentation
- Marketing Pages
- Company Websites

---

# Incremental Static Regeneration (ISR)

## What is ISR?

**Incremental Static Regeneration (ISR)** combines the benefits of SSR and SSG. Pages are generated statically but are automatically regenerated after a specified interval.

### Example

```tsx
export const revalidate = 60;
```

The page will be regenerated every **60 seconds**.

### Fetch Example

```tsx
const res = await fetch(
  "https://jsonplaceholder.typicode.com/posts",
  {
    next: {
      revalidate: 60
    }
  }
);
```

### Flow

```
Build Static Page
      │
      ▼
User Visits
      │
      ▼
Serve Cached Page
      │
      ▼
After Revalidation Time
      │
      ▼
Generate Updated Page
```

### Advantages

- Fast like SSG
- Fresh data
- Better scalability
- Excellent SEO

### Disadvantages

- Slight delay before updated content appears
- More complex than SSG

### Best Use Cases

- News Websites
- E-commerce Products
- Blogs
- Documentation
- Frequently Updated Content

---

# Comparison Table

| Feature | SSR | CSR | SSG | ISR |
|---------|-----|-----|-----|-----|
| HTML Generated | Every request | Browser | Build time | Build time + Revalidation |
| SEO | Excellent | Poor | Excellent | Excellent |
| Performance | Good | Moderate | Excellent | Excellent |
| Fresh Data | Always | Yes | No | Yes |
| Server Load | High | Low | Very Low | Low |
| Build Required | No | No | Yes | Yes |
| Best For | Dynamic Data | Interactive Apps | Static Websites | Frequently Updated Content |

---

# Which Rendering Method Should You Choose?

| Scenario | Recommended |
|----------|-------------|
| Blog | SSG |
| Company Website | SSG |
| Portfolio | SSG |
| Dashboard | CSR |
| Chat Application | CSR |
| Social Media | CSR |
| Banking App | SSR |
| Weather App | SSR |
| E-commerce Product Page | ISR |
| News Website | ISR |

---

# Best Practices

- Use **SSG** for static content.
- Use **ISR** for content that updates periodically.
- Use **SSR** when every request requires fresh data.
- Use **CSR** only for highly interactive pages or authenticated dashboards.
- Prefer **Server Components** with the App Router whenever possible.
- Avoid unnecessary client-side data fetching if the data can be rendered on the server.

---

# Interview Questions

## SSR

- What is Server-Side Rendering?
- How does SSR work?
- What are the advantages and disadvantages of SSR?
- When should you use SSR?

## CSR

- What is Client-Side Rendering?
- Why is CSR not ideal for SEO?
- When should you use CSR?

## SSG

- What is Static Site Generation?
- When is HTML generated in SSG?
- What are the benefits of SSG?
- What are the limitations of SSG?

## ISR

- What is Incremental Static Regeneration?
- How is ISR different from SSG?
- What does `revalidate` do?
- When should you choose ISR?

## Comparison

- What is the difference between SSR and CSR?
- What is the difference between SSR and SSG?
- What is the difference between SSG and ISR?
- Which rendering strategy provides the best SEO?
- Which rendering strategy offers the best performance?
- How do you decide which rendering method to use in a real-world application?

