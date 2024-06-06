'use client';

import { THEME_STORAGE_NAME } from "@/utils/storage";
import { FC, useEffect, useState } from 'react';


const ThemeSwitch: FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_NAME);
    if (storedTheme) {
      setTheme(storedTheme as 'light' | 'dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem(THEME_STORAGE_NAME, newTheme);
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    const mediaQueryList = window.matchMedia('print');
    const changeThemeOnPrint = (mql: any) => {
      if (mql.matches) {
        setTheme('light');
      }
    };
    mediaQueryList.addEventListener('change', changeThemeOnPrint);

    return () => {
      mediaQueryList.removeEventListener('change', changeThemeOnPrint);
    };
  }, []);

  return (
    <button className="px-2 py-1 capitalize border dark:border-zinc-700 rounded-md text-xs" onClick={toggleTheme}>
      {
        theme === "dark"
          ? '🌙'
          : '☀️'

      }
    </button>
  )
};

export default ThemeSwitch;