# End User Usage Checklist

## Purpose
This checklist helps verify the restaurant discovery website works correctly from a public end-user perspective without requiring any login.

## Access and Launch
- [ ] Open the homepage in a browser
- [ ] Confirm the website loads without a sign-in prompt
- [ ] Confirm the homepage displays restaurant discovery content immediately
- [ ] Confirm the site is usable without creating an account

## Home Page Verification
- [ ] The hero section loads correctly
- [ ] Restaurant cards are visible on the landing page
- [ ] Offer section is visible and readable
- [ ] Navigation links are available
- [ ] Language selector works if supported

## Restaurant Discovery
- [ ] Restaurants display with name, cuisine, and location
- [ ] Restaurant list is readable and properly styled
- [ ] Halal and non-halal labels are shown correctly
- [ ] Restaurant cards look correct on mobile and desktop

## Nearby Search and Geolocation
- [ ] User can click the location button
- [ ] Browser location permission prompt appears if supported
- [ ] If permission is granted, nearby results update correctly
- [ ] If permission is denied, the app handles the error gracefully
- [ ] Distance values or nearby status appear when geolocation is available

## Map View
- [ ] Map page loads without login
- [ ] Map container renders successfully
- [ ] Restaurant markers appear on the map
- [ ] Use my location button works in the map view
- [ ] The page handles permission rejection without crashing

## Offer Usage
- [ ] Public offer cards are visible
- [ ] Offer titles and discount information are readable
- [ ] Offer section loads without login
- [ ] Users can subscribe to offer updates without account creation

## Guest Favorites
- [ ] Guest user can add a restaurant to favorites
- [ ] Favorite state is reflected visually
- [ ] User can remove a restaurant from favorites
- [ ] Favorite action remains working on refresh for the same browser

## Subscription Flow
- [ ] User can submit an email to receive offers
- [ ] Validation works for valid email input
- [ ] Invalid email shows an appropriate error
- [ ] Success message appears after a successful subscription

## Accessibility and UX
- [ ] Buttons are keyboard focusable
- [ ] Focus states are visible
- [ ] Page can be navigated without a mouse
- [ ] Text remains readable and well contrasted
- [ ] The app works on mobile and tablet layouts

## Error Handling
- [ ] API fallback state appears gracefully if the backend is unavailable
- [ ] Broken or missing data does not crash the page
- [ ] Empty data states are handled clearly
- [ ] Browser console shows no blocking errors during normal usage

## Final Sign-off
- [ ] Homepage is usable without login
- [ ] Restaurant discovery flows work for public users
- [ ] Offer content is visible and accessible
- [ ] No critical issue blocks the public use case
- [ ] The site is ready for public demo use
