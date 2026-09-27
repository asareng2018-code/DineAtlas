'use client';

import { Locale, translations } from '../lib/translations';

type LanguageSwitcherProps = {
  locale: Locale;
  onChange: (nextLocale: Locale) => void;
};

const options: Locale[] = ['en', 'zh', 'ms', 'ta'];

export default function LanguageSwitcher({ locale, onChange }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/70 px-2 py-1" aria-label={translations[locale].language}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`rounded-full px-2.5 py-1 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
            locale === option ? 'bg-emerald-500 text-slate-950' : 'text-slate-300 hover:text-white'
          }`}
          aria-pressed={locale === option}
          aria-label={`${translations[locale].language}: ${option.toUpperCase()}`}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
