# DineAtlas Production Runbook

## 1. Purpose
This runbook describes the exact production setup process for launching the DineAtlas public restaurant discovery website.

## 2. Production architecture
- Frontend: Vercel
- Backend: Render
- Domain: custom public domain
- Public access: no login required

## 3. Recommended project structure
- Frontend app in `frontend/`
- Backend API in `backend/`
- Shared documentation in project root

## 4. Environment variables

### Frontend (`Vercel`)
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.onrender.com
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_SITE_NAME=DineAtlas
```

### Backend (`Render`)
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

## 5. Deployment steps

### Step 1: Set up GitHub repository
- Commit all required changes
- Push code to a GitHub repository

### Step 2: Deploy the frontend to Vercel
1. Open Vercel dashboard
2. Click New Project
3. Import repository
4. Set project root to `frontend/`
5. Add environment variables
6. Deploy the project
7. Copy the live frontend URL

### Step 3: Deploy the backend to Render
1. Open Render dashboard
2. Click New Web Service
3. Import the GitHub repo
4. Set the service root to `backend/`
5. Set start command to `node index.js`
6. Add backend environment variables
7. Deploy
8. Copy the live backend URL

### Step 4: Connect frontend to backend
1. Open Vercel project settings
2. Update `NEXT_PUBLIC_API_URL` to the Render backend URL
3. Redeploy the frontend

### Step 5: Validate public access
Open the frontend URL and confirm:
- site loads without login
- restaurant list loads
- filters work
- prayer time widget shows data
- map page loads
- public users can browse without account creation

## 6. Security checklist
- [ ] HTTPS enabled on all public URLs
- [ ] CORS restricted to production frontend origin
- [ ] No public login is required for discovery
- [ ] Secrets stored in environment variables, not in source code
- [ ] Rate limiting enabled for API routes
- [ ] CSRF checks remain configured for mutating endpoints

## 7. Post-deployment validation
- [ ] Search works
- [ ] Halal and non-halal filters work
- [ ] Offer cards display properly
- [ ] Prayer times are visible
- [ ] Map displays restaurant markers
- [ ] Singapore priority logic works
- [ ] Public site is accessible to everyone without signup

## 8. Production launch recommendation
Use Vercel for the public frontend and Render for the backend. This is the best low-complexity public launch setup for the DineAtlas v1 product.
