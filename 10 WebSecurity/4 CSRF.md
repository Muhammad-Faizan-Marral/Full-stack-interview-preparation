### Q. What is CSRF (Cross-Site Request Forgery) and how is it different from XSS?
**Answer:**
"XSS injects malicious code INTO your site. CSRF tricks a logged-in user's browser into sending an unwanted request TO your site from a different site — e.g., a malicious page auto-submits a form to `yourbank.com/transfer` using the victim's existing session cookies."

"**Prevention:**
1. Use **CSRF tokens** — a unique token generated per session/form, verified on the server before processing state-changing requests.<br>

2. Set cookies with `SameSite=Strict` or `SameSite=Lax` so browsers won't send them along with cross-site requests.
3. Prefer sending the access token via `Authorization: Bearer <token>` header (as I do with JWT) rather than relying solely on cookies for authenticated API calls — this is inherently more CSRF-resistant since attacker sites can't set custom headers on forged requests."