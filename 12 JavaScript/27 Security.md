# 📘 JavaScript Security

> JavaScript security focuses on protecting web applications from common attacks such as XSS, CSRF, and unauthorized cross-origin access.

---

# Table of Contents

1. Security
2. XSS (Cross-Site Scripting)
3. CSRF (Cross-Site Request Forgery)
4. CORS (Cross-Origin Resource Sharing)
5. Same Origin Policy (SOP)
6. Content Security Policy (CSP)
7. Security Best Practices
8. Security Cheat Sheet
9. Interview Questions

---

# 1. Security

Web application security is the practice of protecting applications from malicious users, attacks, and vulnerabilities.

### Common Security Threats

- XSS (Cross-Site Scripting)
- CSRF (Cross-Site Request Forgery)
- SQL Injection
- Clickjacking
- CORS Misconfiguration
- Broken Authentication
- Sensitive Data Exposure

### Security Goals

- Protect user data
- Prevent unauthorized access
- Validate user input
- Secure communication
- Protect cookies and sessions

---

# 2. XSS (Cross-Site Scripting)

XSS is an attack where an attacker injects malicious JavaScript into a web page.

### Example (Unsafe)

```javascript
const userInput = "<script>alert('Hacked!')</script>";

document.getElementById("output").innerHTML = userInput;
```

The browser executes the injected script.

### Safe Example

```javascript
const userInput = "<script>alert('Hacked!')</script>";

document.getElementById("output").textContent = userInput;
```

The script is displayed as plain text instead of executing.

### Types of XSS

### Stored XSS

Malicious script is stored in a database.

```
Attacker
     ↓
Database
     ↓
Website
     ↓
Victim
```

---

### Reflected XSS

Script comes from the URL or request and is reflected back immediately.

```
Attacker URL
      ↓
Server
      ↓
Victim
```

---

### DOM-Based XSS

JavaScript updates the DOM using untrusted input.

```javascript
location.hash

document.write()

innerHTML
```

---

### Prevention

- Never trust user input
- Escape HTML output
- Use `textContent` instead of `innerHTML`
- Sanitize input
- Enable Content Security Policy (CSP)

---

# 3. CSRF (Cross-Site Request Forgery)

CSRF tricks an authenticated user into performing unwanted actions.

Example

User logs into:

```
bank.com
```

Attacker sends:

```html
<img src="https://bank.com/transfer?amount=1000&to=attacker">
```

If the user is logged in, the browser may automatically include the user's cookies, causing the request to execute.

### Prevention

- CSRF Tokens
- SameSite Cookies
- Re-authentication for sensitive actions
- Verify Origin/Referer headers

---

# 4. CORS (Cross-Origin Resource Sharing)

CORS allows or blocks requests between different origins.

### Origin

An origin consists of:

```
Protocol + Domain + Port
```

Example

```
https://example.com:443
```

### Different Origins

| URL | Same Origin? |
|------|--------------|
| https://example.com | ✅ Yes |
| http://example.com | ❌ No |
| https://api.example.com | ❌ No |
| https://example.com:8080 | ❌ No |

### Server Response

```http
Access-Control-Allow-Origin: https://example.com
```

### Example

```javascript
fetch("https://api.example.com/users");
```

Without proper CORS headers, the browser blocks access to the response.

### Common Headers

```http
Access-Control-Allow-Origin

Access-Control-Allow-Methods

Access-Control-Allow-Headers

Access-Control-Allow-Credentials
```

---

# 5. Same Origin Policy (SOP)

Same Origin Policy is a browser security feature that restricts one origin from accessing resources from another origin.

Example

```
https://example.com
```

Cannot freely access

```
https://bank.com
```

Without SOP, any website could read another site's sensitive data.

### Allowed

```javascript
https://example.com/page1

↓

https://example.com/page2
```

### Blocked

```javascript
https://example.com

↓

https://bank.com
```

### Purpose

- Protect cookies
- Protect local storage
- Protect session data
- Prevent data theft

---

# 6. Content Security Policy (CSP)

Content Security Policy (CSP) is an HTTP response header that controls which resources the browser is allowed to load and execute.

### Example Header

```http
Content-Security-Policy:
default-src 'self';
script-src 'self';
```

This allows scripts only from the same origin.

### Restrict External Scripts

```http
Content-Security-Policy:
script-src 'self' https://cdn.example.com;
```

### Block Inline JavaScript

```html
<button onclick="alert('Hi')">
```

A strict CSP blocks inline scripts unless explicitly allowed.

### Benefits

- Prevents many XSS attacks
- Restricts unauthorized scripts
- Controls external resources
- Improves application security

---

# 7. Security Best Practices

- Validate all user input
- Escape HTML output
- Sanitize data before rendering
- Prefer `textContent` over `innerHTML`
- Use HTTPS everywhere
- Enable Content Security Policy (CSP)
- Use CSRF tokens for state-changing requests
- Configure CORS correctly
- Use `HttpOnly`, `Secure`, and `SameSite` cookie attributes
- Keep dependencies updated
- Avoid exposing sensitive data in client-side code

---

# Security Cheat Sheet

| Concept | Description |
|----------|-------------|
| Security | Protect applications from attacks |
| XSS | Inject malicious JavaScript into pages |
| CSRF | Force authenticated users to perform actions |
| CORS | Controls cross-origin resource access |
| Same Origin Policy | Restricts cross-origin access by default |
| CSP | Restricts what resources the browser can load |

---

# Interview Questions

## Beginner

1. What is web application security?
2. What is XSS?
3. What is CSRF?
4. What is CORS?
5. What is Same Origin Policy?
6. What is Content Security Policy?
7. Why is `innerHTML` dangerous?
8. What is an origin?
9. What is the difference between CORS and SOP?
10. Why is HTTPS important?

---

## Intermediate

11. Explain Stored, Reflected, and DOM-based XSS.
12. How does CSRF work?
13. How do CSRF tokens prevent attacks?
14. Why is CORS enforced by browsers?
15. What are preflight requests?
16. Explain `Access-Control-Allow-Origin`.
17. How do `HttpOnly` cookies improve security?
18. What is the purpose of `SameSite` cookies?
19. How does CSP reduce XSS risks?
20. Why should user input always be sanitized?

---

## Advanced (FAANG Level)

21. Explain the browser security model.
22. Difference between XSS and CSRF.
23. Explain CORS preflight (`OPTIONS`) requests.
24. How would you secure a REST API against common attacks?
25. Why is `Access-Control-Allow-Origin: *` unsafe with credentials?
26. Explain the interaction between CORS and Same Origin Policy.
27. How do CSP nonces and hashes work?
28. What security headers should every web application use?
29. How can third-party scripts introduce security risks?
30. Describe a layered security approach for a modern JavaScript application.

---

# Summary

- Security is essential for protecting users, data, and applications.
- XSS injects malicious JavaScript into web pages; prevent it by escaping and sanitizing user input.
- CSRF tricks authenticated users into performing unwanted actions; defend with CSRF tokens and `SameSite` cookies.
- CORS allows controlled cross-origin access through server-defined HTTP headers.
- Same Origin Policy is the browser's default protection against unauthorized cross-origin access.
- Content Security Policy (CSP) restricts which resources can be loaded and executed, significantly reducing the risk of XSS.