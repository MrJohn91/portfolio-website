# Vercel Deployment Notes

## Fix for 404 Error

If you're getting a 404 error on Vercel, you need to:

1. **Set Root Directory in Vercel Dashboard:**
   - Go to your project on Vercel
   - Settings → General
   - Scroll to "Root Directory"
   - Click "Edit"
   - Select `frontend` folder
   - Click "Save"

2. **OR Remove vercel.json and Deploy from Frontend Directory:**
   - If the root directory setting doesn't work, you can deploy directly from the frontend folder
   - In Vercel Dashboard: New Project → Import Git Repository
   - Choose your repo
   - Framework Preset: Next.js
   - Root Directory: `frontend`
   - Deploy

3. **Alternative: Use vercel.json (Current Setup)**
   - The vercel.json file should handle the subdirectory
   - Make sure root directory is NOT set in Vercel settings when using vercel.json

## Current vercel.json Configuration

The vercel.json file is configured to:
- Build from the `frontend` directory
- Run Next.js commands in the frontend folder
- Output to `frontend/.next`

If you still get 404:
1. Try removing the root directory setting in Vercel (if set)
2. Redeploy the project
3. Check build logs to ensure Next.js is detected




