"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import {
  ArrowUpRight,
  CalendarDays,
  Clock,
  Gift,
  Home,
  Images,
  Info,
  Mail,
  Menu as MenuIcon,
  MessageSquare,
  Phone,
  MapPin,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { ClosingSoonBanner } from "./ClosingSoonBanner";
import { BrandMark } from "./BrandMark";
import { usePrefs } from "./Providers";
import { PreferenceMenu } from "./PreferenceMenu";
import { SiteSearch } from "./SiteSearch";
import { CopyButton } from "./CopyButton";
import { CAFE } from "@/lib/cafe";

type NavLink = {
  href: string;
  label: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
};

export function SiteHeader() {
  const { tr } = usePrefs();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMoreOpen(false), [pathname]);

  const links: NavLink[] = [
    { href: "/", label: tr.home, icon: Home },
    { href: "/menu", label: tr.menu, icon: UtensilsCrossed },
    { href: "/about", label: tr.about, icon: Info },
    { href: "/gallery", label: tr.gallery, icon: Images },
    { href: "/reserve", label: tr.reserve, icon: CalendarDays },
    { href: "/loyalty", label: tr.loyalty, icon: Gift },
    { href: "/contact", label: tr.contact, icon: MapPin },
  ];

  const primaryHrefs = ["/", "/menu", "/reserve", "/loyalty", "/contact"];
  const primaryTabs = links.filter((l) => primaryHrefs.includes(l.href));
  const moreTabs: NavLink[] = [
    ...links.filter((l) => !primaryHrefs.includes(l.href)),
    { href: "/feedback", label: tr.feedback, icon: MessageSquare },
  ];

  // a link is active on its own page and on any page below it (/menu/cheese-omelette -> Menu)
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const moreActive = moreTabs.some((l) => isActive(l.href));
  const home = pathname === "/";
  const telHref = `tel:${CAFE.phoneDisplay.replace(/\s/g, "")}`;

  return (
    <>
      <header className={clsx("site-header bp-header", home && "is-home", scrolled && "scrolled")}>
        <ClosingSoonBanner />
        <div className="header-inner">
          <Link href="/" className="brand" aria-label="Bagara & Pulusu home">
            <BrandMark priority sizes="48px" />
            <span className="brand-text">
              <strong>BAGARA</strong>
              <small>&amp; PULUSU</small>
            </span>
          </Link>

          <nav className="nav-links" aria-label="Main">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(isActive(l.href) && "active")}
                aria-current={isActive(l.href) ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="header-tools">
            {home && (
              <a className="bp-header-call" href={telHref}>
                <span className="bp-header-call-ico" aria-hidden>
                  <Phone size={15} />
                </span>
                <span>
                  <small>Call to order</small>
                  <b>{CAFE.phoneDisplay}</b>
                </span>
              </a>
            )}
            <SiteSearch />
            <PreferenceMenu />
            <Link href="/menu" className={home ? "bp-order-online" : "btn btn-gold btn-sm"}>
              {home ? "Order Online" : "Order Now"}
            </Link>
          </div>
        </div>
      </header>

      <nav className="mobile-tabbar no-print" aria-label="Mobile">
        {primaryTabs.map((l) => {
          const Icon = l.icon;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={clsx("mobile-tab", isActive(l.href) && "on")}
              aria-label={l.label}
              aria-current={isActive(l.href) ? "page" : undefined}
              onClick={() => setMoreOpen(false)}
            >
              <span className="mobile-tab-ico" aria-hidden>
                <Icon size={20} strokeWidth={1.6} />
              </span>
            </Link>
          );
        })}
        <button
          type="button"
          className={clsx("mobile-tab", (moreOpen || moreActive) && "on")}
          aria-label="More"
          aria-expanded={moreOpen}
          onClick={() => setMoreOpen((v) => !v)}
        >
          <span className="mobile-tab-ico" aria-hidden>
            <MenuIcon size={20} strokeWidth={1.6} />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {moreOpen && (
          <motion.div
            className="mobile-more-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={() => setMoreOpen(false)}
          >
            <motion.div
              className="mobile-more-sheet"
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 18, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-label="More pages"
            >
              <div className="mobile-more-grip" aria-hidden />
              <div className="mobile-more-head">
                <span className="eyebrow">More</span>
                <button
                  type="button"
                  className="mobile-more-close"
                  aria-label="Close"
                  onClick={() => setMoreOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>
              <div className="mobile-more-grid">
                {moreTabs.map((l) => {
                  const Icon = l.icon;
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={clsx("mobile-more-link", isActive(l.href) && "on")}
                      aria-current={isActive(l.href) ? "page" : undefined}
                    >
                      <span className="mobile-more-ico" aria-hidden>
                        <Icon size={18} strokeWidth={1.7} />
                      </span>
                      {l.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function SiteFooter() {
  const { tr } = usePrefs();
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CAFE.mapsQuery)}`;
  const telHref = `tel:${CAFE.phoneDisplay.replace(/\s/g, "")}`;
  const mailHref = `mailto:${CAFE.email}`;
  const explore = [
    { href: "/menu", label: tr.menu },
    { href: "/about", label: tr.about },
    { href: "/gallery", label: tr.gallery },
    { href: "/loyalty", label: tr.loyalty },
    { href: "/faq", label: "FAQ" },
    { href: "/feedback", label: tr.feedback },
    { href: "/contact", label: tr.contact },
  ];
  const partners = [
    { href: CAFE.zomatoUrl, label: "Zomato" },
    { href: CAFE.swiggyUrl, label: "Swiggy" },
    { href: CAFE.districtUrl, label: "District" },
  ];

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand" aria-label="Bagara & Pulusu home">
              <BrandMark sizes="48px" />
              <span className="brand-text">
                <strong>BAGARA</strong>
                <small>&amp; PULUSU</small>
              </span>
            </Link>
            <p className="footer-tagline">{CAFE.tagline}</p>
            <div className="footer-cta">
              <Link href="/reserve" className="footer-cta-btn is-primary">
                {tr.bookTable}
              </Link>
              <a
                href={mapsHref}
                target="_blank"
                rel="noreferrer"
                className="footer-cta-btn"
              >
                Directions
              </a>
            </div>
          </div>

          <nav className="footer-nav" aria-label="Explore">
            <h5>Explore</h5>
            <div className="footer-chips">
              {explore.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="footer-visit">
            <h5>Visit</h5>
            <div className="footer-visit-list">
              <a
                className="footer-fact"
                href={mapsHref}
                target="_blank"
                rel="noreferrer"
              >
                <span className="footer-ico">
                  <MapPin size={15} />
                </span>
                <span>
                  {CAFE.addressLines[0]}
                  <small>{CAFE.addressLines[1]}</small>
                </span>
              </a>
              <p className="footer-fact">
                <span className="footer-ico">
                  <Clock size={15} />
                </span>
                <span>
                  Open daily
                  <small>{CAFE.hours}</small>
                </span>
              </p>
              <a className="footer-fact" href={telHref}>
                <span className="footer-ico">
                  <Phone size={15} />
                </span>
                <span>
                  Call us
                  <small>{CAFE.phoneDisplay}</small>
                </span>
              </a>
              <div className="footer-fact">
                <span className="footer-ico">
                  <Mail size={15} />
                </span>
                <span className="footer-email-line">
                  <a href={mailHref}>{CAFE.email}</a>
                  <CopyButton value={CAFE.email} label="Copy email" iconOnly />
                </span>
              </div>
            </div>
          </div>

          <div className="footer-order">
            <h5>{tr.orderPartners}</h5>
            <div className="footer-chips is-partners">
              {partners.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.label}
                  <ArrowUpRight size={13} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-mark" aria-hidden>
          BAGARA
        </div>
        <p className="footer-legal">
          © {new Date().getFullYear()} Bagara & Pulusu · GSTIN {CAFE.gstin}
          <span className="footer-legal-dot" aria-hidden>
            ·
          </span>
          Last updated {CAFE.updated}
          <span className="footer-legal-dot" aria-hidden>
            ·
          </span>
          <Link href="/privacy">Privacy</Link>
          <span className="footer-legal-dot" aria-hidden>
            ·
          </span>
          <Link href="/terms">Terms</Link>
          <span className="footer-legal-dot" aria-hidden>
            ·
          </span>
          <Link href="/staff/login" className="footer-staff">
            {tr.staff} login
          </Link>
          <br />
          Warm evenings in Madhapur.
        </p>
      </div>
    </footer>
  );
}
