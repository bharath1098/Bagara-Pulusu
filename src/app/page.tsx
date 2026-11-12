"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Flame,
  Leaf,
  MapPin,
  Phone,
  QrCode,
  Soup,
  Star,
  UtensilsCrossed,
  Wheat,
  GlassWater,
  Clock,
} from "lucide-react";
import { PublicShell } from "@/components/PublicShell";
import { Reveal } from "@/components/Reveal";
import { usePrefs } from "@/components/Providers";
import { SafeImage as Image } from "@/components/SafeImage";
import { CAFE, formatMoney } from "@/lib/cafe";
import { CAFE_MEDIA, imageForMenuItem } from "@/lib/media";
import { SEED_MENU } from "@/lib/menu-data";
import { slugify } from "@/lib/slug";

const PERKS = [
  {
    icon: QrCode,
    title: "Table QR",
    text: "Order at your seat",
  },
  {
    icon: Leaf,
    title: "100% Fresh",
    text: "Cooked today",
  },
  {
    icon: Clock,
    title: "Open Daily",
    text: "11 AM – 11:30 PM",
  },
];

const CATEGORIES = [
  { name: "Rices", note: "Bagara & biryani", href: "/explore/rices-biryani", icon: Wheat },
  { name: "Frys", note: "Andhra crisp", href: "/explore/frys", icon: Flame },
  { name: "Pulusu", note: "Tamarind heat", href: "/explore/pulusu", icon: Soup },
  { name: "Thalis", note: "Full plate", href: "/explore/thalis", icon: UtensilsCrossed },
  { name: "Starters", note: "Openers", href: "/explore/starters", icon: Star },
  { name: "Shakes", note: "Cool down", href: "/explore/shakes-juices", icon: GlassWater },
];

const POPULAR = SEED_MENU.filter((m) => m.isHighlighted).slice(0, 4);

const TODAY = [
  { name: "Bagara", price: 120 },
  { name: "Chicken Fry", price: 220 },
  { name: "Chepala Pulusu", price: 280 },
  { name: "Chicken Biryani", price: 280 },
  { name: "Chicken Thali", price: 299 },
  { name: "Boti Curry", price: 280 },
];

const REASONS = [
  "Traditional Andhra recipes, not watered-down spice",
  "Bagara rice and pulusu as the house namesake",
  "Scan-to-order with a shared table bill",
  "Free reservations — table assigned when you arrive",
];

const REVIEWS = [
  {
    quote:
      "Bagara rice with chicken fry and chepala pulusu — the Andhra table we kept coming back for.",
    name: "Ananya R.",
    meta: "Google · 5★",
  },
  {
    quote:
      "Proper heat, proper ghee. The QR order at the table made dinner with friends easy.",
    name: "Karthik M.",
    meta: "Guest · 5★",
  },
  {
    quote:
      "Best pulusu in Madhapur. Quiet enough to talk, bold enough to remember.",
    name: "Sneha P.",
    meta: "Zomato · 4.5★",
  },
];

