# Next.js Advanced Features

---

# Metadata API

## What is Metadata API?

The **Metadata API** allows you to define SEO-related information such as the page title, description, keywords, and Open Graph metadata.

It is available in the **App Router**.

### Example

```tsx
export const metadata = {
  title: "Home Page",
  description: "Welcome to our website",
};
```

### Dynamic Metadata

```tsx
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Products",
    description: "Our products",
  };
}
```

### Benefits

- Better SEO
- Social media sharing
- Dynamic page titles
- Better search engine indexing

---

# Image Optimization

## What is Image Optimization?

Next.js provides the built-in **Image Component** (`next/image`) that automatically optimizes images.

### Example

```tsx
import Image from "next/image";

export default function Home() {
  return (
    <Image
      src="/profile.png"
      alt="Profile"
      width={300}
      height={300}
    />
  );
}
```

### Features

- Lazy Loading
- Automatic Image Optimization
- Responsive Images
- Modern Image Formats (WebP, AVIF)
- Prevents Layout Shift

### Advantages

- Faster page loading
- Improved Core Web Vitals
- Better performance

---

# Middleware

## What is Middleware?

**Middleware** runs **before** a request reaches your application. It can inspect, modify, redirect, or block requests.

### File

```
middleware.ts
```

### Example

```tsx
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.next();
}
```

### Redirect Example

```tsx
import { NextResponse } from "next/server";

export function middleware() {
  return NextResponse.redirect(
    new URL("/login", "http://localhost:3000")
  );
}
```

### Common Uses

- Authentication
- Authorization
- Redirects
- Localization (i18n)
- Logging
- Rate Limiting

---

# Route Handlers

## What are Route Handlers?

Route Handlers allow you to create backend API endpoints inside the **App Router**.

### Folder Structure

```
app/
└── api/
    └── users/
        └── route.ts
```

### GET Request

```tsx
export async function GET() {
  return Response.json({
    message: "Hello World"
  });
}
```

### POST Request

```tsx
export async function POST(request: Request) {
  const body = await request.json();

  return Response.json(body);
}
```

### Supported HTTP Methods

- GET
- POST
- PUT
- PATCH
- DELETE
- OPTIONS
- HEAD

### Advantages

- Full-stack development
- No separate Express server required
- Built into Next.js

---

# Dynamic Routes

## What are Dynamic Routes?

Dynamic Routes allow pages to be created using URL parameters.

### Folder

```
app/products/[id]/page.tsx
```

### URL

```
/products/101
```

### Example

```tsx
export default function Product({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return <h1>{params.id}</h1>;
}
```

---

## Multiple Dynamic Segments

```
app/blog/[category]/[slug]/page.tsx
```

Example URL

```
/blog/react/useeffect
```

---

## Catch-all Routes

```
app/docs/[...slug]/page.tsx
```

Example URL

```
/docs/react/hooks/useeffect
```

---

## Optional Catch-all Routes

```
app/docs/[[...slug]]/page.tsx
```

Matches

```
/docs
/docs/react
/docs/react/hooks
```

---

# Caching

## What is Caching?

Caching stores previously fetched data so it can be reused instead of fetching it again.

### Default Fetch (Cached)

```tsx
const res = await fetch(
  "https://api.example.com/users"
);
```

---

### Disable Cache

```tsx
const res = await fetch(
  "https://api.example.com/users",
  {
    cache: "no-store"
  }
);
```

---

### Revalidate Cache

```tsx
const res = await fetch(
  "https://api.example.com/users",
  {
    next: {
      revalidate: 60
    }
  }
);
```

### Cache Types

| Option | Description |
|---------|-------------|
| Default | Cached response |
| `cache: "no-store"` | Always fetch fresh data (SSR-like behavior) |
| `revalidate` | Regenerate cached data after a specified interval (ISR-like behavior) |

### Benefits

- Faster page loads
- Reduced server requests
- Better scalability
- Lower infrastructure cost

---

# Streaming

## What is Streaming?

Streaming allows the server to send parts of a page to the browser **as soon as they are ready**, instead of waiting for the entire page to finish rendering.

### Traditional Rendering

```
Server
   │
Wait for all data
   │
Send complete page
```

---

### Streaming

```
Server
   │
Send Header
   │
Send Component A
   │
Send Component B
   │
Send Component C
```

The user can start viewing the page while the remaining content continues loading.

---

## Loading UI

```
app/dashboard/loading.tsx
```

```tsx
export default function Loading() {
  return <h2>Loading...</h2>;
}
```

### Benefits

- Faster perceived performance
- Better user experience
- Reduced waiting time
- Progressive rendering

---

# Summary Table

| Feature | Purpose |
|----------|---------|
| Metadata API | Manage SEO metadata |
| Image Optimization | Automatically optimize images |
| Middleware | Execute logic before requests |
| Route Handlers | Build backend APIs |
| Dynamic Routes | Create parameterized URLs |
| Caching | Improve performance by reusing data |
| Streaming | Render parts of a page progressively |

---

# Best Practices

- Use the **Metadata API** for SEO instead of manually editing `<head>`.
- Always use `next/image` for optimized images.
- Keep Middleware lightweight since it runs on every matching request.
- Use Route Handlers for lightweight backend APIs.
- Use Dynamic Routes for resource-specific pages (e.g., products, blogs).
- Cache data whenever possible, and use `cache: "no-store"` only when fresh data is required.
- Use Streaming with `loading.tsx` to improve perceived performance.

---

# Interview Questions

## Metadata API

- What is the Metadata API?
- How do you create dynamic metadata?
- Why is the Metadata API important for SEO?

## Image Optimization

- What is the purpose of the `next/image` component?
- What optimizations does Next.js apply automatically?
- Why is `next/image` preferred over the HTML `<img>` tag?

## Middleware

- What is Middleware?
- When does Middleware execute?
- What are common use cases for Middleware?

## Route Handlers

- What are Route Handlers?
- Which HTTP methods are supported?
- How are Route Handlers different from API Routes in the Pages Router?

## Dynamic Routes

- What are Dynamic Routes?
- What is the difference between `[id]`, `[...slug]`, and `[[...slug]]`?
- How do you access route parameters?

## Caching

- How does caching work in Next.js?
- What is the difference between `cache: "no-store"` and `revalidate`?
- When should you disable caching?

## Streaming

- What is Streaming?
- How does Streaming improve performance?
- What is the purpose of `loading.tsx`?
- How is Streaming different from traditional rendering?

---

