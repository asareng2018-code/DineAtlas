# DineAtlas

DineAtlas is a public restaurant discovery platform for finding dining options worldwide, with a location-aware Singapore-first experience and a public prayer-time widget. The site is designed for public access without login, allowing users to browse restaurants, check offers, search by filter, and see daily prayer timings.

## Brand
- Name: DineAtlas
- Slogan: Find the right meal, wherever you are
-
## Core public product goals
- No login required for browsing
- Restaurant discovery by city, country, and current location
- Halal and non-halal filtering
- Restaurant offers and local deals
- Prayer time widget for Muslim-friendly user needs
- Global coverage with Singapore-focused prioritization

## Local development

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend:

```bash
cd backend
npm install
npm run dev
```

Access locally:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

## Public production deployment recommendation

For a public website, use:
- Frontend: Vercel
- Backend: Render or Railway
- Domain: custom public domain such as dineatlas.com

### Recommended frontend env vars
```env
NEXT_PUBLIC_API_URL=https://your-backend-url
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token
NEXT_PUBLIC_SITE_NAME=DineAtlas
```

### Recommended backend env vars
```env
PORT=4000
NODE_ENV=production
SESSION_SECRET=your-strong-session-secret
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

## Production checklist

Before launch, confirm:
- The site is publicly accessible without login
- All API routes are public and safe for guest browsing
- CORS allows the production frontend domain only
- HTTPS is enabled on all live endpoints
- Mapbox and prayer-time services are configured with real keys
- Payment, admin, and private features remain separate
- Rate limits and headers are configured for production
- Geo and prayer logic is tested for Singapore and global cities

## Docker deployment

```bash
docker-compose up --build -d
```

Then open:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

## Launch readiness summary

DineAtlas v1 is a public website intended to help users discover global dining options and find practical local information such as prayer timings without requiring sign-in. The architecture should remain public-first, location-aware, and optimization-friendly for both mobile and desktop users.
