# Phase 2 — Public Restaurant Discovery Site

## Objective
Turn the application into a public-first restaurant discovery platform for Singapore users, with open access to restaurant listings and offers without login requirements.

## Product Scope
### Core user value
- find nearby restaurants quickly
- view restaurant details and offers
- browse by cuisine, location, and halal status
- use map-based discovery to explore nearby options
- subscribe to deals without an account

### Public access model
- the homepage is open to everyone
- no registration is required for primary browsing
- offers are visible to visitors without sign-in
- guest favorites and quick actions are supported locally

## Functional Requirements
### 1. Public home page
- landing page loads for anonymous users
- headline, offers, restaurant list, and search actions are visible immediately
- no login prompt in the main flow

### 2. Restaurant discovery
- list of restaurants displayed to public visitors
- supporting distance based on user location when geolocation is enabled
- map view for visual exploration of local dining options
- user can browse by cuisine, halal/non-halal, and neighborhood

### 3. Offer visibility
- restaurant promos and deals are visible without login
- offer cards show discount or special value
- offer subscriptions are allowed for public visitors

### 4. Guest behavior
- guest favorites are stored locally in browser storage
- anonymous visitors can add or remove favorites without a session
- UI remains functional even without a logged-in profile

### 5. Access and trust
- site content is public and discoverable
- public APIs remain accessible without authentication
- no forced account barrier for essential browsing tasks

## Technical Scope
### Frontend
- Next.js app for public browsing
- responsive layout
- multilingual support
- geolocation integration
- map-based restaurant exploration
- public offer cards and restaurant list

### Backend
- Express API serving restaurant and filter data publicly
- endpoint for offers and subscriptions without auth lock
- guest-safe favorite handling
- public search/filter API structure

### Data model
- restaurant record with id, name, cuisine, location, halal flag, coordinates
- offer record with restaurant, discount, headline, description
- guest local favorites not tied to a user profile

## Milestones
### Milestone 1: Public browsing foundation
- homepage open to all users
- restaurant cards render without login
- API health and restaurant listing available publicly

### Milestone 2: Location and map experience
- geolocation support for nearby discovery
- map markers show restaurants on a public map
- location-driven sorting and filtering available

### Milestone 3: Offer and subscription flow
- public offers are displayed
- anonymous users can subscribe via email
- public UX remains smooth and non-blocking

### Milestone 4: Hardening and deployment
- set production env values
- enable secured headers and proxy deployment
- configure public web hosting with HTTPS
- test anonymous access path and public API behavior

## Acceptance Criteria
- no login required to use the primary discovery flow
- restaurant details and offers are visible to all visitors
- geolocation features work for public users
- guest favorites and subscriptions do not block the experience
- site is suitable for public web access

## Risks to Watch
- public API exposure without auth needs rate limiting
- guest favorites must be clearly local-only and non-account-based
- public deployment must protect against abuse while keeping content open
- map and geolocation features must degrade gracefully when permissions are denied

## Definition of Done
The public restaurant discovery site is complete when a visitor can access the site, view offers, explore local restaurants, and interact with public browsing flows without needing to sign in or create an account.
