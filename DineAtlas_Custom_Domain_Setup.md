# DineAtlas Custom Domain Setup Guide

## 1. Goal
Configure a custom domain so the public DineAtlas site is accessible through a branded URL instead of only a default hosting domain.

## 2. Recommended domains
Suggested public domain names:
- dineatlas.com
- www.dineatlas.com
- api.dineatlas.com

For the public website, use:
- `https://www.dineatlas.com` as the main frontend URL
- `https://api.dineatlas.com` as the backend URL

## 3. DNS setup
Set up the following DNS records in your domain provider.

### Frontend domain (Vercel)
Add these records:
- Type: A
- Name: `@`
- Value: Vercel IP address provided by Vercel

And/or:
- Type: CNAME
- Name: `www`
- Value: `cname.vercel-dns.com`

### Backend domain (Render)
If using a custom backend subdomain:
- Type: CNAME
- Name: `api`
- Value: `<your-render-service>.onrender.com`

## 4. Vercel custom domain steps
1. Open the Vercel dashboard
2. Select your frontend project
3. Open the “Domains” tab
4. Click “Add Domain”
5. Enter the custom domain, for example `dineatlas.com`
6. Add `www` if needed
7. Follow the DNS instructions from Vercel
8. Wait for SSL certificate provisioning to complete

## 5. Render custom domain steps
1. Open the Render dashboard
2. Open the backend service
3. Go to the “Environment” or “Settings” section
4. Add the custom domain for the backend if supported
5. Add the DNS record at your domain provider
6. Wait for SSL certificate to complete

## 6. Update environment variables after domain setup
### Frontend env
```env
NEXT_PUBLIC_API_URL=https://api.dineatlas.com
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_SITE_NAME=DineAtlas
```

### Backend env
```env
FRONTEND_URL=https://www.dineatlas.com
CORS_ORIGIN=https://www.dineatlas.com
```

## 7. Final domain validation checklist
- [ ] Frontend domain resolves correctly
- [ ] Backend domain resolves correctly
- [ ] HTTPS is active on both
- [ ] Frontend loads correctly on the custom domain
- [ ] Backend API responds on the custom domain
- [ ] CORS allows the custom frontend origin
- [ ] Public access works without login

## 8. Recommended final public URLs
- Frontend: `https://www.dineatlas.com`
- Backend: `https://api.dineatlas.com`

## 9. Final note
Once the custom domains are configured and SSL is active, the DineAtlas public site is ready for real public launch.
