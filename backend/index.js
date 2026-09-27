const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const csrf = require('csurf');
const session = require('express-session');
const { body, validationResult } = require('express-validator');
const passport = require('./auth');
const { calculateDistanceKm } = require('./utils/location');

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 4000;
const csrfProtection = csrf({ cookie: true });
const isProduction = process.env.NODE_ENV === 'production';

app.set('trust proxy', 1);
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false,
}));
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'restaurant-session-secret',
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

const rateLimitStore = new Map();
app.use('/api', (req, res, next) => {
  const now = Date.now();
  const ip = req.ip || req.socket?.remoteAddress || 'unknown';
  const windowMs = 15 * 60 * 1000;
  const maxRequests = 200;
  const key = `rate-limit:${ip}`;

  const record = rateLimitStore.get(key) || { count: 0, resetAt: now + windowMs };

  if (now > record.resetAt) {
    record.count = 0;
    record.resetAt = now + windowMs;
  }

  if (record.count >= maxRequests) {
    return res.status(429).json({ message: 'Too many requests, please try again later.' });
  }

  record.count += 1;
  rateLimitStore.set(key, record);
  return next();
});

app.use((req, res, next) => {
  if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') {
    return next();
  }

  if (req.path.startsWith('/api/auth') || req.path === '/api/health') {
    return next();
  }

  return csrfProtection(req, res, next);
});

const sampleRestaurants = [
  {
    id: 1,
    name: 'Saffron Bites',
    cuisine: 'Indian',
    halal: true,
    location: 'Downtown',
    coordinates: { lat: 1.3521, lng: 103.8198 },
  },
  {
    id: 2,
    name: 'Harbor Grill',
    cuisine: 'Seafood',
    halal: true,
    location: 'Harborfront',
    coordinates: { lat: 1.2903, lng: 103.8519 },
  },
  {
    id: 3,
    name: 'Garden Table',
    cuisine: 'Mediterranean',
    halal: false,
    location: 'Old Town',
    coordinates: { lat: 1.3344, lng: 103.742 },
  },
];

const authProviders = [
  {
    id: 'google',
    name: 'Google',
    enabled: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
  },
  {
    id: 'facebook',
    name: 'Facebook',
    enabled: Boolean(process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET),
  },
  {
    id: 'apple',
    name: 'Apple',
    enabled: Boolean(process.env.APPLE_CLIENT_ID && process.env.APPLE_TEAM_ID && process.env.APPLE_KEY_ID),
  },
];

const users = [];
const favorites = [];
const subscriptions = [];
const sampleOffers = [
  {
    id: 1,
    restaurantId: 1,
    title: 'Lunch Special',
    description: 'Get 15% off selected Indian dishes.',
    discount: 15,
  },
  {
    id: 2,
    restaurantId: 2,
    title: 'Seafood Set',
    description: 'Free dessert with every seafood platter.',
    discount: 10,
  },
];

const prayerSchedules = {
  Singapore: [
    { name: 'Fajr', time: '5:12 AM' },
    { name: 'Dhuhr', time: '1:03 PM' },
    { name: 'Asr', time: '4:21 PM' },
    { name: 'Maghrib', time: '7:13 PM' },
    { name: 'Isha', time: '8:35 PM' },
  ],
  Kuala Lumpur: [
    { name: 'Fajr', time: '5:33 AM' },
    { name: 'Dhuhr', time: '1:18 PM' },
    { name: 'Asr', time: '4:19 PM' },
    { name: 'Maghrib', time: '7:18 PM' },
    { name: 'Isha', time: '8:40 PM' },
  ],
  Dubai: [
    { name: 'Fajr', time: '4:57 AM' },
    { name: 'Dhuhr', time: '12:55 PM' },
    { name: 'Asr', time: '3:40 PM' },
    { name: 'Maghrib', time: '6:53 PM' },
    { name: 'Isha', time: '8:12 PM' },
  ],
};

const filters = {
  cuisines: ['Indian', 'Seafood', 'Mediterranean'],
  locations: ['Downtown', 'Harborfront', 'Old Town'],
  halal: [true, false],
};

app.get('/', (req, res) => {
  res.json({ message: 'API running' });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'restaurant-api',
    timestamp: new Date().toISOString(),
  });
});

app.get('/restaurants', (req, res) => {
  res.json({
    count: sampleRestaurants.length,
    restaurants: sampleRestaurants,
  });
});

app.get('/api/restaurants', (req, res) => {
  const lat = Number(req.query.lat);
  const lng = Number(req.query.lng);
  const radius = Number(req.query.radius) || 10;

  let restaurants = sampleRestaurants.map((restaurant) => {
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || !restaurant.coordinates) {
      return { ...restaurant, distanceKm: null };
    }

    const distanceKm = calculateDistanceKm(
      lat,
      lng,
      restaurant.coordinates.lat,
      restaurant.coordinates.lng
    );

    return {
      ...restaurant,
      distanceKm: Number(distanceKm.toFixed(2)),
    };
  });

  if (Number.isFinite(lat) && Number.isFinite(lng)) {
    restaurants = restaurants
      .filter((restaurant) => restaurant.distanceKm === null || restaurant.distanceKm <= radius)
      .sort((a, b) => {
        const aDistance = a.distanceKm ?? Number.POSITIVE_INFINITY;
        const bDistance = b.distanceKm ?? Number.POSITIVE_INFINITY;
        return aDistance - bDistance;
      });
  }

  res.json({
    count: restaurants.length,
    restaurants,
    userLocation: Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null,
  });
});

