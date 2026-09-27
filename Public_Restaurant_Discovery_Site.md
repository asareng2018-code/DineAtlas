# Public Restaurant Discovery Site

## Overview
This project is designed as a public restaurant discovery website for Singapore users. The core experience is open to everyone without login, so visitors can browse restaurant listings, view offers, search by area, and use location-aware discovery without creating an account.

## Product Goal
Create a public-facing restaurant discovery experience that helps users:
- browse nearby restaurants
- discover halal and non-halal dining options
- view location-based recommendations
- read current offers and promotions
- subscribe to updates without needing an account

## Core User Experience
### Public browsing
- Visitors can open the site without signing in
- Restaurants are visible immediately on the homepage
- Offer cards are available to all users
- Location services can be used without account creation

### Restaurant discovery features
- list view of restaurants
- distance and nearby search support
- map view for location-based exploration
- cuisine and location filtering structure
- public restaurant information cards

### Offers and subscriptions
- public offers are visible without login
- users can submit email subscription without account creation
- optional guest favorites are saved locally in browser storage

## UX Principles
- no forced login for basic browsing
- mobile-first and lightweight landing experience
- location-aware content available to all visitors
- simple CTA flow for offers and promotions
- accessible and multilingual-friendly layout

## Current Implementation Status
### Completed
- public homepage and restaurant discovery flow
- location-aware restaurant listing support
- map page for nearby restaurant markers
- offer listing UI
- guest-friendly favorites using browser local storage
- public subscription flow without authentication
- multilingual UI support
- public API routes for restaurant and offer listing

### Not Required for Public Access
- social login requirement is optional, not mandatory
- account-based profile is not required for the main experience
- user sign-in is not needed for discovery and offer browsing

## Public Access Requirements
- No login gate for the main site experience
- Public APIs should remain readable for anonymous users
- Restaurant offers and listing data should be open to all visitors
- Guest interactions should be graceful and should not fail for anonymous users

## Future Enhancements
- real restaurant data source from PostgreSQL
- elastic search for advanced filters and ranking
- managed map and search infrastructure
- real email marketing service for subscriptions
- optional premium or saved-user features later

## Business Value
This public-first approach broadens reach, improves discoverability, and makes the restaurant catalog useful for all visitors without friction. It is better suited for a public listing site than a private app experience.

## Acceptance Criteria
- the website loads without login
- visitors can browse restaurants without authentication
- offer info is readable by anyone
- location-aware discovery works for anonymous users
- public subscription and favorite UX does not block access
- no critical workflow requires sign-in for the primary product experience
