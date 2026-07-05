### Q. Quick-fire summary table of attacks vs defenses (great to say if asked "give me a rundown"):
| Attack | Defense |
|---|---|
| SQL Injection | Parameterized queries, ORMs (Prisma), input validation |
| XSS | Output escaping, CSP headers, sanitization, HttpOnly cookies |
| CSRF | CSRF tokens, SameSite cookies, Bearer token auth |
| DDoS | Rate limiting, CDN/WAF, load balancing, auto-scaling |
| Brute-force login | Rate limiting, account lockout, CAPTCHA |
| Man-in-the-middle | HTTPS/TLS everywhere |
| Broken access control | RBAC, server-side authorization checks |
| Secrets leakage | Env variables, secret managers, `.gitignore` |
| Malicious file upload | Type/size validation, managed storage (Cloudinary) |
