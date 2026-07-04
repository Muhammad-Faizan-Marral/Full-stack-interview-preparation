# Preventing Bots from Scraping a Public API

## Question

# How can you prevent a bot from scraping your publicly accessible API?

---

## Can You Completely Prevent API Scraping?

**No.**

If an API is **publicly accessible**, you cannot completely stop someone from accessing or scraping it. However, you can make scraping much more difficult by implementing multiple security and rate-limiting techniques.

> The goal is to **reduce abuse**, **detect suspicious activity**, and **protect your infrastructure**, not to make scraping impossible.

---

# 1. Rate Limiting

Limit the number of requests a client can make within a specific time period.

### Example

```
100 requests per minute per IP
```

If the limit is exceeded:

```
HTTP 429 Too Many Requests
```

### Example (Express.js)

```javascript
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
});

app.use(limiter);
```

---

# 2. Authentication

Require users to authenticate before accessing the API.

Common authentication methods:

- JWT (JSON Web Token)
- OAuth 2.0
- API Keys

Example:

```http
Authorization: Bearer <token>
```

Authenticated APIs are much harder to abuse than completely open APIs.

---

# 3. API Keys

Issue a unique API key to every application or developer.

Example:

```http
GET /api/products

x-api-key: abc123xyz
```

Benefits:

- Identify each client
- Track usage
- Revoke compromised keys
- Apply different rate limits

---

# 4. CAPTCHA

For endpoints triggered from a browser (such as login, signup, or contact forms), use CAPTCHA to reduce automated requests.

Popular options:

- Google reCAPTCHA
- Cloudflare Turnstile
- hCaptcha

---

# 5. IP Rate Limiting and Blocking

Monitor requests from each IP address.

If an IP sends an unusually high number of requests:

- Slow it down
- Temporarily block it
- Permanently ban it (if necessary)

---

# 6. Web Application Firewall (WAF)

A **Web Application Firewall (WAF)** filters malicious traffic before it reaches your server.

Popular WAF providers:

- Cloudflare
- AWS WAF
- Azure Web Application Firewall

A WAF can:

- Block bots
- Detect attacks
- Limit suspicious traffic
- Protect against common exploits

---

# 7. Request Logging and Monitoring

Log API requests to detect suspicious behavior.

Monitor:

- IP addresses
- User agents
- Request frequency
- Geographic location
- Failed authentication attempts

This helps identify abusive clients quickly.

---

# 8. User-Agent Validation

Bots often use fake or missing `User-Agent` headers.

Example:

```http
User-Agent: Mozilla/5.0
```

Although a `User-Agent` can be spoofed, checking it may help identify unsophisticated bots.

> Do not rely on `User-Agent` validation alone.

---

# 9. CORS

Configure **Cross-Origin Resource Sharing (CORS)** correctly to control which websites can make requests from a browser.

Example:

```javascript
app.use(
  cors({
    origin: "https://example.com",
  })
);
```

> **Important:** CORS protects browser-based requests only. It does **not** stop bots or server-to-server requests.

---

# 10. Limit Returned Data

Only return the data that clients actually need.

Instead of:

```json
{
  "id": 1,
  "name": "Laptop",
  "description": "...",
  "supplier": "...",
  "costPrice": "...",
  "internalNotes": "..."
}
```

Return:

```json
{
  "id": 1,
  "name": "Laptop",
  "price": 1200
}
```

Never expose confidential or internal information.

---

# 11. Pagination

Instead of returning thousands of records in one request, paginate the results.

Example:

```http
GET /products?page=1&limit=20
```

Benefits:

- Smaller responses
- Reduced server load
- Slower large-scale scraping

---

# 12. Cache Responses

Use caching to reduce the load caused by repeated requests.

Examples:

- Redis
- CDN caching
- Browser caching (where appropriate)

Caching improves performance and reduces backend load.

---

# 13. Detect Bot Behavior

Look for suspicious patterns such as:

- Extremely high request rates
- Sequential access to every resource
- Requests at perfectly regular intervals
- Requests from multiple IPs using the same API key

Flag or temporarily block suspicious clients.

---

# Best Practices

- Use HTTPS.
- Implement authentication whenever possible.
- Apply rate limiting.
- Issue API keys.
- Monitor API usage.
- Use a WAF.
- Return only necessary data.
- Enable pagination.
- Log suspicious activity.

---

# Interview Summary

- A **public API cannot be completely protected from scraping** because it is designed to be publicly accessible.
- The best approach is to **reduce abuse** using multiple layers of protection, including **rate limiting**, **authentication**, **API keys**, **CAPTCHA** (where appropriate), **WAFs**, **logging**, **monitoring**, and **pagination**.
- Security should follow a **defense-in-depth** strategy, combining several techniques rather than relying on a single solution.

> **Interview Answer (30–45 seconds):**
>
> "You can't completely prevent scraping of a public API, but you can significantly reduce abuse. Common techniques include rate limiting, authentication, API keys, Web Application Firewalls (WAFs), CAPTCHA for browser-based forms, request logging and monitoring, pagination, and returning only the data clients need. Together, these measures make scraping more difficult, protect server resources, and help detect malicious activity."