"use client";

import { useMemo } from "react";

/** deterministic pseudo-random so server + client match */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const CFG = {
  hero: { wisps: 5 },
  page: { wisps: 3 },
  thin: { wisps: 4 },
} as const;

/**
 * Quiet steam / ember atmosphere for Bagara & Pulusu — no moon or night sky.
 */
export function SpiceSky({
  variant = "hero",
}: {
  variant?: "hero" | "page" | "thin";
}) {
  const wisps = useMemo(() => {
    const r = rng(variant === "thin" ? 53 : variant === "page" ? 29 : 11);
    return Array.from({ length: CFG[variant].wisps }, () => ({
      left: r() * 78,
      top: 18 + r() * 55,
      w: 140 + r() * 200,
      h: 48 + r() * 70,
      d: r() * 8,
      t: 16 + r() * 16,
      o: 0.06 + r() * 0.1,
    }));
  }, [variant]);

  return (
    <div className={`bp-atmosphere bp-atmosphere-${variant}`} aria-hidden>
      <div className="bp-atmosphere-glow" />
      {wisps.map((w, i) => (
        <div
          key={i}
          className="bp-atmosphere-wisp"
          style={{
            left: `${w.left}%`,
            top: `${w.top}%`,
            width: w.w,
            height: w.h,
            opacity: w.o,
            animationDelay: `${w.d}s`,
            animationDuration: `${w.t}s`,
          }}
        />
      ))}
    </div>
  );
}
