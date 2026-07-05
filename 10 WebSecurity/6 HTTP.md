
### Q. What is HTTPS/TLS and why does every production app need it?
**Answer:**
"HTTPS encrypts data in transit between client and server using TLS, preventing man-in-the-middle attacks where someone could intercept and read/modify data — like login credentials or JWT tokens — over the network. Without it, anyone on the same network (e.g., public WiFi) could sniff plaintext traffic. Platforms like Vercel and Railway provide HTTPS by default, but I always confirm it's enforced (redirecting HTTP → HTTPS) and set the `Strict-Transport-Security` header."