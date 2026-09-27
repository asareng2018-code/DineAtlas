# DineAtlas Deployment Guide: Vercel Frontend + Render Backend

## Overview
This guide covers the exact deployment sequence for the DineAtlas public restaurant discovery website.

Project structure:
- Frontend: `frontend/`
- Backend: `backend/`
- Project root: repository root

Deployment target:
- Frontend: Vercel
- Backend: Render
- Public access: no login required

---

## Step 1: Prepare the repository

### Goal
Push the current project to GitHub and confirm the frontend and backend folders are included.

### Which terminal to use
Use Windows PowerShell for this step unless you specifically prefer Command Prompt. You do not need administrator mode for normal Git work, but you can use an elevated PowerShell if Git was not recognized or if your system is blocking normal command execution.

Recommended option:
- Open PowerShell as a normal user
- If Git is not recognized, open PowerShell as Administrator and retry

Alternative:
- Open Command Prompt and run the same commands

### Commands
```powershell
cd "f:\Proj"

git --version
if ($LASTEXITCODE -ne 0) {
  Write-Host "Git is not installed or not on PATH. Install Git and reopen PowerShell."
  exit 1
}

git init
git branch -M main
git add .
git commit -m "Prepare DineAtlas public launch repo"
git remote add origin https://github.com/YOUR_USERNAME/DineAtlas.git
git push -u origin main
```

### If Git is not recognized
1. Install Git for Windows from the official website.
2. Reopen PowerShell or Command Prompt.
3. Confirm with:

```powershell
git --version
```

If it still fails, open PowerShell as Administrator and run:

```powershell
where.exe git
```

Then verify Git is in your PATH.

### Verification checklist
- [ ] Git repo initialized
- [ ] All project files are added
- [ ] Frontend folder is included
- [ ] Backend folder is included
- [ ] Commit created successfully
- [ ] GitHub remote is configured
- [ ] Push completed successfully

---

## Step 2: Deploy the frontend on Vercel

### Goal
Deploy the public frontend to Vercel and confirm the public URL works.

### Instructions
1. Open Vercel.
2. Click “New Project”.
3. Choose the GitHub repository that contains DineAtlas.
4. Select the app root as `frontend`.
5. Ensure Vercel recognizes the project as a Next.js app.
6. Add environment variables:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_SITE_NAME=DineAtlas
```

7. Click “Deploy”.
8. Wait for the build to finish.
9. Copy the generated frontend URL.

Example:
```text
https://dineatlas.vercel.app
```

### Vercel frontend verification checklist
- [ ] GitHub repo imported successfully
- [ ] Root directory set to `frontend`
- [ ] Next.js framework detected
- [ ] Build started without errors
- [ ] Environment variables saved correctly
- [ ] Deployment completed successfully
- [ ] Public frontend URL is displayed
- [ ] Frontend loading page renders without login
- [ ] Homepage loads and shows restaurant content
- [ ] Search input appears and works
- [ ] Prayer-time widget appears
- [ ] Map link/page loads
- [ ] No fatal console errors appear in browser

### Frontend validation checks
Open the deployed frontend URL and verify:
- [ ] Homepage loads
- [ ] No login prompt blocks browsing
- [ ] Restaurant cards render
- [ ] Search works
- [ ] Filters work
- [ ] Offers render
- [ ] Nearby location button works when allowed
- [ ] Prayer-time widget shows data
- [ ] Navigation to Map page works

### Common Vercel issues
- [ ] Wrong root directory selected
- [ ] Missing `NEXT_PUBLIC_API_URL`
- [ ] Build fails because Next.js was not detected
- [ ] Missing map token
- [ ] Frontend points to an incorrect backend URL

---

## Step 3: Deploy the backend on Render

### Goal
Deploy the Node.js/Express backend to Render and connect it to the frontend.

### Instructions
1. Open Render.
2. Click “New +” and then “Web Service”.
3. Connect the same GitHub repository.
4. Set the service root to `backend`.
5. Set the start command:

```bash
node index.js
```

6. Add the backend environment variables:

```env
PORT=4000
NODE_ENV=production
SESSION_SECRET=your-long-random-secret
FRONTEND_URL=https://your-frontend-domain.vercel.app
CORS_ORIGIN=https://your-frontend-domain.vercel.app
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
APPLE_CLIENT_ID=
APPLE_TEAM_ID=
APPLE_KEY_ID=
```

7. Click “Create Web Service”.
8. Wait for Render to build and start the service.
9. Copy the live backend URL.

Example:
```text
https://dineatlas-api.onrender.com
```

### Render backend verification checklist
- [ ] Repository connected to Render
- [ ] Root directory set to `backend`
- [ ] Start command set to `node index.js`
- [ ] Environment variables added
- [ ] Build completed successfully
- [ ] Service started successfully
- [ ] Public backend URL generated
- [ ] Backend responds to requests over HTTPS
- [ ] Health endpoint returns success
- [ ] CORS accepts the frontend domain
- [ ] No unexpected startup errors in Render logs

### Backend health validation
Open the backend URL and verify:
- [ ] `https://your-backend-url.onrender.com/api/health` returns a successful response
- [ ] Response includes status `ok`
- [ ] Public APIs respond without login

Example check:
```text
GET https://your-backend-url.onrender.com/api/health
```

Expected result:
```json
{
  "status": "ok",
  "service": "restaurant-api"
}
```

### Backend API verification checklist
- [ ] GET `/api/health` works
- [ ] GET `/api/restaurants` works
- [ ] GET `/api/offers` works
- [ ] GET `/api/prayer-times` works
- [ ] GET `/api/favorites` works for public visitors
- [ ] POST `/api/subscriptions` works without login
- [ ] No login requirement is enforced for public browsing endpoints
- [ ] Rate limiting is active
- [ ] Session handling works in production mode
- [ ] Secrets are not exposed in code or logs

---

## Step 4: Connect frontend to backend

### Goal
Update the frontend environment so it calls the live Render backend instead of localhost.

### Instructions
1. Open the Vercel project.
2. Go to Settings > Environment Variables.
3. Update:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```

4. Save the change.
5. Trigger a new deployment.

### Verification checklist
- [ ] Frontend now points to the live backend URL
- [ ] Redeploy finished successfully
- [ ] Homepage loads after redeploy
- [ ] Backend-connected API data loads in the UI
- [ ] Search and filters are working against live backend data

---

## Final launch verification checklist

### Public access
- [ ] Site loads without login
- [ ] Users can browse restaurants without account creation
- [ ] No authentication barrier blocks the main customer journey

### Functional checks
- [ ] Homepage loads
- [ ] Search works
- [ ] Restaurant filtering works
- [ ] Offers display
- [ ] Prayer times display
- [ ] Map page loads
- [ ] Nearby search works with browser location permission

### Deployment checks
- [ ] Frontend is live on Vercel
- [ ] Backend is live on Render
- [ ] Frontend environment points to live backend
- [ ] HTTPS is enabled on both public URLs
- [ ] CORS is configured correctly
- [ ] No secrets are exposed in source code

### Production readiness signoff
- [ ] Public site is accessible to anyone without login
- [ ] Product owner approves the public experience
- [ ] QA signs off on non-prod and preview validation
- [ ] Launch approved

---

## Recommended final launch status
Once the frontend is on Vercel, the backend is on Render, and both are connected successfully, the DineAtlas public website is ready for launch.

Suggested public architecture:
- Frontend: Vercel
- Backend: Render
- Domain: custom domain or Vercel domain if used initially
- Access model: public and no-login
