# Phase 2 Implementation Checklist

Date: 2026-09-27

## Goal

Upgrade the current SG Restaurants MVP to modern web standards and a better user experience while preserving the architecture developed in Phase 1.

---

## Core Requirements Checklist

### 1. Progressive Web App (PWA)
- [ ] Add manifest file
- [ ] Add app icons and splash screens
- [ ] Configure service worker / offline caching
- [ ] Add install prompt for supported browsers
- [ ] Provide offline fallback page
- [ ] Validate on mobile devices

### 2. Geolocation API Integration
- [ ] Request user geolocation permission
- [ ] Detect current location safely
- [ ] Calculate distance to restaurants
- [ ] Sort restaurants by proximity
- [ ] Add fallback for denied permissions
- [ ] Display distance in UI

### 3. Modern Frontend / SSR / SEO
- [ ] Continue with Next.js App Router
- [ ] Improve route-level metadata and structured data
- [ ] Ensure server-rendered pages for SEO
- [ ] Optimize image loading and lazy rendering
- [ ] Support responsive layouts across breakpoints

### 4. Scalable Backend + Database
- [ ] Keep Express.js backend structure
- [ ] Add PostgreSQL user and favorites schema
- [ ] Add offers and subscriptions tables
- [ ] Connect frontend to live API securely
- [ ] Add caching where needed for heavy queries

### 5. Accessibility (WCAG 2.1 AA)
- [ ] Use semantic HTML and accessible landmarks
- [ ] Ensure keyboard navigation for all flows
- [ ] Add visible focus states
- [ ] Set proper color contrast
- [ ] Add labels and descriptions for inputs
- [ ] Run Lighthouse and axe checks

### 6. User Accounts + Social Login
- [ ] Implement Google OAuth
- [ ] Implement Facebook OAuth
- [ ] Implement Apple Sign-In
- [ ] Add session handling and secure cookies
- [ ] Protect user-specific routes
- [ ] Add profile page and logout flow

### 7. Favorites and Offer Subscriptions
- [ ] Add favorite toggle UI
- [ ] Persist favorites in database
- [ ] Add saved favorites list page
- [ ] Create offer subscription schema
- [ ] Support user preference toggles
- [ ] Send or prepare opt-in flows for promotions

### 8. Analytics Tracking
- [ ] Add Plausible or GA tracking
- [ ] Track page views and route navigation
- [ ] Track search, filter, map, and conversion events
- [ ] Validate analytics events in production

### 9. Core Web Vitals and Performance
- [ ] Optimize initial page load
- [ ] Reduce layout shift and blocking scripts
- [ ] Use responsive images and lazy loading
- [ ] Minimize unnecessary re-renders
- [ ] Run Lighthouse on critical pages

### 10. Security and Input Validation
- [ ] Use HTTPS in prod
- [ ] Add Helmet / secure headers
- [ ] Apply CSRF protection to state-changing actions
- [ ] Validate all user inputs
- [ ] Add rate limiting
- [ ] Protect API from abuse and malformed requests

### 11. Multilingual Support
- [ ] Add English locale
- [ ] Add Mandarin locale
- [ ] Add Malay locale
- [ ] Add Tamil locale
- [ ] Support language switcher UI
- [ ] Localize dynamic restaurant and offer text

---

## Recommended Execution Order

1. PWA and mobile UX
2. Geolocation and distance sorting
3. Auth and user accounts
4. Favorites and subscriptions
5. Accessibility and i18n
6. Security and validation
7. Analytics and performance tuning
8. Final QA and deployment check

---

## Definition of Ready for Phase 2

- [ ] Phase 1 app is functional and stable
- [ ] Environment variables are defined for all external services
- [ ] Postgres and app secrets are available
- [ ] Real OAuth client credentials are configured
- [ ] Mapbox token and analytics domain are active
- [ ] Deployment environment is ready for HTTPS testing

---

## Definition of Done

- [ ] PWA is installed and works offline
- [ ] Nearby restaurant discovery works with device location
- [ ] Users can authenticate with social logins
- [ ] Favorites and subscriptions are persisted
- [ ] App is accessible and keyboard-friendly
- [ ] App supports EN, ZH, MS, and TA
- [ ] Analytics and performance targets are met
- [ ] Production security controls are active
- [ ] Final launch QA is signed off

---

## Notes

This checklist is intended as the implementation baseline for the next phase. It should be updated as each item is started and completed.
