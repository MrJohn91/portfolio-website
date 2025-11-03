"use client";

import { useLanguage } from '@/lib/language-context';
import { Language } from '@/lib/i18n';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          language === 'en'
            ? 'bg-purple-300/20 text-purple-300 border border-purple-300'
            : 'text-[--muted] hover:text-[--text] hover:bg-white/5'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('de')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          language === 'de'
            ? 'bg-purple-300/20 text-purple-300 border border-purple-300'
            : 'text-[--muted] hover:text-[--text] hover:bg-white/5'
        }`}
      >
        DE
      </button>
    </div>
  );
}

