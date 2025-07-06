'use client';

import { useTheme } from '@/lib/theme-context';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
      <label
        htmlFor="theme-select"
        className="mb-2 sm:mb-0 font-semibold text-sm text-muted-foreground"
      >
        Theme:
      </label>
      <select
        id="theme-select"
        className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        value={theme}
        onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
        aria-label="Select theme"
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
