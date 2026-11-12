"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SafeImage as Image } from "@/components/SafeImage";
import { CAFE_MEDIA } from "@/lib/media";
import { loadPublicData, prefetchPublicData } from "@/lib/public-data";

const SEEN_KEY = "bagara-intro-seen";
const MIN_MS = 3200;
const MAX_MS = 4800;
const LEAVE_MS = 720;

function skipPath(pathname: string) {
  return (
    pathname.startsWith("/staff") ||
    pathname.startsWith("/order") ||
    pathname.startsWith("/t/")
  );
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, Math.max(0, ms));
  });
}

export function IntroSplash() {
  const pathname = usePathname();
  const router = useRouter();
  const skip = skipPath(pathname);
  const [mode, setMode] = useState<"play" | "leave" | "off">(
    skip ? "off" : "play",
  );
  const finishing = useRef(false);

  const finish = useCallback(() => {
    if (finishing.current) return;
    finishing.current = true;
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* private mode */
    }
    setMode("leave");
  }, []);

  useEffect(() => {
    if (skip) {
      document.documentElement.dataset.intro = "skip";
      setMode("off");
      return;
    }
    if (document.documentElement.dataset.intro === "done") {
      setMode("off");
      return;
    }

    document.documentElement.dataset.intro = "open";
    prefetchPublicData();
    router.prefetch("/menu");
    router.prefetch("/reserve");
    router.prefetch("/gallery");

    const started = Number(
      document.documentElement.dataset.introStart || Date.now(),
    );
    let cancelled = false;

    const api = loadPublicData()
      .then(() => true)
      .catch(() => false);

    void Promise.race([
      wait(started + MAX_MS - Date.now()),
      Promise.all([wait(started + MIN_MS - Date.now()), api]),
    ]).then(() => {
      if (!cancelled) finish();
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelled = true;
      window.removeEventListener("keydown", onKey);
    };
  }, [finish, router, skip]);

  useEffect(() => {
    if (mode !== "leave") return;
    const t = window.setTimeout(() => {
      document.documentElement.dataset.intro = "done";
      setMode("off");
    }, LEAVE_MS);
    return () => window.clearTimeout(t);
  }, [mode]);

  if (mode === "off") return null;

  return (
    <div
      className={`intro-splash intro-splash-stamp${mode === "leave" ? " is-leaving" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Bagara & Pulusu"
      onClick={finish}
    >
      <div className="intro-stamp-bg" aria-hidden />
      <div className="intro-center">
        <div className="intro-stamp" aria-hidden>
          <span className="intro-stamp-ring" />
          <span className="intro-stamp-mark intro-stamp-logo">
            <Image
              src={CAFE_MEDIA.logo}
              alt=""
              fill
              className="cover"
              sizes="140px"
              priority
            />
          </span>
        </div>
        <p className="intro-kicker">Jubilee Hills · Hyderabad</p>
        <h1 className="intro-title">
          <span>Bagara</span>
          <em>&amp; Pulusu</em>
        </h1>
        <p className="intro-tag">Traditional · Authentic · Local flavors</p>
        <span className="intro-bar" aria-hidden />
        <span className="intro-hint">Enter the table</span>
      </div>
    </div>
  );
}
