# 🚀 Web Performance Optimization

## Question
# How can we improve web performance?

---

## 1. Image Optimization

Images usually contribute the most to a website's overall page size.

### ✅ Use Next-Generation Image Formats
Use **WebP** or **AVIF** instead of **JPEG** or **PNG** because they provide better compression while maintaining image quality.

### ✅ Lazy Loading
Load images only when they are about to enter the viewport instead of loading every image when the page first loads.

```html
<img src="large-image.jpg" loading="lazy" alt="Optimized Image" />
```

### ✅ Next.js Image Component
If you are using **Next.js**, use the `<Image />` component instead of the `<img />` tag.

The Next.js Image component automatically:
- Optimizes image size
- Serves responsive images
- Enables lazy loading by default
- Improves performance

---

## 2. Code Splitting and Bundling

Large JavaScript bundles increase page loading time because the browser has to download, parse, and execute more code.

### ✅ Code Splitting

Instead of loading the entire application's JavaScript at once, load only the code required for the current page.

- In React, use **React.lazy()** and **Suspense**.
- In Next.js, use **Dynamic Imports**.

### ✅ Minification

Minification removes:
- Extra spaces
- Comments
- Unnecessary characters

This reduces the bundle size and improves loading speed.

Tools commonly used:
- Terser
- UglifyJS
- Production builds in modern bundlers (Vite, Webpack, etc.)

---

## 3. Asynchronous Script Loading

Normally, when the browser encounters a `<script>` tag, it stops parsing HTML until the JavaScript is downloaded and executed.

To improve performance, use **defer** or **async**.

### ✅ defer

The script downloads in the background and executes **after the HTML document has been completely parsed**.

```html
<script src="/index.js" defer></script>
```

### ✅ async

The script downloads in the background and executes **as soon as it finishes downloading**, even if the HTML parsing is not complete.

Use `async` for independent scripts such as analytics.

---

## 4. Caching and Content Delivery Network (CDN)

### ✅ CDN

A **Content Delivery Network (CDN)** (e.g., Cloudflare) stores your static assets (images, CSS, JavaScript, etc.) on servers located around the world.

When a user visits your website, the content is served from the nearest server, reducing latency and improving loading speed.

### ✅ Browser Caching

Configure HTTP caching headers such as **Cache-Control** so browsers can store static files locally.

When users revisit your website, these files are loaded from the browser cache instead of downloading them again from the server.

---

## 5. CSS and Font Optimization

### ✅ Critical CSS

Inline the CSS required for the content visible **above the fold** so the browser can render the initial screen faster.

### ✅ font-display: swap

Custom fonts may take time to load, causing invisible text (Flash of Invisible Text - FOIT).

Using `font-display: swap` displays a fallback font immediately and replaces it with the custom font once it has loaded.

```css
@font-face {
  font-family: "MyFont";
  font-display: swap;
}
```

---

## 6. Server-Side Rendering (SSR) vs Client-Side Rendering (CSR)

### React (Client-Side Rendering - CSR)

React applications first download JavaScript, then execute it, and finally render the page.

```
Download JavaScript
        ↓
Execute JavaScript
        ↓
Render UI
```

This may result in a brief blank screen before the content appears.

### Next.js (Server-Side Rendering / Static Site Generation)

Next.js can render HTML on the server before sending it to the browser.

```
Server renders HTML
        ↓
Browser receives HTML
        ↓
Content appears immediately
        ↓
JavaScript hydrates the page
```

This improves:
- Faster First Contentful Paint (FCP)
- Better SEO
- Improved user experience

---

# 📊 Key Performance Metrics

### LCP (Largest Contentful Paint)

Measures how long it takes for the largest visible content element to load.

**Ideal:** ≤ 2.5 seconds

---

### FID (First Input Delay)

Measures the delay between a user's first interaction and the browser's response.

**Ideal:** Less than 100 ms

> **Note:** Google has replaced FID with **INP (Interaction to Next Paint)** as a Core Web Vital, but FID is still commonly discussed in interviews.

---

### CLS (Cumulative Layout Shift)

Measures how much the page layout unexpectedly shifts while loading.

**Ideal:** Less than 0.1