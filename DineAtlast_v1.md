# DineAtlas v1 - Updated Product Requirement

## 1. Product Overview
DineAtlas is a global public restaurant discovery platform designed for users who want to find suitable dining options anywhere in the world. The platform helps users discover restaurants, compare offers, filter by dietary and lifestyle needs, and access useful local information such as prayer times.

The application is designed as a public website with no login requirement for general browsing. It is accessible to all users without account creation.

## 2. Brand Identity
- Brand Name: DineAtlas
- Slogan: "Find the right meal, wherever you are"
- Positioning: a premium global dining discovery platform that combines restaurant listings, deals, local recommendations, and practical lifestyle-aware information.

## 3. Core Business Goal
To help people discover restaurants and food offers in their current location or in any selected city/country, while supporting Muslim-friendly needs and local lifestyle preferences.

## 4. Primary User Need
Users want a simple way to:
- find nearby restaurants
- compare offers and deals
- filter by halal, non-halal, vegetarian, family-friendly, or other preferences
- view local restaurant listings based on their current location
- find daily prayer timings for their city
- access useful local information without creating an account

## 5. Public Website Requirement
The website must be completely public and accessible without login.

Requirements:
- no user authentication required for browsing restaurant offers
- no account creation required for general use
- guest users can browse, filter, search, and view restaurant details
- favorites and saved items can be stored in browser local storage for anonymous users
- public access must be suitable for a global audience

## 6. Target Audience
- Global travelers and locals
- Muslim users seeking halal or Muslim-friendly dining options
- Users looking for restaurant offers and nearby food choices
- People who want local dining recommendations by city or country
- Users seeking practical information such as daily prayer times

## 7. Core Features

### 7.1 Global Restaurant Discovery
- Search restaurants by city, country, or region
- Show restaurants relevant to the visitor's current location
- Support global coverage with a local-first experience when applicable
- Offer map-based browsing and list-based browsing

### 7.2 Restaurant Offers and Promotions
- Show restaurant deals and offers
- Highlight limited-time promotions and dining discounts
- Support location-based and category-based offer filtering

### 7.3 Filters and Search
- City filter
- Country filter
- Halal / Non-Halal filter
- Vegetarian / Vegan filter
- Family-friendly filter
- Budget filter
- Cuisine filter
- Rating filter
- Opening hours filter

### 7.4 Locality and Region Awareness
- Detect user location automatically
- For users in Singapore, prioritize Singapore restaurant offers
- For users outside Singapore, show nearest city/country results or global listings
- Allow user-selected region override

### 7.5 Prayer Time Integration
- Show the next prayer time for the user’s city or selected location
- Allow users to click the prayer icon/card to view all 5 daily prayers
- Provide daily timings for:
  - Fajr
  - Dhuhr
  - Asr
  - Maghrib
  - Isha
- Support city-based and regional prayer calculation
- Use a location-aware prayer time provider or calculation engine

### 7.6 Muslim-Friendly Discovery Features
- Tag restaurants as halal or Muslim-friendly
- Highlight offerings that support Muslim diners
- Display relevant filters and labels for diet and lifestyle suitability
- Provide prayer time visibility as part of the broader local experience

## 8. Non-Functional Requirements

### 8.1 Performance
- Fast page load for public users
- Quick search and filter response
- Efficient map rendering and restaurant list loading

### 8.2 UX/UI
- Clean, modern premium interface
- Mobile-first responsive layout
- Easy-to-read cards and filtering controls
- Clear local and global restaurant results

### 8.3 Accessibility
- Keyboard-friendly navigation
- Readable typography and contrast
- Clear call-to-action buttons
- Accessibility support for screen readers

### 8.4 Security
- Public site must avoid unnecessary authentication barriers
- Use secure public API endpoints
- Protect admin or internal features separately if introduced later
- Validate all external data sources and API usage

## 9. Detailed Implementation Steps to Achieve the v1 Requirement

This section explains the exact work needed to deliver the DineAtlas v1 scope successfully.

### Phase 1: Product Foundation and Branding
1. Finalize the brand and web identity.
   - Set brand name as DineAtlas.
   - Use slogan: "Find the right meal, wherever you are".
   - Define the hero message and primary CTAs.
2. Prepare the public website direction.
   - Confirm the site is public and no-login by default.
   - Confirm that all browsing features are accessible to guests.
3. Define the homepage narrative.
   - Hero section with search and location detection.
   - Add quick filters such as halal, nearby, offers, and city selection.
   - Add a visible prayer-time card in the hero or top navigation.

### Phase 2: Frontend Architecture and Public Experience
1. Set up the frontend application.
   - Use Next.js for public-facing pages and rendering.
   - Create a responsive layout with mobile-first design.
