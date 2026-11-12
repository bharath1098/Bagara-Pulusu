"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Star } from "lucide-react";

const SLIDES = [
  {
    tag: "Namesake",
    title: "Bagara",
    sub: "Ghee-tempered rice from the local table",
  },
  {
    tag: "Fry",
    title: "Chicken Fry",
    sub: "Crispy Andhra fry for bagara rice",
  },
  {
    tag: "Pulusu",
    title: "Chepala Pulusu",
    sub: "Tangy tamarind gravy, poured over rice",
  },
  {
    tag: "Thali",
    title: "Full Andhra plate",
    sub: "Rice, fry, curry, and curd in one sitting",
  },
  {
    tag: "Locality",
    title: "Village kitchen",
    sub: "Chulha heat, clay pot, banana-leaf soul",
  },
  {
    tag: "Sweet",
    title: "House dessert",
    sub: "A warm finish after the spice",
  },
];

const INTERVAL = 5500;

/** Text-only signature rotator (no photos). */
export function HeroCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0);
  const drag = useRef<number | null>(null);

  const go = useCallback((n: number) => {
    setI((n + SLIDES.length) % SLIDES.length);
    setCycle((c) => c + 1);
  }, []);

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setTimeout(() => go(i + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [i, paused, cycle, go]);

  const slide = SLIDES[i];

  return (
    <div
      className="hero-media"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hero-shape">
        <div
          className="hero-main hero-main-plain"
          onPointerDown={(e) => (drag.current = e.clientX)}
          onPointerUp={(e) => {
            if (drag.current === null) return;
            const dx = e.clientX - drag.current;
            drag.current = null;
            if (Math.abs(dx) > 45) go(i + (dx < 0 ? 1 : -1));
          }}
          onPointerCancel={() => (drag.current = null)}
        >
          <div className="hero-main-shade" />
          <span className="hero-tag">{slide.tag}</span>
          <span className="hero-rating">
            <Star size={14} fill="#f2b84b" color="#f2b84b" /> 4.5 · Loved in Madhapur
          </span>
          <div className="hero-caption" key={i}>
            <h3>{slide.title}</h3>
            <p>{slide.sub}</p>
          </div>
        </div>
      </div>

      <div className="hero-thumbs" role="tablist" aria-label="Signatures">
        {SLIDES.map((s, idx) => (
          <button
            key={s.title}
            role="tab"
            aria-selected={idx === i}
            aria-label={s.title}
            className={clsx("hero-thumb hero-thumb-plain", idx === i && "on")}
            onClick={() => go(idx)}
          >
            <span>{s.title}</span>
            {idx === i && (
              <span
                key={cycle}
                className="hero-progress"
                style={{
                  animationDuration: `${INTERVAL}ms`,
                  animationPlayState: paused ? "paused" : "running",
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
