/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Montserrat, Oswald } from "next/font/google";
import QRCode from "qrcode";
import { CAFE } from "@/lib/cafe";
import { SEED_MENU } from "@/lib/menu-data";
import { PrintButton } from "../menu-card/PrintButton";
import "./menu-sheet.css";

const msBanner = Oswald({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--ms-banner",
  display: "swap",
});

const msText = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--ms-text",
  display: "swap",
});

export const metadata: Metadata = {
  title: "One-Sheet Menu",
  description: "The full Bagara & Pulusu menu on a single printable sheet.",
};

type Item = (typeof SEED_MENU)[number];

const byCat = (cat: string): Item[] =>
  SEED_MENU.filter((i) => i.category === cat && i.available && i.price > 0);

const inr = (n: number) => `₹${n}`;

function Sprigs() {
  const src = "/media/menu-card/olive-sprig.svg";
  return (
    <>
      <img className="ms-sprig ms-sprig-tl" src={src} alt="" />
      <img className="ms-sprig ms-sprig-tr" src={src} alt="" />
      <img className="ms-sprig ms-sprig-bl" src={src} alt="" />
      <img className="ms-sprig ms-sprig-br" src={src} alt="" />
    </>
  );
}

function Category({
  name,
  note,
  photo,
  order,
}: {
  name: string;
  note?: string;
  photo?: string;
  order?: boolean;
}) {
  const items = byCat(name);
  if (!items.length) return null;
  return (
    <section className="ms-cat">
      <div className="ms-cat-top">
        <h2 className="ms-flag">{name}</h2>
        {order && (
          <a className="ms-order" href="/menu">
            Order now
          </a>
        )}
      </div>
      {note && <p className="ms-note">{note}</p>}
      {photo && <img src={photo} alt="" className="ms-photo" />}
      <ul>
        {items.map((it) => {
          const multi = it.variants && it.variants.length > 1;
          return (
            <li key={it.id}>
              <div className="ms-line">
                <span className={`ms-dot ${it.isVeg ? "veg" : "nonveg"}`} />
                <span className="ms-name">{it.name}</span>
                <span className="ms-price">
                  {multi
                    ? it.variants!.map((v) => inr(v.price)).join(" / ")
                    : inr(it.price)}
                </span>
              </div>
              {(it.description || multi) && (
                <p className="ms-desc">
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

export default async function MenuSheetPage() {
  const qr = await QRCode.toDataURL("https://bagaraandpulusu.vercel.app/menu", {
    margin: 1,
    width: 300,
    color: { dark: "#1c140e", light: "#f4efe4" },
  });

  return (
    <main className={`ms-wrap ${msBanner.variable} ${msText.variable}`}>
      <div className="ms-toolbar">
        <span>One-sheet menu · A4 portrait</span>
        <PrintButton />
      </div>

      <section className="ms-sheet">
        <Sprigs />

        <header className="ms-head">
          <img className="ms-logo" src="/media/cafe/logo-menu.png" alt="Bagara & Pulusu" />
          <div className="ms-head-text">
            <h1>Bagara &amp; Pulusu</h1>
            <p>Traditional · Authentic · Local flavors</p>
          </div>
        </header>

        <div className="ms-cols">
          <div className="ms-col">
            <Category name="Starters" note="Crispy, spicy, made to share" photo="/media/cafe/chicken-65.png" />
            <Category name="Frys" photo="/media/cafe/chicken-fry.png" />
            <Category name="Veg Curries" />
            <Category name="Breads" />
          </div>

          <div className="ms-col">
            <Category
              name="Rices"
              note="Bagara, pulao and dum biryani"
              photo="/media/cafe/bagara-rice.png"
              order
            />
            <Category
              name="Thalis"
              note="A full plate, served together"
              photo="/media/cafe/veg-thali.png"
            />
            <Category name="Soft Drinks" />
          </div>

          <div className="ms-col">
            <Category
              name="Curries & Pulusu"
              note="Slow-cooked gravies from the chulha"
            />
            <Category name="Desserts" />
            <Category name="Juices" note="Pressed to order" />
            <Category name="Shakes" note="Thick, chilled, blended to order" photo="/media/cafe/mango-shake.png" />
          </div>
        </div>

        <footer className="ms-foot">
          <div className="ms-foot-col">
            <strong>Visit us</strong>
            <span>{CAFE.addressLines.join(", ")}</span>
            <span>Open daily {CAFE.hours}</span>
          </div>
          <div className="ms-foot-qr">
            <small>Explore our menu</small>
            <img src={qr} alt="Scan for the live menu" />
          </div>
          <div className="ms-foot-col ms-foot-right">
            <strong>Call / order</strong>
            <span>+91 93928 36018</span>
            <span>+91 93905 83048 · +91 98491 55145</span>
          </div>
          <p className="ms-fine">
            Please inform us of any food allergies before ordering. All prices in ₹. GST extra.
          </p>
        </footer>
      </section>
    </main>
  );
}
