# DineAtlas Non-Prod Checklist

## Purpose
This checklist is used for testing the DineAtlas public restaurant discovery website before production launch. The goal is to verify that the site works as a public, no-login experience in a staging or local non-production environment.

## Environment URLs

### Local non-prod
- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- API health: http://localhost:4000/api/health

### Preview / staging (when configured)
- Frontend Preview: https://your-preview-frontend-url
- Backend Staging: https://your-preview-backend-url

## Public Access Validation
- [ ] Open the frontend in a browser without signing in
- [ ] Confirm the homepage loads successfully
- [ ] Confirm no login prompt blocks the main browsing flow
- [ ] Confirm a public visitor can browse restaurant listings without account creation
- [ ] Confirm the site is clearly public-first and no-login by design

## Restaurant Discovery Validation
- [ ] Restaurant cards render correctly
- [ ] Search by restaurant name works
- [ ] Search by cuisine works
- [ ] Search by location works
- [ ] Halal filter works
- [ ] Non-halal filter works
- [ ] “All” filter resets correctly
- [ ] Offer-related filtering works when offers are present

## Location and Nearby Features
- [ ] “Use my location” button is visible and clickable
- [ ] Browser geolocation works when permission is granted
- [ ] Nearby restaurant results update based on user location
- [ ] Distance values are displayed correctly when available
- [ ] If geolocation is denied, the app handles the failure gracefully

## Prayer Time Validation
- [ ] Prayer time widget loads
- [ ] City name shows correctly
- [ ] Prayer schedule is visible
- [ ] Next prayer details show a valid time
- [ ] Data appears for Singapore and other supported cities

## Offer and Subscription Validation
- [ ] Offer cards load successfully
- [ ] Offer titles and descriptions appear correctly
- [ ] Discount values are displayed correctly
- [ ] Public subscription flow works without login
- [ ] Email submission for subscription is accepted in non-prod
- [ ] Invalid emails are rejected with a proper validation message

## API Validation
- [ ] GET /api/health returns status ok
- [ ] GET /api/restaurants returns restaurant data
- [ ] GET /api/offers returns offer data
- [ ] GET /api/prayer-times returns valid schedule data
- [ ] GET /api/favorites works for guest/public users
- [ ] POST /api/subscriptions accepts public visitors
- [ ] No login requirement is enforced for the main public APIs

## Browser and UX Checks
- [ ] Layout loads correctly on desktop
- [ ] Layout loads correctly on mobile
- [ ] Buttons and filters are responsive
- [ ] No broken navigation between pages
- [ ] Map page loads without login
- [ ] Page is understandable without authentication
- [ ] No confusing login-required messaging appears on public pages

## Console and Error Checks
- [ ] Browser console is free of critical errors
- [ ] No API call fails unexpectedly during browsing
- [ ] No redirect loops or auth gate issues appear
- [ ] No 401/403 errors for public browsing actions
- [ ] No missing asset or script issue appears on the homepage

## Security and Non-Prod Safety
- [ ] Public preview uses non-sensitive test data where possible
- [ ] Real production keys are not committed to the repo
- [ ] Secrets are stored only in environment variables
- [ ] Auth flows remain optional and not required for public browsing
- [ ] CORS is configured to allow only intended domains
- [ ] Rate limiting is active for high-traffic API routes

## Sign-off
- [ ] Product owner confirms the public no-login experience is acceptable
- [ ] QA confirms all key user journeys work in non-prod
- [ ] Engineering confirms the app is ready for preview or production deployment
- [ ] Launch ready decision: Yes / No
- [ ] Notes:

## Recommended Tester Notes
Record any defects or observations here:

- Issue:
- URL:
- Steps to reproduce:
- Expected behavior:
- Actual behavior:
- Severity:
- Assigned to:
