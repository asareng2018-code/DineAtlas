'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { Locale, translations } from '../lib/translations';

type Restaurant = {
  id: number;
  name: string;
  cuisine: string;
  halal: boolean;
  location: string;
  distanceKm?: number | null;
};

type User = {
  id: string;
  name: string;
  email: string;
  provider: string;
};

type Offer = {
  id: number;
  title: string;
  description: string;
  discount: number;
  restaurantId: number;
};

const defaultRestaurants: Restaurant[] = [
  { id: 1, name: 'Saffron Bites', cuisine: 'Indian', halal: true, location: 'Downtown' },
  { id: 2, name: 'Harbor Grill', cuisine: 'Seafood', halal: true, location: 'Harborfront' },
  { id: 3, name: 'Garden Table', cuisine: 'Mediterranean', halal: false, location: 'Old Town' },
  { id: 4, name: 'Cedar Kitchen', cuisine: 'Middle Eastern', halal: true, location: 'City Centre' },
];

const defaultPrayerSchedule = [
  { name: 'Fajr', time: '5:12 AM' },
  { name: 'Dhuhr', time: '1:03 PM' },
  { name: 'Asr', time: '4:21 PM' },
  { name: 'Maghrib', time: '7:13 PM' },
  { name: 'Isha', time: '8:35 PM' },
];

const parsePrayerTime = (timeValue: string) => {
  const [time, meridiem] = timeValue.trim().split(' ');
  const [hoursRaw, minutesRaw] = time.split(':');
  let hours = Number(hoursRaw);
  const minutes = Number(minutesRaw);

  if (meridiem === 'PM' && hours !== 12) {
    hours += 12;
  }

  if (meridiem === 'AM' && hours === 12) {
    hours = 0;
  }

  return hours * 60 + minutes;
};

const getCurrentMinutesInTimeZone = (timeZone: string, now = new Date()) => {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const hour = Number(parts.find((part) => part.type === 'hour')?.value || 0);
  const minute = Number(parts.find((part) => part.type === 'minute')?.value || 0);
  return hour * 60 + minute;
};

const getNextPrayer = (prayers: { name: string; time: string }[], city = 'Singapore') => {
  const timeZoneMap: Record<string, string> = {
    Singapore: 'Asia/Singapore',
    'Kuala Lumpur': 'Asia/Kuala_Lumpur',
    Dubai: 'Asia/Dubai',
  };

  const now = new Date();
  const currentMinutes = getCurrentMinutesInTimeZone(timeZoneMap[city] || 'Asia/Singapore', now);
  const upcomingPrayer = prayers.find((prayer) => parsePrayerTime(prayer.time) > currentMinutes);
  return upcomingPrayer || prayers[0];
};

const getCurrentPrayer = (prayers: { name: string; time: string }[], city = 'Singapore') => {
  const timeZoneMap: Record<string, string> = {
    Singapore: 'Asia/Singapore',
    'Kuala Lumpur': 'Asia/Kuala_Lumpur',
    Dubai: 'Asia/Dubai',
  };

  const now = new Date();
  const currentMinutes = getCurrentMinutesInTimeZone(timeZoneMap[city] || 'Asia/Singapore', now);

  const currentPrayer = [...prayers].reverse().find((prayer) => parsePrayerTime(prayer.time) <= currentMinutes) || prayers[0];
  return currentPrayer;
};

