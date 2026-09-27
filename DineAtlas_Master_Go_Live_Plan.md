# DineAtlas Master Go-Live Plan

## 1. Product summary
DineAtlas is a public restaurant discovery website that helps users find food and offers globally, with a Singapore-first local experience and a prayer-time feature for Muslim users. The main requirement is that the site is public and accessible without login.

## 2. Brand and positioning
- Brand name: DineAtlas
- Slogan: “Find the right meal, wherever you are”
- Core value: global dining discovery with local relevance
- Product model: public website, no login required

## 3. Business goals
- Help users find restaurants nearby or in a selected city/country
- Show restaurant offers and promotions
- Support halal and non-halal discovery filters
- Show next prayer time and full daily prayer schedule
- Offer a clean and premium public-facing experience

## 4. Core functional scope for v1
- Public homepage
- Restaurant browsing experience
- Search and filtering
- Map view
- Regional and city awareness
- Offer and deals display
- Prayer-time widget
- Full prayer schedule view
- No-login public access

## 5. Architecture recommendation
### Frontend
- Vercel
- Next.js

### Backend
- Render
- Express

### Data
- PostgreSQL for restaurant and offer metadata
- Optional Elasticsearch for search scalability

## 6. Public access rule
The application must be accessible without authentication. Users should not be required to sign up or log in for basic discovery and browsing.

## 7. Required environment variables

### Frontend
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_SITE_NAME=DineAtlas
```

### Backend
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

## 8. Deployment steps

### Step 1: Push code to GitHub
- Ensure latest code is committed
- Push the repo to GitHub

### Step 2: Deploy the frontend to Vercel
1. Log into Vercel
2. Create a new project
3. Import the GitHub repository
4. Set project root to `frontend/`
5. Add the frontend environment variables
6. Deploy
7. Copy the public frontend URL

### Step 3: Deploy the backend to Render
1. Log into Render
2. Create a Web Service
3. Import the GitHub repository
4. Set the root to `backend/`
5. Use start command: `node index.js`
6. Add backend environment variables
7. Deploy
8. Copy the public backend URL

### Step 4: Connect frontend to backend
- Set `NEXT_PUBLIC_API_URL` to the Render backend URL
- Redeploy frontend

### Step 5: Set custom domain
- Add domain in Vercel
- Configure DNS at the domain provider
- Add backend custom domain if required
- Wait for SSL certificate provisioning

## 9. Custom domain example
Recommended public URLs:
- Frontend: `https://www.dineatlas.com`
- Backend: `https://api.dineatlas.com`

## 10. Deploy validation checklist
- [ ] Frontend loads publicly
- [ ] Backend loads publicly
- [ ] No login required for browsing
- [ ] Restaurant listings render
- [ ] Offers are visible
- [ ] Search works
- [ ] Halal and non-halal filters work
- [ ] Prayer widget displays next prayer
- [ ] Prayer schedule loads
- [ ] Map view loads
- [ ] HTTPS is active
- [ ] CORS is configured correctly
- [ ] Production environment variables are set

## 11. Security and quality checklist
- [ ] Secrets are not stored in source code
- [ ] CORS is restricted to the production frontend origin
- [ ] Rate limiting is enabled for public APIs
- [ ] CSRF remains enabled for protected mutation routes
- [ ] SSL is active on all public routes
- [ ] App is tested for guest browsing flow

## 12. Launch sign-off checklist
- [ ] Technical validation complete
- [ ] Product owner sign-off received
- [ ] Public deployment passed validation
- [ ] Analytics and monitoring are ready
- [ ] Go-live approved

## 13. Final recommendation
Use Vercel + Render for the v1 public launch. This gives DineAtlas a fast, modern public launch path with no account gate and enough flexibility to scale in later phases.
