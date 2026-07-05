### Q. What security headers should every production app set?
**Answer:**
"I use a library like **Helmet** in Express to set secure HTTP headers automatically:"
```javascript
const helmet = require('helmet');
app.use(helmet());
```
"This sets headers like:
- `Content-Security-Policy` — restricts sources of scripts/styles/images.
- `X-Content-Type-Options: nosniff` — prevents MIME-type sniffing attacks.
- `Strict-Transport-Security` — enforces HTTPS.
- `X-Frame-Options` — prevents clickjacking by blocking the site from being embedded in iframes."