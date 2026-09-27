# DineAtlas Production Launch Checklist

## 1. Product readiness
- [ ] Product name confirmed as DineAtlas
- [ ] Slogan confirmed: “Find the right meal, wherever you are”
- [ ] Public website requirement confirmed: no login required
- [ ] Global discovery model confirmed
- [ ] Singapore-first behavior confirmed for local users
- [ ] Prayer-time feature included in public flow

## 2. Frontend readiness
- [ ] Homepage is live and public
- [ ] Restaurant listings render correctly
- [ ] Search works for restaurant names, cities, and cuisines
- [ ] Halal and non-halal filters work
- [ ] Nearby / location detection works or degrades gracefully
- [ ] Map page loads and renders markers
- [ ] Offer cards are visible
- [ ] Prayer-time widget is visible
- [ ] Full prayer schedule is accessible
- [ ] Mobile responsiveness is confirmed
- [ ] Color scheme and brand feel match DineAtlas

## 3. Backend readiness
- [ ] Backend is deployed publicly
- [ ] `/api/health` works
- [ ] `/api/restaurants` works
- [ ] `/api/offers` works
- [ ] `/api/prayer-times` works
- [ ] `/api/filters` works
- [ ] CORS allows the production frontend domain
- [ ] Rate limiting is enabled
- [ ] Session and security settings are valid for production

## 4. Public access readiness
- [ ] No login required for guest browsing
- [ ] Public visitor can browse restaurants without account creation
- [ ] Users can view deals and offers without login
- [ ] Prayer times are available to all visitors
- [ ] The site works with real public internet access

## 5. Security and production checks
- [ ] HTTPS enabled on frontend and backend
- [ ] Secrets stored in environment variables
- [ ] No sensitive credentials in source code
- [ ] CORS restricted to the correct public origin
- [ ] Rate limiting active
- [ ] CSRF protections remain active for protected endpoints

## 6. Domain and DNS checks
- [ ] Custom frontend domain configured
- [ ] Custom backend domain configured if used
- [ ] DNS records are correct
- [ ] SSL certificate is active
- [ ] Domain redirects are working properly

## 7. Final go-live checklist
- [ ] Frontend deployed and public
- [ ] Backend deployed and public
- [ ] Production environment variables are set
- [ ] API URL is correct in frontend
- [ ] Public website works without login
- [ ] Prayer-time feature works
- [ ] Search and filters work
- [ ] Map works
- [ ] Launch team has tested the public site end-to-end

## 8. Launch sign-off
- [ ] Product owner sign-off received
- [ ] Technical validation complete
- [ ] Public launch approved
- [ ] Monitoring and fallback plan prepared

## 9. Final recommendation
Launch DineAtlas v1 only after the above public access, data, and security checks are complete. This ensures a clean public release and a good user experience for restaurant discovery and prayer-time access.
