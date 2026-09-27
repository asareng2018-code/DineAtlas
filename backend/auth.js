const passport = require('passport');

const getCallbackUrl = (provider) => {
  const baseUrl = (process.env.APP_BASE_URL || process.env.PUBLIC_APP_URL || 'http://localhost:3000').replace(/\/$/, '');
  return `${baseUrl}/auth/${provider}/callback`;
};

let GoogleStrategy;
try {
  GoogleStrategy = require('passport-google-oauth20').Strategy;
} catch (error) {
  GoogleStrategy = null;
}

if (GoogleStrategy && process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: getCallbackUrl('google'),
        passReqToCallback: false,
      },
      (accessToken, refreshToken, profile, done) => {
        const email = profile?.emails?.[0]?.value || `${profile?.id || 'google'}@example.com`;
        const user = {
          id: profile?.id || `google-${Date.now()}`,
          provider: 'google',
          email,
          name: profile?.displayName || 'Google User',
          avatarUrl: profile?.photos?.[0]?.value || null,
        };

        return done(null, user);
      }
    )
  );
}

passport.serializeUser((user, done) => {
  if (!user) {
    return done(new Error('No user supplied to serialize')); 
  }

  const sessionUser = {
    id: user.id || user.email || 'anonymous',
    provider: user.provider || 'local',
    email: user.email || null,
    name: user.name || 'User',
    avatarUrl: user.avatarUrl || null,
  };

  return done(null, sessionUser);
});

passport.deserializeUser((user, done) => {
  done(null, user || null);
});

module.exports = passport;
