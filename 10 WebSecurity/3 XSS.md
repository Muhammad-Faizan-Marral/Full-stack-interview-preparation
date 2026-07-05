### Q. What is XSS (Cross-Site Scripting) and how do you prevent it?
**Answer:**
"XSS happens when an attacker injects malicious JavaScript into a page that other users view — e.g., posting `<script>stealCookies()</script>` as a chat message or comment, which then runs in every viewer's browser."

"**Prevention:**
1. React already escapes content by default when rendering with `{}` — it won't execute injected HTML/JS unless I explicitly use `dangerouslySetInnerHTML`, which I avoid unless the input is sanitized (e.g., with a library like DOMPurify).
2. Sanitize any user-generated content on the backend before storing it.
3. Set the `Content-Security-Policy` (CSP) header to restrict which scripts can execute on the page.
4. Store sensitive tokens (like refresh tokens) in **HttpOnly cookies** — this way, even if XSS occurs, injected JavaScript can't read the token via `document.cookie`."