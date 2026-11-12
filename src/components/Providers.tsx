"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { ApiLoader } from "@/components/ApiLoader";
import { IntroSplash } from "@/components/IntroSplash";
import { captureUtm } from "@/lib/utm";
import {
  applySiteTheme,
  DEFAULT_COLOR_THEME,
  getColorTheme,
  type ColorThemeId,
} from "@/lib/color-themes";

export type ThemeMode = "light" | "dark" | "auto";

type Prefs = {
  locale: Locale;
  currency: string;
  theme: ThemeMode;
  colorTheme: ColorThemeId;
  setLocale: (l: Locale) => void;
  setCurrency: (c: string) => void;
  setTheme: (m: ThemeMode) => void;
  setColorTheme: (id: ColorThemeId) => void;
  tr: ReturnType<typeof t>;
};

const PrefsContext = createContext<Prefs | null>(null);

function isOpsPath() {
  return /^\/(staff|order|t)(\/|$)/.test(location.pathname);
}

function resolveAppearance(mode: ThemeMode): "light" | "dark" {
  if (mode === "auto") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return mode;
}

function applyPublicTheme(paletteId: ColorThemeId, mode: ThemeMode) {
  applySiteTheme(getColorTheme(paletteId), resolveAppearance(mode));
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [currency, setCurrencyState] = useState("INR");
  const [theme, setThemeState] = useState<ThemeMode>("dark");
  const [colorTheme, setColorThemeState] =
    useState<ColorThemeId>(DEFAULT_COLOR_THEME);

  useEffect(() => {
    captureUtm();
    const report = (message: string, stack?: string) => {
      if (!message || message.includes("ResizeObserver")) return;
      void fetch("/api/client-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          message: message.slice(0, 500),
          path: location.pathname,
          stack: (stack || "").slice(0, 1500),
        }),
      }).catch(() => {});
    };
    const onError = (event: ErrorEvent) => report(event.message, event.error?.stack);
    const onReject = (event: PromiseRejectionEvent) => {
      const reason = event.reason as { message?: string; stack?: string } | undefined;
      report(reason?.message || String(event.reason), reason?.stack);
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onReject);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onReject);
    };
  }, []);

  useEffect(() => {
    const l = localStorage.getItem("bagara-locale") as Locale | null;
    const c = localStorage.getItem("bagara-currency");
    const th = localStorage.getItem("bagara-theme") as ThemeMode | null;
    const pal = localStorage.getItem("bagara-palette") as ColorThemeId | null;
    if (l) setLocaleState(l);
    if (c) setCurrencyState(c);
    if (th === "light" || th === "dark" || th === "auto") setThemeState(th);
    else setThemeState("dark");
    if (pal) setColorThemeState(getColorTheme(pal).id);
  }, []);

  useEffect(() => {
    if (isOpsPath()) {
      document.documentElement.dataset.theme = "dark";
      return;
    }
    applyPublicTheme(colorTheme, theme);
    if (theme !== "auto") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const on = () => applyPublicTheme(colorTheme, "auto");
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [colorTheme, theme]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("bagara-locale", l);
  }, []);

  const setCurrency = useCallback((c: string) => {
    setCurrencyState(c);
    localStorage.setItem("bagara-currency", c);
  }, []);

  const setTheme = useCallback((m: ThemeMode) => {
    setThemeState(m);
    localStorage.setItem("bagara-theme", m);
  }, []);

  const setColorTheme = useCallback((id: ColorThemeId) => {
    const next = getColorTheme(id).id;
    setColorThemeState(next);
    localStorage.setItem("bagara-palette", next);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      currency,
      theme,
      colorTheme,
      setLocale,
      setCurrency,
      setTheme,
      setColorTheme,
      tr: t(locale),
    }),
    [
      locale,
      currency,
      theme,
      colorTheme,
      setLocale,
      setCurrency,
      setTheme,
      setColorTheme,
    ],
  );

  return (
    <PrefsContext.Provider value={value}>
      {children}
      <ApiLoader />
      <IntroSplash />
    </PrefsContext.Provider>
  );
}

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs outside Providers");
  return ctx;
}