app.post(
  '/api/restaurants',
  [
    body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 chars'),
    body('food_type').trim().isIn(['Indian', 'Seafood', 'Mediterranean']).withMessage('Invalid food type'),
    body('halal').isBoolean().withMessage('Halal must be boolean'),
    body('buffet').isBoolean().withMessage('Buffet must be boolean'),
    body('new_shop').isBoolean().withMessage('New shop must be boolean'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const restaurant = {
      id: sampleRestaurants.length + 1,
      ...req.body,
    };

    sampleRestaurants.push(restaurant);
    return res.status(201).json(restaurant);
  }
);

app.get('/filters', (req, res) => {
  res.json(filters);
});

app.get('/api/filters', (req, res) => {
  res.json(filters);
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: true }),
  (req, res) => {
    res.json({ success: true, user: req.user });
  }
);

app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.get('/api/auth/providers', (req, res) => {
  res.json({ providers: authProviders });
});

app.get('/api/auth/status', (req, res) => {
  const user = req.user || req.session?.user || null;

  res.json({
    authenticated: Boolean(user),
    user,
    providers: authProviders,
  });
});

app.get('/api/auth/config', (req, res) => {
  res.json({
    providers: authProviders,
    client: {
      google: Boolean(process.env.GOOGLE_CLIENT_ID),
      facebook: Boolean(process.env.FACEBOOK_APP_ID),
      apple: Boolean(process.env.APPLE_CLIENT_ID),
    },
  });
});

const loginWithProvider = (req, res, provider) => {
  const { name, email, avatarUrl } = req.body || {};

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const existingUser = users.find((user) => user.email === email && user.provider === provider);
  const user = existingUser || {
    id: `${provider}-${Date.now()}`,
    name: name || `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
    email,
    provider,
    avatarUrl: avatarUrl || null,
    createdAt: new Date().toISOString(),
  };

  if (!existingUser) {
    users.push(user);
  }

  req.session.user = user;
  return res.json({ success: true, user });
};

app.post('/api/auth/google', (req, res) => loginWithProvider(req, res, 'google'));
app.post('/api/auth/facebook', (req, res) => loginWithProvider(req, res, 'facebook'));
app.post('/api/auth/apple', (req, res) => loginWithProvider(req, res, 'apple'));

app.get('/api/auth/google/start', (req, res) => {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    return res.status(503).json({ message: 'Google OAuth is not configured' });
  }

  return res.json({
    provider: 'google',
    redirectUrl: '/auth/google',
    message: 'Google OAuth has been configured. Complete the provider redirect in production.',
  });
});

app.post('/api/auth/demo-login', (req, res) => loginWithProvider(req, res, 'demo'));

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true, message: 'Logged out' });
  });
});

app.get('/api/profile', (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  return res.json({ user: req.session.user });
});

app.get('/api/favorites', (req, res) => {
  const currentUser = req.session?.user || { id: 'public-guest' };
  const userFavorites = favorites.filter((favorite) => favorite.userId === currentUser.id);
  return res.json({ favorites: userFavorites });
});

app.post(
  '/api/favorites',
  [body('restaurantId').isInt({ min: 1 }).withMessage('restaurantId must be a positive integer')],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const currentUser = req.session?.user || { id: 'public-guest' };
    const restaurantId = Number(req.body.restaurantId);
    const restaurant = sampleRestaurants.find((item) => item.id === restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const existing = favorites.find(
      (favorite) => favorite.userId === currentUser.id && favorite.restaurantId === restaurantId
    );

    if (existing) {
      return res.json({ favorite: existing, message: 'Restaurant already saved' });
    }

    const favorite = {
      id: Date.now(),
      userId: currentUser.id,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      createdAt: new Date().toISOString(),
    };

    favorites.push(favorite);
    return res.status(201).json({ favorite, message: 'Restaurant saved' });
  }
);

app.delete('/api/favorites/:restaurantId', (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const itemId = Number(req.params.restaurantId);
  const index = favorites.findIndex(
    (favorite) => favorite.userId === req.session.user.id && favorite.restaurantId === itemId
  );

  if (index === -1) {
    return res.status(404).json({ message: 'Favorite not found' });
  }

  const [removed] = favorites.splice(index, 1);
  return res.json({ removed, message: 'Favorite removed' });
});

app.get('/api/prayer-times', (req, res) => {
  const city = String(req.query.city || 'Singapore');
  const normalizedCity = Object.keys(prayerSchedules).find(
    (entry) => entry.toLowerCase() === city.toLowerCase()
  ) || 'Singapore';

  const prayers = prayerSchedules[normalizedCity] || prayerSchedules.Singapore;
  const nextPrayer = prayers[3] || prayers[0];

  res.json({
    city: normalizedCity,
    date: new Date().toISOString().slice(0, 10),
    nextPrayer,
    prayers,
  });
});

app.get('/api/offers', (req, res) => {
  res.json({ offers: sampleOffers });
});

app.post(
  '/api/subscriptions',
  [body('email').isEmail().withMessage('Email must be valid')],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const subscription = {
      id: Date.now(),
      email: req.body.email,
      preferences: req.body.preferences || ['offers'],
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    subscriptions.push(subscription);
    return res.status(201).json({ subscription, message: 'Subscribed successfully' });
  }
);

app.get('/profile', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  return res.json({ user: req.user });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log('API running');
    console.log(`Backend running on http://localhost:${port}`);
  });
}

module.exports = app;