2. Build the homepage.
   - Add global restaurant discovery hero.
   - Include search bar, city selector, and location button.
   - Add filter chips: halal, non-halal, family-friendly, budget, cuisine, vegetarian.
3. Build the restaurants listing page.
   - Show cards with restaurant name, cuisine, cuisine tags, offers, rating, and distance.
   - Display open/close status and offer badges.
4. Build the map page.
   - Show restaurant markers on a map.
   - Enable click-to-view details.
   - Show nearest restaurants around the visitor’s current coordinates.
5. Build the restaurant detail page.
   - Show overview, location, pricing, categories, offer details, user notes, and map location.
   - Include a quick “View on map” action.

### Phase 3: Search, Filters, and Discovery Logic
1. Implement region and location logic.
   - Detect browser geolocation when available.
   - If user is in Singapore, prioritize Singapore content.
   - If not, show nearest or selected city/country results.
2. Implement global search.
   - Search by restaurant name, city, cuisine, or area.
   - Include auto-suggest functionality if needed.
3. Implement filters.
   - Halal / non-halal
   - Vegetarian / vegan
   - Family-friendly
   - Price range
   - Cuisine
   - Distance radius
   - Open now
4.Implement ranking and sorting.
   - Sort by distance, popularity, rating, or offer priority.
   - Prioritize restaurants with active deals.

### Phase 4: Offer Management
1. Create a restaurant offers data model.
   - Fields: restaurant id, title, description, discount, validity, city, terms.
2. Display restaurant deals on cards and detail pages.
3. Add “Offer of the day” or featured section to homepage.
4. Support filtering by deal availability and active promotions.

### Phase 5: Prayer Time Feature
1. Integrate a prayer time service or calculation library.
   - Use a trusted API or an open-source calculation method.
   - Support city and coordinate-based lookup.
2. Build the next prayer widget.
   - Show the next prayer name and countdown.
   - Show local city name and date.
3. Build the full prayer schedule modal/page.
   - Fajr, Dhuhr, Asr, Maghrib, Isha.
   - Include local time formatting.
4. Connect prayer time to location context.
   - If user location is Singapore, display Singapore prayer times by default.
   - If user selects another city, show that city’s schedule.

### Phase 6: Public-First Access Model
1. Ensure all public listing pages are accessible without login.
2. Remove login barriers from the discovery flow.
3. Use browser localStorage for guest favorite or saved items when needed.
4. Avoid blocking public users behind account creation screens.
5. Confirm anonymous browsing is the default experience.

### Phase 7: Backend API and Data Layer
1. Build the public backend API.
   - restaurants endpoint
   - offers endpoint
   - filters endpoint
   - health endpoint
   - prayer times endpoint
2. Create API response structure.
   - restaurant id, name, city, country, coordinates, tags, offers, rating, distance
3. Implement safe public JSON responses.
4. Add CORS configuration for frontend host access.
5. Add rate limiting and basic security for public endpoints.

### Phase 8: Database / Search / Content Setup
1. Set up a database for restaurant records and offers.
2. Add schema for restaurants, offers, tags, and city mappings.
3. Store country, city, latitude, longitude, tags, and halal status.
4. Prepare datasets for Singapore and at least several major global cities.
5. Add search indexing support for filters and keyword lookup.

### Phase 9: User Experience and Polish
1. Create polished cards and spacing for the site.
2. Add premium colors and modern typography.
3. Add map and listing transitions.
4. Make the site responsive and test mobile browsing.
5. Improve empty states, no-results states, and loading states.

### Phase 10: QA, Testing, and Launch Readiness
1. Run end-to-end tests for homepage, listing, filters, map, and prayer widget.
2. Validate no-login flow for guest users.
3. Validate geolocation fallback when permission is denied.
4. Test Singapore-specific priority rules.
5. Validate filter combinations: halal + city + nearby + offers.
6. Validate prayer times against a known local source.
7. Check responsive design across desktop, tablet, and mobile.
8. Test API health, CORS, and production build.

### Phase 11: Deployment
1. Deploy frontend to a public hosting platform such as Vercel.
2. Deploy API to a public backend host such as Render, Railway, Azure, or similar.
3. Set live environment variables.
4. Update frontend API base URL to production backend URL.
5. Test public access on production domain.
6. Confirm HTTPS is active.
7. Validate all public pages and API routes work live.

## 10. Functional Scope for v1
This version focuses on public browsing and discovery without login.

Included in v1:
- landing page
- restaurant listing view
- restaurant offer cards
- search and filtering
- location-aware behavior
- map view
- next prayer time widget
- detailed prayer schedule view
- public website access without login
- guest-safe browsing experience

Not required in v1:
- user accounts
- social login
- personalized subscriptions
- admin dashboard
- payment integration

## 11. Acceptance Criteria for Each Feature

