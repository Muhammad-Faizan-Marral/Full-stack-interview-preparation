# Next.js App Router Features

---

# Loading.tsx

## What is `loading.tsx`?

`loading.tsx` is a special file in the **App Router** that displays a loading UI while a page or route is fetching data.

It works automatically with **React Suspense**.

### Folder Structure

```
app/
├── dashboard/
│   ├── page.tsx
│   └── loading.tsx
```

### Example

```tsx
export default function Loading() {
  return <h2>Loading...</h2>;
}
```

When the `/dashboard` page is loading, Next.js automatically renders `loading.tsx`.

### Use Cases

- Loading spinners
- Skeleton screens
- Progress indicators

### Advantages

- Better user experience
- Faster perceived performance
- No manual loading state required

---

# Error.tsx

## What is `error.tsx`?

`error.tsx` is a special file that catches runtime errors occurring within a route segment.

It acts as an **Error Boundary**.

### Folder Structure

```
app/
├── dashboard/
│   ├── page.tsx
│   └── error.tsx
```

### Example

```tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>

      <button onClick={reset}>
        Try Again
      </button>
    </div>
  );
}
```

### Benefits

- Prevents the entire application from crashing
- Provides a user-friendly error screen
- Allows users to retry using `reset()`

### Use Cases

- API failures
- Database errors
- Unexpected runtime exceptions

---

# Server Actions

## What are Server Actions?

**Server Actions** allow you to execute server-side logic directly from React components without creating separate API endpoints.

They are available in the **App Router**.

### Example

```tsx
"use server";

export async function createUser() {
  console.log("User Created");
}
```

---

### Calling a Server Action

```tsx
import { createUser } from "./actions";

export default function Form() {
  return (
    <form action={createUser}>
      <button type="submit">
        Create User
      </button>
    </form>
  );
}
```

### Common Use Cases

- Form submissions
- Database operations
- Sending emails
- Updating records
- Deleting records

### Advantages

- No separate API routes required
- More secure
- Less boilerplate code
- Simplified full-stack development

---

# Authentication

## What is Authentication?

**Authentication** is the process of verifying a user's identity before allowing access to protected resources.

---

## Common Authentication Methods

- Email & Password
- OAuth (Google, GitHub, Facebook)
- Magic Links
- JWT (JSON Web Tokens)
- Session-based Authentication

---

## Popular Authentication Libraries

- Auth.js (formerly NextAuth.js)
- Clerk
- Supabase Auth
- Firebase Authentication

---

## Example (Auth.js)

```tsx
import { auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    return <h1>Please Login</h1>;
  }

  return <h1>Welcome</h1>;
}
```

---

## Protecting Routes

Middleware can restrict access to authenticated users.

```tsx
import { NextResponse } from "next/server";

export function middleware() {
  // Check authentication

  return NextResponse.next();
}
```

---

## Best Practices

- Store passwords securely using hashing (e.g., bcrypt)
- Use HTTPS
- Store secrets in `.env.local`
- Protect sensitive routes
- Validate user sessions
- Never expose secret keys to the client

---

# Deployment

## What is Deployment?

Deployment is the process of publishing your Next.js application so users can access it online.

---

## Popular Platforms

- Vercel ⭐ (Recommended)
- AWS
- Render
- DigitalOcean
- Railway
- Netlify (limited support for some Next.js features)

---

## Deploying to Vercel

### Install Vercel CLI

```bash
npm install -g vercel
```

---

### Login

```bash
vercel login
```

---

### Deploy

```bash
vercel
```

---

### Production Deployment

```bash
vercel --prod
```

---

## Environment Variables

Create:

```
.env.local
```

Example

```text
DATABASE_URL=...
NEXTAUTH_SECRET=...
NEXT_PUBLIC_API_URL=...
```

---

## Build Application

```bash
npm run build
```

---

## Start Production Server

```bash
npm start
```

---

## Deployment Checklist

- Environment variables configured
- Build passes successfully
- No TypeScript errors
- No ESLint errors (if enforced)
- Images optimized
- Metadata configured
- Database connected
- Authentication working

---

# Summary Table

| Feature | Purpose |
|----------|---------|
| `loading.tsx` | Display loading UI while data is loading |
| `error.tsx` | Handle route-level runtime errors |
| Server Actions | Execute server-side logic without API routes |
| Authentication | Verify user identity and protect routes |
| Deployment | Publish the application for users |

---

# Best Practices

- Use `loading.tsx` for route-level loading states.
- Create user-friendly `error.tsx` pages with a retry option.
- Use Server Actions for secure form handling and database operations.
- Store secrets in environment variables and never expose them to the client.
- Deploy production applications on **Vercel** for the best Next.js experience.
- Test your production build locally before deployment using `npm run build` and `npm start`.

---

# Interview Questions

## Loading.tsx

- What is `loading.tsx`?
- When is `loading.tsx` rendered?
- How does it improve user experience?

## Error.tsx

- What is `error.tsx`?
- Why must `error.tsx` be a Client Component?
- What does the `reset()` function do?

## Server Actions

- What are Server Actions?
- What are the advantages of Server Actions over API Routes?
- When should you use Server Actions?
- Why is `"use server"` required?

## Authentication

- What is authentication?
- What is the difference between authentication and authorization?
- Which authentication libraries are commonly used with Next.js?
- How do you protect routes in Next.js?

## Deployment

- How do you deploy a Next.js application?
- Why is Vercel recommended for Next.js?
- What is the purpose of `.env.local`?
- What should you check before deploying a production application?

