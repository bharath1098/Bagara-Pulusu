import type { Metadata } from "next";
import { SafeImage as Image } from "@/components/SafeImage";
import Link from "next/link";
import {
  ArrowRight,
  CalendarHeart,
  Clock,
  Flower2,
  Gift,
  Globe,
  Leaf,
  MapPin,
  MoonStar,
  Navigation,
  Phone,
  QrCode,
  Sparkles,
  Star,
  Sunrise,
  Sunset,
  Truck,
  UtensilsCrossed,
  Users,
} from "lucide-react";
import { PublicShell } from "@/components/PublicShell";
import { Reveal } from "@/components/Reveal";
import { SpiceSky } from "@/components/SpiceSky";
import {
  CountUp,
  Floaty,
  ParallaxFrame,
  ScrollTimeline,
  StatBar,
} from "@/components/AboutParts";
import { CAFE, formatMoney } from "@/lib/cafe";
import { CAFE_MEDIA, GALLERY } from "@/lib/media";
import { SEED_MENU } from "@/lib/menu-data";

export const metadata: Metadata = {
  title: "About Bagara & Pulusu Madhapur",
  description:
    "The story of Bagara & Pulusu, Madhapur: Andhra rice, fries, pulusu and thalis. Open daily 11:00 AM – 11:30 PM.",
  alternates: { canonical: "/about" },
};

const DRINK_CATEGORIES = new Set([
  "Juices",
  "Shakes",
  "Soft Drinks",
]);

const MENU_ITEMS = SEED_MENU.length;
const MENU_CATEGORIES = new Set(SEED_MENU.map((m) => m.category)).size;
const DRINK_COUNT = SEED_MENU.filter((m) => DRINK_CATEGORIES.has(m.category)).length;
const DESSERT_COUNT = SEED_MENU.filter((m) => m.category === "Desserts").length;
const PLATE_COUNT = SEED_MENU.filter(
  (m) => !DRINK_CATEGORIES.has(m.category) && m.category !== "Desserts" && m.category !== "Extras",
).length;
const VEG_SHARE = Math.round(
  (SEED_MENU.filter((m) => m.isVeg).length / MENU_ITEMS) * 100,
);
const RICE_COUNT = SEED_MENU.filter((m) => m.category === "Rices").length;

const hoursOpen = (() => {
  const [sh, sm] = CAFE.hoursStart.split(":").map(Number);
  const [eh, em] = CAFE.hoursEnd.split(":").map(Number);
  return (eh * 60 + em - (sh * 60 + sm)) / 60;
})();

const priceOf = (name: string) =>
  SEED_MENU.find((m) => m.name === name)?.price ?? 0;

const STATS = [
  { to: 4.5, decimals: 1, suffix: "★", label: "Guest rating", note: "Local favourites" },
  { to: MENU_ITEMS, decimals: 0, suffix: "", label: "Dishes & drinks", note: "On the live menu" },
  { to: MENU_CATEGORIES, decimals: 0, suffix: "", label: "Menu families", note: "Rice to desserts" },
  { to: hoursOpen, decimals: 1, suffix: "h", label: "Open every day", note: CAFE.hours },
  { to: VEG_SHARE, decimals: 0, suffix: "%", label: "Vegetarian dishes", note: "Plenty of green plates" },
  { to: 100, decimals: 0, suffix: "", label: "Welcome points", note: "When you join Rewards" },
];

const KITCHEN = [
  {
    label: "Andhra kitchen",
    value: PLATE_COUNT,
    hint: "Rices, fries, pulusu, thalis & more",
    img: "",
  },
  {
    label: "Coolers",
    value: DRINK_COUNT,
    hint: "Juices, shakes and soft drinks",
    img: "",
  },
  {
    label: "Rice pots",
    value: RICE_COUNT,
    hint: "Bagara, biryani, pulao, curd rice",
    img: "",
  },
  {
    label: "Sweet finishes",
    value: DESSERT_COUNT,
    hint: "Brownie and dessert display specials",
    img: "",
  },
];