export default function Home() {
  const [locale, setLocale] = useState<Locale>('en');
  const [health, setHealth] = useState<string>('Checking API...');
  const [restaurants, setRestaurants] = useState<Restaurant[]>(defaultRestaurants);
  const [locationStatus, setLocationStatus] = useState<string>('Use my location');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [notice, setNotice] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [prayerDetails, setPrayerDetails] = useState<{ city: string; nextPrayer?: { name: string; time: string }; prayers: { name: string; time: string }[] }>({
    city: 'Singapore',
    prayers: defaultPrayerSchedule,
    nextPrayer: getNextPrayer(defaultPrayerSchedule),
  });
  const t = translations[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => undefined);
    }
  }, []);

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

    fetch(`${apiBase}/api/health`, { credentials: 'include' })
      .then((res) => {
        if (!res.ok) {
          throw new Error('API unavailable');
        }
        return res.json();
      })
      .then((data) => setHealth(data.status === 'ok' ? 'API connected' : 'API fallback'))
      .catch(() => setHealth('API fallback'));

    fetch(`${apiBase}/api/offers`, { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : { offers: [] }))
      .then((data) => setOffers(data.offers || []))
      .catch(() => setOffers([]));

    fetch(`${apiBase}/api/prayer-times?city=Singapore`, { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : { city: 'Singapore', prayers: defaultPrayerSchedule, nextPrayer: getNextPrayer(defaultPrayerSchedule) }))
      .then((data) => {
        if (data && Array.isArray(data.prayers) && data.prayers.length > 0) {
          setPrayerDetails({
            city: data.city || 'Singapore',
            nextPrayer: data.nextPrayer || getNextPrayer(data.prayers),
            prayers: data.prayers,
          });
        }
      })
      .catch(() => {
        setPrayerDetails({
          city: 'Singapore',
          nextPrayer: getNextPrayer(defaultPrayerSchedule),
          prayers: defaultPrayerSchedule,
        });
      });

    fetch(`${apiBase}/api/profile`, { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.user) {
          setUser(data.user);
        }
      })
      .catch(() => undefined);

    const guestFavorites = readGuestFavorites();
    setFavoriteIds(guestFavorites);

    fetch(`${apiBase}/api/favorites`, { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : { favorites: [] }))
      .then((data) => {
        const serverFavorites = (data.favorites || []).map((item: { restaurantId: number }) => Number(item.restaurantId));
        const merged = Array.from(new Set([...guestFavorites, ...serverFavorites]));
        setFavoriteIds(merged);
        syncGuestFavorites(merged);
      })
      .catch(() => setFavoriteIds(guestFavorites));

    const params = new URLSearchParams();
    if (userLocation) {
      params.set('lat', String(userLocation.lat));
      params.set('lng', String(userLocation.lng));
      params.set('radius', '10');
    }

    const query = params.toString() ? `?${params.toString()}` : '';

    fetch(`${apiBase}/api/restaurants${query}`, { credentials: 'include' })
      .then((res) => {
        if (!res.ok) {
          throw new Error('No data');
        }
        return res.json();
      })
      .then((data) => {
        if (data.restaurants && data.restaurants.length > 0) {
          setRestaurants(data.restaurants);
        } else {
          setRestaurants(defaultRestaurants);
        }
      })
      .catch(() => setRestaurants(defaultRestaurants));
  }, [userLocation]);

  const requestLocation = () => {
    if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
      setLocationStatus(t.locationUnsupported);
      return;
    }

    setLocationStatus('Getting your location...');

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setUserLocation({ lat: coords.latitude, lng: coords.longitude });
        setLocationStatus(t.useMyLocation);
      },
      () => {
        setLocationStatus(t.locationPermissionDenied || 'Location off');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'apple' | 'demo') => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const payload = {
      name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
      email: `${provider}@example.com`,
      avatarUrl: null,
    };

    const response = await fetch(`${apiBase}/api/auth/${provider}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setNotice('Login failed. Please try again.');
      return;
    }

    const data = await response.json();
    setUser(data.user);
    setNotice(t.loginSuccess);
  };

  const getGuestFavoriteKey = () => 'sg-public-favorites';

  const readGuestFavorites = () => {
    if (typeof window === 'undefined') {
      return [] as number[];
    }

    try {
      const raw = window.localStorage.getItem(getGuestFavoriteKey());
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [] as number[];
    }
  };

  const syncGuestFavorites = (nextFavorites: number[]) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(getGuestFavoriteKey(), JSON.stringify(nextFavorites));
    }
  };

  const handleLogin = async () => {
    await handleSocialLogin('demo');
  };

  const handleLogout = async () => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    await fetch(`${apiBase}/api/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
    setFavoriteIds([]);
    setNotice('Logged out.');
  };

  const toggleFavorite = async (restaurant: Restaurant) => {
    const isFavorite = favoriteIds.includes(restaurant.id);
    const nextFavorites = isFavorite
      ? favoriteIds.filter((id) => id !== restaurant.id)
      : [...favoriteIds, restaurant.id];

    setFavoriteIds(nextFavorites);
    syncGuestFavorites(nextFavorites);

    if (!user) {
      setNotice(isFavorite ? `${restaurant.name} removed from favorites.` : `${restaurant.name} added to favorites.`);
      return;
    }

    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

    if (isFavorite) {
      const response = await fetch(`${apiBase}/api/favorites/${restaurant.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setNotice(`${restaurant.name} removed from favorites.`);
      }
      return;
    }

    const response = await fetch(`${apiBase}/api/favorites`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ restaurantId: restaurant.id }),
    });

    if (!response.ok) {
      setNotice('Could not save the restaurant.');
      return;
    }

    setNotice(`${restaurant.name} added to favorites.`);
  };

  const handleSubscribe = async () => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const email = user?.email || 'public@example.com';
    const response = await fetch(`${apiBase}/api/subscriptions`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        preferences: ['offers', 'new-restaurants'],
      }),
    });

    if (!response.ok) {
      setNotice('The subscription could not be created.');
      return;
    }

    setNotice(t.subscriptionSaved);
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = searchTerm
      ? restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'halal' && restaurant.halal) ||
      (activeFilter === 'non-halal' && !restaurant.halal) ||
      (activeFilter === 'offers' && offers.some((offer) => offer.restaurantId === restaurant.id));

    return matchesSearch && matchesFilter;
  });

  return (
    <main id="main-content" className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 py-12 text-white">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-emerald-500 focus:px-3 focus:py-2 focus:text-slate-950">
        Skip to content
      </a>

      <div className="max-w-6xl w-full rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl sm:p-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold sm:text-5xl">{t.title}</h1>
            <p className="mt-3 text-base text-emerald-200 sm:text-xl">{t.headline}</p>
          </div>

          <nav aria-label="Language selector" className="flex flex-col items-start gap-3 sm:items-end">
            <LanguageSwitcher locale={locale} onChange={setLocale} />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={requestLocation}
                aria-label={t.useMyLocation}
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              >
                {locationStatus}
              </button>
              <Link
                href="/map"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-emerald-500 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                {t.explore}
              </Link>
            </div>
          </nav>
        </header>

        <p className="mt-6 text-base text-slate-300 sm:text-lg">{t.subtitle}</p>

        {notice ? <p className="mt-4 text-sm text-emerald-300" role="status">{notice}</p> : null}

        <section aria-label="Application status" className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-700 bg-slate-950 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{t.apiStatus}</p>
            <p className="mt-3 text-2xl font-semibold text-emerald-400">{health}</p>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-950 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{t.nearbySearch}</p>
            <p className="mt-3 text-2xl font-semibold text-amber-300">
              {userLocation ? t.locationOn : t.locationOff}
            </p>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-950 p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Current prayer</p>
                <p className="mt-3 text-2xl font-semibold text-emerald-300">
                  {getCurrentPrayer(prayerDetails.prayers, prayerDetails.city)?.name || 'Fajr'}
                </p>
                <div className="mt-3 space-y-1 text-sm text-slate-300">
                  <p><span className="text-slate-400">Start:</span> {getCurrentPrayer(prayerDetails.prayers, prayerDetails.city)?.time || '5:12 AM'}</p>
                  <p><span className="text-slate-400">End:</span> {prayerDetails.nextPrayer?.time || '7:13 PM'}</p>
                </div>
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Next prayer</p>
                <p className="mt-3 text-2xl font-semibold text-amber-300">{prayerDetails.nextPrayer?.name || 'Maghrib'}</p>
                <div className="mt-3 space-y-1 text-sm text-slate-300">
                  <p><span className="text-slate-400">Start:</span> {prayerDetails.nextPrayer?.time || '7:13 PM'}</p>
                  <p><span className="text-slate-400">End:</span> {prayerDetails.prayers[(prayerDetails.prayers.findIndex((prayer) => prayer.name === prayerDetails.nextPrayer?.name) + 1) % prayerDetails.prayers.length]?.time || '8:35 PM'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Prayer times" className="mt-8 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Prayer times</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Today in {prayerDetails.city}</h2>
            </div>
            <button
              type="button"
              className="rounded-full border border-emerald-400/50 px-4 py-2 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/10 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              View full schedule
            </button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {prayerDetails.prayers.map((prayer) => (
              <div key={prayer.name} className="rounded-lg border border-slate-700 bg-slate-950 p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{prayer.name}</p>
                <p className="mt-2 text-lg font-semibold text-white">{prayer.time}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-label="Search and filters" className="mt-8 rounded-xl border border-slate-700 bg-slate-950 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <label htmlFor="restaurant-search" className="mb-2 block text-sm font-medium text-slate-300">
                Search restaurants or city
              </label>
              <input
                id="restaurant-search"
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Try Singapore, Indian, halal..."
                className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {['all', 'halal', 'non-halal', 'offers'].map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeFilter === filter
                    ? 'bg-emerald-500 text-slate-950'
                    : 'border border-slate-600 bg-slate-900 text-slate-200 hover:border-emerald-500 hover:text-emerald-300'
                }`}
              >
                {filter === 'all' ? 'All' : filter === 'halal' ? 'Halal' : filter === 'non-halal' ? 'Non-halal' : 'Offers'}
              </button>
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredRestaurants.map((restaurant) => {
            const isFavorite = favoriteIds.includes(restaurant.id);

            return (
              <article key={restaurant.id} className="rounded-xl border border-slate-700 bg-slate-950 p-4 shadow-lg transition hover:border-emerald-500/60">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold">{restaurant.name}</h2>
                    <p className="mt-1 text-sm text-slate-400">{restaurant.location}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${restaurant.halal ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-200'}`}>
                    {restaurant.halal ? 'Halal' : 'Non-halal'}
                  </span>
                </div>
                <p className="mt-4 text-slate-300">{restaurant.cuisine}</p>
                <p className="mt-2 text-sm text-emerald-300">
                  {typeof restaurant.distanceKm === 'number' ? `${restaurant.distanceKm} km away` : 'Distance unavailable'}
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    aria-label={`${t.viewDetails} for ${restaurant.name}`}
                    className="inline-flex flex-1 items-center justify-center rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    {t.viewDetails}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleFavorite(restaurant)}
                    className={`inline-flex w-10 items-center justify-center rounded-lg border px-2 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                      isFavorite ? 'border-amber-400 bg-amber-400/20 text-amber-300' : 'border-slate-600 bg-slate-800 text-slate-100'
                    }`}
                    aria-label={isFavorite ? `${t.removeFavorite} ${restaurant.name}` : `${t.saveFavorite} ${restaurant.name}`}
                  >
                    {isFavorite ? '★' : '☆'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <section aria-label="Offers" className="mt-10 rounded-xl border border-slate-700 bg-slate-950 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{t.trending}</p>
              <h2 className="mt-2 text-2xl font-semibold">{t.freshDeals}</h2>
            </div>
            {user ? (
              <button
                type="button"
                onClick={handleSubscribe}
                className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              >
                {t.getUpdates}
              </button>
            ) : null}
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {offers.map((offer) => (
              <div key={offer.id} className="rounded-xl border border-slate-700 bg-slate-900 p-4">
                <p className="text-sm uppercase tracking-[0.15em] text-emerald-300">{offer.discount}% off</p>
                <h3 className="mt-2 text-lg font-semibold">{offer.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{offer.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
