# DineAtlas Public Deployment Guide

## 1. Objective
This document explains how to prepare and launch the DineAtlas public site as a real internet-facing application.

## 2. Product requirement summary
- Public website, no login required
- Restaurant discovery globally
- Singapore-first experience when the user is in Singapore
- Halal and non-halal filtering
- Restaurant offers and deals
- Daily prayer time widget
- Map-based restaurant discovery

## 3. Recommended production architecture
### Frontend
- Platform: Vercel
- Framework: Next.js
- Purpose: public landing page, maps, discovery listings, filters

### Backend
- Platform: Render or Railway
- Framework: Express
- Purpose: public restaurant and prayer APIs

### Data layer
- PostgreSQL for restaurant and offer metadata
- Optional Elasticsearch for filtering and search scaling

## 4. Required environment variables
### Frontend
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token
NEXT_PUBLIC_SITE_NAME=DineAtlas
```

### Backend
```env
PORT=4000
NODE_ENV=production
SESSION_SECRET=replace-with-a-strong-random-secret
FRONTEND_URL=https://your-frontend-domain
CORS_ORIGIN=https://your-frontend-domain
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
APPLE_CLIENT_ID=
APPLE_TEAM_ID=
APPLE_KEY_ID=
```

## 5. Deployment steps
### Step 1: Push code to GitHub
- Commit all code changes
- Ensure backend and frontend folders are in the same repo or linked accordingly

### Step 2: Deploy frontend to Vercel
1. Sign in to Vercel
2. Import the repo
3. Set frontend app as the project root
4. Add environment variables
5. Deploy the project

### Step 3: Deploy backend to Render
1. Create a new Web Service in Render
2. Connect the repository
3. Select backend folder as the service root
4. Set the start command to `node index.js`
5. Add environment variables
6. Deploy the service

### Step 4: Configure production API URL
- Set the frontend `NEXT_PUBLIC_API_URL` to the Render backend URL
- Confirm the public backend is reachable via HTTPS

### Step 5: Configure CORS
- Allow only the production frontend origin
- Remove any localhost restrictions from production mode

### Step 6: Test live site
- Access the frontend URL in browser
- Confirm restaurant cards render
- Confirm filters work
- Confirm prayer times display for Singapore
- Confirm no login is required

## 6. Launch readiness checklist
- [ ] Site loads without login
- [ ] Restaurant list renders
- [ ] Nearby location works or falls back gracefully
- [ ] Filters work for halal and non-halal data
- [ ] Prayer-time card displays next prayer
- [ ] Full prayer schedule is visible
- [ ] Frontend and backend are live on HTTPS
- [ ] No private/admin login is required for normal users

## 7. Final recommendation
For a public, modern web product, Vercel + Render is the most practical deployment combination for DineAtlas in version 1. It keeps the app simple, fast, secure enough for public use, and easy to maintain as the product grows.