const VALUES = [
  {
    icon: <UtensilsCrossed size={22} />,
    title: "Andhra table",
    text: "Bagara rice, fiery fries, and tamarind pulusu cooked for sharing.",
    img: "",
  },
  {
    icon: <Leaf size={22} />,
    title: "Local Andhra kitchen",
    text: "Chulha-style spice, clay-pot gravies, and rice cooked the Telugu way.",
    img: "",
  },
  {
    icon: <UtensilsCrossed size={22} />,
    title: "Thalis done right",
    text: "Composed plates — veg, chicken, fish, or the full mix.",
    img: "",
  },
  {
    icon: <Flower2 size={22} />,
    title: "Moments that matter",
    text: "Family tables in Madhapur — fry, pulusu, and shared rice.",
    img: "",
  },
];

const SIGNATURES = [
  {
    name: "Bagara",
    note: "Tempered rice with ghee and spice",
    img: "",
    tag: "Namesake",
  },
  {
    name: "Chepala Pulusu",
    note: "Tangy tamarind fish gravy",
    img: "",
    tag: "House signature",
  },
  {
    name: "Chicken Fry",
    note: "Crispy Andhra dry fry",
    img: "",
    tag: "Fry",
  },
  {
    name: "Brownie with Ice Cream",
    note: "Warm finish from the dessert tray",
    img: "",
    tag: "Dessert",
  },
];

const DAY = [
  {
    time: "11:00 AM",
    title: "Doors open",
    text: "Bagara pots on, dal simmering, first thalis of the day.",
    icon: <Sunrise size={20} />,
  },
  {
    time: "Afternoon",
    title: "Long lunches",
    text: "Biryani, fries, pulusu and breads shared around the table.",
    icon: <UtensilsCrossed size={20} />,
  },
  {
    time: "Golden hour",
    title: "Evening rush",
    text: "Mix thalis, starters, and shakes as the dining room fills.",
    icon: <Sunset size={20} />,
  },
  {
    time: "11:30 PM",
    title: "Late-night hush",
    text: "Desserts, one more soft drink, and stories before close.",
    icon: <MoonStar size={20} />,
  },
];

const STEPS = [
  {
    icon: <QrCode size={22} />,
    title: "Scan your table",
    text: "The first guest starts the table and gets a 6-digit group code.",
  },
  {
    icon: <Users size={22} />,
    title: "Friends join in",
    text: "Everyone adds dishes to one live, shared cart with the code.",
  },
  {
    icon: <Star size={22} />,
    title: "Waiter confirms",
    text: "Your order goes to the kitchen and is tracked live to the table.",
  },
];

const FACTS = [
  { icon: <Clock size={18} />, title: "Open daily", text: CAFE.hours },
  { icon: <Leaf size={18} />, title: "Local Andhra table", text: "Rice, fry, and pulusu from Madhapur" },
  { icon: <QrCode size={18} />, title: "Table QR ordering", text: "One group code. One shared bill." },
  { icon: <Gift size={18} />, title: "Bagara Rewards", text: "100 welcome points · 1 pt / ₹100" },
  { icon: <Globe size={18} />, title: "Three languages", text: "English · हिन्दी · తెలుగు" },
  { icon: <Truck size={18} />, title: "Order or reserve", text: "Zomato · Swiggy Dineout · District" },
  { icon: <Leaf size={18} />, title: `${VEG_SHARE}% vegetarian`, text: "A kitchen that welcomes everyone" },
  { icon: <Users size={18} />, title: "Come as a group", text: "Reserve ahead · walk-ins welcome" },
];

const REVIEWS = [
  {
    text: "Bagara rice with chicken fry and chepala pulusu — the Andhra table we kept coming back for.",
    who: "Ananya R.",
  },
  {
    text: "Ordering from the table QR with friends was seamless. Everyone added to one bill.",
    who: "Karthik M.",
  },
  {
    text: "Mix thali hits every craving. Spice, curd, and rice done right in Madhapur.",
    who: "Sana K.",
  },
];

