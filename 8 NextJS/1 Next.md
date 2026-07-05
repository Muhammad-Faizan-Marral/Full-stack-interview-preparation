# Next.js

## What is Next.js?

**Next.js** is an open-source React framework developed by **Vercel**. It is used to build fast, scalable, and SEO-friendly web applications by providing features like Server-Side Rendering (SSR), Static Site Generation (SSG), Routing, API Routes, and more.

### Features

- Built on React
- File-based Routing
- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)
- API Routes
- App Router
- Server Components
- Client Components
- Image Optimization
- SEO Friendly
- Middleware
- TypeScript Support

---

# Why Use Next.js?

### Advantages

- Better SEO
- Faster Performance
- Automatic Code Splitting
- Built-in Routing
- Image Optimization
- API Development
- Full Stack Development
- Excellent Developer Experience

---

# Installation

```bash
npx create-next-app@latest my-app
```

Run the project

```bash
cd my-app
npm run dev
```

---

# Folder Structure (App Router)

```
my-app/

app/
│── layout.tsx
│── page.tsx
│── about/
│     └── page.tsx
│── dashboard/
│     └── page.tsx

public/

components/

lib/

styles/

next.config.js

package.json
```

---

# Routing

Next.js uses **File-Based Routing**.

### Home Page

```
app/page.tsx
```

URL

```
/
```

---

### About Page

```
app/about/page.tsx
```

URL

```
/about
```

---

### Nested Route

```
app/dashboard/profile/page.tsx
```

URL

```
/dashboard/profile
```

---

# Dynamic Routes

Create folders using square brackets.

```
app/products/[id]/page.tsx
```

Example URL

```
/products/10
```

Example

```tsx
export default async function Product({
  params,
}: {
  params: { id: string };
}) {
  return <h1>{params.id}</h1>;
}
```

---

# Link Component

Use `Link` for client-side navigation.

```tsx
import Link from "next/link";

<Link href="/about">
  About
</Link>
```

---

# Image Component

Optimized images using `next/image`.

```tsx
import Image from "next/image";

<Image
  src="/profile.png"
  width={200}
  height={200}
  alt="Profile"
/>
```

### Benefits

- Lazy Loading
- Image Optimization
- Responsive Images

---

# Layout

Layouts wrap multiple pages.

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

---

# Server Components

Server Components run on the server by default.

Example

```tsx
export default async function Home() {
  const users = await fetch("https://api.example.com/users");

  return <div>Home</div>;
}
```

### Benefits

- Faster rendering
- Smaller JavaScript bundle
- Better SEO

---

# Client Components

Add `"use client"` at the top.

```tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

### Use Client Components For

- useState
- useEffect
- Event handlers
- Browser APIs

---

# Rendering Methods

## Server-Side Rendering (SSR)

The page is generated on every request.

### Benefits

- Fresh data
- Better SEO

---

## Static Site Generation (SSG)

The page is generated at build time.

### Benefits

- Very fast
- Excellent performance

---

## Incremental Static Regeneration (ISR)

Static pages are regenerated after a specified interval.

Example

```tsx
export const revalidate = 60;
```

This regenerates the page every **60 seconds**.

---

# Data Fetching

### Server Component

```tsx
const users = await fetch(
  "https://api.example.com/users"
);

const data = await users.json();
```

---

### Disable Cache

```tsx
await fetch(url, {
  cache: "no-store",
});
```

---

### Revalidate

```tsx
await fetch(url, {
  next: {
    revalidate: 60,
  },
});
```

---

# API Routes

Create

```
app/api/users/route.ts
```

Example

```tsx
export async function GET() {
  return Response.json({
    message: "Hello"
  });
}
```

URL

```
/api/users
```

---

# Middleware

Middleware runs before a request reaches a route.

Example

```tsx
import { NextResponse } from "next/server";

export function middleware() {
  return NextResponse.next();
}
```

Common Uses

- Authentication
- Authorization
- Redirects
- Logging

---

# Metadata (SEO)

```tsx
export const metadata = {
  title: "Home",
  description: "Next.js App",
};
```

---

# Environment Variables

```
.env.local
```

```text
DATABASE_URL=...
NEXT_PUBLIC_API_URL=...
```

Use

```tsx
process.env.DATABASE_URL
```

---

# Loading UI

```
loading.tsx
```

```tsx
export default function Loading() {
  return <h1>Loading...</h1>;
}
```

---

# Error Handling

```
error.tsx
```

```tsx
"use client";

export default function Error() {
  return <h1>Something went wrong</h1>;
}
```

---

# Route Not Found

```
not-found.tsx
```

```tsx
export default function NotFound() {
  return <h1>404 Page Not Found</h1>;
}
```

---

# Authentication

Popular authentication libraries:

- NextAuth.js (Auth.js)
- Clerk
- Supabase Auth
- Firebase Auth

---

# Deployment

Most commonly deployed on:

- Vercel
- AWS
- DigitalOcean
- Render

---

# Next.js vs React

| React | Next.js |
|--------|----------|
| Library | Framework |
| Manual Routing | File-Based Routing |
| Client Rendering by default | Supports SSR, SSG, ISR |
| SEO requires extra work | Built-in SEO support |
| No API Routes | Built-in API Routes |
| Manual optimization | Automatic optimization |

---

# Best Practices

- Use Server Components whenever possible.
- Use Client Components only when needed.
- Optimize images with `next/image`.
- Use `Link` instead of `<a>`.
- Fetch data on the server when possible.
- Keep secrets in `.env.local`.
- Use TypeScript.
- Cache data appropriately.
- Use layouts to avoid duplicate UI.

---

# Interview Questions

## Basics

- What is Next.js?
- Why should we use Next.js?
- What are the advantages of Next.js over React?

## Routing

- What is File-Based Routing?
- How do dynamic routes work?
- What is a catch-all route?

## Rendering

- What is SSR?
- What is SSG?
- What is ISR?
- What is the difference between SSR, SSG, and ISR?

## Components

- What are Server Components?
- What are Client Components?
- When should you use `"use client"`?

## Data Fetching

- How do you fetch data in Next.js?
- What does `cache: "no-store"` do?
- What is `revalidate`?

## API

- What are API Routes?
- How do you create an API endpoint?

## SEO

- Why is Next.js better for SEO?
- How do you define page metadata?

## Middleware

- What is Middleware?
- When would you use Middleware?

## General

- What is hydration?
- What is code splitting?
- What is lazy loading?
- How do you deploy a Next.js application?
- What are the differences between the Pages Router and the App Router?

