# Client-Side Rendering (CSR) vs Server-Side Rendering (SSR)

## Question
**What is the difference between Client-Side Rendering (CSR) and Server-Side Rendering (SSR)?**

---

# What is Client-Side Rendering (CSR)?

In **Client-Side Rendering (CSR)**, the browser first downloads a minimal HTML file along with JavaScript, CSS, and other assets.

React then executes the JavaScript in the browser and generates the UI.

This means the **browser is responsible for rendering the page**.

React applications created with **Vite** or **Create React App (CRA)** use CSR by default.

### How CSR Works

```text
User Request
      │
      ▼
Server sends HTML + JavaScript
      │
      ▼
Browser downloads JavaScript
      │
      ▼
React renders the UI
      │
      ▼
User sees the page
```

### Advantages

- Fast page transitions after the initial load
- Rich and interactive user experience
- Reduces server workload
- Good for Single Page Applications (SPAs)

### Disadvantages

- Slower initial page load
- SEO is less effective because content is rendered after JavaScript executes
- Users may see a blank screen while JavaScript is loading

---

# What is Server-Side Rendering (SSR)?

In **Server-Side Rendering (SSR)**, the server generates the complete HTML before sending it to the browser.

The browser displays the HTML immediately, and React then **hydrates** the page to make it interactive.

This means the **server is responsible for rendering the page**.

Frameworks like **Next.js** support SSR.

### How SSR Works

```text
User Request
      │
      ▼
Server renders HTML
      │
      ▼
Complete HTML sent to browser
      │
      ▼
Browser displays content
      │
      ▼
React hydrates the page
      │
      ▼
Page becomes interactive
```

---

# What is Hydration?

**Hydration** is the process where React attaches JavaScript event handlers to the HTML that was already rendered by the server.

After hydration, the page becomes fully interactive.

---

# CSR vs SSR

| Client-Side Rendering (CSR) | Server-Side Rendering (SSR) |
|------------------------------|-----------------------------|
| Rendering happens in the browser | Rendering happens on the server |
| Initial load is slower | Initial load is faster |
| Better for highly interactive applications | Better for SEO and content-heavy websites |
| Requires JavaScript to display content | HTML is available immediately |
| Lower server workload | Higher server workload |
| Default in React (Vite, CRA) | Common in Next.js |

---

# When Should You Use CSR?

Use **Client-Side Rendering** for:

- Dashboards
- Admin Panels
- Chat Applications
- Social Media Apps
- Project Management Tools
- Applications where SEO is not important

---

# When Should You Use SSR?

Use **Server-Side Rendering** for:

- E-commerce websites
- Blogs
- News websites
- Marketing websites
- Documentation sites
- Applications where SEO and fast initial load are important

---

# Summary

- **Client-Side Rendering (CSR)** renders the UI in the browser after JavaScript loads.
- **Server-Side Rendering (SSR)** renders the HTML on the server before sending it to the browser.
- CSR provides a better experience for highly interactive applications.
- SSR offers faster initial page loads and better SEO.
- React applications commonly use **CSR**, while frameworks like **Next.js** provide **SSR** support.