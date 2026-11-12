"use client";

import { Moon, Sun } from "lucide-react";
import { usePrefs } from "./Providers";

/** Header sun ⇄ moon switch. Full Light / Dark / Auto lives in Preference. */
export function ThemeToggle() {
  const { theme, setTheme } = usePrefs();

  const isDark =
    theme === "dark" ||
    (theme === "auto" &&
      typeof document !== "undefined" &&
      document.documentElement.dataset.theme === "dark") ||
    (theme !== "light" && theme !== "auto");

  const toggle = () => {
    const currentlyDark =
      document.documentElement.dataset.theme === "dark" || theme === "dark";
    setTheme(currentlyDark ? "light" : "dark");
  };

  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
      type="button"
    >
      <Sun size={18} className="tt-sun" />
      <Moon size={18} className="tt-moon" />
    </button>
  );
}