export default function HomePage() {
  const { tr, currency } = usePrefs();
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CAFE.mapsQuery)}`;
  const telHref = `tel:${CAFE.phoneDisplay.replace(/\s/g, "")}`;

  return (
    <PublicShell>
      <div className="bp-home">
        {/* HERO */}
        <section className="bp-hero">
          <div className="bp-hero-noise" aria-hidden />
          <div className="wrap bp-hero-layout">
            <div className="bp-hero-copy">
              <motion.p
                className="bp-hero-script"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                Delicious Food
              </motion.p>
              <h1 className="bp-hero-title">
                <motion.span
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  Made With
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  Love &amp; Passion
                </motion.span>
              </h1>
              <motion.p
                className="bp-hero-lead"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.32 }}
              >
                Fresh bagara rice, fiery fries, and slow tamarind pulusu —
                cooked with care every night in Madhapur.
              </motion.p>
              <motion.div
                className="bp-hero-actions"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.42 }}
              >
                <Link href="/menu" className="bp-btn bp-btn-solid">
                  Order Now
                </Link>
                <Link href="/menu" className="bp-btn bp-btn-line">
                  Explore Menu
                </Link>
              </motion.div>

              <ul className="bp-hero-perks">
                {PERKS.map((perk, i) => {
                  const Icon = perk.icon;
                  return (
                    <motion.li
                      key={perk.title}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 0.55 + i * 0.1 }}
                    >
                      <span className="bp-perk-icon">
                        <Icon size={22} strokeWidth={1.6} />
                      </span>
                      <span>
                        <strong>{perk.title}</strong>
                        <small>{perk.text}</small>
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            <motion.div
              className="bp-hero-visual"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bp-hero-media">
                <video
                  className="bp-hero-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-label="Signature Andhra plate"
                >
                  <source src={CAFE_MEDIA.heroDishVideo} type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STORY */}
        <section className="bp-story">
          <div className="wrap bp-story-grid">
            <Reveal>
              <div className="bp-story-copy">
                <p className="bp-kicker is-dark">Our namesake</p>
                <h2 className="bp-h">
                  Crafting Andhra plates, <em>not cafe copies</em>
                </h2>
                <p className="bp-lede">
                  Bagara is the rice. Pulusu is the gravy. Together they are the
                  table we cook for every night in Madhapur — whole spices,
                  tamarind heat, and no shortcuts.
                </p>
                <Link href="/about" className="bp-btn bp-btn-solid">
                  Our story <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="bp-story-mosaic">
                <Link href="/menu/bagara" className="bp-mosaic bp-mosaic-a has-photo">
                  <Image
                    src={CAFE_MEDIA.bagaraRice}
                    alt="Bagara rice"
                    fill
                    className="cover"
                    sizes="(max-width: 900px) 90vw, 40vw"
                  />
                  <span className="bp-mosaic-label">
                    <strong>Bagara</strong>
                    <small>Ghee · whole spice</small>
                  </span>
                </Link>
                <Link href="/menu/zeera-rice" className="bp-mosaic bp-mosaic-b has-photo">
                  <Image
                    src={CAFE_MEDIA.zeeraRice}
                    alt="Zeera rice"
                    fill
                    className="cover"
                    sizes="(max-width: 900px) 45vw, 20vw"
                  />
                  <span className="bp-mosaic-label">
                    <strong>Zeera</strong>
                    <small>Cumin · whole spice</small>
                  </span>
                </Link>
                <Link href="/menu/white-rice" className="bp-mosaic bp-mosaic-c has-photo">
                  <Image
                    src={CAFE_MEDIA.whiteRice}
                    alt="White rice"
                    fill
                    className="cover"
                    sizes="(max-width: 900px) 45vw, 20vw"
                  />
                  <span className="bp-mosaic-label">
                    <strong>White rice</strong>
                    <small>Steamed plain</small>
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="bp-cats">
          <div className="wrap">
            <Reveal>
              <p className="bp-kicker is-dark">The menu</p>
              <h2 className="bp-h">What would you like to eat?</h2>
            </Reveal>
            <div className="bp-cats-grid">
              {CATEGORIES.map((c, i) => {
                const Icon = c.icon;
                return (
                  <Reveal key={c.name} delay={i * 0.04}>
                    <Link href={c.href} className="bp-cat">
                      <span className="bp-cat-icon">
                        <Icon size={22} />
                      </span>
                      <b>{c.name}</b>
                      <small>{c.note}</small>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* POPULAR */}
        <section className="bp-popular">
          <div className="wrap">
            <Reveal>
              <div className="bp-section-head">
                <div>
                  <p className="bp-kicker is-dark">House favourites</p>
                  <h2 className="bp-h">Popular plates</h2>
                </div>
                <Link href="/menu" className="bp-text-link">
                  Full menu <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
            <div className="bp-popular-grid">
              {POPULAR.map((dish, i) => {
                const img = imageForMenuItem(dish.name, dish.category);
                return (
                <Reveal key={dish.name} delay={i * 0.05}>
                  <Link
                    href={`/menu/${slugify(dish.name)}`}
                    className="bp-dish"
                  >
                    <div className="bp-dish-visual" aria-hidden={!img}>
                      {img ? (
                        <Image
                          src={img}
                          alt={dish.name}
                          fill
                          className="cover"
                          sizes="(max-width: 900px) 50vw, 240px"
                        />
                      ) : (
                        <span>{dish.name.slice(0, 1)}</span>
                      )}
                    </div>
                    <div className="bp-dish-body">
                      <h3>{dish.name}</h3>
                      <p>{dish.description}</p>
                      <div className="bp-dish-foot">
                        <strong>{formatMoney(dish.price, currency)}</strong>
                        <span>
                          <Star size={13} /> 4.8
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
              })}
            </div>
          </div>
        </section>

        {/* TODAY'S MENU */}
        <section className="bp-today">
          <div className="bp-today-grid">
            <Reveal className="bp-today-col">
              <div className="bp-today-panel">
                <p className="bp-kicker">Tonight&apos;s table</p>
                <h2 className="bp-h is-light">
                  Signature Andhra <em>plates</em>
                </h2>
                <p className="bp-today-lede">
                  The house line-up we cook every night — rice, fry, pulusu, and
                  the full thali.
                </p>
                <ul className="bp-today-list">
                  {TODAY.map((row, i) => (
                    <li key={row.name}>
                      <Link href={`/menu/${slugify(row.name)}`}>
                        <em>{String(i + 1).padStart(2, "0")}</em>
                        <span>{row.name}</span>
                        <i aria-hidden />
                        <b>{formatMoney(row.price, currency)}</b>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/menu" className="bp-btn bp-btn-solid">
                  View full menu <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>
            <Reveal className="bp-today-col" delay={0.08}>
              <div className="bp-today-visual">
                <motion.div
                  className="bp-today-photo"
                  initial={{ scale: 1.06, opacity: 0.7 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={CAFE_MEDIA.chickenBiryani}
                    alt="Chicken biryani"
                    fill
                    className="cover"
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                </motion.div>
                <div className="bp-today-fade" aria-hidden />
              </div>
            </Reveal>
          </div>
        </section>

        {/* RESERVE */}
        <section className="bp-reserve">
          <div className="wrap bp-reserve-grid">
            <Reveal>
              <div>
                <p className="bp-kicker">Visit</p>
                <h2 className="bp-h is-light">Reserve your table</h2>
                <p className="bp-lede is-muted">
                  Free booking. Walk in or reserve — we assign a table when you
                  arrive, then scan the QR to order.
                </p>
                <Link href="/reserve" className="bp-btn bp-btn-solid">
                  {tr.bookTable} <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="bp-contact-card">
                <h3>Find us</h3>
                <a href={mapsHref} target="_blank" rel="noreferrer">
                  <MapPin size={16} />
                  {CAFE.addressLines.join(", ")}
                </a>
                <a href={telHref}>
                  <Phone size={16} />
                  {CAFE.phoneDisplay}
                </a>
                <p>
                  <Clock size={16} />
                  {CAFE.hours}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* WHY */}
        <section className="bp-why">
          <div className="wrap bp-why-grid">
            <Reveal className="bp-why-copy">
              <p className="bp-kicker is-dark">Why Bagara &amp; Pulusu</p>
              <h2 className="bp-h">More than a rice plate</h2>
              <ul className="bp-why-list">
                {REASONS.map((r) => (
                  <li key={r}>
                    <Check size={16} />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
              <Link href="/reserve" className="bp-btn bp-btn-solid bp-why-cta">
                Reserve a table <ArrowRight size={16} />
              </Link>
            </Reveal>
            <Reveal className="bp-why-aside" delay={0.08}>
              <div className="bp-why-visual">
                <Image
                  src={CAFE_MEDIA.chepalaPulusu}
                  alt="Chepala pulusu — the house tamarind fish gravy"
                  fill
                  className="cover"
                  sizes="(max-width: 900px) 92vw, 420px"
                />
                <div className="bp-why-visual-caption">
                  <strong>Chepala pulusu</strong>
                  <small>House tamarind heat</small>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="bp-reviews">
          <div className="wrap">
            <Reveal>
              <p className="bp-kicker is-on-green">Guests</p>
              <h2 className="bp-h is-light">Loved at the table</h2>
            </Reveal>
            <div className="bp-reviews-grid">
              {REVIEWS.map((r, i) => (
                <Reveal key={r.name} delay={i * 0.06}>
                  <blockquote className="bp-review">
                    <p>“{r.quote}”</p>
                    <cite>
                      <span className="bp-review-av" aria-hidden>
                        {r.name.slice(0, 1)}
                      </span>
                      <span>
                        <strong>{r.name}</strong>
                        <small>{r.meta}</small>
                      </span>
                    </cite>
                  </blockquote>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PublicShell>
  );
}
