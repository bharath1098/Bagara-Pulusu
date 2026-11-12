"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { Check, Monitor, Moon, SlidersHorizontal, Sun, X } from "lucide-react";
import { usePrefs, type ThemeMode } from "./Providers";
import { CURRENCIES, LOCALES } from "@/lib/cafe";
import { COLOR_THEMES } from "@/lib/color-themes";
import type { Locale } from "@/lib/i18n";

const MODES: { code: ThemeMode; label: string; name: string; icon: typeof Sun }[] =
  [
    { code: "dark", label: "Dark", name: "Default", icon: Moon },
    { code: "light", label: "Light", name: "Parchment", icon: Sun },
    { code: "auto", label: "Auto", name: "Match device", icon: Monitor },
  ];

export function PreferenceMenu({ compact = false }: { compact?: boolean }) {
  const {
    locale,
    setLocale,
    currency,
    setCurrency,
    theme,
    setTheme,
    colorTheme,
    setColorTheme,
  } = usePrefs();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [appearance, setAppearance] = useState<"light" | "dark">("dark");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (theme === "light" || theme === "dark") {
      setAppearance(theme);
      return;
    }
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setAppearance(mq.matches ? "dark" : "light");
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [theme]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const localeName = LOCALES.find((l) => l.code === locale)?.name ?? "English";
  const paletteName =
    COLOR_THEMES.find((t) => t.id === colorTheme)?.label ?? "Chulha";

  const panel = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="pref-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="pref-panel"
            role="dialog"
            aria-label="Preferences"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <div className="pref-head">
              <div>
                <strong>Preference</strong>
                <small>
                  {theme} · {paletteName} · {localeName} · {currency}
                </small>
              </div>
              <button
                className="pref-close"
                aria-label="Close"
                onClick={() => setOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <h6 className="pref-title">Appearance</h6>
            <div className="pref-grid pref-grid-3">
              {MODES.map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.code}
                    className={clsx("pref-opt", theme === m.code && "on")}
                    onClick={() => setTheme(m.code)}
                  >
                    {theme === m.code && <Check size={14} className="pref-check" />}
                    <span className="pref-main pref-theme-icon">
                      <Icon size={16} />
                      {m.label}
                    </span>
                    <span className="pref-sub">{m.name}</span>
                  </button>
                );
              })}
            </div>

            <h6 className="pref-title">Color theme</h6>
            <div className="pref-grid pref-grid-2">
              {COLOR_THEMES.map((tOption) => (
                <button
                  key={tOption.id}
                  className={clsx("pref-opt", colorTheme === tOption.id && "on")}
                  onClick={() => setColorTheme(tOption.id)}
                >
                  {colorTheme === tOption.id && (
                    <Check size={14} className="pref-check" />
                  )}
                  <span className="pref-swatch-row" aria-hidden>
                    {(appearance === "light"
                      ? tOption.swatches
                      : tOption.darkSwatches
                    ).map((c) => (
                      <i key={c} style={{ background: c }} />
                    ))}
                  </span>
                  <span className="pref-main">{tOption.label}</span>
                  <span className="pref-sub">{tOption.note}</span>
                </button>
              ))}
            </div>

            <h6 className="pref-title">Language</h6>
            <div className="pref-grid pref-grid-3">
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  className={clsx("pref-opt", locale === l.code && "on")}
                  onClick={() => setLocale(l.code as Locale)}
                >
                  {locale === l.code && <Check size={14} className="pref-check" />}
                  <span className="pref-main">{l.label}</span>
                  <span className="pref-sub">{l.name}</span>
                </button>
              ))}
            </div>

            <h6 className="pref-title">Currency</h6>
            <div className="pref-grid pref-grid-3">
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  className={clsx("pref-opt", currency === c.code && "on")}
                  onClick={() => setCurrency(c.code)}
                  title={c.name}
                >
                  {currency === c.code && <Check size={14} className="pref-check" />}
                  <span className="pref-main pref-symbol">{c.symbol}</span>
                  <span className="pref-sub">{c.code}</span>
                </button>
              ))}
            </div>
            <p className="pref-note">
              Prices are shown in your selected currency for reference. Bills at the
              cafe are always charged in ₹.
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        className={clsx("pref-trigger", compact && "compact")}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <SlidersHorizontal size={16} />
        <span className="pref-trigger-label">Preference</span>
      </button>
      {mounted && createPortal(panel, document.body)}
    </>
  );
}
