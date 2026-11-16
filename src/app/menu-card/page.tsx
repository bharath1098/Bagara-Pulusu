/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Montserrat, Oswald } from "next/font/google";
import QRCode from "qrcode";
import { CAFE } from "@/lib/cafe";
import { SEED_MENU } from "@/lib/menu-data";
import { PrintButton } from "./PrintButton";
import "./menu-card.css";

const mcBanner = Oswald({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--mc-banner",
  display: "swap",
});

const mcText = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--mc-text",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Printable Menu Card",
  description: "A printable 4-side menu card for Bagara & Pulusu.",
};

type Item = (typeof SEED_MENU)[number];

const byCat = (cat: string): Item[] =>
  SEED_MENU.filter((i) => i.category === cat && i.available && i.price > 0);

function inr(n: number) {
  return `₹${n}`;
}

function Sprigs() {
  const src = "/media/menu-card/olive-sprig.svg";
  return (
    <>
      <img className="mc-sprig mc-sprig-tr" src={src} alt="" />
      <img className="mc-sprig mc-sprig-tl" src={src} alt="" />
      <img className="mc-sprig mc-sprig-edge" src={src} alt="" />
      <img className="mc-sprig mc-sprig-bl" src={src} alt="" />
      <img className="mc-sprig mc-sprig-br" src={src} alt="" />
    </>
  );
}

function Category({
  name,
  note,
  photo,
  wide,
  order,
}: {
  name: string;
  note?: string;
  photo?: string;
  wide?: boolean;
  order?: boolean;
}) {
  const items = byCat(name);
  if (!items.length) return null;
  return (
    <section className="mc-cat">
      <div className="mc-cat-top">
        <h2 className="mc-flag">{name}</h2>
        {order && (
          <a className="mc-order" href="/menu">
            Order now
          </a>
        )}
      </div>
      {note && <p className="mc-note">{note}</p>}
      {photo && (
        <img
          src={photo}
          alt=""
          className={`mc-bowl${wide ? " wide" : ""}`}
        />
      )}
      <ul>
        {items.map((it) => {
          const multi = it.variants && it.variants.length > 1;
          return (
            <li key={it.id}>
              <div className="mc-line">
                <span className={`mc-dot ${it.isVeg ? "veg" : "nonveg"}`} />
                <span className="mc-name">{it.name}</span>
                <span className="mc-leader" />
                <span className="mc-price">
                  {multi
                    ? it.variants!.map((v) => inr(v.price)).join(" / ")
                    : inr(it.price)}
                </span>
              </div>
              {(it.description || multi) && (
                <p className="mc-desc">
                  {multi ? `${it.variants!.map((v) => v.label).join(" / ")} · ` : ""}
                  {it.description}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function MenuSide({
  n,
  banner,
  qr,
  plates,
  children,
}: {
  n: number;
  banner?: string;
  qr?: string;
  plates?: string[];
  children: ReactNode;
}) {
  return (
    <section className="mc-page mc-menu">
      <Sprigs />
      <img className="mc-badge" src="/media/cafe/logo-menu.png" alt="Bagara & Pulusu" />
      <div className="mc-sheet">
        {banner && (
          <div className="mc-banner">
            <span>{banner}</span>
          </div>
        )}
        <div className="mc-cols">{children}</div>
        {plates && plates.length > 0 && (
          <div className="mc-plates">
            {plates.map((src) => (
              <img key={src} src={src} alt="" />
            ))}
          </div>
        )}
      </div>
      <footer className="mc-fine">
        {qr ? (
          <img className="mc-qr" src={qr} alt="Scan for the live menu" />
        ) : (
          <span />
        )}
        <p>
          Please inform us of any food allergies before ordering. All prices in ₹.
          GST extra.
        </p>
        <span className="mc-pg">{n} / 4</span>
      </footer>
    </section>
  );
}

export default async function MenuCardPage() {
  const qr = await QRCode.toDataURL("https://bagaraandpulusu.vercel.app/menu", {
    margin: 1,
    width: 300,
    color: { dark: "#1c140e", light: "#f4efe4" },
  });

  return (
    <main className={`mc-wrap ${mcBanner.variable} ${mcText.variable}`}>
      <div className="mc-toolbar">
        <span>Menu card · 4 sides · A4 portrait</span>
        <PrintButton />
      </div>

      <div className="mc-pages">
        <section className="mc-page mc-cover">
          <footer className="mc-cover-foot">
            <div className="mc-cf-col">
              <div>{CAFE.addressLines.join(", ")}</div>
              <div>+91 93928 36018 · +91 93905 83048 · +91 98491 55145</div>
              <div>{CAFE.email}</div>
            </div>
            <div className="mc-cf-qr">
              <small>Explore our menu</small>
              <img src={qr} alt="Scan for online menu" />
            </div>
          </footer>
        </section>

        <MenuSide n={2} qr={qr}>
          <div className="mc-col">
            <Category
              name="Starters"
              note="Crispy, spicy, made to share"
              photo="/media/cafe/chicken-65.png"
            />
            <Category name="Frys" photo="/media/cafe/chicken-fry.png" />
          </div>
          <div className="mc-col">
            <Category
              name="Rices"
              note="Bagara, pulao and dum biryani"
              photo="/media/cafe/bagara-rice.png"
              order
            />
          </div>
        </MenuSide>

        <MenuSide
          n={3}
          banner="Thalis, Curries & Breads"
          plates={[
            "/media/cafe/chicken-biryani.png",
            "/media/cafe/chicken-curry.png",
            "/media/cafe/prawns-curry.png",
          ]}
        >
          <div className="mc-col">
            <Category
              name="Thalis"
              note="A full plate, served together"
              photo="/media/cafe/veg-thali.png"
              order
            />
            <Category name="Veg Curries" />
            <Category name="Breads" />
          </div>
          <div className="mc-col">
            <Category
              name="Curries & Pulusu"
              note="Slow-cooked gravies from the chulha"
              photo="/media/cafe/chepala-pulusu.png"
              wide
            />
          </div>
        </MenuSide>

        <MenuSide
          n={4}
          banner="Desserts & Drinks"
          qr={qr}
          plates={[
            "/media/cafe/mango-juice.png",
            "/media/cafe/chocolate-shake.png",
            "/media/cafe/brownie-icecream.png",
          ]}
        >
          <div className="mc-col">
            <Category name="Desserts" />
            <Category name="Juices" note="Pressed to order" photo="/media/cafe/mango-juice.png" />
            <Category name="Soft Drinks" />
          </div>
          <div className="mc-col">
            <Category
              name="Shakes"
              note="Thick, chilled, blended to order"
              photo="/media/cafe/mango-shake.png"
              order
            />
          </div>
        </MenuSide>
      </div>
    </main>
  );
}
