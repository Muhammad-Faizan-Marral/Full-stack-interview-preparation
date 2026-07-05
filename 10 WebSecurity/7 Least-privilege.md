
### Q. What is the principle of least privilege, and how do you apply it?
**Answer:**
"It means giving a user, service, or database role only the minimum permissions needed to do its job — nothing more. I apply this by:
- Giving the app's database user only CRUD permissions it needs, not admin/schema-altering rights.
- Using **role-based access control (RBAC)** in the app itself — e.g., in SoundWave, Listeners and Artists have different permissions, and I check the user's role server-side on every protected route, never trusting a role flag sent from the client."