export default function AboutPage() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CAFE.mapsQuery)}`;
  const marquee = [...GALLERY, ...GALLERY];
  const kitchenMax = Math.max(...KITCHEN.map((k) => k.value));

  return (
    <PublicShell>
      <section className="hero about-hero">
        <SpiceSky />
        <div className="wrap hero-grid">
          <div>
            <Reveal>
              <span className="eyebrow">Our story · Madhapur</span>
              <h1 className="h-display h-xl">
                Bagara <em className="about-em">&amp;</em>
                <br />
                Pulusu
              </h1>
              <p className="lead">{CAFE.tagline}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="hero-actions">
                <Link href="/menu" className="btn btn-gold btn-lg">
                  Explore the menu <ArrowRight size={18} />
                </Link>
                <Link href="/reserve" className="btn btn-outline-light btn-lg">
                  <CalendarHeart size={18} /> Reserve a table
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="hero-stats">
                <div>
                  <strong>4.5★</strong>
                  <span>332+ REVIEWS</span>
                </div>
                <div>
                  <strong>{MENU_ITEMS}+</strong>
                  <span>DISHES &amp; DRINKS</span>
                </div>
                <div>
                  <strong>11 – 11:30</strong>
                  <span>OPEN DAILY</span>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08} y={36}>
            <div className="arch-collage">
              <div className="arch arch-a">
                <Image
                  src={CAFE_MEDIA.festival}
                  alt="Andhra festival spread at Bagara & Pulusu"
                  fill
                  className="cover"
                  sizes="(max-width: 960px) 70vw, 32vw"
                  preload
                />
              </div>
              <div className="arch arch-b">
                <Image
                  src={CAFE_MEDIA.dining}
                  alt="Andhra thali on the table"
                  fill
                  className="cover"
                  sizes="(max-width: 960px) 40vw, 18vw"
                />
              </div>
              <div className="arch arch-c">
                <Image
                  src={CAFE_MEDIA.bagaraRice}
                  alt="Bagara rice"
                  fill
                  className="cover"
                  sizes="(max-width: 960px) 40vw, 18vw"
                />
              </div>
              <Floaty className="float-chip about-chip-rating" delay={0.4}>
                <Star size={16} fill="currentColor" />
                4.5 · 332+ guests
              </Floaty>
              <Floaty className="float-chip about-chip-hours" delay={1.1} amplitude={8}>
                <Clock size={16} />
                Open till 11:30
              </Floaty>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STORY */}
      <section className="section about-story">
        <div className="wrap split" style={{ alignItems: "center" }}>
          <Reveal>
            <div className="about-story-visual">
              <ParallaxFrame className="arch-photo about-arch">
                <Image
                  src={CAFE_MEDIA.village}
                  alt="Local Andhra kitchen at Bagara & Pulusu"
                  fill
                  className="cover"
                  sizes="(max-width: 960px) 100vw, 45vw"
                />
              </ParallaxFrame>
              <Floaty className="about-badge about-badge-rating" delay={0.2}>
                <span className="about-badge-icon">
                  <Star size={18} fill="currentColor" />
                </span>
                <div>
                  <strong>4.5 / 5</strong>
                  <span>332+ guest reviews</span>
                </div>
              </Floaty>
              <Floaty className="about-badge about-badge-hours" delay={0.9} amplitude={8}>
                <span className="about-badge-icon">
                  <MapPin size={18} />
                </span>
                <div>
                  <strong>Madhapur</strong>
                  <span>Ayyappa Society, Hyderabad</span>
                </div>
              </Floaty>
              <div className="about-orb" aria-hidden>
                <Image
                  src={CAFE_MEDIA.logo}
                  alt=""
                  fill
                  className="cover"
                  sizes="140px"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="eyebrow">Why Bagara</span>
            <h2 className="h-display h-lg" style={{ margin: "1rem 0" }}>
              Rice, fry, and{" "}
              <em className="about-em">slow pulusu</em>
            </h2>
            <p className="lead">
              Bagara & Pulusu is an Andhra table in Madhapur — bagara rice,
              fiery fries, tamarind pulusu, and thalis built for sharing.
            </p>
            <p className="lead" style={{ marginTop: "1rem" }}>
              {CAFE.baristaTagline} Scan the QR on your table to order with
              friends. One group code keeps everyone in sync, so every guest
              adds to the same bill.
            </p>

            <ul className="about-pills">
              <li>
                <Sparkles size={14} /> Signature fries
              </li>
              <li>
                <Flower2 size={14} /> Warm evenings
              </li>
              <li>
                <QrCode size={14} /> Table QR ordering
              </li>
              <li>
                <Users size={14} /> One shared bill
              </li>
            </ul>

            <div className="hero-actions" style={{ marginTop: "1.6rem" }}>
              <Link href="/gallery" className="btn btn-gold">
                See the gallery <ArrowRight size={16} />
              </Link>
              <Link href="/loyalty" className="btn btn-outline-light">
                Join Rewards
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="section section-dark about-stats">
        <span className="about-glow about-glow-a" aria-hidden />
        <span className="about-glow about-glow-b" aria-hidden />
        <div className="wrap">
          <Reveal>
            <div className="about-center">
              <span className="eyebrow">Bagara in numbers</span>
              <h2 className="h-display h-lg" style={{ marginTop: "0.8rem" }}>
                Loved one cup at a time
              </h2>
            </div>
          </Reveal>
          <div className="about-stats-grid">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.07}>
                <div className="about-stat">
                  <strong>
                    <CountUp
                      to={s.to}
                      decimals={s.decimals}
                      suffix={s.suffix}
                    />
                  </strong>
                  <span>{s.label}</span>
                  <em>{s.note}</em>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* KITCHEN MIX */}
      <section className="section about-kitchen">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">What we pour &amp; plate</span>
                <h2 className="h-display h-lg" style={{ marginTop: "0.8rem" }}>
                  A menu built to linger
                </h2>
              </div>
              <p className="muted" style={{ maxWidth: 320 }}>
                {MENU_ITEMS} dishes across {MENU_CATEGORIES} families — rice
                pots, Andhra kitchen, and coolers for later.
              </p>
            </div>
          </Reveal>
          <div className="about-kitchen-grid">
            {KITCHEN.map((k, i) => (
              <Reveal key={k.label} delay={i * 0.08}>
                <article className="about-kitchen-card">
                  <div className="about-kitchen-photo">
                    <Image
                      src={k.img}
                      alt=""
                      fill
                      className="cover"
                      sizes="(max-width: 700px) 100vw, 25vw"
                    />
                  </div>
                  <div className="about-kitchen-body">
                    <strong>
                      <CountUp to={k.value} />
                    </strong>
                    <h3>{k.label}</h3>
                    <p>{k.hint}</p>
                    <StatBar value={k.value} max={kitchenMax} delay={0.15 + i * 0.08} />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section about-values-section">
        <div className="wrap">
          <Reveal>
            <div className="about-center">
              <span className="eyebrow">What we stand for</span>
              <h2 className="h-display h-lg" style={{ marginTop: "0.8rem" }}>
                Made for slow evenings
              </h2>
            </div>
          </Reveal>
          <div className="about-values">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <article className="about-value">
                  <Image
                    src={v.img}
                    alt=""
                    fill
                    className="cover"
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw"
                  />
                  <div className="about-value-shade" />
                  <div className="about-value-body">
                    <span className="about-value-icon">{v.icon}</span>
                    <h3 className="h-display h-md">{v.title}</h3>
                    <p>{v.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNATURES */}
      <section className="section about-sig-section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">Guest favourites</span>
                <h2 className="h-display h-lg" style={{ marginTop: "0.8rem" }}>
                  Taste the signatures
                </h2>
              </div>
              <Link href="/menu" className="btn neo-btn-ghost btn-sm">
                Full menu <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
          <div className="about-sig-grid">
            {SIGNATURES.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.08}>
                <Link href="/menu" className="about-sig">
                  <div className="about-sig-photo">
                    <Image
                      src={s.img}
                      alt={s.name}
                      fill
                      className="cover"
                      sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw"
                    />
                    <span className="about-sig-tag">{s.tag}</span>
                  </div>
                  <div className="about-sig-body">
                    <h3 className="h-display h-md">{s.name}</h3>
                    <p>{s.note}</p>
                    <span className="about-sig-price">
                      {formatMoney(priceOf(s.name))}
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DAY AT BAGARA */}
      <section className="section about-day">
        <div className="wrap">
          <Reveal>
            <div className="about-center">
              <span className="eyebrow">From open to close</span>
              <h2 className="h-display h-lg" style={{ marginTop: "0.8rem" }}>
                A day at Bagara
              </h2>
              <p className="lead" style={{ margin: "0.9rem auto 0" }}>
                Twelve and a half unhurried hours. Walk in any time — lunch
                thalis to late desserts.
              </p>
            </div>
          </Reveal>
          <ScrollTimeline steps={DAY} />
        </div>
      </section>

      {/* MARQUEE */}
      <section className="about-marquee" aria-label="Photos of Bagara & Pulusu">
        <div className="about-marquee-track">
          {marquee.map((g, i) => (
            <div
              className="about-marquee-item"
              key={`${g.src}-${i}`}
              aria-hidden={i >= GALLERY.length ? true : undefined}
            >
              <Image
                src={g.src}
                alt={i >= GALLERY.length ? "" : g.title}
                fill
                className="cover"
                sizes="280px"
              />
              <span>{g.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* HOW ORDERING WORKS */}
      <section className="section about-order">
        <div className="wrap">
          <Reveal>
            <div className="about-center">
              <span className="eyebrow">Table ordering</span>
              <h2 className="h-display h-lg" style={{ marginTop: "0.8rem" }}>
                One QR. One table. One bill.
              </h2>
            </div>
          </Reveal>
          <div className="about-steps">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="about-step">
                  <span className="about-step-num">0{i + 1}</span>
                  <div className="icon-bubble">{s.icon}</div>
                  <h3 className="h-display h-md">{s.title}</h3>
                  <p className="muted">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FACTS */}
      <section className="section about-facts-section">
        <div className="wrap">
          <Reveal>
            <div className="about-center">
              <span className="eyebrow">Good to know</span>
              <h2 className="h-display h-lg" style={{ marginTop: "0.8rem" }}>
                Everything a first visit needs
              </h2>
            </div>
          </Reveal>
          <div className="about-facts">
            {FACTS.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <article className="about-fact">
                  <span className="about-fact-icon">{f.icon}</span>
                  <div>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section section-dark about-reviews">
        <span className="about-glow about-glow-a" aria-hidden />
        <div className="wrap">
          <Reveal>
            <div className="about-center">
              <span className="eyebrow">Loved by regulars</span>
              <h2 className="h-display h-lg" style={{ marginTop: "0.8rem" }}>
                Kind words from the table
              </h2>
            </div>
          </Reveal>
          <div className="about-reviews-grid">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.who} delay={i * 0.1}>
                <blockquote className="about-quote">
                  <span className="about-quote-stars">★★★★★</span>
                  <p>“{r.text}”</p>
                  <cite>— {r.who}</cite>
                </blockquote>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="about-center" style={{ marginTop: "1.8rem" }}>
              <Link href="/feedback" className="btn btn-outline-light">
                Share your visit
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VISIT */}
      <section className="section section-dark about-visit">
        <span className="about-glow about-glow-b" aria-hidden />
        <div className="wrap about-visit-grid">
          <Reveal>
            <span className="eyebrow">Come say hello</span>
            <h2 className="h-display h-lg" style={{ margin: "1rem 0" }}>
              Your table is waiting for{" "}
              <em className="about-em">bagara</em>
            </h2>
            <p className="lead">
              Walk in any evening, or reserve ahead for a group. We would love
              to plate you something good.
            </p>
            <div className="hero-actions" style={{ marginTop: "1.6rem" }}>
              <Link href="/reserve" className="btn btn-gold btn-lg">
                <CalendarHeart size={18} /> Reserve a table
              </Link>
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light btn-lg"
              >
                <Navigation size={18} /> Get directions
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="about-visit-card">
              <div className="about-visit-row">
                <span className="about-visit-icon">
                  <MapPin size={20} />
                </span>
                <div>
                  <h3>Address</h3>
                  <p>{CAFE.addressLines.join(", ")}</p>
                </div>
              </div>
              <div className="about-visit-row">
                <span className="about-visit-icon">
                  <Clock size={20} />
                </span>
                <div>
                  <h3>Hours</h3>
                  <p>{CAFE.hours}, every day</p>
                </div>
              </div>
              <div className="about-visit-row">
                <span className="about-visit-icon">
                  <Phone size={20} />
                </span>
                <div>
                  <h3>Call us</h3>
                  <p>
                    <a href={`tel:${CAFE.phoneDisplay.replace(/\s/g, "")}`}>
                      {CAFE.phoneDisplay}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PublicShell>
  );
}
