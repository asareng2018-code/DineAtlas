'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  provider: string;
  avatarUrl?: string | null;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

    fetch(`${apiBase}/api/profile`, { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.user) {
          setUser(data.user);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-8 text-slate-200">Loading profile...</div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <div className="max-w-md rounded-xl border border-slate-700 bg-slate-900 p-8 text-center">
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="mt-4 text-slate-300">You are not signed in yet.</p>
          <Link href="/" className="mt-6 inline-flex rounded-full bg-emerald-500 px-5 py-3 font-semibold text-slate-950">
            Go home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-xl font-bold text-slate-950">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Account</p>
            <h1 className="text-3xl font-bold">{user.name}</h1>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-700 bg-slate-950 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Email</p>
            <p className="mt-3 text-lg font-medium">{user.email}</p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-950 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Provider</p>
            <p className="mt-3 text-lg font-medium capitalize">{user.provider}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="rounded-full border border-slate-600 px-5 py-3 text-sm font-medium text-slate-100 hover:border-emerald-500 hover:text-emerald-300">
            Back to home
          </Link>
          <Link href="/map" className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950">
            View nearby places
          </Link>
        </div>
      </div>
    </main>
  );
}