### Homepage
- Loads without login
- Shows a location-aware restaurant discovery experience
- Displays top offers or featured restaurants
- Shows prayer-time widget

### Restaurant Listing
- Displays cards with key information
- Supports city/country filters
- Supports halal and non-halal filters
- Supports sorting by popularity, distance, or rating

### Map View
- Shows restaurant markers
- Centers on user location or default city
- Allows restaurant click-through

### Prayer Time Widget
- Shows next prayer and countdown
- Opens details for all 5 daily prayers
- Uses local city schedule

### Public Access
- No login required for browsing
- Works without authentication
- Hosts public URL with HTTPS

## 12. Success Criteria
The project is considered successful when:
- a public user can open the site without login
- restaurant results load based on location or selected country/city
- halal and non-halal filters work correctly
- prayer time details are visible and usable
- the Singapore-specific experience works correctly for local users
- the site is visually modern, clear, and easy to use
- the public site is deployed and accessible on the internet

## 13. Deployment Model
The product should be deployed as a public website using cloud hosting infrastructure.

Recommended deployment structure:
- Frontend: Vercel or similar modern static/react hosting
- Backend: Render / Railway / Azure / similar API host
- Public API endpoints accessible to website users
- HTTPS for all production traffic

## 14. Detailed Delivery Checklist

### Frontend Checklist
- [ ] Homepage created
- [ ] Restaurant listing page created
- [ ] Detail page created
- [ ] Map page created
- [ ] Search and filters implemented
- [ ] Location detection implemented
- [ ] Prayer widget added
- [ ] Mobile responsive layout implemented
- [ ] Public no-login flow enabled

### Backend Checklist
- [ ] Restaurant API created
- [ ] Offers API created
- [ ] Filters API created
- [ ] Prayer times API integrated
- [ ] Health endpoint implemented
- [ ] CORS configured
- [ ] Basic rate limiting enabled
- [ ] Production env variables configured

### Data Checklist
- [ ] Restaurant data seeded
- [ ] Offer data seeded
- [ ] City and country mapping created
- [ ] Halal status included
- [ ] Coordinates included
- [ ] Global and Singapore data coverage prepared

### QA Checklist
- [ ] Guest users can browse without login
- [ ] Filter combinations work
- [ ] Singapore priortization works
- [ ] Map view works
- [ ] Prayer times display correctly
- [ ] Production deployment works

## 15. Example Public Site Vision
DineAtlas is a global dining discovery website where users can:
- Find local restaurants anywhere
- Search by cuisine, budget, and dietary preferences
- View restaurant offers and deals
- See next prayer timing for the selected city
- Browse a Singapore-focused experience when relevant
- Explore the world through food, without needing an account

## 16. Final Requirement Summary
DineAtlas v1 is a public, global, no-login restaurant discovery website that allows users to find dining options anywhere, with location-aware behavior, halal/non-halal filters, and a prayer time feature. The brand identity is DineAtlas with the slogan "Find the right meal, wherever you are".

This version is designed to be simple, public, useful, and internationally scalable while still excelling in Singapore-focused local dining discovery.

## 17. Practical Next Action
To move from requirement to build, the team should start with:
1. Frontend homepage and public layout
2. Restaurant list and filters
3. Geolocation and Singapore priority logic
4. API endpoints for restaurants and offers
5. Prayer time widget and schedule modal
6. QA and deployment to public hosting

Once all of the above are completed, the product will meet the DineAtlas v1 requirement and be ready for public launch.
The project is considered successful when:
- a public user can open the site without login
- restaurant results load based on location or selected country/city
- halal and non-halal filters work correctly
- prayer time details are visible and usable
- the Singapore-specific experience works correctly for local users
- the site is visually modern, clear, and easy to use

## 11. Deployment Model
The product should be deployed as a public website using cloud hosting infrastructure.

Recommended deployment structure:
- Frontend: Vercel or similar modern static/react hosting
- Backend: Render / Railway / Azure / similar API host
- Public API endpoints accessible to website users
- HTTPS for all production traffic

## 12. Example Public Site Vision
DineAtlas is a global dining discovery website where users can:
- Find local restaurants anywhere
- Search by cuisine, budget, and dietary preferences
- View restaurant offers and deals
- See next prayer timing for the selected city
- Browse a Singapore-focused experience when relevant
- Explore the world through food, without needing an account

## 13. Final Requirement Summary
DineAtlas v1 is a public, global, no-login restaurant discovery website that allows users to find dining options anywhere, with location-aware behavior, halal/non-halal filters, and a prayer time feature. The brand identity is DineAtlas with the slogan "Find the right meal, wherever you are".

This version is designed to be simple, public, useful, and internationally scalable while still excelling in Singapore-focused local dining discovery.
