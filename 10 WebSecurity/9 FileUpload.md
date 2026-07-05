
### Q. How would you handle file upload security (relevant to your Cloudinary usage in Volox/SoundWave)?
**Answer:**
"1. Validate file type and size on both client and server (don't trust client-side checks alone).
2. Never execute or trust the uploaded file's original name — generate a new safe filename.
3. Upload directly to a managed service like **Cloudinary** rather than storing files on my own server — this avoids risks like path traversal or someone uploading an executable script into a publicly served folder.
4. Scan/restrict allowed MIME types strictly (e.g., only `image/png`, `image/jpeg`, `audio/mpeg`) to prevent malicious file uploads disguised as media."