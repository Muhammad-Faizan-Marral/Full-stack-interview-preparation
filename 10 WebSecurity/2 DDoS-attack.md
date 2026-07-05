## Q44. What is a DDoS attack and how do you defend against it?
**Answer:**
"A DDoS (Distributed Denial of Service) attack floods a server with massive traffic from many sources at once, overwhelming it so legitimate users can't access the service."

"**Defenses I'd put in place:**
1. **Rate limiting** at the application layer, e.g. using `express-rate-limit`, to cap how many requests a single IP can make per minute.
```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: 'Too many requests, please try again later.',
});
app.use('/api/', limiter);
```
2. **CDN / reverse proxy in front of the server** (Cloudflare, AWS Shield) — absorbs and filters malicious traffic before it reaches the origin server, and provides built-in DDoS mitigation.
3. **Load balancing** across multiple servers so traffic is distributed and no single instance gets overwhelmed.
4. **Web Application Firewall (WAF)** to block known malicious traffic patterns and bot signatures.
5. **Auto-scaling infrastructure** (on platforms like Railway/Vercel/AWS) so the app can absorb sudden traffic spikes rather than crashing outright."