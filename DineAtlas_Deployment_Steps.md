# DineAtlas Deployment Steps

## 1. Goal
Deploy DineAtlas as a public website with no login requirement and make it accessible to internet users.

## 2. Recommended public architecture
- Frontend: Vercel
- Backend: Render
- Public domain: custom domain such as `dineatlas.com`
- Access type: public and no-login

## 3. Step-by-step deployment flow

### Step 1: Prepare the repo
- Push the current project to GitHub
- Confirm both the frontend and backend folders are included
- Make sure the latest DineAtlas changes are committed

### Step 2: Deploy the frontend on Vercel
1. Open Vercel
2. Click “New Project”
3. Import the GitHub repository
4. Set the app root to the `frontend` folder
5. Ensures the framework is recognized as Next.js
6. Add these environment variables:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_SITE_NAME=DineAtlas
```

7. Click Deploy
8. Wait until Vercel provides the frontend public URL

Example:
```text
https://dineatlas.vercel.app
```

### Step 3: Deploy the backend on Render
1. Open Render
2. Click “New +”
3. Choose “Web Service”
4. Connect the GitHub repo
5. Set the service root to the `backend` folder
6. Use the start command:

```bash
node index.js
```

7. Add the following environment variables:

```env
PORT=4000
NODE_ENV=production
SESSION_SECRET=replace_with_a_strong_random_secret
FRONTEND_URL=https://your-frontend-url.vercel.app
CORS_ORIGIN=https://your-frontend-url.vercel.app
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
APPLE_CLIENT_ID=
APPLE_TEAM_ID=
APPLE_KEY_ID=
```

8. Click Create Web Service
9. Wait until the backend deployment is complete

Example public backend URL:
```text
https://dineatlas-api.onrender.com
```

### Step 4: Connect frontend to backend
1. In Vercel project settings, edit environment variables
2. Replace the backend URL with the Render backend URL
3. Save changes
4. Redeploy the frontend

Example:
```env
NEXT_PUBLIC_API_URL=https://dineatlas-api.onrender.com
```

### Step 5: Check public access
Open the frontend URL in a browser and confirm the following:
- the homepage loads
- there is no login requirement for browsing
- restaurant cards display
- filters work
- the prayer-time widget shows next prayer details
- the map page loads
- the app works on HTTPS

## 4. Production validation checklist
- [ ] No login required to browse restaurants
- [ ] Frontend deployed successfully
- [ ] Backend deployed successfully
- [ ] APIs respond on the production URL
- [ ] Search and filter are working
- [ ] Halal and non-halal filters work
- [ ] Prayer times display correctly
- [ ] Singapore region priority is working
- [ ] HTTPS is enabled
- [ ] CORS only allows the production frontend

## 5. Recommended final public setup
For the public site, use:
- Frontend: Vercel
- Backend: Render
- Domain: `dineatlas.com` or another custom domain

## 6. Final note
This is the simplest and most reliable public launch path for DineAtlas v1. It keeps the site public, fast, and easy to maintain.
