# DineAtlas Vercel Deployment Guide

## Overview
This guide explains how to deploy the DineAtlas frontend to Vercel using the project flow shown in the screenshot.

This project is split into:
- Frontend: `frontend/`
- Backend: `backend/`

Recommended deployment model:
- Frontend: Vercel
- Backend: Render

The Vercel deployment should be for the frontend only. The backend should be deployed separately on Render.

---

## Screenshot reference
The screenshot shows the Vercel “New Project” flow:
- GitHub repo selected: `asareng2018-code/DineAtlas`
- Branch: `main`
- Team: `Asar`
- Project name: `dine-atlas`
- Framework detected: `Next.js`
- Repository contains both `backend` and `frontend`
- Vercel detects a multi-service repo, but for this app we should deploy only the frontend service

### Important note
The screenshot is a reference for how to start the Vercel import flow. It is not the final recommended architecture for DineAtlas.

For DineAtlas, the correct deployment model is:
- `frontend` on Vercel
- `backend` on Render

---

## Step 1: Open Vercel
Go to:

```text
https://vercel.com
```

Then click:

```text
Import Project
```

---

## Step 2: Select the GitHub repository
Choose the repo:

```text
asareng2018-code/DineAtlas
```

Select branch:

```text
main
```

---

## Step 3: Configure project details
Use the following values shown in the screenshot:

- Team: `Asar`
- Project Name: `dine-atlas`

---

## Step 4: Configure the app as frontend only
The repo contains both folders:
- `backend`
- `frontend`

For this app, do not deploy both services together in Vercel.

Instead:

1. Set the project root directory to:

```text
frontend
```

2. Keep the framework as:

```text
Next.js
```

3. Ignore the backend service row in the multi-service detection screen.

4. Do not configure `/api/*` rewrite rules to the backend in this Vercel project if the backend is being deployed to Render separately.

### Why
The public product requirement is a public frontend site with a separate backend API. Vercel is best used for the frontend, while Render is best used for the API.

---

## Step 5: Add environment variables in Vercel
Add these variables in the Vercel project settings:

```env
NEXT_PUBLIC_API_URL=https://dineatlas-api.onrender.com
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_SITE_NAME=DineAtlas
```

### Example values
If the backend URL is:

```text
https://dineatlas-api.onrender.com
```

then use:

```env
NEXT_PUBLIC_API_URL=https://dineatlas-api.onrender.com
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_SITE_NAME=DineAtlas
```

### Notes
- `NEXT_PUBLIC_API_URL` must point to the live Render backend URL, not `localhost`
- `NEXT_PUBLIC_MAPBOX_TOKEN` is required for map features
- `NEXT_PUBLIC_SITE_NAME` should remain `DineAtlas`

---

## Step 6: Deploy
Click the large button:

```text
Deploy
```

Vercel will build the frontend and return a public URL similar to:

```text
https://dine-atlas.vercel.app
```

---

## Step 7: Verify the frontend deployment
Open the generated Vercel URL and confirm:

- [ ] Homepage loads
- [ ] Public site loads without login
- [ ] Search works
- [ ] Offers show correctly
- [ ] Prayer times widget loads
- [ ] Nearby location button works
- [ ] Map page loads
- [ ] No critical UI or console errors appear

---

## Required backend deployment after frontend
After the frontend is live, deploy the backend on Render and update the Vercel variable:

```env
NEXT_PUBLIC_API_URL=https://your-render-backend-url.onrender.com
```

Example:

```env
NEXT_PUBLIC_API_URL=https://dineatlas-api.onrender.com
```

Then redeploy the Vercel frontend.

---

## Final recommended values for this project

### Vercel project values
- Team: `Asar`
- Project name: `dine-atlas`
- Framework: `Next.js`
- Root directory: `frontend`

### Frontend env vars
```env
NEXT_PUBLIC_API_URL=https://dineatlas-api.onrender.com
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_SITE_NAME=DineAtlas
```

### Backend env vars on Render
```env
PORT=4000
NODE_ENV=production
SESSION_SECRET=your-long-random-secret
FRONTEND_URL=https://dine-atlas.vercel.app
CORS_ORIGIN=https://dine-atlas.vercel.app
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
APPLE_CLIENT_ID=
APPLE_TEAM_ID=
APPLE_KEY_ID=
```

---

## Summary
The screenshot confirms the starting flow for Vercel import. The correct action for this application is to deploy only the `frontend` service on Vercel, set the root directory to `frontend`, and host the API separately on Render.

This is the recommended production architecture for DineAtlas.
