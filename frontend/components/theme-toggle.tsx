"use client";

import { useTheme } from '@/lib/theme-context';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-1.5 py-0.5 md:px-3 md:py-1 rounded-md text-xs md:text-sm font-medium transition-colors text-[--muted] hover:text-[--text] hover:bg-white/5 flex items-center gap-1.5"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span className="hidden sm:inline">Light</span>
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span className="hidden sm:inline">Dark</span>
        </>
      )}
    </button>
  );
}

